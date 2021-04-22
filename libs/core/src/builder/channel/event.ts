import { Event } from '../../types';
import { MapSchema, schemaFromInput, SchemaValueInput } from '../schema';

export function event<TArgs extends Record<string, SchemaValueInput>>(args: TArgs): Event<MapSchema<TArgs>> {
  return new Event(schemaFromInput(args));
}
