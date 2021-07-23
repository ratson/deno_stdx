export interface DelayPromise<T> extends Promise<T> {
  clear(): void;
}

export function delay(ms: number): DelayPromise<void> {
  let timer: number;

  const delayPromise = new Promise<void>((resolve) => {
    timer = setTimeout(() => {
      resolve();
    }, ms);
  }) as DelayPromise<void>;

  delayPromise.clear = function () {
    clearTimeout(timer);
  };

  return delayPromise;
}

export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export function defaultTimeoutHandler<T>(): T {
  throw new TimeoutError();
}

export type TimeoutOptions<T, H> = {
  promise?: Promise<T>;
  timeoutHandler?: (
    opts: { promise?: Promise<T>; milliseconds: number },
  ) => H | PromiseLike<H>;
};

export interface TimeoutPromise<T> extends Promise<T> {
  clear(): Promise<void>;
}

/** @deprecated - use `std/async/deadline` instead. */
export function timeout<T, H = undefined>(
  milliseconds: number,
  opts?: TimeoutOptions<T, H>,
) {
  if (milliseconds < 0) {
    throw new TypeError("Expect `milliseconds` to be a positive number");
  }

  const promise = opts?.promise;
  const timeoutHandler = opts?.timeoutHandler ?? defaultTimeoutHandler;

  const delayPromise = delay(milliseconds);

  const promises: Promise<T | H>[] = promise ? [promise] : [];

  if (milliseconds !== Infinity) {
    promises.push(
      delayPromise.then(() => timeoutHandler({ milliseconds, promise })),
    );
  }

  const resultPromise = Promise.race(promises).finally(() => {
    delayPromise.clear();
  }) as TimeoutPromise<T | H>;

  resultPromise.clear = async function () {
    delayPromise.clear();
    if (promise) await promise;
  };

  return resultPromise;
}
