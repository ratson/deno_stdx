/**
 * A noop template literal tag for syntax highlighting hints.
 */
export function noop(strings: TemplateStringsArray, ...keys: unknown[]) {
  const lastIndex = strings.length - 1;
  return strings
    .slice(0, lastIndex)
    .reduce((p, s, i) => `${p}${s}${keys[i]}`, "") +
    strings[lastIndex];
}
