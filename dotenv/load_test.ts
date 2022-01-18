import { assertStrictEquals, dataPath, withEnv } from "./deps_test.ts";

Deno.test("load", async () => {
  await withEnv(async () => {
    const cwd = Deno.cwd();
    Deno.chdir(dataPath.toString());

    assertStrictEquals(Deno.env.get("BASIC"), undefined);
    await import("./load.ts");
    assertStrictEquals(Deno.env.get("BASIC"), "basic");

    Deno.chdir(cwd);
  });
});
