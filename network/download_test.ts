import { download } from "./download.ts";
import { Path } from "../path/path.ts";
import { assert } from "../deps_test.ts";

Deno.test("download", async () => {
  const downloadDir = await Path.makeTempDir();
  const outputPath = downloadDir.joinpath("dir/logo.svg");
  await download(
    "https://deno.land/logo.svg",
    outputPath.toString(),
  );

  assert(await outputPath.exists());
});
