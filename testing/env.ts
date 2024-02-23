import { withoutAll } from "https://deno.land/std@0.217.0/collections/without_all.ts";

export async function withEnv<T>(f: (env: typeof Deno.env) => T) {
  const snapshot = Deno.env.toObject();
  try {
    return await f(Deno.env);
  } finally {
    const deletedKeys = withoutAll(
      Object.keys(Deno.env.toObject()),
      Object.keys(snapshot),
    );
    for (const k of deletedKeys) {
      Deno.env.delete(k);
    }

    for (const [k, v] of Object.entries(snapshot)) {
      Deno.env.set(k, v);
    }
  }
}
