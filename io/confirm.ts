import { readLines } from "https://deno.land/std@0.190.0/io/read_lines.ts";

export async function confirm(
  message: string,
  { default: choice = true }: { default?: boolean } = {},
) {
  const choices = choice ? "Y/n" : "y/N";

  const text = new TextEncoder().encode(`${message} [${choices}] `);
  await Deno.write(Deno.stdout.rid, text);

  for await (const s of readLines(Deno.stdin)) {
    const c = s.toLowerCase();
    if (c) {
      return c === "y";
    } else {
      break;
    }
  }
  return choice;
}
