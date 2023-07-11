import { assert } from "../deps_test.ts";
import { isRunning, isRunningSync } from "./is_running.ts";

Deno.test("isRunning", async () => {
  assert(await isRunning(Deno.pid));
});

Deno.test("isRunningSync", () => {
  assert(isRunningSync(Deno.pid));
});
