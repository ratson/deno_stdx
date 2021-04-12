import { exists } from "https://deno.land/std@0.92.0/fs/mod.ts";
import {
  basename,
  isAbsolute,
  join,
  resolve,
} from "https://deno.land/std@0.92.0/path/mod.ts";
import { userHomeDir } from "../os/mod.ts";

export class Path {
  #path: string[];

  constructor(...pathSegments: string[]) {
    this.#path = pathSegments;
  }

  static cwd() {
    return new Path(Deno.cwd());
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
}
