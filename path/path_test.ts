import { assertEquals, assertStrictEquals } from "../deps_test.ts";
import { Path } from "./path.ts";

Deno.test("Path", async () => {
  assertEquals(new Path("/"), new Path("/"));

  const p = new Path("/this/is/a/test/path/file.ext");
  assertStrictEquals(p.name, "file.ext");
  assertStrictEquals(p.isAbsolute(), true);
  assertEquals(p.joinpath(".."), new Path("/this/is/a", "test/path"));

  assertStrictEquals(await p.exists(), false);
  assertStrictEquals(await p.isDir(), false);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});

Deno.test("Path.toString()", () => {
  assertStrictEquals(`${new Path("/")}`, "/");
});

Deno.test("Path.isDir()", async () => {
  const p = Path.cwd();
  assertStrictEquals(await p.isDir(), true);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});
