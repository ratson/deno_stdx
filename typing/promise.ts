/**
 * Return the given type or a Promise containing that type.
 */
export type PromiseOr<T> = Promise<T> | T;

export type PromiseResolve<T = void> = (value: PromiseLike<T> | T) => void;
