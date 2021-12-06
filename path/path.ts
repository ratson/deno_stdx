import {
  ensureDir,
  ensureFile,
  expandGlob,
  ExpandGlobOptions,
} from "https://deno.land/std@0.116.0/fs/mod.ts";
import {
  basename,
  delimiter,
  dirname,
  extname,
  fromFileUrl,
  isAbsolute,
  join,
  resolve,
  sep,
  toFileUrl,
} from "https://deno.land/std@0.116.0/path/mod.ts";
import { userHomeDir } from "../os/mod.ts";

/**
 * A class to represent filesystem path.
 */
export class Path {
  readonly #segments: string[];

  private constructor(...pathSegments: string[]) {
    this.#segments = pathSegments;
  }

  static cacheSize = 128;
  static readonly #cache = new Map<string, WeakRef<Readonly<Path>>>();
  static #counter = 0;

  static cwd(...pathSegments: string[]) {
    return Path.from(Deno.cwd(), ...pathSegments);
  }

  static from(...pathSegments: string[]) {
    const k = [`${pathSegments.length}`].concat(pathSegments).join(
      `${delimiter}${sep}\0`,
    );
    const m = this.#cache;
    const v = m.get(k)?.deref();
    if (v) return v;

    const p = Object.freeze(new this(...pathSegments));
    m.set(k, new WeakRef(p));

    this.#counter += 1;
    if (this.#counter % this.cacheSize === 0) this.gc();

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

  static home(...pathSegments: string[]) {
    const p = userHomeDir();
    if (!p) throw new Error("cannot determine user home path");
    return Path.from(p, ...pathSegments);
  }

  static gc() {
    const m = this.#cache;
    for (const [k, v] of m.entries()) {
      if (!v.deref()) m.delete(k);
    }
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
    if (homeDir === null) {
      throw new Error("Can't determine home directory");
    }
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
    opts: Omit<ExpandGlobOptions, "root"> = {},
  ): AsyncIterableIterator<Readonly<Path>> {
    for await (
      const file of expandGlob(glob, { ...opts, root: this.toString() })
    ) {
      yield Path.from(file.path);
    }
  }

  isAbsolute() {
    return isAbsolute(this.toString());
  }

  joinpath(...other: string[]) {
    return Path.from(join(...this.#segments, ...other));
  }

  resolve() {
    return Path.from(resolve(this.toString()));
  }

  stat() {
    return Deno.stat(this.toString());
  }

  toFileUrl() {
    return toFileUrl(this.toString());
  }

  toString() {
    return join(...this.#segments);
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

  ensureFile() {
    return ensureFile(this.toString());
  }

  readFile(options?: Deno.ReadFileOptions) {
    return Deno.readFile(this.toString(), options);
  }

  writeFile(data: Uint8Array, options?: Deno.WriteFileOptions) {
    return Deno.writeFile(this.toString(), data, options);
  }

  readTextFile(options?: Deno.ReadFileOptions) {
    return Deno.readTextFile(this.toString(), options);
  }

  writeTextFile(data: string, options?: Deno.WriteFileOptions) {
    return Deno.writeTextFile(this.toString(), data, options);
  }

  async readJsonFile<T>(options?: Deno.ReadFileOptions) {
    return JSON.parse(await this.readTextFile(options)) as T;
  }

  writeJsonFile(
    // deno-lint-ignore no-explicit-any
    value: any,
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

  [Symbol.for("Deno.customInspect")]() {
    return `${this.constructor.name} { ${this.toString()} }`;
  }
}
