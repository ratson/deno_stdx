import { iterateReader } from "https://deno.land/std@0.192.0/streams/iterate_reader.ts";

const BACKSPACE = 0x7F;
const CR = 0x0D;
const CTRL_C = 0x03;
const CTRL_D = 0x04;
const LF = 0x0A;

export async function inputPassword(prompt = "Password: ") {
  const istty = Deno.isatty(Deno.stdin.rid);
  const ret: number[] = [];
  try {
    if (istty) Deno.stdin.setRaw(true);
    Deno.stdout.write(new TextEncoder().encode(prompt));

    for await (const chunk of iterateReader(Deno.stdin)) {
      for (const ch of chunk) {
        switch (ch) {
          case CR:
          case LF:
          case CTRL_D:
            return new TextDecoder().decode(Uint8Array.from(ret));
          case CTRL_C:
            return;
          case BACKSPACE: {
            ret.pop();
            break;
          }
          default: {
            ret.push(ch);
            break;
          }
        }
      }
      if (!istty) break;
    }
  } finally {
    if (istty) Deno.stdin.setRaw(false);
    await Deno.stdout.write(Uint8Array.of(CR, LF));
  }
  return new TextDecoder().decode(Uint8Array.from(ret));
}
