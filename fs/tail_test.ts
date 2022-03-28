import { assertStrictEquals } from "../deps_test.ts";
import { Path } from "../path/path.ts";
import { Tail } from "./mod.ts";

Deno.test("start", async () => {
  const tempDir = await Path.makeTempDir();
  const tempFile = tempDir.joinpath("temp.log");
  const encoder = new TextEncoder();
  const tail = new Tail(tempFile.toString());

  await tempFile.ensureFile();

  const n = 10;
  let i = 0;
  const timer = setInterval(async () => {
    const f = await tempFile.open({ append: true });
    await f.write(encoder.encode(`${i}\n`));
    f.close();

    i += 1;
    if (i > n) {
      clearInterval(timer);
      tail.close();
    }
  }, 100);

  let c = 0;
  for await (const chunk of tail.start()) {
    assertStrictEquals(chunk, `${c}`);
    c += 1;
  }

  assertStrictEquals(c, 10);
});
