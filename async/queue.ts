// Copyright the p-queue authors. MIT License.
// Ported from https://github.com/sindresorhus/p-queue
// deno-lint-ignore-file require-await
import { deadline } from "https://deno.land/std@0.192.0/async/deadline.ts";
import { createAbortError } from "./util.ts";

export type RunFunction = () => Promise<unknown>;

export interface Queue<Element, Options> {
  size: number;
  filter(options: Partial<Options>): Element[];
  dequeue(): Element | undefined;
  enqueue(run: Element, options?: Partial<Options>): void;
}

export interface TaskOptions {
  /**
   * [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) for cancellation of the operation.
   * When aborted, it will be removed from the queue and the `queue.add()` call will reject with an `AbortError`.
   * If the operation is already running, the signal will need to be handled by the operation itself.
   **/
  readonly signal?: AbortSignal;
}

interface TimeoutOptions {
  /**
   * Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
   */
  timeout?: number;

  /**
   * Whether or not a timeout is considered an exception.
   * @default false
   */
  throwOnTimeout?: boolean;
}

export interface QueueAddOptions extends TaskOptions, TimeoutOptions {
  /**
   * Priority of operation. Operations with greater priority will be scheduled first.
   * @default 0
   **/
  readonly priority?: number;
}

export interface Options<
  QueueType extends Queue<RunFunction, QueueOptions>,
  QueueOptions extends QueueAddOptions,
> extends TimeoutOptions {
  /**
   * Concurrency limit.
   * Minimum: `1`.
   * @default Infinity
   */
  readonly concurrency?: number;

  /**
   * Whether queue tasks within concurrency limit, are auto-executed as soon as they're added.
   * @default true
   */
  readonly autoStart?: boolean;

  /**
   * Class with a `enqueue` and `dequeue` method, and a `size` getter. See the [Custom QueueClass](https://github.com/sindresorhus/p-queue#custom-queueclass) section.
   */
  readonly queueClass?: new () => QueueType;

  /**
   * The max number of runs in the given interval of time.
   * Minimum: `1`.
   * @default Infinity
   */
  readonly intervalCap?: number;

  /**
   * The length of time in milliseconds before the interval count resets. Must be finite.
   * Minimum: `0`.
   * @default 0
   */
  readonly interval?: number;

  /**
   * Whether the task must finish in the given interval or will be carried over into the next interval count.
   * @default false
   */
  readonly carryoverConcurrencyCount?: boolean;
}

// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
function lowerBound<T>(
  array: readonly T[],
  value: T,
  comparator: (a: T, b: T) => number,
): number {
  let first = 0;
  let count = array.length;

  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first + step;

    if (comparator(array[it]!, value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }

  return first;
}

export interface PriorityQueueOptions extends QueueAddOptions {
  priority?: number;
}

class PriorityQueue implements Queue<RunFunction, PriorityQueueOptions> {
  readonly #queue: Array<PriorityQueueOptions & { run: RunFunction }> = [];

  enqueue(run: RunFunction, options?: Partial<PriorityQueueOptions>): void {
    options = {
      priority: 0,
      ...options,
    };

    const element = {
      priority: options.priority,
      run,
    };

    if (
      this.size && this.#queue[this.size - 1]!.priority! >= options.priority!
    ) {
      this.#queue.push(element);
      return;
    }

    const index = lowerBound(
      this.#queue,
      element,
      (a: Readonly<PriorityQueueOptions>, b: Readonly<PriorityQueueOptions>) =>
        b.priority! - a.priority!,
    );
    this.#queue.splice(index, 0, element);
  }

  dequeue(): RunFunction | undefined {
    const item = this.#queue.shift();
    return item?.run;
  }

  filter(options: Readonly<Partial<PriorityQueueOptions>>): RunFunction[] {
    return this.#queue.filter(
      (element: Readonly<PriorityQueueOptions>) =>
        element.priority === options.priority,
    ).map((element: Readonly<{ run: RunFunction }>) => element.run);
  }

  get size(): number {
    return this.#queue.length;
  }
}

type ResolveFunction<T = void> = (value?: T | PromiseLike<T>) => void;

type Task<TaskResultType> =
  | ((options: TaskOptions) => PromiseLike<TaskResultType>)
  | ((options: TaskOptions) => TaskResultType);

const empty = (): void => {};

/**
 * Promise queue with concurrency control
 */
export class AsyncQueue<
  QueueType extends Queue<RunFunction, EnqueueOptionsType> = PriorityQueue,
  EnqueueOptionsType extends QueueAddOptions = QueueAddOptions,
> extends EventTarget {
  readonly #carryoverConcurrencyCount: boolean;

  readonly #isIntervalIgnored: boolean;

  #intervalCount = 0;

  readonly #intervalCap: number;

  readonly #interval: number;

  #intervalEnd = 0;

  #intervalId?: number;

  #timeoutId?: number;

  #queue: QueueType;

  readonly #queueClass: new () => QueueType;

  #pendingCount = 0;

  // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
  #concurrency!: number;

  #isPaused: boolean;

  #resolveEmpty: ResolveFunction = empty;

  #resolveIdle: ResolveFunction = empty;

  #timeout?: number;

  readonly #throwOnTimeout: boolean;

  constructor(options?: Options<QueueType, EnqueueOptionsType>) {
    super();

    const opts = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: PriorityQueue as never,
      ...options,
    } as const;

    if (!(typeof opts.intervalCap === "number" && opts.intervalCap >= 1)) {
      throw new TypeError(
        `Expected \`intervalCap\` to be a number from 1 and up, got \`${
          opts.intervalCap?.toString() ?? ""
        }\` (${typeof opts.intervalCap})`,
      );
    }

    if (
      opts.interval === undefined ||
      !(Number.isFinite(opts.interval) && opts.interval >= 0)
    ) {
      throw new TypeError(
        `Expected \`interval\` to be a finite number >= 0, got \`${
          opts.interval?.toString() ?? ""
        }\` (${typeof opts.interval})`,
      );
    }

    this.#carryoverConcurrencyCount = opts.carryoverConcurrencyCount;
    this.#isIntervalIgnored = opts.intervalCap === Number.POSITIVE_INFINITY ||
      opts.interval === 0;
    this.#intervalCap = opts.intervalCap;
    this.#interval = opts.interval;
    this.#queue = new opts.queueClass();
    this.#queueClass = opts.queueClass;
    this.concurrency = opts.concurrency;
    this.#timeout = opts.timeout;
    this.#throwOnTimeout = opts.throwOnTimeout === true;
    this.#isPaused = opts.autoStart === false;
  }

  get #doesIntervalAllowAnother(): boolean {
    return this.#isIntervalIgnored || this.#intervalCount < this.#intervalCap;
  }

  get #doesConcurrentAllowAnother(): boolean {
    return this.#pendingCount < this.#concurrency;
  }

  #next(): void {
    this.#pendingCount--;
    this.#tryToStartAnother();
    this.emit("next");
  }

  #resolvePromises(): void {
    this.#resolveEmpty();
    this.#resolveEmpty = empty;

    if (this.#pendingCount === 0) {
      this.#resolveIdle();
      this.#resolveIdle = empty;
      this.emit("idle");
    }
  }

  #onResumeInterval(): void {
    this.#onInterval();
    this.#initializeIntervalIfNeeded();
    this.#timeoutId = undefined;
  }

  #isIntervalPaused(): boolean {
    const now = Date.now();

    if (this.#intervalId === undefined) {
      const delay = this.#intervalEnd - now;
      if (delay < 0) {
        // Act as the interval was done
        // We don't need to resume it here because it will be resumed on line 160
        this.#intervalCount = (this.#carryoverConcurrencyCount)
          ? this.#pendingCount
          : 0;
      } else {
        // Act as the interval is pending
        if (this.#timeoutId === undefined) {
          this.#timeoutId = setTimeout(
            () => {
              this.#onResumeInterval();
            },
            delay,
          );
        }

        return true;
      }
    }

    return false;
  }

  #tryToStartAnother(): boolean {
    if (this.#queue.size === 0) {
      // We can clear the interval ("pause")
      // Because we can redo it later ("resume")
      if (this.#intervalId) {
        clearInterval(this.#intervalId);
      }

      this.#intervalId = undefined;

      this.#resolvePromises();

      return false;
    }

    if (!this.#isPaused) {
      const canInitializeInterval = !this.#isIntervalPaused();
      if (this.#doesIntervalAllowAnother && this.#doesConcurrentAllowAnother) {
        const job = this.#queue.dequeue();
        if (!job) return false;

        this.emit("active");
        job();

        if (canInitializeInterval) {
          this.#initializeIntervalIfNeeded();
        }

        return true;
      }
    }

    return false;
  }

  #initializeIntervalIfNeeded(): void {
    if (this.#isIntervalIgnored || this.#intervalId !== undefined) {
      return;
    }

    this.#intervalId = setInterval(
      () => {
        this.#onInterval();
      },
      this.#interval,
    );

    this.#intervalEnd = Date.now() + this.#interval;
  }

  #onInterval(): void {
    if (
      this.#intervalCount === 0 && this.#pendingCount === 0 && this.#intervalId
    ) {
      clearInterval(this.#intervalId);
      this.#intervalId = undefined;
    }

    this.#intervalCount = this.#carryoverConcurrencyCount
      ? this.#pendingCount
      : 0;
    this.#processQueue();
  }

  /**
   * Executes all queued functions until it reaches the limit.
   */
  #processQueue(): void {
    while (this.#tryToStartAnother()) {
      continue;
    }
  }

  get concurrency(): number {
    return this.#concurrency;
  }

  set concurrency(newConcurrency: number) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(
        `Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`,
      );
    }

    this.#concurrency = newConcurrency;

    this.#processQueue();
  }

  /**
   * Adds a sync or async task to the queue. Always returns a promise.
   */
  async add<TaskResultType>(
    fn: Task<TaskResultType>,
    options: Partial<EnqueueOptionsType> = {},
  ): Promise<TaskResultType> {
    return new Promise<TaskResultType>((resolve, reject) => {
      const run = async (): Promise<void> => {
        this.#pendingCount++;
        this.#intervalCount++;

        const timeout = options.timeout === undefined
          ? this.#timeout
          : options.timeout;
        try {
          if (options.signal?.aborted) {
            reject(createAbortError("The task was aborted."));
            return;
          }

          const operation = timeout === undefined
            ? fn({ signal: options.signal })
            : deadline(
              Promise.resolve(fn({ signal: options.signal })),
              +timeout,
            ).catch((error) => {
              if (
                options.throwOnTimeout === undefined
                  ? this.#throwOnTimeout
                  : options.throwOnTimeout
              ) {
                reject(error);
                throw error;
              }
              return undefined as never;
            });

          const result = await operation;
          resolve(result);
          this.emit("completed", result);
        } catch (error: unknown) {
          reject(error);
          this.emit("error", error);
        }

        this.#next();
      };

      this.#queue.enqueue(run, options);
      this.#tryToStartAnother();
      this.emit("add");
    });
  }

  /**
   * Same as `.add()`, but accepts an array of sync or async functions.
   *
   * @returns A promise that resolves when all functions are resolved.
   */
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<Task<TaskResultsType>>,
    options?: EnqueueOptionsType,
  ): Promise<TaskResultsType[]> {
    return Promise.all(functions.map((f) => this.add(f, options)));
  }

  /**
   * Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
   */
  start(): this {
    if (!this.#isPaused) {
      return this;
    }

    this.#isPaused = false;

    this.#processQueue();
    return this;
  }

  /**
   * Put queue execution on hold.
   */
  pause(): void {
    this.#isPaused = true;
  }

  /**
   * Clear the queue.
   */
  clear(): void {
    this.#queue = new this.#queueClass();
  }

  /**
   * Can be called multiple times. Useful if you for example add additional items at a later time
   *
   * @returns A promise that settles when the queue becomes empty.
   */
  async onEmpty(): Promise<void> {
    // Instantly resolve if the queue is empty
    if (this.#queue.size === 0) {
      return;
    }

    return new Promise<void>((resolve) => {
      const existingResolve = this.#resolveEmpty;
      this.#resolveEmpty = () => {
        existingResolve();
        resolve();
      };
    });
  }

  /**
   * @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
   *
   * If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
   *
   * Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
   */
  async onSizeLessThan(limit: number): Promise<void> {
    // Instantly resolve if the queue is empty.
    if (this.#queue.size < limit) {
      return;
    }

    return new Promise<void>((resolve) => {
      const listener = () => {
        if (this.#queue.size < limit) {
          this.removeEventListener("next", listener);
          resolve();
        }
      };

      this.on("next", listener);
    });
  }

  /**
   * The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet
   *
   * @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
   */
  async onIdle(): Promise<void> {
    // Instantly resolve if none pending and if nothing else is queued
    if (this.#pendingCount === 0 && this.#queue.size === 0) {
      return;
    }

    return new Promise<void>((resolve) => {
      const existingResolve = this.#resolveIdle;
      this.#resolveIdle = () => {
        existingResolve();
        resolve();
      };
    });
  }

  /**
   * Size of the queue, the number of queued items waiting to run.
   */
  get size(): number {
    return this.#queue.size;
  }

  /**
   * Size of the queue, filtered by the given options.
   *
   * For example, this can be used to find the number of items remaining in the queue with a specific priority level.
   */
  sizeBy(options: Readonly<Partial<EnqueueOptionsType>>): number {
    return this.#queue.filter(options).length;
  }

  /**
   * Number of running items (no longer in the queue).
   */
  get pending(): number {
    return this.#pendingCount;
  }

  /**
   * Whether the queue is currently paused.
   */
  get isPaused(): boolean {
    return this.#isPaused;
  }

  get timeout(): number | undefined {
    return this.#timeout;
  }

  /**
   * Set the timeout for future operations.
   */
  set timeout(milliseconds: number | undefined) {
    this.#timeout = milliseconds;
  }

  on(...args: Parameters<typeof this.addEventListener>) {
    return this.addEventListener(...args);
  }

  private emit<T>(type: string, detail?: T) {
    return this.dispatchEvent(
      detail === undefined
        ? new Event(type)
        : new CustomEvent<T>(type, { detail }),
    );
  }
}
