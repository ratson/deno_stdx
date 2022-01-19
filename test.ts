import { assertLessOrEqual, unreachable } from "./deps_test.ts";
import { output } from "./subprocess/mod.ts";

Deno.test("deps", async () => {
  const s = await output([Deno.execPath(), "info", "index.ts"]);
  const m = s.match(/ (\d+) unique/);
  if (!m) unreachable();
  assertLessOrEqual(m[1], 80);
});
