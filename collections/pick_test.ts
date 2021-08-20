import { assertEquals } from "../deps_test.ts";
import { pick } from "./pick.ts";

Deno.test("pick", () => {
  const obj = { "a": 1, "b": 2, "c": 3, "d": 4 } as const;

  const tests = [
    [[], {}],
    [["a", "c", "d"], { "a": 1, "c": 3, "d": 4 }],
    [["e"], {}],
    [["a", "e"], { "a": 1 }],
  ] as const;

  tests.forEach(([keys, expected]) => {
    assertEquals(pick(obj, keys), expected);
  });
});
