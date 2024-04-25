import {
  emptyDir,
  emptyDirSync,
  ensureDir,
  ensureDirSync,
  ensureFile,
  ensureFileSync,
  ensureSymlink,
  ensureSymlinkSync,
  expandGlob,
  ExpandGlobOptions,
  expandGlobSync,
  move,
  moveSync,
  walk,
  WalkOptions,
  walkSync,
} from "https://deno.land/std@0.224.0/fs/mod.ts";
import {
  basename,
  DELIMITER as delimiter,
  dirname,
  extname,
  format,
  FormatInputPathObject,
  fromFileUrl,
  isAbsolute,
  join,
  parse,
  relative,
  resolve,
  SEPARATOR as SEP,
  toFileUrl,
} from "https://deno.land/std@0.224.0/path/mod.ts";
import { JsonValue } from "https://deno.land/std@0.224.0/json/common.ts";
import { userCacheDir, userConfigDir, userHomeDir } from "../os/path.ts";

type GlobOptions = Omit<ExpandGlobOptions, "root">;

export class HomePathError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? "Can't determine user home path", options);
  }
}

export interface Cache {
  get(key: string): Path | undefined;
  set(key: string, value: Path): void;
}

export class DefaultCache implements Cache {
  readonly refs = new Map<string, WeakRef<Path>>();

  #registry = new FinalizationRegistry((k: string) => {
    this.refs.delete(k);
  });

  get(key: string) {
    return this.refs.get(key)?.deref();
  }

  set(key: string, value: Path) {
    this.refs.set(key, new WeakRef(value));
    this.#registry.register(value, key);
  }
}

const filepathSymbol = Symbol.for("filepath");

function pathString(s: Path | URL | string): string {
  if (s instanceof Path) return s.toString();
  if (s instanceof URL) return fromFileUrl(s);
  return s;
}

/**
 * A class to represent filesystem path.
 */
export class Path {
  private readonly [filepathSymbol]: string;

  #stat?: Promise<Deno.FileInfo>;

  private constructor(filepath: string) {
    this[filepathSymbol] = filepath;

    Object.freeze(this);
  }

  static _cache: Cache = new DefaultCache();

  static get delimiter() {
    return delimiter;
  }

  static get sep() {
    return SEP;
  }

  static from(...pathSegments: string[]) {
    const k = join(...pathSegments);
    const m = this._cache;

    const v = m.get(k);
    if (v !== undefined) return v;

    const p = new this(k);
    m.set(k, p);
    return p;
  }

  static fromFileUrl(url: string | URL) {
    return Path.from(fromFileUrl(url));
  }

  /**
   * Returns path relative to `import.meta`.
   *
   * Note: As hosted script don't resolve to file system path, library should avoid this method.
   *
   * @example
   * ```ts
   * import { Path } from "https://deno.land/x/yxz/path/path.ts";
   *
   * Path.fromImportMeta(import.meta)  // current file path
   * Path.fromImportMeta(import.meta, ".")  // current directory path
   * ```
   */
  static fromImportMeta(importMeta: ImportMeta, url = "") {
    return Path.fromFileUrl(new URL(url, importMeta.url));
  }

  static fromPathObject(pathObject: FormatInputPathObject) {
    return Path.from(format(pathObject));
  }

  /**
   * Returns path representing the current directory.
   */
  static cwd(...pathSegments: string[]) {
    return Path.from(Deno.cwd(), ...pathSegments);
  }

  static cache(...pathSegments: string[]) {
    const p = userCacheDir();
    return Path.from(p, ...pathSegments);
  }

  static config(...pathSegments: string[]) {
    const p = userConfigDir();
    return Path.from(p, ...pathSegments);
  }

  /**
   * Returns path representing the user’s home directory.
   *
   * If the home directory can’t be resolved, throw error.
   */
  static home(...pathSegments: string[]) {
    const p = userHomeDir();
    if (!p) throw new HomePathError();
    return Path.from(p, ...pathSegments);
  }

  static async makeTempDir(options?: Deno.MakeTempOptions) {
    return Path.from(await Deno.makeTempDir(options));
  }

  static makeTempDirSync(options?: Deno.MakeTempOptions) {
    return Path.from(Deno.makeTempDirSync(options));
  }

  static async makeTempFile(options?: Deno.MakeTempOptions) {
    return Path.from(await Deno.makeTempFile(options));
  }

  static makeTempFileSync(options?: Deno.MakeTempOptions) {
    return Path.from(Deno.makeTempFileSync(options));
  }

  /**
   * Converts the PATH environment variable into an array of Path instances.
   *
   * @returns An Array of Path instances of the filepaths recorded in PATH.
   */
  static splitPATH() {
    const s = Deno.env.get("PATH");
    if (s === undefined) return [];
    return s.split(delimiter).map((x) => Path.from(x));
  }

  /**
   * Searches for an executable named file in the directories named by the PATH environment variable.
   */
  static async exe(name: string): Promise<Path | undefined> {
    for (const x of this.splitPATH()) {
      const p = x.joinpath(name);
      if (await p.exists()) {
        return p;
      }
    }
  }

  /**
   * Return the extension of path.
   *
   * @example
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Path } from "https://deno.land/x/yxz/path/mod.ts";
   *
   * const ext = Path.from("/tmp/file.txt").ext;
   *
   * assertEquals(ext, ".txt");
   * ```
   */
  get ext() {
    return extname(this.toString());
  }

  /**
   * Return the name of path.
   *
   * @example
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Path } from "https://deno.land/x/yxz/path/mod.ts";
   *
   * const name = Path.from("/tmp/file.txt").name;
   *
   * assertEquals(name, "file.txt");
   * ```
   */
  get name() {
    return basename(this.toString());
  }

  /**
   * Return the name of the path, without extension.
   *
   * @example
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   * import { Path } from "https://deno.land/x/yxz/path/mod.ts";
   *
   * const stem = Path.from("/tmp/file.txt").stem;
   *
   * assertEquals(stem, "file");
   * ```
   */
  get stem() {
    return basename(this.toString(), this.ext);
  }

  get parent() {
    return Path.from(dirname(this.toString()));
  }

  get parents(): Array<Path> {
    return Array.from(this.#iterParents());
  }

  *#iterParents() {
    let last = this as Path;
    let p = last.parent;
    while (!last.equals(p)) {
      yield p;
      last = p;
      p = last.parent;
    }
  }

  equals(otherPath: Path | string | undefined | null) {
    if (this === otherPath) return true;
    if (otherPath === undefined || otherPath === null) return false;

    const a = this.toString();
    const b = otherPath.toString();
    if (a === b) return true;

    if (resolve(a) === resolve(b)) return true;

    return false;
  }

  async exists() {
    try {
      await Deno.lstat(this.toString());
      return true;
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        return false;
      }
      throw err;
    }
  }

  /**
   * Return a new path with expanded ~ and ~user constructs.
   *
   * If a home directory can’t be resolved, an error is raised.
   */
  expanduser() {
    const s = this.toString();
    if (!s.startsWith("~")) return this;

    const homeDir = userHomeDir();
    if (homeDir === null) throw new HomePathError();

    return Path.from(
      s.replace(
        /^~([a-z]+|\/?)/,
        (_, $1) =>
          ["", "/"].includes($1)
            ? `${homeDir}${$1}`
            : `${dirname(homeDir)}/${$1}`,
      ),
    );
  }

  async *glob(
    glob: string,
    opts: GlobOptions = {},
  ): AsyncIterableIterator<Path> {
    for await (
      const file of expandGlob(glob, {
        ...opts,
        root: this.toString(),
      })
    ) {
      yield Path.from(file.path);
    }
  }

  *globSync(glob: string, opts: GlobOptions = {}): IterableIterator<Path> {
    for (
      const file of expandGlobSync(glob, {
        ...opts,
        root: this.toString(),
      })
    ) {
      yield Path.from(file.path);
    }
  }

  isAbsolute() {
    return isAbsolute(this.toString());
  }

  relative(otherPath: Path) {
    if (this.isAbsolute() !== otherPath?.isAbsolute()) {
      throw new Error("One path is relative and the other is absolute.");
    }
    return Path.from(relative(this.toString(), otherPath.toString()));
  }

  joinpath(...other: string[]) {
    return Path.from(this.toString(), ...other);
  }

  parse() {
    return parse(this.toString());
  }

  resolve() {
    return Path.from(resolve(this.toString()));
  }

  lstat() {
    return Deno.lstat(this.toString());
  }

  lstatSync() {
    return Deno.lstatSync(this.toString());
  }

  async stat() {
    if (this.#stat !== undefined) return this.#stat;

    try {
      this.#stat = Deno.stat(this.toString());
      return await this.#stat;
    } finally {
      this.#stat = undefined;
    }
  }

  statSync() {
    return Deno.statSync(this.toString());
  }

  toFileUrl() {
    return toFileUrl(this.toString());
  }

  toJSON() {
    return this.toString();
  }

  toString() {
    return this[filepathSymbol];
  }

  async #statValue(key: "isDirectory" | "isFile" | "isSymlink") {
    try {
      const stat = await this.lstat();
      return stat[key];
    } catch {
      return false;
    }
  }

  isDir(): Promise<boolean> {
    return this.#statValue("isDirectory");
  }

  isFile(): Promise<boolean> {
    return this.#statValue("isFile");
  }

  isSymlink(): Promise<boolean> {
    return this.#statValue("isSymlink");
  }

  emptyDir() {
    return emptyDir(this.toString());
  }

  emptyDirSync() {
    return emptyDirSync(this.toString());
  }

  ensureDir() {
    return ensureDir(this.toString());
  }

  ensureDirSync() {
    return ensureDirSync(this.toString());
  }

  ensureFile() {
    return ensureFile(this.toString());
  }

  ensureFileSync() {
    return ensureFileSync(this.toString());
  }

  ensureSymlink(dest: Path | string) {
    return ensureSymlink(this.toString(), pathString(dest));
  }

  ensureSymlinkSync(dest: Path | string) {
    return ensureSymlinkSync(this.toString(), pathString(dest));
  }

  chmod(mode: number) {
    return Deno.chmod(this.toString(), mode);
  }

  chmodSync(mode: number) {
    return Deno.chmodSync(this.toString(), mode);
  }

  chown(uid: number | null, gid: number | null) {
    return Deno.chown(this.toString(), uid, gid);
  }

  chownSync(uid: number | null, gid: number | null) {
    return Deno.chownSync(this.toString(), uid, gid);
  }

  copyFile(toPath: Path | string | URL) {
    return Deno.copyFile(this.toString(), pathString(toPath));
  }

  copyFileSync(toPath: Path | string | URL) {
    return Deno.copyFileSync(this.toString(), pathString(toPath));
  }

  create() {
    return Deno.create(this.toString());
  }

  createSync() {
    return Deno.createSync(this.toString());
  }

  link(newpath: Path | string) {
    return Deno.link(this.toString(), pathString(newpath));
  }

  linkSync(newpath: Path | string) {
    return Deno.linkSync(this.toString(), pathString(newpath));
  }

  mkdir(options?: Deno.MkdirOptions) {
    return Deno.mkdir(this.toString(), options);
  }

  mkdirSync(options?: Deno.MkdirOptions) {
    return Deno.mkdirSync(this.toString(), options);
  }

  move(dest: Path | string, options?: { overwrite?: boolean }) {
    return move(this.toString(), pathString(dest), options);
  }

  moveSync(dest: Path | string, options?: { overwrite?: boolean }) {
    return moveSync(this.toString(), pathString(dest), options);
  }

  open(options?: Deno.OpenOptions) {
    return Deno.open(this.toString(), options);
  }

  openSync(options?: Deno.OpenOptions) {
    return Deno.openSync(this.toString(), options);
  }

  symlink(newpath: Path | string | URL, options?: Deno.SymlinkOptions) {
    return Deno.symlink(this.toString(), pathString(newpath), options);
  }

  symlinkSync(newpath: Path | string | URL, options?: Deno.SymlinkOptions) {
    return Deno.symlinkSync(this.toString(), pathString(newpath), options);
  }

  readDir() {
    return Deno.readDir(this.toString());
  }

  readDirSync() {
    return Deno.readDirSync(this.toString());
  }

  async readLink() {
    const p = await Deno.readLink(this.toString());
    return Path.from(p);
  }

  readLinkSync() {
    return Path.from(Deno.readLinkSync(this.toString()));
  }

  async realPath() {
    const p = await Deno.realPath(this.toString());
    return Path.from(p);
  }

  realPathSync() {
    return Path.from(Deno.realPathSync(this.toString()));
  }

  async rename(newpath: Path | string | URL): Promise<Path> {
    const s = resolve(pathString(newpath));
    await Deno.rename(this.toString(), s);
    return Path.from(s);
  }

  renameSync(newpath: Path | string | URL): Path {
    const s = resolve(pathString(newpath));
    Deno.renameSync(this.toString(), s);
    return Path.from(s);
  }

  remove(options?: Deno.RemoveOptions) {
    return Deno.remove(this.toString(), options);
  }

  removeSync(options?: Deno.RemoveOptions) {
    return Deno.removeSync(this.toString(), options);
  }

  truncate(len?: number) {
    return Deno.truncate(this.toString(), len);
  }

  truncateSync(len?: number) {
    return Deno.truncateSync(this.toString(), len);
  }

  walk(options?: WalkOptions) {
    return walk(this.toString(), options);
  }

  walkSync(options?: WalkOptions) {
    return walkSync(this.toString(), options);
  }

  watch(options?: { recursive: boolean }) {
    return Deno.watchFs(this.toString(), options);
  }

  readFile(options?: Deno.ReadFileOptions) {
    return Deno.readFile(this.toString(), options);
  }

  readFileSync() {
    return Deno.readFileSync(this.toString());
  }

  writeFile(data: Uint8Array, options?: Deno.WriteFileOptions) {
    return Deno.writeFile(this.toString(), data, options);
  }

  writeFileSync(data: Uint8Array, options?: Deno.WriteFileOptions) {
    return Deno.writeFileSync(this.toString(), data, options);
  }

  readTextFile(options?: Deno.ReadFileOptions) {
    return Deno.readTextFile(this.toString(), options);
  }

  readTextFileSync() {
    return Deno.readTextFileSync(this.toString());
  }

  writeTextFile(data: string, options?: Deno.WriteFileOptions) {
    return Deno.writeTextFile(this.toString(), data, options);
  }

  writeTextFileSync(data: string, options?: Deno.WriteFileOptions) {
    return Deno.writeTextFileSync(this.toString(), data, options);
  }

  async readJsonFile<T = JsonValue>(options?: Deno.ReadFileOptions) {
    return JSON.parse(await this.readTextFile(options)) as T;
  }

  writeJsonFile(
    value: JsonValue,
    options: Deno.WriteFileOptions & {
      replacer?: (number | string)[] | null;
      space?: string | number;
    } = {},
  ) {
    const { replacer, space, ...opts } = options;
    return this.writeTextFile(JSON.stringify(value, replacer, space), opts);
  }

  get [Symbol.toStringTag]() {
    return "Path";
  }

  [Symbol.toPrimitive](hint: string) {
    switch (hint) {
      case "number":
        return NaN;
    }
    return this.toString();
  }

  [Symbol.for("Deno.customInspect")]() {
    return `${this[Symbol.toStringTag]} { ${this.toString()} }`;
  }
}
