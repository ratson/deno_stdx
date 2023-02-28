import { assert } from "../deps_test.ts";
import { isRunning } from "./is_running.ts";

Deno.test("isRunning", () => {
  assert(isRunning(Deno.pid));
});
