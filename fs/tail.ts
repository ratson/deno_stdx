import { readLines } from "https://deno.land/std@0.219.1/io/read_lines.ts";

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
          this.dispatchEvent(new CustomEvent("line", { detail: { line } }));
          yield line;
        }
      } catch (error) {
        this.dispatchEvent(new CustomEvent("error", { detail: { error } }));
        continue;
      }
    }
  }

  close() {
    this.#watcher?.close();
    this.#file?.close();

    this.dispatchEvent(new Event("close"));
  }
}
