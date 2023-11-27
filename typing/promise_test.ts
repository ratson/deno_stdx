import { assertType, IsExact } from "../deps_test.ts";
import type { PromiseResolve } from "./promise.ts";

Deno.test("PromiseResolve", async () => {
  await new Promise<void>((resolve) => {
    assertType<IsExact<typeof resolve, PromiseResolve>>(true);
    resolve();
  });

  await new Promise<number>((resolve) => {
    assertType<IsExact<typeof resolve, PromiseResolve<number>>>(true);
    resolve(1);
  });
});
