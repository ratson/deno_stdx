import {
  assertArrayIncludes,
  assertStrictEquals,
  assertThrows,
} from "../deps_test.ts";
import { sample } from "./sample.ts";

Deno.test("sample", () => {
  assertArrayIncludes(Array.from(sample([1, 2, 3], 3)), [1, 2, 3]);

  let i = 1024;
  while (i-- > 0) {
    const s = new Set(sample([1, 2, 3], 2));
    assertStrictEquals(s.size, 2);
  }
});

Deno.test("n > input.lenght", () => {
  assertArrayIncludes(Array.from(sample([1, 2, 3], 4)), [1, 2, 3]);
});

Deno.test("n <= 0", () => {
  assertArrayIncludes(Array.from(sample([1, 2, 3], 0)), []);
  assertArrayIncludes(Array.from(sample([1, 2, 3], -1)), []);
});

Deno.test("n is not an integer", () => {
  assertThrows(() => {
    Array.from(sample([], 1.1));
  });
});
