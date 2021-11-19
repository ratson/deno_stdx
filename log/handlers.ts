import { ConsoleHandler } from "https://deno.land/std@0.115.1/log/handlers.ts";

export class BufferHandler extends ConsoleHandler {
  public readonly messages: string[] = [];

  public log(msg: string) {
    this.messages.push(msg);
  }

  public flush() {
    while (true) {
      const msg = this.messages.shift();
      if (!msg) break;
      super.log(msg);
    }
  }
}
