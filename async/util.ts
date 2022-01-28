import { deadline } from "https://deno.land/std@0.122.0/async/deadline.ts";
import { delay } from "https://deno.land/std@0.122.0/async/delay.ts";
import type { PromiseOr } from "../typing/promise.ts";
import { creatAbortError } from "./retry.ts";

type Options = {
  retryDelay?: number;
  timeout?: number;
  signal?: AbortSignal;
};

export async function waitUntil<T>(
  fn: () => PromiseOr<T>,
  options?: Options,
): Promise<T> {
  const { retryDelay, signal, timeout } = { retryDelay: 10, ...options };

  const f = async () => {
    while (true) {
      if (signal?.aborted) throw creatAbortError("Wait was aborted.");

      const reuslt = await fn();
      if (reuslt) return reuslt;

      if (retryDelay > 0) await delay(retryDelay, { signal });
    }
  };

  return await (timeout === undefined ? f() : deadline(f(), timeout));
}
