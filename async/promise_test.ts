import { assertEquals, delay } from "../deps_test.ts";
import { map } from "./promise.ts";

Deno.test("map", async () => {
  assertEquals(
    await map([10, 20, 30], async (i) => {
      await delay(i);
      return i;
    }),
    [10, 20, 30],
  );
});

Deno.test("concurrency: 1", async () => {
  assertEquals(
    await map([10, 20, 30], async (i) => {
      await delay(i);
      return i;
    }, { concurrency: 1 }),
    [10, 20, 30],
  );
});
