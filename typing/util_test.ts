import { assertType, IsExact } from "../deps_test.ts";
import type { ValueOf } from "./mod.ts";

Deno.test("ValueOf", () => {
  type R = Record<string, number>;
  const r: R = { v: 1 };
  assertType<IsExact<typeof r.v, ValueOf<R>>>(true);
});
