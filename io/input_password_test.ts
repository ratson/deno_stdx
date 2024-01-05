import {
  StringReader,
  StringWriter,
} from "https://deno.land/std@0.211.0/io/mod.ts";
import { assertStrictEquals } from "../deps_test.ts";
import { run } from "../os/run.ts";
import { inputPassword } from "./input_password.ts";

Deno.test("inputPassword()", async () => {
  class DummyReader extends StringReader {
    constructor() {
      super("testing");
    }

    rid = 0;
    readable = null as never;
    setRaw() {}
    close() {}
  }

  const password = await inputPassword({
    prompt: "",
    reader: new DummyReader(),
    writer: new StringWriter() as never,
  });

  assertStrictEquals(password, "testing");
});

Deno.test("inputPassword() example", async () => {
  const password = "testing";
  const r = await run([Deno.execPath(), "run", "./examples/getpass.ts"], {
    input: password,
    stdout: "piped",
    stderr: "piped",
  });

  assertStrictEquals(r.code, 0);
  assertStrictEquals(r.stderrText, "Password: \r\n");
  assertStrictEquals(r.stdoutText, `Password = ${password}\n`);
});
