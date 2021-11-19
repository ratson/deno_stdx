import { exists } from "https://deno.land/std@0.108.0/fs/exists.ts";
import {
  basename,
  isAbsolute,
  join,
  resolve,
} from "https://deno.land/std@0.108.0/path/mod.ts";
import { userHomeDir } from "../os/mod.ts";

export class Path {
  #path: string[];

  private constructor(...pathSegments: string[]) {
    this.#path = pathSegments;
  }

  static cwd(...pathSegments: string[]) {
    return Path.from(Deno.cwd(), ...pathSegments);
  }

  static from(...pathSegments: string[]) {
    return Object.freeze(new this(...pathSegments));
  }

  static fromImportMeta(importMeta: ImportMeta, url = "") {
    return Path.from(new URL(url, importMeta.url).pathname);
  }

  static home(...pathSegments: string[]) {
    const p = userHomeDir();
    if (!p) throw new Error("cannot determine user home path");
    return Path.from(p, ...pathSegments);
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

  exists() {
    return exists(this.toString());
  }

  isAbsolute() {
    return isAbsolute(this.toString());
  }

  joinpath(...other: string[]) {
    return Path.from(join(...this.#path, ...other));
  }

  resolve() {
    return Path.from(resolve(this.toString()));
  }

  stat() {
    return Deno.stat(this.toString());
  }

  toString() {
    return join(...this.#path);
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
}
