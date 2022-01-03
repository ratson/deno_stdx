import { assertEquals, assertStrictEquals } from "../deps_test.ts";
import { enumerate } from "./enumerate.ts";

Deno.test("enumerate", () => {
  for (const [i, v] of enumerate([1])) {
    assertStrictEquals(i, 0);
    assertStrictEquals(v, 1);
  }

  assertEquals(Array.from(enumerate(["a", "b"])), [[0, "a"], [1, "b"]]);
});
