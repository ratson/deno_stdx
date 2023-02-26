import { enumerate } from "../async/enumerate.ts";
import {
  assertRejects,
  assertStrictEquals,
  unreachable,
} from "../deps_test.ts";
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

Deno.test("file not exists", async () => {
  const tempFile = await Path.makeTempFile();
  const tail = new Tail(tempFile.toString());

  try {
    await tempFile.remove();
    assertStrictEquals(await tempFile.exists(), false);

    assertRejects(() => tail.start().next(), Deno.errors.NotFound);
  } finally {
    tail.close();
  }
});

Deno.test("rename", async () => {
  const tempDir = await Path.makeTempDir();
  const tempFile = tempDir.joinpath("temp.log");
  const tail = new Tail(tempFile.toString());

  await tempFile.ensureFile();

  setTimeout(async () => {
    const f = await tempFile.open({ append: true });
    await f.write(encoder.encode(`before rename\n`));
    f.close();

    const renamedFile = tempDir.joinpath("renamed.log");
    await tempFile.rename(renamedFile);
    const f2 = await renamedFile.open({ append: true });
    await f2.write(encoder.encode(`after rename\n`));
    f2.close();
  }, 100);

  let c = 0;
  for await (const [i, chunk] of enumerate(tail.start())) {
    c = i;
    switch (i) {
      case 0:
        assertStrictEquals(chunk, "before rename");
        break;
      case 1:
        assertStrictEquals(chunk, "after rename");
        tail.close();
        break;
      default:
        unreachable();
    }
  }

  assertStrictEquals(c, 1);
});
