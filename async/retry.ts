import type { PromiseOr } from "../typing/promise.ts";

export class TooManyAttemptsError extends Error {
  constructor(init?: ErrorInit | undefined) {
    super("too many retry attempts", init);
  }
}

type Options = {
  maxAttempts: number;
  onError: (error: Error, attemptCount: number) => void;
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

  let cause: Error | undefined;
  for (let i = 0; i <= opts.maxAttempts; ++i) {
    try {
      return await fn(i);
    } catch (err) {
      opts.onError(err, i);
      cause = err;
    }
  }

  throw new TooManyAttemptsError({ cause });
}
