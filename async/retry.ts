import { delay } from "https://deno.land/std@0.134.0/async/delay.ts";
import type { PromiseOr } from "../typing/promise.ts";
import { createAbortError } from "./util.ts";

export class TooManyAttemptsError extends Error {
  constructor(options?: ErrorOptions) {
    super("too many retry attempts", options);
  }
}

type Options = {
  maxAttempts: number;
  onError: (error: Error, attemptCount: number) => void;
  delay?: number;
  signal?: AbortSignal;
};

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
    if (signal?.aborted) throw createAbortError("Retry was aborted.");

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
