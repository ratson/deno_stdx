// deno-lint-ignore-file no-explicit-any
import {
  assert,
  AssertionError,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { format } from "https://deno.land/std@0.192.0/testing/_format.ts";

export function assertGreater(actual: any, expected: any, msg?: string) {
  if (actual > expected) return;

  const actualString = format(actual);
  const expectedString = format(expected);
  throw new AssertionError(msg ?? `Expect ${actualString} > ${expectedString}`);
}

export function assertGreaterOrEqual(actual: any, expected: any, msg?: string) {
  if (actual >= expected) return;

  const actualString = format(actual);
  const expectedString = format(expected);
  throw new AssertionError(
    msg ?? `Expect ${actualString} >= ${expectedString}`,
  );
}

export function assertLess(actual: any, expected: any, msg?: string) {
  if (actual < expected) return;

  const actualString = format(actual);
  const expectedString = format(expected);
  throw new AssertionError(msg ?? `Expect ${actualString} < ${expectedString}`);
}

export function assertLessOrEqual(actual: any, expected: any, msg?: string) {
  if (actual <= expected) return;

  const actualString = format(actual);
  const expectedString = format(expected);
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
