import {
  ensureDir,
  ensureDirSync,
  ensureFile,
  ensureFileSync,
  expandGlob,
  ExpandGlobOptions,
  expandGlobSync,
} from "https://deno.land/std@0.120.0/fs/mod.ts";
import {
  basename,
  dirname,
  extname,
  fromFileUrl,
  isAbsolute,
  join,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.120.0/path/mod.ts";
import { userHomeDir } from "../os/mod.ts";
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

/**
 * A class to represent filesystem path.
 */
export class Path {
  readonly #filepath: string;

  private constructor(filepath: string) {
    this.#filepath = filepath;
  }

  static cache: Cache = new DefaultCache();

  static from(...pathSegments: string[]) {
    const k = join(...pathSegments);
    const m = this.cache;

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
   * Example:
   * ```ts
   *    Path.fromImportMeta(import.meta)  // current file path
   *    Path.fromImportMeta(import.meta, ".")  // current directory path
   * ```
   */
  static fromImportMeta(importMeta: ImportMeta, url = "") {
    return Path.fromFileUrl(new URL(url, importMeta.url));
  }

  /**
   * Returns path representing the current directory.
   */
  static cwd(...pathSegments: string[]) {
    return Path.from(Deno.cwd(), ...pathSegments);
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

  get ext() {
    return extname(this.toString());
  }

  get name() {
    return basename(this.toString());
  }

  equals(otherPath: Readonly<Path> | string | undefined | null) {
    if (otherPath === undefined || otherPath === null) return false;

    if (this === otherPath) return true;

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

  joinpath(...other: string[]) {
    return Path.from(this.#filepath, ...other);
  }

  resolve() {
    return Path.from(resolve(this.toString()));
  }

  stat() {
    return Deno.stat(this.toString());
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

  valueOf() {
    return this.toString();
  }

  async isDir() {
    try {
      const stat = await this.stat();
      return stat.isDirectory;
    } catch {
      return false;
    }
  }

  async isFile() {
    try {
      const stat = await this.stat();
      return stat.isFile;
    } catch {
      return false;
    }
  }

  async isSymlink() {
    try {
      const stat = await this.stat();
      return stat.isSymlink;
    } catch {
      return false;
    }
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
