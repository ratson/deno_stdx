import { assertStrictEquals } from "../deps_test.ts";
import { isCI } from "./ci.ts";

Deno.test("isCI", () => {
  Deno.env.set("CI", "1");
  assertStrictEquals(isCI(), true);

  Deno.env.set("CI", "");
  assertStrictEquals(isCI(), true);
});
