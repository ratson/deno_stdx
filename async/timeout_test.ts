import {
  assertStrictEquals,
  assertThrows,
  assertThrowsAsync,
} from "https://deno.land/std@0.92.0/testing/asserts.ts";
import { delay, timeout, TimeoutError } from "./timeout.ts";

const fixture = Symbol("fixture");
const fixtureError = new Error("fixture");

Deno.test("resolves before timeout", async () => {
  assertStrictEquals(
    await timeout(100, { promise: delay(10).then(() => fixture) }),
    fixture,
  );
});

Deno.test("throws when milliseconds is negative number", async () => {
  let promise = Promise.resolve();

  assertThrows(
    () => {
      promise = delay(10);
      return timeout(-1, { promise });
    },
    TypeError,
  );

  await promise;
});

Deno.test("handles milliseconds being `Infinity`", async () => {
  assertStrictEquals(
    await timeout(Number.POSITIVE_INFINITY, {
      promise: delay(10).then(() => fixture),
    }),
    fixture,
  );
});

Deno.test("rejects after timeout", async () => {
  await assertThrowsAsync(
    () => timeout(1),
    TimeoutError,
  );

  let promise = Promise.resolve();

  await assertThrowsAsync(
    () => {
      promise = delay(100);
      return timeout(1, { promise });
    },
    TimeoutError,
  );
  await promise;

  await assertThrowsAsync(
    () => {
      promise = delay(100);
      return Promise.all([timeout(1), promise]);
    },
    TimeoutError,
  );
  await promise;
});

Deno.test("rejects before timeout if specified promise rejects", async () => {
  await assertThrowsAsync(
    () =>
      timeout(100, {
        promise: delay(10).then(() => Promise.reject(fixtureError)),
      }),
    undefined,
    undefined,
    fixtureError.message,
  );
});

Deno.test("custom timeoutHandler", async () => {
  assertStrictEquals(
    await timeout(10, { timeoutHandler: () => "overtime" }),
    "overtime",
  );

  let promise = delay(100);
  assertStrictEquals(
    await timeout(
      10,
      { promise, timeoutHandler: () => "overtime" },
    ),
    "overtime",
  );
  await promise;

  promise = delay(100);
  assertStrictEquals(
    await timeout(
      10,
      { promise, timeoutHandler: () => Promise.resolve("overtime") },
    ),
    "overtime",
  );
  await promise;

  promise = delay(100);
  await assertThrowsAsync(
    () =>
      timeout(
        10,
        {
          promise,
          timeoutHandler: () => {
            throw fixtureError;
          },
        },
      ),
    undefined,
    undefined,
    fixtureError.message,
  );
  await promise;
});

Deno.test("clear()", async () => {
  const promise = timeout(200, { promise: delay(300).then(() => "done") });
  promise.clear();
  assertStrictEquals(await promise, "done");
});
