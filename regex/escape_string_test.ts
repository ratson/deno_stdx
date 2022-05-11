// Ported from escape-string-regexp v5.0.0:
// https://github.com/sindresorhus/escape-string-regexp
// Copyright 2021 by Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com). All rights reserved. MIT license.

import { assertMatch, assertStrictEquals } from "../deps_test.ts";
import { escapeString } from "./escape_string.ts";

Deno.test("main", () => {
  assertStrictEquals(
    escapeString("\\ ^ $ * + ? . ( ) | { } [ ]"),
    "\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]",
  );
});

Deno.test("escapes `-` in a way compatible with PCRE", () => {
  assertStrictEquals(escapeString("foo - bar"), "foo \\x2d bar");
});

Deno.test("escapes `-` in a way compatible with the Unicode flag", () => {
  assertMatch("-", new RegExp(escapeString("-"), "u"));
});
