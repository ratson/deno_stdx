const notCalled = Symbol("notCalled");

export function lazy<T = unknown>(f: () => T) {
  let result: T | typeof notCalled = notCalled;

  return () => {
    if (result === notCalled) result = f();
    return result;
  };
}
