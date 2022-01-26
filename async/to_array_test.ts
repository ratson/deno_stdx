import { assertEquals, assertRejects } from "../deps_test.ts";
import { toArray } from "./to_array.ts";

async function* asyncGen(n = 4) {
  for (let i = 0; i < n; ++i) {
    yield i * 2;
  }
}
function* genPromises(n = 4) {
  for (let i = 0; i < n; ++i) {
    yield Promise.resolve(i * 2);
  }
}

Deno.test("Async-iterable inputs", async () => {
  assertEquals(await toArray(asyncGen()), [0, 2, 4, 6]);
});

Deno.test("Sync-iterable inputs", async () => {
  assertEquals(await toArray(genPromises()), [0, 2, 4, 6]);
});

Deno.test("Array inputs", async () => {
  assertEquals(await toArray([1]), [1]);
});

Deno.test("mapfn", async () => {
  assertEquals(
    await toArray(asyncGen(), (x) => Promise.resolve(x.toString())),
    [
      "0",
      "2",
      "4",
      "6",
    ],
  );
});

Deno.test("thisArg", async () => {
  class C {
    n = 2;

    divide(x: number) {
      return x / this.n;
    }
  }
  const c = new C();

  assertEquals(await toArray(asyncGen(), c.divide, c), [
    0,
    1,
    2,
    3,
  ]);

  c.n = 1;
  assertEquals(await toArray(asyncGen(), c.divide, c), [
    0,
    2,
    4,
    6,
  ]);

  await assertRejects(async () => {
    assertEquals(await toArray(asyncGen(), c.divide), [
      0,
      2,
      4,
      6,
    ]);
  });
});

Deno.test("badIterable", async () => {
  const err = new Error();
  const badIterable = {
    [Symbol.iterator]() {
      throw err;
    },
  };

  await assertRejects(() => toArray(badIterable));
});

Deno.test("genErrorAsync", async () => {
  const err = new Error();
  // deno-lint-ignore require-yield
  async function* genErrorAsync() {
    throw err;
  }

  await assertRejects(() => toArray(genErrorAsync()));
});

Deno.test("TypeError", async () => {
  // deno-lint-ignore no-explicit-any
  await assertRejects(() => toArray(null as any), TypeError);
  // deno-lint-ignore no-explicit-any
  await assertRejects(() => toArray([1], 1 as any), TypeError);
});
