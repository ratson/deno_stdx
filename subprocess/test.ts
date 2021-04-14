import { assertEquals, assertMatch, assertThrowsAsync } from "../deps_test.ts";
import * as subprocess from "./mod.ts";

Deno.test("run() exit with 0", async () => {
  const r = await subprocess.run(["deno", "--version"], { stdout: "null" });
  assertEquals(r, { code: 0, success: true });
});

Deno.test("run() with pipeText", async () => {
  const s = await subprocess.run(["cat"], {
    pipeText: "testing",
    stdout: "piped",
  });
  assertEquals(s.stdout, "testing");

  const s2 = await subprocess.run(["cat"], {
    pipeText: "",
    stdout: "piped",
  });
  assertEquals(s2.stdout, "");

  await assertThrowsAsync(() =>
    // @ts-expect-error ignore
    subprocess.run(["cat"], {
      pipeText: "testing",
      stdin: "null",
    }), TypeError);
});

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
