import { Command, Component, Constructor, Query, QueryModifier } from '../types';
import { MapSchema, schemaFromInput, SchemaValueInput } from './parameter';
import { single } from './resource';

export function command<TArgs extends Record<string, SchemaValueInput>, TRes extends Record<string, SchemaValueInput>>(
  source: Query<QueryModifier.SINGLE> | Constructor<Component> | Constructor<Component>[],
  args: TArgs,
  res: TRes,
): Command<MapSchema<TArgs>, MapSchema<TRes>> {
  return new Command(
    source instanceof Query ? source : single(...(Array.isArray(source) ? source : [source])),
    schemaFromInput(args),
    schemaFromInput(res),
  );
}
