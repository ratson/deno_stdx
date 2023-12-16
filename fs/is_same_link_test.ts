import { isWindows } from "https://deno.land/std@0.209.0/path/_os.ts";
import { assertEquals } from "../deps_test.ts";
import { isSameLink } from "./is_same_link.ts";

Deno.test("isSameLink should return true for hard links", async () => {
  const testFile = await Deno.makeTempFile();

  const testLink = testFile + ".link";
  await Deno.link(testFile, testLink);

  const result = await isSameLink(testFile, testLink);
  assertEquals(result, true);

  await Promise.all([Deno.remove(testFile), Deno.remove(testLink)]);
});

Deno.test("isSameLink should return false for different files", async () => {
  if (isWindows) return;

  const [testFile1, testFile2] = await Promise.all([
    Deno.makeTempFile(),
    Deno.makeTempFile(),
  ]);

  const result = await isSameLink(testFile1, testFile2);
  assertEquals(result, false);

  await Promise.all([
    Deno.remove(testFile1),
    Deno.remove(testFile2),
  ]);
});
