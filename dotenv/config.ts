import { parse } from "./parse.ts";

interface Options {
  path: string;
  export: boolean;
}

export type ConfigOptions = Partial<Options>;

export async function config(options?: ConfigOptions) {
  const opts: Options = { path: ".env", export: false, ...options };

  const parsed = parse(await Deno.readTextFile(opts.path));

  if (opts.export) {
    for (const [k, v] of Object.entries(parsed)) {
      Deno.env.set(k, v);
    }
  }

  return parsed;
}
