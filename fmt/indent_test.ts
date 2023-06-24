import { assertStrictEquals } from "../deps_test.ts";
import { indent } from "./indent.ts";

Deno.test("indent", () => {
    assertStrictEquals(indent("a", 2), "  a");
    assertStrictEquals(indent("a", 1, "-"), "-a");
});
