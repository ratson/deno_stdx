import { assertStrictEquals, isCI, osType } from "../deps_test.ts";
import { clipboard } from "./clipboard.ts";

Deno.test("clipboard", {
  ignore: true, // FIXME blocking test to be completed
}, async () => {
  if (isCI() && ["linux", "windows"].includes(osType)) return;

  const s = "test";
  await clipboard.writeText(s);
  const t = await clipboard.readText();
  assertStrictEquals(s, t);
});
