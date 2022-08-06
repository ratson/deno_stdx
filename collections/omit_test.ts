import { assertEquals } from "../deps_test.ts";
import { omit } from "./omit.ts";

Deno.test("omit", () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 } as const;

  const tests = [
    [[], obj],
    [["a", "c", "d"], { b: 2 }],
    [["e"], obj],
    [["a", "e"], { b: 2, c: 3, d: 4 }],
  ] as const;

  tests.forEach(([keys, expected]) => {
    assertEquals(omit(obj, keys), expected as never);
  });
});
