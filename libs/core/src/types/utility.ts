export type Constructor<T> = { new (...args: unknown[]): T };
export type Iterable<T> = {
  [Symbol.iterator](): IterableIterator<T>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Meta<T, _ = void> = T;
