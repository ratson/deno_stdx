import { assertRejects, assertStrictEquals } from "../deps_test.ts";
import { Path } from "../path/path.ts";
import { Tail } from "./mod.ts";

const encoder = new TextEncoder();

Deno.test("start", async () => {
  const tempFile = await Path.makeTempFile();
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

Deno.test("file not exists", { sanitizeOps: false }, async () => {
  const tempFile = await Path.makeTempFile();
  const tail = new Tail(tempFile.toString());

  assertRejects(() => tail.start().next(), Deno.errors.NotFound);
});
