import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "../deps_test.ts";
import { Path } from "./path.ts";

Deno.test("Path.from()", async () => {
  assertEquals(Path.from("/"), Path.from("/"));

  const p = Path.from("/this/is/a/test/path/file.ext");
  assertStrictEquals(p.name, "file.ext");
  assertStrictEquals(p.isAbsolute(), true);
  assertEquals(p.joinpath(".."), Path.from("/this/is/a", "test/path"));

  assertStrictEquals(await p.exists(), false);
  assertStrictEquals(await p.isDir(), false);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});

Deno.test("Path.fromImportMeta()", async () => {
  const p = Path.fromImportMeta(import.meta);
  assertStrictEquals(await p.isDir(), false);
  assertStrictEquals(await p.isFile(), true);
  assertStrictEquals(await p.isSymlink(), false);

  const d = Path.fromImportMeta(import.meta, ".");
  assertStrictEquals(await d.isDir(), true);
  assertStrictEquals(await d.isFile(), false);
  assertStrictEquals(await d.isSymlink(), false);
});

Deno.test("relative", () => {
  const p = Path.from("../", "p", "../.");
  assertEquals(p, Path.from(".."));
  assertStrictEquals(p.isAbsolute(), false);

  for (
    const [a, b] of [
      ["", "."],
      // [".", "./"],
      ["..", "../."],
      ["../p/../a", "../a"],
    ]
  ) {
    assertEquals(Path.from(a), Path.from(b), `${a} != ${b}`);
  }
});

Deno.test("readonly", () => {
  assertThrows(
    () => {
      Object.assign(Path.from("/"), { x: 1 });
    },
    TypeError,
    "Cannot add property",
  );
});

Deno.test("toString()", () => {
  for (
    const [a, b] of [
      ["/", "/"],
      ["/a/b/c/..", "/a/b"],
      ["/a/b/c/../", "/a/b/"],
      ["./.", "."],
      ["../.", ".."],
      // [".", "./"],
    ]
  ) {
    assertStrictEquals(`${Path.from(a)}`, b);
  }
});

Deno.test("isDir()", async () => {
  const p = Path.cwd();
  assertStrictEquals(await p.isDir(), true);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});
