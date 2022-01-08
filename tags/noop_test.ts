import { assertStrictEquals } from "../deps_test.ts";
import { noop } from "./noop.ts";

Deno.test("noop", () => {
  const tests = [
    [noop``, ""],
    [noop`\``, "`"],
    [noop`1`, "1"],
    [noop`${1}${2}${3}`, "123"],
    [noop`${1}2${3}`, "123"],
    [noop`1${2}${3}4`, "1234"],
  ];

  for (const [result, expected] of tests) {
    assertStrictEquals(result, expected);
  }
});
