import { Parameter, Query, QueryModifier, Resource, System, Trigger } from '../types';

export function system<
  TResources extends Record<string, Resource>,
  TSource extends Query<QueryModifier.SINGLE> | void = void,
  TArgs extends Record<string, Parameter<boolean>> = Record<string, never>,
  TRes extends Record<string, Parameter<boolean>> = Record<string, never>
>(resources: TResources, trigger: Trigger<TSource, TArgs, TRes>): System<TResources, TSource, TArgs, TRes> {
  return new System(resources, trigger);
}
