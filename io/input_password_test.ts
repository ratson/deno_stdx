import {
  StringReader,
  StringWriter,
} from "https://deno.land/std@0.193.0/io/mod.ts";
import { inputPassword } from "./input_password.ts";
import { assertStrictEquals } from "../deps_test.ts";

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
  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "./examples/getpass.ts",
    ],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const password = "testing";
  const process = command.spawn();

  const writer = process.stdin.getWriter();
  writer.write(new TextEncoder().encode(password));
  writer.releaseLock();
  await process.stdin.close();

  const { code, stdout, stderr } = await process.output();

  assertStrictEquals(code, 0);
  assertStrictEquals(new TextDecoder().decode(stderr), "Password: \r\n");
  assertStrictEquals(
    new TextDecoder().decode(stdout),
    `Password = ${password}\n`,
  );
});
