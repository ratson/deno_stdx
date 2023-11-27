import { assertStrictEquals, assertThrows, assertType, IsExact } from "../deps_test.ts";
import { document, navigator, window } from "./dom.ts";
import type { KeyboardEvent } from "./lib.dom.ts";

Deno.test("window", () => {
  assertStrictEquals(window, globalThis);
});

Deno.test("document", () => {
  assertStrictEquals(document, undefined);

  assertThrows(() => {
    document.addEventListener("keyup", (e) => {
      assertType<IsExact<typeof e, KeyboardEvent>>(true);
    });
  });
});

Deno.test("navigator", () => {
  assertStrictEquals(navigator, globalThis.navigator);
  assertStrictEquals(navigator.clipboard, undefined);

  assertType<IsExact<typeof navigator.userAgent, string>>(true);
});
