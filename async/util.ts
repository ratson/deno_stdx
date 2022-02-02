export function createAbortError(msg: string) {
  return new DOMException(msg, "AbortError");
}
