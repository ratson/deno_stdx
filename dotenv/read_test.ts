import { assertStrictEquals, dataPath, withEnv } from "./deps_test.ts";
import { read } from "./read.ts";

Deno.test("options.path", async () => {
  const o = await read({ path: dataPath.joinpath(".env").toString() });

  assertStrictEquals(Object.keys(o).length, 26);
  assertStrictEquals(o.BASIC, "basic");

  assertStrictEquals(Deno.env.get("BASIC"), undefined);
});

Deno.test("options.export = true", async () => {
  await withEnv(async () => {
    assertStrictEquals(Deno.env.get("BASIC"), undefined);

    const o = await read({
      path: dataPath.joinpath(".env").toString(),
      export: true,
    });

    assertStrictEquals(Object.keys(o).length, 26);
    assertStrictEquals(o.BASIC, "basic");

    assertStrictEquals(Deno.env.get("BASIC"), "basic");
  });
});
