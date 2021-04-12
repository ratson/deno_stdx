import {
  assert,
  assertStrictEquals,
} from "https://deno.land/std@0.92.0/testing/asserts.ts";
import { randomInt } from "./rand.ts";

Deno.test("randomInt()", () => {
  assertStrictEquals(Number.isInteger(randomInt(0, 10)), true);
  assertStrictEquals(randomInt(0, 0), 0);
  assertStrictEquals(randomInt(-0.9, 0.9), 0);
  assertStrictEquals(randomInt(1, 0), 1);

  let n = 100;
  while (n--) {
    const x = randomInt(0, 10);
    assert(x >= 0);
    assert(x <= 10);
  }
});
