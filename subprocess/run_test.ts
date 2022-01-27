import { assertEquals, assertRejects } from "../deps_test.ts";
import { CalledProcessError, run } from "./run.ts";

Deno.test("exit with 0", async () => {
  const r = await run(["deno", "--version"], { stdout: "null" });
  assertEquals(r, { code: 0, success: true });
});

Deno.test("options.check", async () => {
  await assertRejects(
    () => run(["deno", "404"], { check: true, stderr: "null" }),
    CalledProcessError,
  );
});

Deno.test("options.pipeText", async () => {
  const s = await run(["cat"], { pipeText: "testing", stdout: "piped" });
  assertEquals(s.stdout, "testing");

  const s2 = await run(["cat"], { pipeText: "", stdout: "piped" });
  assertEquals(s2.stdout, "");

  await assertRejects(() =>
    // @ts-expect-error ignore
    run(["cat"], {
      pipeText: "testing",
      stdin: "null",
    }), TypeError);
});
