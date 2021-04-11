import { exists } from "https://deno.land/std@0.92.0/fs/exists.ts";
import { assert } from "https://deno.land/std@0.92.0/testing/asserts.ts";
import { userCacheDir, userHomeDir } from "./mod.ts";

Deno.test("userCacheDir() exists", async () => {
  const p = userCacheDir();
  assert(p);
  assert(await exists(p));
});

Deno.test("userHomeDir() exists", async () => {
  const p = userHomeDir();
  assert(p);
  assert(await exists(p));
});
