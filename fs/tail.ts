import { readLines } from "https://deno.land/std@0.132.0/io/buffer.ts";

export class Tail extends EventTarget {
  #filename: string;

  #file?: Deno.FsFile;
  #watcher?: Deno.FsWatcher;

  constructor(filename: string) {
    super();

    this.#filename = filename;
  }

  async *start() {
    this.#file = await Deno.open(this.#filename);
    this.#watcher = Deno.watchFs(this.#filename);

    await Deno.seek(this.#file.rid, 0, Deno.SeekMode.End);

    for await (const event of this.#watcher) {
      if (event.kind !== "modify") continue;

      try {
        for await (const line of readLines(this.#file)) {
          this.dispatchEvent(new CustomEvent("line", { detail: line }));
          yield line;
        }
      } catch {
        continue;
      }
    }
  }

  close() {
    this.#watcher?.close();
    this.#file?.close();
  }
}
