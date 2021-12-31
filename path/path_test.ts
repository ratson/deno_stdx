import {
  assert,
  assertEquals,
  assertStrictEquals,
  assertThrows,
} from "../deps_test.ts";
import { userHomeDir } from "../os/mod.ts";
import { Path } from "./path.ts";

Deno.test("Path.from()", async () => {
  const p = Path.from("/this/is/a/test/path/file.ext");
  assertStrictEquals(p.name, "file.ext");
  assertStrictEquals(p.isAbsolute(), true);
  assertEquals(
    p.joinpath("..").resolve(),
    Path.from("/this/is/a", "test/path").resolve(),
  );

  assertStrictEquals(await p.exists(), false);
  assertStrictEquals(await p.isDir(), false);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});

Deno.test("Path.from() returns same instance if filepath is the same", () => {
  assertStrictEquals(Path.from("/", "p"), Path.from("/", "p"));
  assertStrictEquals(Object.is(Path.from("/a"), Path.from("/a")), true);

  assertStrictEquals(Path.from("/"), Path.from("/p/.."));
  assertStrictEquals(Path.from("/"), Path.from("/", ".."));
  assertStrictEquals(Path.from("/p"), Path.from("/", "p"));
  assertStrictEquals(Path.from("./a"), Path.from("./b", "../a"));

  assertStrictEquals(Path.cwd(), Path.from(".").resolve());
  assert(Path.cwd() !== Path.from("."));

  assert(Path.from("/a") != Path.from("/b"));
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

  const f = Path.fromImportMeta(import.meta, "./path.ts");
  assertStrictEquals(await f.isDir(), false);
  assertStrictEquals(await f.isFile(), true);
  assertStrictEquals(await f.isSymlink(), false);
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
  assertEquals(p.resolve(), Path.from("..").resolve());
  assertStrictEquals(p.isAbsolute(), false);

  for (
    const [a, b] of [
      ["", "."],
      // [".", "./"],
      ["..", "../."],
      ["../p/../a", "../a"],
    ]
  ) {
    assertEquals(
      Path.from(a).resolve(),
      Path.from(b).resolve(),
      `${a} != ${b}`,
    );
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

Deno.test("ext", () => {
  assertStrictEquals(Path.from("/file.ext").ext, ".ext");
  assertStrictEquals(Path.from("/dot.").ext, ".");
  assertStrictEquals(Path.from("/noext").ext, "");
  assertStrictEquals(Path.from("/dir/").ext, "");
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

  const p = Path.from("/");
  assertStrictEquals(p.equals(p), true);

  assertStrictEquals(Path.cwd().equals(Path.from(".")), true);
  assertStrictEquals(Path.cwd().equals(Path.from("")), true);

  assertStrictEquals(Path.from("/a").equals(Path.from("/b")), false);

  assertStrictEquals(Path.from("/a").equals("/a"), true);
  assertStrictEquals(Path.from("/a").equals("/b"), false);

  assertStrictEquals(Path.from("/a").equals(undefined), false);
  assertStrictEquals(Path.from("/a").equals(null), false);

  assertStrictEquals(Path.from("/a").equals(Path.from("/", "a")), true);
  assertStrictEquals(Path.from("/a").equals("/a/."), true);
});

Deno.test("path == string", () => {
  // deno-lint-ignore no-explicit-any
  const p = Path.from("/") as any;
  assertStrictEquals(p == "/", true);
  assertStrictEquals("/" == p, true);

  assertStrictEquals("/not-equal" == p, false);

  assertStrictEquals(p === "/", false);
});

Deno.test("toFileUrl()", () => {
  assertStrictEquals(
    Path.from("/a/path").toFileUrl().href,
    "file:///a/path",
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
    assertStrictEquals(Path.from(a).toString(), b);
  }

  assertStrictEquals(Path.from("/") + "", "/");
});

Deno.test("isDir()", async () => {
  const p = Path.cwd();
  assertStrictEquals(await p.isDir(), true);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});

Deno.test("Deno.inspect()", () => {
  assertStrictEquals(Deno.inspect(Path.from("/")), "Path { / }");
});

Deno.test("toPrimitive", () => {
  const p = Path.from("/");
  // number
  assertStrictEquals(isNaN(+p), true);
  assertStrictEquals(isNaN(Number(p)), true);
  // string
  assertStrictEquals(`${p}`, "/");
  assertStrictEquals(p + "", "/");
  // boolean
  assertStrictEquals(Boolean(p), true);
  assertStrictEquals(Boolean(Path.from("")), true);
});

Deno.test("expanduser", () => {
  assertStrictEquals(Path.from("~").expanduser(), Path.home());
  assertStrictEquals(Path.from("~/").expanduser(), Path.home());

  assertStrictEquals(
    Path.from("~user/").expanduser().equals(Path.home().joinpath("..", "user")),
    true,
  );

  const p = Path.from("/");
  assertStrictEquals(p.expanduser(), p);
});

Deno.test("glob", async () => {
  for await (const p of Path.fromImportMeta(import.meta, ".").glob("*.ts")) {
    assertStrictEquals(p.ext, ".ts");
  }
});

Deno.test("toJSON", () => {
  assertStrictEquals(JSON.stringify(Path.from("/")), '"/"');
  assertStrictEquals(
    JSON.stringify({ path: Path.from('/"') }),
    '{"path":"/\\""}',
  );
});

Deno.test("toStringTag", () => {
  assertStrictEquals(
    Object.prototype.toString.call(Path.from("/")),
    "[object Path]",
  );
});
