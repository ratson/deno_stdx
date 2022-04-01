import { assertType } from "../deps_test.ts";
import type { PromiseResolve } from "./promise.ts";

Deno.test("PromiseResolve", async () => {
  await new Promise<void>((resolve) => {
    assertType<PromiseResolve>(resolve);
    resolve();
  });

  await new Promise<number>((resolve) => {
    assertType<PromiseResolve<number>>(resolve);
    resolve(1);
  });
});
