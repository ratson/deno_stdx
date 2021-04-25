import { exists } from "https://deno.land/std@0.95.0/fs/exists.ts";
import { assert } from "../deps_test.ts";
import { userCacheDir, userConfigDir, userHomeDir } from "./mod.ts";

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
