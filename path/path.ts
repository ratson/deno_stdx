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

  constructor(...pathSegments: string[]) {
    this.#path = pathSegments;
  }

  static cwd() {
    return new Path(Deno.cwd());
  }

  static fromImportMeta(importMeta: ImportMeta, url = "") {
    return new Path(new URL(url, importMeta.url).pathname);
  }

  static home() {
    return new Path(userHomeDir()!);
  }

  get name() {
    return basename(this.toString());
  }

  exists() {
    return exists(join(...this.#path));
  }

  isAbsolute() {
    return isAbsolute(this.toString());
  }

  joinpath(...other: string[]) {
    return new Path(join(...this.#path, ...other));
  }

  toString() {
    return resolve(...this.#path);
  }

  stat() {
    return Deno.stat(this.toString());
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
