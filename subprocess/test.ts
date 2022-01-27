import { assertEquals, assertMatch } from "../deps_test.ts";
import * as subprocess from "./mod.ts";

Deno.test("output() return stdout as string", async () => {
  const s = await subprocess.output(["deno", "--version"]);
  assertMatch(s, /deno\ /);
});

Deno.test("stderrOutput() return stderr as string", async () => {
  const s = await subprocess.stderrOutput(["deno", "--version"]);
  assertEquals(s, "");
});

Deno.test("pipeText() return piped text", async () => {
  const s = await subprocess.pipeText(["cat"], "testing");
  assertEquals(s, "testing");
});
