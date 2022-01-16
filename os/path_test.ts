import { exists } from "https://deno.land/std@0.121.0/fs/exists.ts";
import { assert, assertStrictEquals } from "../deps_test.ts";
import { output } from "../subprocess/mod.ts";
import { withEnv } from "../testing/env.ts";
import { denoDir, userCacheDir, userConfigDir, userHomeDir } from "./mod.ts";

Deno.test("userCacheDir() exists", async () => {
  const p = userCacheDir();
  assert(p);
  assert(await exists(p));
});

Deno.test("userConfigDir() exists", async () => {
  const p = userConfigDir();
  assert(p);
  assert(await exists(p));
});

Deno.test("userHomeDir() exists", async () => {
  const p = userHomeDir();
  assert(p);
  assert(await exists(p));
});

Deno.test("denoDir()", async () => {
  const p = denoDir();
  const o = JSON.parse(await output(["deno", "info", "--json"]));

  assertStrictEquals(p, o.denoDir);
});

Deno.test("denoDir() - DENO_DIR env", async () => {
  const expected = `/tmp/${crypto.randomUUID()}`;
  await withEnv(async (env) => {
    env.set("DENO_DIR", expected);

    const o = JSON.parse(await output(["deno", "info", "--json"]));
    assertStrictEquals(o.denoDir, expected);

    const p = denoDir();
    assertStrictEquals(p, expected);
  });
});
