export type Key = string | number | symbol;
export type PropertyPath = Array<Key> | string;

function get<T = string>(
  input: string,
  path: Array<number>,
  defaultValue?: T,
): T;
function get(input: null | undefined, path: PropertyPath): undefined;
function get<T>(
  input: Array<unknown>,
  path: PropertyPath,
  defaultValue?: T,
): T;
function get<T>(
  input: Record<Key, unknown> | null | undefined,
  path: PropertyPath,
  defaultValue?: T,
): T;
function get(
  // deno-lint-ignore no-explicit-any
  input: any,
  path: PropertyPath,
  defaultValue?: unknown,
): unknown {
  const p = Array.isArray(path) ? path : path.split(".");

  let o = input;
  for (const k of p) {
    if (o === undefined) {
      break;
    } else if (o === null) {
      o = undefined;
      break;
    }
    o = o[k];
  }
  return o === undefined ? defaultValue : o;
}
export { get };
