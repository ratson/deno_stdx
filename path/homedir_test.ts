import { exists } from "https://deno.land/std@0.91.0/fs/mod.ts";
import { assert } from "https://deno.land/std@0.91.0/testing/asserts.ts";
import { homedir } from "./homedir.ts";

Deno.test("homedir() exists", async () => {
  const p = homedir();
  assert(p);
  assert(await exists(p));
});
