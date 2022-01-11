import { assertStrictEquals } from "../deps_test.ts";
import { clipboard } from "./clipboard.ts";

Deno.test("clipboard", async () => {
  const s = "test";
  await clipboard.writeText(s);
  const t = await clipboard.readText();
  assertStrictEquals(s, t);
});
