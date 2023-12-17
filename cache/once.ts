const notCalled = Symbol("notCalled");

export function once<T>(f: () => T) {
  let result: T | typeof notCalled = notCalled;

  return () => {
    if (result === notCalled) result = f();
    return result;
  };
}
