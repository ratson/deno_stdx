import { iterateReader } from "https://deno.land/std@0.218.2/streams/iterate_reader.ts";

const BACKSPACE = 0x7F;
const CR = 0x0D;
const CTRL_C = 0x03;
const CTRL_D = 0x04;
const LF = 0x0A;

/**
 * @deprecated Use `promptSecret()` from `cli/prompt_secret` instead.
 */
export async function inputPassword({
  prompt = "Password: ",
  reader = Deno.stdin,
  writer = Deno.stderr,
} = {}) {
  const istty = Deno.isatty(reader.rid);
  const ret: number[] = [];
  try {
    if (istty) reader.setRaw(true);
    await writer.write(new TextEncoder().encode(prompt));

    for await (const chunk of iterateReader(reader)) {
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
    if (istty) reader.setRaw(false);
    await writer.write(Uint8Array.of(CR, LF));
  }
  return new TextDecoder().decode(Uint8Array.from(ret));
}
