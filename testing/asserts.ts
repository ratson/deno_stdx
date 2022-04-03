// deno-lint-ignore-file no-explicit-any
import {
  _format,
  assert,
  AssertionError,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";

export function assertGreater(actual: any, expected: any, msg?: string) {
  if (actual > expected) return;

  const actualString = _format(actual);
  const expectedString = _format(expected);
  throw new AssertionError(msg ?? `Expect ${actualString} > ${expectedString}`);
}

export function assertGreaterOrEqual(actual: any, expected: any, msg?: string) {
  if (actual >= expected) return;

  const actualString = _format(actual);
  const expectedString = _format(expected);
  throw new AssertionError(
    msg ?? `Expect ${actualString} >= ${expectedString}`,
  );
}

export function assertLess(actual: any, expected: any, msg?: string) {
  if (actual < expected) return;

  const actualString = _format(actual);
  const expectedString = _format(expected);
  throw new AssertionError(msg ?? `Expect ${actualString} < ${expectedString}`);
}

export function assertLessOrEqual(actual: any, expected: any, msg?: string) {
  if (actual <= expected) return;

  const actualString = _format(actual);
  const expectedString = _format(expected);
  throw new AssertionError(
    msg ?? `Expect ${actualString} <= ${expectedString}`,
  );
}

export function assertFail(msg = "Failed") {
  assert(false, msg);
}

export function assertType<T>(_: T) {
  // noop
}
