import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "../deps_test.ts";
import { range } from "./range.ts";

Deno.test("range(stop)", () => {
  for (
    const [n, expected] of [
      [0, []],
      [1, [0]],
      [3, [0, 1, 2]],
      [-10, []],
    ] as const
  ) {
    assertEquals(Array.from(range(n)), expected);
  }

  for (const x of range(1)) {
    assertStrictEquals(x, 0);
  }
});

Deno.test("range(start, stop)", () => {
  for (
    const [start, stop, expected] of [
      [0, 0, []],
      [0, 1, [0]],
      [0, 3, [0, 1, 2]],
      [-1, 0, [-1]],
      [-3, -1, [-3, -2]],
    ] as const
  ) {
    assertEquals(Array.from(range(start, stop)), expected);
  }
});

Deno.test("start >= stop", () => {
  assertEquals(Array.from(range(1, 0, undefined)), []);
  assertEquals(Array.from(range(1, 1, undefined)), []);
});

Deno.test("step", () => {
  for (
    const [start, stop, step, expected] of [
      [0, 1, undefined, [0]],
      [0, 3, 2, [0, 2]],
      [0, 3, -1, []],
      [0, -3, -1, [0, -1, -2]],
    ] as const
  ) {
    assertEquals(Array.from(range(start, stop, step)), expected);
  }
});

Deno.test("step = 0", () => {
  const r = range(1, Infinity, 0);
  assertStrictEquals(r.next().value, 1);
  assertStrictEquals(r.next().value, 1);

  const s = range(-1, Infinity, 0);
  assertStrictEquals(s.next().value, -1);
  assertStrictEquals(s.next().value, -1);

  assertThrows(() => {
    range(0, 1, 0).next();
  });
});
