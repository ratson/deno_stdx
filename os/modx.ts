import { join } from "https://deno.land/std@0.115.1/path/mod.ts";
import { assert } from "https://deno.land/std@0.115.1/testing/asserts.ts";
import { userHomeDir } from "./mod.ts";

const homePath = userHomeDir();

/**
 * @deprecated - use `Path` in `stdx/path` instead.
 *
 * Join `paths` to user home directory.
 * 
 * @param paths to be joined
 */
export function homeDir(...paths: string[]): string {
  assert(homePath, "User home directory is not defined");
  return join(homePath, ...paths);
}
