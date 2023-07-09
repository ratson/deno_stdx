import { assertStrictEquals } from "../deps_test.ts";

Deno.test("inputPassword()", async () => {
  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "./examples/getpass.ts",
    ],
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });

  const password = "testing"
  const process = command.spawn();

  const writer =  process.stdin.getWriter();
  writer.write(new TextEncoder().encode(password));
  writer.releaseLock();
  await process.stdin.close();

  const { code, stdout, stderr } = await process.output();

  assertStrictEquals(code, 0);
  assertStrictEquals(new TextDecoder().decode(stderr), "");
  assertStrictEquals(new TextDecoder().decode(stdout), `Password: \r\nPassword = ${password}\n`);
});
