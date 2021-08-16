import { assertEquals } from "../deps_test.ts";
import { pick } from "./pick.ts";

Deno.test("pick", () => {
  const obj = { "a": 1, "b": 2, "c": 3, "d": 4 };

  const tests = [
    [[], {}],
    [["a", "c", "d"], { "a": 1, "c": 3, "d": 4 }],
    [["e"], {}],
    [["a", "e"], { "a": 1 }],
  ];

  tests.forEach(([keys, expected]) => {
    assertEquals(pick(obj, keys as string[]), expected);
  });
});
