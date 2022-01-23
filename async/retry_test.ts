import {
  assertEquals,
  assertRejects,
  assertStrictEquals,
} from "../deps_test.ts";
import { retry, TooManyAttemptsError } from "./retry.ts";

Deno.test("return value", async () => {
  const attempts: number[] = [];

  assertStrictEquals(
    await retry((x) => {
      attempts.push(x);
      return 1;
    }),
    1,
  );

  assertEquals(attempts, [0]);
});

Deno.test("default retry once", async () => {
  const results: number[] = [];

  await assertRejects(async () => {
    await retry((x) => {
      results.push(x);
      throw new Error();
    });
  }, TooManyAttemptsError);

  assertEquals(results, [0, 1]);
});

Deno.test("options.maxAttempts", async () => {
  const results: number[] = [];

  await assertRejects(async () => {
    await retry((x) => {
      results.push(x);
      throw new Error();
    }, { maxAttempts: 3 });
  }, TooManyAttemptsError);

  assertEquals(results, [0, 1, 2, 3]);
});

Deno.test("options.onError", async () => {
  const results: number[] = [];
  const errors: [Error, number][] = [];
  const error = new Error();

  await assertRejects(async () => {
    await retry((x) => {
      results.push(x);
      throw error;
    }, {
      onError(err, i) {
        errors.push([err, i]);
      },
    });
  }, TooManyAttemptsError);

  for (const x of errors) {
    assertStrictEquals(x[0], error);
  }
  assertStrictEquals(errors[0][1], 0);
  assertStrictEquals(errors[1][1], 1);
  assertEquals(results, [0, 1]);
});
