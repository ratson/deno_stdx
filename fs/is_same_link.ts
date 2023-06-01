export async function isSameLink(src: string | URL, dest: string | URL) {
  const [file1Info, file2Info] = await Promise.all([
    Deno.lstat(src),
    Deno.lstat(dest),
  ]);
  return file1Info.dev === file2Info.dev && file1Info.ino === file2Info.ino;
}
