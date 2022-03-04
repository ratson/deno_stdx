import { parse } from "./parse.ts";

interface Options {
  path: string;
  export: boolean;
}

export type ReadOptions = Partial<Options>;

/** @deprecated use `std/dotenv` instead */
export async function read(options?: ReadOptions) {
  const opts: Options = { path: ".env", export: false, ...options };

  const parsed = parse(await Deno.readTextFile(opts.path));

  if (opts.export) {
    for (const [k, v] of Object.entries(parsed)) {
      Deno.env.set(k, v);
    }
  }

  return parsed;
}
