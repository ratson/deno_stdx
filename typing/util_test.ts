import { assertType } from "../deps_test.ts";
import type { ValueOf } from "./mod.ts";

Deno.test("ValueOf", () => {
  type R = Record<string, number>;
  const r: R = { v: 1 };
  assertType<ValueOf<R>>(r.v);
});
