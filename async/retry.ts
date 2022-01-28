import { delay } from "https://deno.land/std@0.122.0/async/delay.ts";
import type { PromiseOr } from "../typing/promise.ts";

export class TooManyAttemptsError extends Error {
  constructor(init?: ErrorInit | undefined) {
    super("too many retry attempts", init);
  }
}

type Options = {
  maxAttempts: number;
  onError: (error: Error, attemptCount: number) => void;
  delay?: number;
  signal?: AbortSignal;
};

export function creatAbortError(msg: string) {
  return new DOMException(msg, "AbortError");
}

export type RetryOptions = Partial<Options>;

export async function retry<T>(
  fn: (attemptCount: number) => PromiseOr<T>,
  options?: RetryOptions,
): Promise<T> {
  const opts: Options = {
    maxAttempts: 1,
    onError(_error, _attemptCount) {},
    ...options,
  };
  const { signal } = opts;

  let cause: Error | undefined;
  for (let i = 0; i <= opts.maxAttempts; ++i) {
    if (signal?.aborted) throw creatAbortError("Retry was aborted.");

    try {
      return await fn(i);
    } catch (err) {
      opts.onError(err, i);
      cause = err;
    }

    if (opts.delay && i < opts.maxAttempts) {
      await delay(opts.delay, { signal });
    }
  }

  throw new TooManyAttemptsError({ cause });
}
