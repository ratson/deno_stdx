import { assertRejects } from "../deps_test.ts";
import * as subprocess from "../subprocess/mod.ts";
import { unzip } from "./zip.ts";

Deno.test("unzip", async () => {
  await assertRejects(
    () => unzip("/tmp/test.zip", "/tmp/zip-test-output"),
    subprocess.CalledProcessError,
  );
});
