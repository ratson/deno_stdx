import { assert } from "https://deno.land/std@0.218.2/assert/mod.ts";

/**
 * @deprecated Use `fail()` from `assert/fail` instead.
 */
export function assertFail(msg = "Failed") {
  assert(false, msg);
}

/**
 * @deprecated Use `assertType()` from `testing/types` instead.
 */
export function assertType<T>(_: T) {
  // noop
}
