import {
  assertEquals,
  assertLess,
  assertRejects,
  assertStrictEquals,
  delay,
  isCI,
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

Deno.test("options.delay", async () => {
  const start = performance.now();

  await assertRejects(async () => {
    await retry(() => {
      throw new Error();
    }, { maxAttempts: 3, delay: 200 });
  }, TooManyAttemptsError);

  assertLess(
    performance.now() - start,
    800 + (isCI() && Deno.build.os === "darwin" ? 250 : 0),
  );
});

Deno.test("options.signal - abort retry", async () => {
  const abort = new AbortController();
  const { signal } = abort;
  setTimeout(() => abort.abort(), 0);

  await assertRejects(
    async () => {
      await retry(async () => {
        await delay(10);
        throw new Error();
      }, { signal });
    },
    DOMException,
    "Retry was aborted",
  );
});

Deno.test("options.signal - abort during delay", async () => {
  const abort = new AbortController();
  const { signal } = abort;
  setTimeout(() => abort.abort(), 0);

  await assertRejects(
    async () => {
      await retry(() => {
        throw new Error();
      }, { signal, delay: 100 });
    },
    DOMException,
    "Delay was aborted",
  );
});

Deno.test("options.signal - abort in fn", async () => {
  const abort = new AbortController();
  const { signal } = abort;

  await assertRejects(
    async () => {
      await retry(() => {
        abort.abort();
        throw new Error();
      }, { signal });
    },
    DOMException,
    "Retry was aborted",
  );
});
