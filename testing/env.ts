import { withoutAll } from "https://deno.land/std@0.134.0/collections/without_all.ts";
import { PromiseOr } from "../typing/promise.ts";

export async function withEnv(f: (env: typeof Deno.env) => PromiseOr<void>) {
  const snapshot = Deno.env.toObject();
  try {
    await f(Deno.env);
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
