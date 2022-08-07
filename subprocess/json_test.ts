import { assertEquals } from "../deps_test.ts";
import { json } from "./json.ts";

Deno.test("json", async () => {
  const o = await json<{
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
