import { Query, QueryModifier, Resource } from './resource';
import { Parameter } from './schema';
import { Trigger } from './trigger';

export class System<
  TResources extends Record<string, Resource>,
  TSource extends Query<QueryModifier.SINGLE> | void = void,
  TArgs extends Record<string, Parameter<boolean>> = Record<string, never>,
  TRes extends Record<string, Parameter<boolean>> = Record<string, never>
> {
  resources: TResources;
  trigger: Trigger<TSource, TArgs, TRes>;

  constructor(resources: TResources, trigger: Trigger<TSource, TArgs, TRes>) {
    this.resources = resources;
    this.trigger = trigger;
  }
}
