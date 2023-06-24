export function indent(s: string, n: number, char = " ") {
  return s.replace(/^/gm, char.repeat(n));
}
