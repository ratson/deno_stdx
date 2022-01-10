import { AssertionError, assertThrows } from "../deps_test.ts";
import {
  assertGreater,
  assertGreaterOrEqual,
  assertLess,
  assertLessOrEqual,
} from "./asserts.ts";

Deno.test("assertGreater", () => {
  assertGreater(2, 1);
  assertGreater(2n, 1n);
  assertGreater(1.1, 1);

  assertThrows(() => {
    assertGreater(1, 2);
  }, AssertionError);
});

Deno.test("assertGreaterOrEqual", () => {
  assertGreaterOrEqual(2, 1);
  assertGreaterOrEqual(1n, 1n);

  assertThrows(() => {
    assertGreaterOrEqual(1, 2);
  }, AssertionError);
});

Deno.test("assertLess", () => {
  assertLess(1, 2);
  assertLess(1n, 2n);
  assertLess(1, 1.1);

  assertThrows(() => {
    assertLess(2, 1);
  }, AssertionError);
});

Deno.test("assertLessOrEqual", () => {
  assertLessOrEqual(1, 2);
  assertLessOrEqual(1n, 1n);

  assertThrows(() => {
    assertLessOrEqual(2, 1);
  }, AssertionError);
});
