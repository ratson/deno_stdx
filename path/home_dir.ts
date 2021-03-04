import { join } from "https://deno.land/std@0.89.0/path/mod.ts";

export const homeDir = (...args: string[]) => {
  const homePath = Deno.env.get("HOME")!;
  return join(homePath, ...args);
};
