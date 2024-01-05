import { normalize, SEP } from "https://deno.land/std@0.211.0/path/mod.ts";
import { range } from "../collections/range.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertSpyCall,
  assertSpyCalls,
  assertStrictEquals,
  assertThrows,
  delay,
  isWindows,
  spy,
} from "../deps_test.ts";
import { userCacheDir, userConfigDir, userHomeDir } from "../os/path.ts";
import { isCI } from "../testing/mod.ts";
import { DefaultCache, Path } from "./path.ts";

Deno.test("Object", () => {
  const p = Path.from("/");

  assertEquals(Object.keys(p), []);
  assertEquals(Object.getOwnPropertyNames(p), []);

  const s = Object.getOwnPropertySymbols(p)[0];
  assertEquals(Object.getOwnPropertySymbols(p), [s]);
  assertEquals({ ...p }, { [s]: SEP });
});

Deno.test("immutable", () => {
  // @ts-expect-error new-private-constructor
  const p = new Path("/");
  assertStrictEquals(Object.isFrozen(p), true);
  assertStrictEquals(Object.isExtensible(p), false);

  assertThrows(
    () => {
      // deno-lint-ignore no-explicit-any
      (p as any).a = 1;
    },
    TypeError,
    "object is not extensible",
  );
});

Deno.test("can not be extended", () => {
  // @ts-expect-error private-constructor
  class P extends Path {
    a = 1;
    constructor() {
      super("/");
      this.a = 2;
    }
  }

  assertThrows(
    () => {
      new P();
    },
    TypeError,
    "object is not extensible",
  );
});

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
  assertNotEquals(Path.cwd(), Path.from("."));

  assertNotEquals(Path.from("/a"), Path.from("/b"));
});

Deno.test("Path.fromImportMeta()", async () => {
  const p = Path.fromImportMeta(import.meta);
  assertStrictEquals(await p.isDir(), false);
  assertStrictEquals(await p.isFile(), true);
  assertStrictEquals(await p.isSymlink(), false);
  assertStrictEquals(p.name, "path_test.ts");

  const d = Path.fromImportMeta(import.meta, ".");
  assertStrictEquals(await d.isDir(), true);
  assertStrictEquals(await d.isFile(), false);
  assertStrictEquals(await d.isSymlink(), false);
  assertStrictEquals(d.name, "path");

  const f = Path.fromImportMeta(import.meta, "./path.ts");
  assertStrictEquals(await f.isDir(), false);
  assertStrictEquals(await f.isFile(), true);
  assertStrictEquals(await f.isSymlink(), false);
  assertStrictEquals(f.name, "path.ts");
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

Deno.test("Path.cache()", () => {
  assertStrictEquals(Path.cache().toString(), userCacheDir());
});

Deno.test("Path.config()", () => {
  assertStrictEquals(Path.config().toString(), userConfigDir());
});

Deno.test("Path.exe()", async () => {
  assertStrictEquals(await Path.exe(crypto.randomUUID()), undefined);

  const p = await Path.exe("deno");
  if (p === undefined) return;

  assertStrictEquals(
    await Deno.realPath(p.toString()),
    isWindows ? undefined : Deno.execPath(),
  );
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

Deno.test("stem", () => {
  assertStrictEquals(Path.from("/file.ext").stem, "file");
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

  if (isWindows) {
    assertStrictEquals(p == "\\", true);
    return;
  }

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
  assertStrictEquals(String(Path.from("/")), SEP);

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
    assertStrictEquals(
      Path.from(normalize(a)).toString(),
      normalize(b),
    );
  }

  assertStrictEquals(Path.from(SEP) + "", SEP);
});

Deno.test("isDir()", async () => {
  const p = Path.cwd();
  assertStrictEquals(await p.isDir(), true);
  assertStrictEquals(await p.isFile(), false);
  assertStrictEquals(await p.isSymlink(), false);
});

Deno.test("Deno.inspect()", () => {
  assertStrictEquals(Deno.inspect(Path.from(Path.sep)), `Path { ${SEP} }`);
});

Deno.test("toPrimitive", () => {
  const p = Path.from("/");
  // number
  assertStrictEquals(isNaN(+p), true);
  assertStrictEquals(isNaN(Number(p)), true);
  // string
  assertStrictEquals(`${p}`, SEP);
  assertStrictEquals(p + "", SEP);
  // boolean
  assertStrictEquals(Boolean(p), true);
  assertStrictEquals(Boolean(Path.from("")), true);
});

Deno.test("expanduser", () => {
  assertStrictEquals(Path.from("~").expanduser(), Path.home());

  if (isWindows) return;

  assertStrictEquals(Path.from("~/").expanduser(), Path.home().joinpath("./"));
  assertStrictEquals(
    Path.from("~/.cache/").expanduser(),
    Path.home().joinpath(".cache/"),
  );

  assertStrictEquals(
    Path.from("~user/").expanduser().equals(Path.home().joinpath("..", "user")),
    true,
  );

  const p = Path.from("/");
  assertStrictEquals(p.expanduser(), p);
});

Deno.test("parse", () => {
  const p = Path.from("/root/file.txt");

  assertEquals(p.parse(), {
    base: "file.txt",
    dir: `${SEP}root`,
    ext: ".txt",
    name: "file",
    root: SEP,
  });

  assertStrictEquals(Path.fromPathObject(p.parse()), p);
});

Deno.test("glob", async () => {
  for await (const p of Path.fromImportMeta(import.meta, ".").glob("*.ts")) {
    assertStrictEquals(p.ext, ".ts");
  }
});

Deno.test("relative", () => {
  const p = Path.from("/tmp/d/file.txt");
  assertStrictEquals(p.relative(Path.from("/tmp/d")), Path.from(".."));
  assertStrictEquals(p.relative(Path.from("/tmp/d/f")), Path.from("../f"));

  assertThrows(() => {
    p.relative(Path.from(".."));
  });

  assertThrows(() => {
    Path.from("..").relative(Path.from("/"));
  });

  const r = Path.from(".");
  assertStrictEquals(r.relative(Path.from("../f")), Path.from("../f"));
});

Deno.test("stat", async () => {
  const p = Path.from("/tmp");
  const stat = spy(Deno, "stat");

  try {
    await p.stat();
    assertSpyCall(stat, 0, {
      args: [p.toString()],
    });
    assertSpyCalls(stat, 1);

    await Promise.all(Array.from(range(5)).map(() => p.stat()));
    assertSpyCalls(stat, 2);
  } finally {
    stat.restore();
  }
});

Deno.test("toJSON", () => {
  if (isWindows) {
    assertStrictEquals(JSON.stringify(Path.from("/")), `"\\\\"`);
    return;
  }

  assertStrictEquals(JSON.stringify(Path.from("/")), `"/"`);
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

  // @ts-expect-error private constructor should not be inherited
  class Child extends Path {
    constructor(s: string) {
      super(s);
    }
  }
  assertStrictEquals(
    Object.prototype.toString.call(new Child("/")),
    "[object Path]",
  );
});

Deno.test("DefaultCache", async () => {
  const cache = new DefaultCache();
  // @ts-expect-error create new instance from private constructor
  const createPath = () => Object.freeze(new Path(crypto.randomUUID()));
  let p1 = createPath();
  const p1k = p1.toString();
  assertStrictEquals(cache.get(p1k), undefined);

  cache.set(p1k, p1);
  assertStrictEquals(cache.get(p1k), p1);
  assertStrictEquals(cache.refs.size, 1);

  p1 = undefined; // remove reference for GC to free it
  while (cache.get(p1k)) {
    new Uint8Array(64 * 1024 * 1024); // speed up GC
    await delay(10);
  }
  assertStrictEquals(cache.refs.size, 0);
});

Deno.test("parent", () => {
  for (
    const [p, expected] of [
      ["/", "/"],
      ["/..", "/"],
      ["/a", "/"],
      ["/a/b/c", "/a/b"],
      [".", "."],
      ["", "."],
      ["./a", "."],
      ["./a/b/c", "a/b"],
    ] as const
  ) {
    const s = Path.from(p).parent.toString();
    assertStrictEquals(
      s,
      normalize(expected),
      `parent of "${p}" (${s}) != "${expected}"`,
    );
  }
});

Deno.test("parents", () => {
  for (
    const [p, expected] of [
      ["/", []],
      ["/..", []],
      ["/a", ["/"]],
      ["/a/b/c/d", ["/a/b/c", "/a/b", "/a", "/"]],
      [".", []],
      ["./a", ["."]],
      ["./a/b/c", ["a/b", "a", "."]],
      ["", []],
    ] as const
  ) {
    assertEquals(
      Path.from(p).parents.map((x) => x.toString()),
      expected.map(normalize),
    );
  }
});

Deno.test("fs", async () => {
  const [d1, f1] = await Promise.all([
    Path.makeTempDir(),
    Path.makeTempFile(),
  ]);
  const [d2, f2] = [
    Path.makeTempDirSync(),
    Path.makeTempFileSync(),
  ];

  assertEquals(d1.lstatSync(), await d1.lstat());
  assertEquals(d1.statSync(), await d1.stat());
  assertEquals(d1.realPathSync(), await d1.realPath());
  assertEquals(f1.readFileSync(), await f1.readFile());
  assertEquals(f1.readTextFileSync(), await f1.readTextFile());

  await f1.writeTextFile("null");
  assertEquals(await f1.readJsonFile(), null);
  await f1.truncate();

  await f2.writeJsonFile(null);

  const [d1d, d1f, d1l] = ["d", "f", "l"].map((x) => d1.joinpath(x));

  await d1d.ensureDir();
  assertStrictEquals(await d1d.isDir(), true);

  await d1f.ensureFile();
  assertStrictEquals(await d1f.isFile(), true);

  assertStrictEquals(await d1l.exists(), false);
  await f1.ensureSymlink(d1l);
  assertStrictEquals(await d1l.exists(), true);
  assertStrictEquals(await d1l.isSymlink(), true);
  assertStrictEquals(await d1l.readLink(), f1);

  let c1 = 0;
  for await (const p of d1.glob("*")) {
    assertArrayIncludes([d1d, d1f, d1l], [p]);
    c1++;
  }
  assertStrictEquals(c1, 3);

  let c2 = 0;
  for await (const _ of d1.walk()) {
    c2++;
  }
  assertStrictEquals(c2, c1 + 1);

  await d1f.copyFile(d2.joinpath("copied"));

  await d1l.move(d2.joinpath("moved"));

  await d1.emptyDir();
  d1.emptyDirSync();
});

Deno.test("rename", async () => {
  const tempDir = await Path.makeTempDir();
  const tempFile = tempDir.joinpath("a.txt");

  await tempFile.ensureFile();

  const renamedFile = tempDir.joinpath("b.txt");
  assertStrictEquals(await renamedFile.exists(), false);

  const renamedPath = await tempFile.rename(renamedFile.toFileUrl());

  assertStrictEquals(tempFile.name, "a.txt");
  assertStrictEquals(await tempFile.exists(), false);

  assertStrictEquals(await renamedFile.exists(), true);
  assertStrictEquals(renamedPath, renamedFile);

  // relative path
  const relativePath = Path.cwd().relative(tempFile);
  assertStrictEquals(relativePath.equals(tempFile), true);
  assertNotEquals(relativePath, tempFile);
  assertStrictEquals(await relativePath.exists(), false);

  await renamedFile.rename(relativePath);

  assertStrictEquals(await renamedFile.exists(), false);

  assertStrictEquals(await relativePath.exists(), true);
  assertStrictEquals(await tempFile.exists(), true);
});
