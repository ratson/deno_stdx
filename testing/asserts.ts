import { assert } from "https://deno.land/std@0.208.0/assert/mod.ts";

/**
 * @deprecated Use `fail()` from `assert/fail` instead.
 */
export function assertFail(msg = "Failed") {
  assert(false, msg);
}

export function assertType<T>(_: T) {
  // noop
}
