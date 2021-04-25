import { join } from "https://deno.land/std@0.95.0/path/mod.ts";
import { assert } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { userHomeDir } from "./mod.ts";

const homePath = userHomeDir();

/**
 * Join `paths` to user home directory.
 * 
 * @param paths to be joined
 */
export function homeDir(...paths: string[]): string {
  assert(homePath, "User home directory is not defined");
  return join(homePath, ...paths);
}
