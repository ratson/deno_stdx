import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "../deps_test.ts";
import { userHomeDir } from "../os/mod.ts";
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

Deno.test("Path.cwd()", () => {
  assertStrictEquals(
    Path.cwd("p").toString(),
    Path.from("./p").resolve().toString(),
  );
});

Deno.test("Path.home()", () => {
  assertStrictEquals(Path.home().toString(), userHomeDir());
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

Deno.test("equals()", () => {
  for (
    const [a, b] of [
      ["/", "/"],
      ["/a/b/c/..", "/a/b"],
      ["/a/b/c/../", "/a/b/"],
      ["./.", "."],
      ["../.", ".."],
      [".", "./"],
    ]
  ) {
    assertStrictEquals(Path.from(a).equals(Path.from(b)), true);
  }

  const p = Path.from("/")
  assertStrictEquals(p.equals(p), true);

  assertStrictEquals(Path.cwd().equals(Path.from(".")), true);
  assertStrictEquals(Path.cwd().equals(Path.from("")), true);

  assertStrictEquals(Path.from("/a").equals(Path.from("/b")), false);
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
