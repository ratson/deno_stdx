const notCalled = Symbol("notCalled");

export function once<T = unknown>(f: () => T) {
  let result: T | typeof notCalled = notCalled;

  return () => {
    if (result === notCalled) result = f();
    return result;
  };
}
