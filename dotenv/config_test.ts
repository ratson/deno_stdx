import { assertStrictEquals, dataPath, withEnv } from "./deps_test.ts";

Deno.test("update env", async () => {
  await withEnv(async () => {
    const cwd = Deno.cwd();
    Deno.chdir(dataPath.toString());

    assertStrictEquals(Deno.env.get("BASIC"), undefined);
    await import("./config.ts");
    assertStrictEquals(Deno.env.get("BASIC"), "basic");

    Deno.chdir(cwd);
  });
});
