import { deadline } from "https://deno.land/std@0.178.0/async/deadline.ts";
import { delay } from "https://deno.land/std@0.178.0/async/delay.ts";
import type { PromiseOr } from "../typing/promise.ts";
import { createAbortError } from "./util.ts";

type Options = {
  retryDelay?: number;
  timeout?: number;
  signal?: AbortSignal;
};

/** @deprecated use `std/async/retry.ts` instead */
export async function waitUntil<T>(
  fn: () => PromiseOr<T>,
  options?: Options,
): Promise<T> {
  const { retryDelay, signal, timeout } = { retryDelay: 10, ...options };

  const f = async () => {
    while (true) {
      if (signal?.aborted) throw createAbortError("Wait was aborted.");

      const result = await fn();
      if (result) return result;

      if (retryDelay > 0) await delay(retryDelay, { signal });
    }
  };

  return await (timeout === undefined ? f() : deadline(f(), timeout));
}
