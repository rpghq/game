import {
  Command,
  CommandParameter,
  Criteria,
  Entity,
  Meta,
  PrimitiveParameter,
  Query,
  QueryModifier,
  QueryParameter,
  PrimitiveConstructorTypes,
} from '../types';

export type CommandMeta<TInput, TOutput> = unknown;

export function command<T extends Record<string, CommandParameter<boolean>>>(
  source: Criteria,
  parameters: T,
): Meta<Command, ParametersResult<T>> {
  return new Command(new Query(source, QueryModifier.SINGLE), parameters) as Meta<Command, ParametersResult<T>>;
}

export function required<T extends PrimitiveConstructorTypes>(
  parameter: T | PrimitiveParameter<T, boolean>,
): PrimitiveParameter<T, true> {
  if (parameter instanceof PrimitiveParameter) {
    return new PrimitiveParameter(parameter.value, true);
  } else {
    return new PrimitiveParameter(parameter, true);
  }
}

export function optional<T extends PrimitiveConstructorTypes>(
  parameter: T | PrimitiveParameter<T, boolean>,
): PrimitiveParameter<T, false> {
  if (parameter instanceof PrimitiveParameter) {
    return new PrimitiveParameter(parameter.value, false);
  } else {
    return new PrimitiveParameter(parameter, false);
  }
}

const params = { lgm: required(Number), mgl: optional(String) };
const cmd = command(1 as any, params);

type Lel<T> = T extends Meta<infer U, infer V> ? V : never;
type A = Lel<typeof cmd>;

type B = ParametersResult<typeof params>;

type ParametersResult<T> = {
  [P in keyof T]: T[P] extends PrimitiveParameter<infer U, infer V>
    ? MapRequired<MapPrimitive<U>, V>
    : T[P] extends QueryParameter<infer U, infer V>
    ? MapRequired<MapQuery<U>, V>
    : never;
};

type MapPrimitive<T> = T extends NumberConstructor
  ? number
  : T extends StringConstructor
  ? string
  : T extends BooleanConstructor
  ? boolean
  : never;

type MapQuery<T> = T extends QueryModifier.MULTI
  ? Iterable<Entity>
  : T extends QueryModifier.SINGLE
  ? Entity | undefined
  : never;

type MapRequired<T, V> = V extends false ? T | undefined : T;
