import { assertEquals, assertGreater, assertRejects } from "../deps_test.ts";
import { CalledProcessError, run } from "./run.ts";

Deno.test("exit with 0", async () => {
  const r = await run([Deno.execPath(), "--version"], { stdout: "null" });
  assertEquals(r.code, 0);
  assertEquals(r.success, true);
  assertGreater(r.pid, 0);

  await assertRejects(
    // deno-lint-ignore require-await
    async () => r.stdout,
    TypeError,
  );
});

Deno.test("options.check", async () => {
  await assertRejects(
    () => run(["deno", "404"], { check: true, stderr: "null" }),
    CalledProcessError,
  );
});

Deno.test("options.input", async () => {
  const s = await run(["cat"], { input: "testing", stdout: "piped" });
  assertEquals(s.stdoutText, "testing");

  const s2 = await run(["cat"], { input: "", stdout: "piped" });
  assertEquals(s2.stdoutText, "");

  await assertRejects(
    () =>
      run(["cat"], {
        input: "testing",
        stdin: "null",
      }),
    TypeError,
  );
});

Deno.test("stdoutJSON()", async () => {
  const r = await run([Deno.execPath(), "info", "--json"], { stdout: "piped" });
  assertEquals(r.code, 0);
  assertEquals(Object.keys(r.stdoutJSON()), [
    "denoDir",
    "modulesCache",
    "npmCache",
    "typescriptCache",
    "registryCache",
    "originStorage",
  ]);
});
