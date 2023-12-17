import { assertStrictEquals } from "../deps_test.ts";
import { once } from "./once.ts";

Deno.test("call once", () => {
  let c = 0;
  const f = once(() => ++c);
  assertStrictEquals(f(), 1);
  assertStrictEquals(f(), 1);
  assertStrictEquals(f(), 1);
});
