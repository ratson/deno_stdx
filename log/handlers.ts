import { ConsoleHandler } from "https://deno.land/std@0.211.0/log/handlers.ts";

export class BufferHandler extends ConsoleHandler {
  public readonly messages: string[] = [];

  public log(msg: string) {
    this.messages.push(msg);
  }

  public flush() {
    for (const m of this.messages) {
      super.log(m);
    }
    this.messages.length = 0
  }
}
