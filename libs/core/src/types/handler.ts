import { System } from './system';

export type Handler<T> = T extends System<infer TResources, infer TSource, infer TArgs, infer TRes>
  ? (resources: TResources, trigger: { source: TSource; parameters: TArgs }) => TRes
  : never;
