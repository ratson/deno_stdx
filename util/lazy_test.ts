import { assertStrictEquals } from "../deps_test.ts";
import { lazy } from "./lazy.ts";

Deno.test("call once", () => {
  let c = 0;
  const f = lazy(() => ++c);
  assertStrictEquals(f(), 1);
  assertStrictEquals(f(), 1);
  assertStrictEquals(f(), 1);
});
