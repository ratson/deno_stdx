import { ensureDir, ensureFile } from "https://deno.land/std@0.115.1/fs/mod.ts";
import {
  basename,
  extname,
  fromFileUrl,
  isAbsolute,
  join,
  resolve,
  toFileUrl,
} from "https://deno.land/std@0.115.1/path/mod.ts";
import { userHomeDir } from "../os/mod.ts";

export class Path {
  readonly #segments: string[];

  private constructor(...pathSegments: string[]) {
    this.#segments = pathSegments;
  }
  static gcModulo = 128;
  static #counter = 0;
  static #pathMap = new Map<string, WeakRef<Readonly<Path>>>();

  static cwd(...pathSegments: string[]) {
    return Path.from(Deno.cwd(), ...pathSegments);
  }

  static from(...pathSegments: string[]) {
    const k = [pathSegments.length.toString()].concat(pathSegments).join(
      ":|\0",
    );
    const m = this.#pathMap;
    const v = m.get(k)?.deref();
    if (v) return v;

    const p = Object.freeze(new this(...pathSegments));
    m.set(k, new WeakRef(p));

    this.#counter += 1;
    if (this.#counter % this.gcModulo === 0) this.gc();

    return p;
  }

  static fromFileUrl(url: string | URL) {
    return Path.from(fromFileUrl(url));
  }

  static fromImportMeta(importMeta: ImportMeta, url = "") {
    return Path.fromFileUrl(new URL(url, importMeta.url));
  }

  static home(...pathSegments: string[]) {
    const p = userHomeDir();
    if (!p) throw new Error("cannot determine user home path");
    return Path.from(p, ...pathSegments);
  }

  static gc() {
    const m = this.#pathMap;
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

  equals(otherPath: Readonly<Path>) {
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

  [Symbol.for("Deno.customInspect")]() {
    return `${this.constructor.name} { ${this.toString()} }`;
  }
}
