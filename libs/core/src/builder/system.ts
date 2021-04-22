import { Resource, System, Trigger } from '../types';

export type Handler<T> = T extends RichSystem<infer U, infer V, infer W>
  ? (resources: U, trigger: V) => W | Promise<W>
  : never;

export type RichSystem<TResources, TTrigger, TResult> = System;

type PullTriggerInput<T> = T extends Trigger<infer TInput, infer TOutput> ? TInput : never;
type PullTriggerOutput<T> = T extends Trigger<infer TInput, infer TOutput> ? TOutput : never;

export function system<T extends Record<string, Resource<unknown>>, U extends Trigger>(
  resources: T,
  trigger: U,
): RichSystem<T, PullTriggerInput<U>, PullTriggerOutput<U>> {
  return new System(resources, trigger);
}
