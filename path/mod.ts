import { join } from "https://deno.land/std@0.91.0/path/mod.ts";
import { homedir } from "./homedir.ts";

export { homedir };

export const homePath = homedir();

export const homeDir = (...args: string[]) => {
  return join(homePath!, ...args);
};
