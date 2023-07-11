import { assertEquals, assertMatch } from "../deps_test.ts";
import * as subprocess from "./subprocess.ts";

Deno.test("output() return stdout as string", async () => {
  const s = await subprocess.output([Deno.execPath(), "--version"]);
  assertMatch(s, /deno\ /);
});

Deno.test("pipeText() return piped text", async () => {
  const s = await subprocess.pipeText(["cat"], "testing");
  assertEquals(s, "testing");
});

Deno.test("json()", async () => {
  const o = await subprocess.json<{
    denoDir: string;
    modulesCache: string;
    typescriptCache: string;
    registryCache: string;
    originStorage: string;
  }>([Deno.execPath(), "info", "--json"]);

  assertEquals(Object.keys(o), [
    "denoDir",
    "modulesCache",
    "npmCache",
    "typescriptCache",
    "registryCache",
    "originStorage",
  ]);
});
