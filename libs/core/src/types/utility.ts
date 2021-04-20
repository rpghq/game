export type Constructor<T> = { new (...args: unknown[]): T };
export type Iterable<T> = {
  [Symbol.iterator](): IterableIterator<T>;
};
