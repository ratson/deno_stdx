import { assertStrictEquals } from "../deps_test.ts";
import { isCI } from "./ci.ts";
import { withEnv } from "./env.ts";

Deno.test("isCI", () => {
  withEnv((env) => {
    env.set("CI", "1");
    assertStrictEquals(isCI(), true);

    env.delete("CI");
    assertStrictEquals(isCI(), true);
  });
});
