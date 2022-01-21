import {
  ensureDir,
  ensureDirSync,
  ensureFile,
  ensureFileSync,
  expandGlob,
  ExpandGlobOptions,
  expandGlobSync,
} from "https://deno.land/std@0.122.0/fs/mod.ts";
import {
  basename,
  delimiter,
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
  sep,
  toFileUrl,
} from "https://deno.land/std@0.122.0/path/mod.ts";
import { userCacheDir, userConfigDir, userHomeDir } from "../os/path.ts";
import { JsonValue } from "../typing/json.ts";

type GlobOptions = Omit<ExpandGlobOptions, "root">;

export class HomePathError extends Error {
  constructor(message?: string, init?: ErrorInit) {
    super(message ?? "Can't determine user home path", init);
  }
}

export interface Cache {
  get(key: string): Readonly<Path> | undefined;
  set(key: string, value: Readonly<Path>): void;
}

export class DefaultCache implements Cache {
  readonly refs = new Map<string, WeakRef<Readonly<Path>>>();
  readonly keys = new Array<string>();
  readonly gcInterval = 128;
  counter = 0;

  get(key: string) {
    return this.refs.get(key)?.deref();
  }

  set(key: string, value: Readonly<Path>) {
    this.refs.set(key, new WeakRef(value));
    this.keys.push(key);

    this.counter = (this.counter + 1) % this.gcInterval;
    if (this.counter === 0) this.gc();
  }

  gc() {
    const { keys, refs: m } = this;
    for (const k of keys.splice(0, this.gcInterval)) {
      const v = m.get(k);
      if (v === undefined) continue;
      if (v.deref() === undefined) {
        m.delete(k);
      } else {
        keys.push(k);
      }
    }
  }
}

const filepathSymbol = Symbol.for("filepath");

/**
 * A class to represent filesystem path.
 */
export class Path {
  readonly #filepath: string;
  readonly [filepathSymbol]: string;

  #stat?: Promise<Deno.FileInfo>;

  private constructor(filepath: string) {
    this.#filepath = this[filepathSymbol] = filepath;
  }

  static _cache: Cache = new DefaultCache();

  static get delimiter() {
    return delimiter;
  }

  static get sep() {
    return sep;
  }

  static from(...pathSegments: string[]) {
    const k = join(...pathSegments);
    const m = this._cache;

    const v = m.get(k);
    if (v !== undefined) return v;

    const p = Object.freeze(new this(k));
    m.set(k, p);
    return p;
  }

  static fromFileUrl(url: string | URL) {
    return Path.from(fromFileUrl(url));
  }

  /**
   * Returns path relative to `import.meta`.
   *
   * Note: As hosted script don't reoslve to file system path, library should avoid this method.
   *
   * Example:
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
  static async exe(name: string): Promise<Readonly<Path> | undefined> {
    for (const x of this.splitPATH()) {
      const p = x.joinpath(name);
      if (await p.exists()) {
        return p;
      }
    }
  }

  get ext() {
    return extname(this.toString());
  }

  get name() {
    return basename(this.toString());
  }

  get stem() {
    return basename(this.toString(), this.ext);
  }

  get parent() {
    return Path.from(dirname(this.toString()));
  }

  get parents(): Array<Readonly<Path>> {
    return Array.from(this.#iterParents());
  }

  *#iterParents() {
    let last = this as Readonly<Path>;
    let p = last.parent;
    while (!last.equals(p)) {
      yield p;
      last = p;
      p = last.parent;
    }
  }

  equals(otherPath: Readonly<Path> | string | undefined | null) {
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
          ["", "/"].includes($1) ? homeDir : `${dirname(homeDir)}/${$1}`,
      ),
    );
  }

  async *glob(
    glob: string,
    opts: GlobOptions = {},
  ): AsyncIterableIterator<Readonly<Path>> {
    for await (
      const file of expandGlob(glob, { ...opts, root: this.toString() })
    ) {
      yield Path.from(file.path);
    }
  }

  *globSync(
    glob: string,
    opts: GlobOptions = {},
  ): IterableIterator<Readonly<Path>> {
    for (
      const file of expandGlobSync(glob, { ...opts, root: this.toString() })
    ) {
      yield Path.from(file.path);
    }
  }

  isAbsolute() {
    return isAbsolute(this.toString());
  }

  relative(otherPath: Readonly<Path>) {
    if (this.isAbsolute() !== otherPath.isAbsolute()) {
      throw new Error("One path is relative and the other is absolute.");
    }
    return Path.from(relative(this.toString(), otherPath.toString()));
  }

  joinpath(...other: string[]) {
    return Path.from(this.#filepath, ...other);
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
    return this.#filepath;
  }

  async #statValue(key: "isDirectory" | "isFile" | "isSymlink") {
    try {
      const stat = await this.stat();
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

  copyFile(toPath: string | URL) {
    return Deno.copyFile(this.toString(), toPath);
  }

  copyFileSync(toPath: string | URL) {
    return Deno.copyFileSync(this.toString(), toPath);
  }

  create() {
    return Deno.create(this.toString());
  }

  createSync() {
    return Deno.createSync(this.toString());
  }

  link(newpath: string) {
    return Deno.link(this.toString(), newpath);
  }

  linkSync(newpath: string) {
    return Deno.linkSync(this.toString(), newpath);
  }

  mkdir(options?: Deno.MkdirOptions) {
    return Deno.mkdir(this.toString(), options);
  }

  mkdirSync(options?: Deno.MkdirOptions) {
    return Deno.mkdirSync(this.toString(), options);
  }

  open(options?: Deno.OpenOptions) {
    return Deno.open(this.toString(), options);
  }

  openSync(options?: Deno.OpenOptions) {
    return Deno.openSync(this.toString(), options);
  }

  symlink(newpath: string | URL, options?: Deno.SymlinkOptions) {
    return Deno.symlink(this.toString(), newpath, options);
  }

  symlinkSync(newpath: string | URL, options?: Deno.SymlinkOptions) {
    return Deno.symlinkSync(this.toString(), newpath, options);
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

  rename(newpath: string | URL) {
    return Deno.rename(this.toString(), newpath);
  }

  renameSync(newpath: string | URL) {
    return Deno.renameSync(this.toString(), newpath);
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
    return this.writeTextFile(
      JSON.stringify(value, replacer, space),
      opts,
    );
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
