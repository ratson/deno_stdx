import { exists } from "https://deno.land/std@0.219.1/fs/exists.ts";
import { assert, assertStrictEquals } from "../deps_test.ts";
import { withEnv } from "../testing/env.ts";
import { denoDir, userCacheDir, userConfigDir, userHomeDir } from "./mod.ts";
import { json } from "./subprocess.ts";

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

const denoInfo = () =>
  json<{ denoDir: string }>([Deno.execPath(), "info", "--json"]);

Deno.test("denoDir()", async () => {
  const p = denoDir();
  const o = await denoInfo();

  assertStrictEquals(p, o.denoDir);
});

Deno.test("denoDir() - DENO_DIR env", async () => {
  const expected = await Deno.makeTempDir();
  await withEnv(async (env) => {
    env.set("DENO_DIR", expected);

    const o = await denoInfo();
    assertStrictEquals(o.denoDir, expected);

    const p = denoDir();
    assertStrictEquals(p, expected);
  });
});
