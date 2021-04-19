import { assert, assertEquals, assertStrictEquals } from "../deps_test.ts";
import { debounce } from "./debounce.ts";
import { delay } from "./timeout.ts";

const fixture = Symbol("fixture");

Deno.test("resolve value", async () => {
  const debounced = debounce((x) => x, 32);
  assertStrictEquals(await debounced(fixture), fixture);
});

Deno.test("debounce calls", async () => {
  let counter = 0;

  const debounced = debounce(async (x) => {
    counter++;
    await delay(32);
    return x;
  }, 32);

  const startTime = Date.now();
  const results = await Promise.all(
    [1, 2, 3].map((x) => debounced(x)),
  );
  const elapsed = Date.now() - startTime;

  assertEquals(results, [3, 3, 3]);
  assertStrictEquals(counter, 1);
  assert(elapsed >= 64);
  assert(elapsed < 96);

  await delay(32);
  assertStrictEquals(await debounced(5), 5);
});

Deno.test("debounce 0", async () => {
  let counter = 0;

  const debounced = debounce(() => {
    counter++;
  }, 0);

  const p = Promise.all([debounced(), debounced(), debounced()]);
  assertStrictEquals(counter, 0);

  await p;
  assertStrictEquals(counter, 1);
});

Deno.test("`leading` option", async () => {
  let counter = 0;

  var debounced = debounce(
    () => {
      counter++;
    },
    32,
    { leading: true },
  );

  const p = debounced();
  assertStrictEquals(counter, 1);

  await p;
  assertStrictEquals(counter, 1);

  debounced.clear();
});
