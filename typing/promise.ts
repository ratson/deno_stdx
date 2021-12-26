/**
 * Return the given type or a Promise containing that type.
 */
export type PromiseOr<T> = Promise<T> | T;
