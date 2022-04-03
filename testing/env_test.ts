import { assertStrictEquals } from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { withEnv } from "./env.ts";

Deno.test("withEnv", async () => {
  const k = crypto.randomUUID();
  const v = "1";
  const v2 = "2";

  assertStrictEquals(Deno.env.get(k), undefined);

  await withEnv((env) => {
    assertStrictEquals(env.get(k), undefined);

    env.set(k, v);
    assertStrictEquals(env.get(k), v);

    Deno.env.set(k, v2);
    assertStrictEquals(env.get(k), v2);
  });

  assertStrictEquals(Deno.env.get(k), undefined);
});
