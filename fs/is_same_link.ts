import { resolve } from "https://deno.land/std@0.217.0/path/resolve.ts";

export async function isSameLink(src: string, dest: string) {
  const p1 = resolve(src);
  const p2 = resolve(dest);

  if (p1 === p2) return true;

  const [file1Info, file2Info] = await Promise.all([
    Deno.lstat(src),
    Deno.lstat(dest),
  ]);
  return file1Info.dev === file2Info.dev && file1Info.ino === file2Info.ino;
}
