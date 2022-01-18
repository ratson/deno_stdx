import { assertStrictEquals, assertThrows, assertType } from "../deps_test.ts";
import { document, navigator, window } from "./dom.ts";
import type { KeyboardEvent } from "./lib.dom.ts";

Deno.test("window", () => {
  assertStrictEquals(window, globalThis);
});

Deno.test("document", () => {
  assertStrictEquals(document, undefined);

  assertThrows(() => {
    document.addEventListener("keyup", (e) => {
      assertType<KeyboardEvent>(e);
    });
  });
});

Deno.test("navigator", () => {
  assertStrictEquals(navigator, globalThis.navigator);
  assertStrictEquals(navigator.clipboard, undefined);

  assertType<string>(navigator.userAgent);
});
