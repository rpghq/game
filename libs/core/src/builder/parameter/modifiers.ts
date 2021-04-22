import { MapSchemaValue, schemaValueFromInput, SchemaValueInput } from './schema';

export function required<TInput extends SchemaValueInput, TSchemaValue extends MapSchemaValue<TInput, true>>(
  input: TInput,
): TSchemaValue {
  return schemaValueFromInput(input, true);
}

export function optional<TInput extends SchemaValueInput, TSchemaValue extends MapSchemaValue<TInput, false>>(
  input: TInput,
): TSchemaValue {
  return schemaValueFromInput(input, false);
}
