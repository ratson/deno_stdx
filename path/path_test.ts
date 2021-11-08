import { assertEquals, assertStrictEquals } from "../deps_test.ts";
import { Path } from "./path.ts";

Deno.test("Path", async () => {
  assertStrictEquals(Path.from("/"), Path.from("/"));

  const p = Path.from("/this/is/a/test/path/file.ext");
  assertStrictEquals(p.name, "file.ext");
  assertStrictEquals(p.isAbsolute(), true);
  assertEquals(p.joinpath(".."), Path.from("/this/is/a", "test/path"));

  assertStrictEquals(await p.exists(), false);
  assertStrictEquals(await p.isDir(), false);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});

Deno.test("Path.toString()", () => {
  assertStrictEquals(`${Path.from("/")}`, "/");
});

Deno.test("Path.isDir()", async () => {
  const p = Path.cwd();
  assertStrictEquals(await p.isDir(), true);
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
