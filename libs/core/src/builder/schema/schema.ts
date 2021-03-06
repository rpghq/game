import {
  Parameter,
  Component,
  Constructor,
  Criteria,
  CriteriaItem,
  CriteriaModifier,
  PrimitiveParameter,
  Query,
  QueryModifier,
  QueryParameter,
} from '../../types';

export type SchemaValueInput =
  | NumberConstructor
  | StringConstructor
  | BooleanConstructor
  | Constructor<Component>
  | Criteria
  | Query<QueryModifier>
  | Parameter<boolean>;

export type MapSchemaValue<
  TInput extends SchemaValueInput,
  TRequired extends boolean = true
> = TInput extends NumberConstructor
  ? PrimitiveParameter<NumberConstructor, TRequired>
  : TInput extends StringConstructor
  ? PrimitiveParameter<StringConstructor, TRequired>
  : TInput extends BooleanConstructor
  ? PrimitiveParameter<BooleanConstructor, TRequired>
  : TInput extends Constructor<Component>
  ? QueryParameter<Query<QueryModifier.SINGLE>, TRequired>
  : TInput extends Criteria
  ? QueryParameter<Query<QueryModifier.SINGLE>, TRequired>
  : TInput extends Query<QueryModifier>
  ? QueryParameter<TInput, TRequired>
  : TInput extends PrimitiveParameter<infer T, boolean>
  ? PrimitiveParameter<T, TRequired>
  : TInput extends QueryParameter<infer T, boolean>
  ? QueryParameter<T, TRequired>
  : never;

function isParamNumber(param: unknown): param is NumberConstructor {
  return param === Number;
}

function isParamString(param: unknown): param is StringConstructor {
  return param === String;
}

function isParamBoolean(param: unknown): param is BooleanConstructor {
  return param === Boolean;
}

export function schemaValueFromInput<
  TInput extends SchemaValueInput,
  TRequired extends boolean,
  TSchemaValue extends MapSchemaValue<TInput, TRequired>
>(input: TInput, required: TRequired): TSchemaValue {
  if (isParamNumber(input)) {
    return (new PrimitiveParameter(input, required !== false) as unknown) as TSchemaValue;
  } else if (isParamString(input)) {
    return (new PrimitiveParameter(input, required !== false) as unknown) as TSchemaValue;
  } else if (isParamBoolean(input)) {
    return (new PrimitiveParameter(input, required !== false) as unknown) as TSchemaValue;
  } else if ((input as Constructor<Component>).prototype instanceof Component) {
    return (new QueryParameter(
      new Query(
        new Criteria([new CriteriaItem(input as Constructor<Component>, true)], CriteriaModifier.AND),
        QueryModifier.SINGLE,
      ),
      required !== false,
    ) as unknown) as TSchemaValue;
  } else if (input instanceof Criteria) {
    return (new QueryParameter(new Query(input, QueryModifier.SINGLE), required !== false) as unknown) as TSchemaValue;
  } else if (input instanceof Query) {
    return (new QueryParameter(input, required !== false) as unknown) as TSchemaValue;
  } else if (input instanceof PrimitiveParameter) {
    return (new PrimitiveParameter(input.value, required !== false) as unknown) as TSchemaValue;
  } else if (input instanceof QueryParameter) {
    return (new QueryParameter(input.query, required !== false) as unknown) as TSchemaValue;
  } else {
    throw new Error('unexpected parameter value');
  }
}

export type MapSchema<TInput extends Record<string, SchemaValueInput>> = {
  [TInputKey in keyof TInput]: TInput[TInputKey] extends Parameter<infer TRequired>
    ? MapSchemaValue<TInput[TInputKey], TRequired>
    : MapSchemaValue<TInput[TInputKey], true>;
};

export function schemaFromInput<T extends Record<string, SchemaValueInput>>(list: T): MapSchema<T> {
  const map = Object.entries(list).map(([key, value]) => {
    if (value instanceof PrimitiveParameter) {
      return [key, schemaValueFromInput(value, value.required)];
    } else if (value instanceof QueryParameter) {
      return [key, schemaValueFromInput(value, value.required)];
    } else {
      return [key, schemaValueFromInput(value, true)];
    }
  });
  return Object.fromEntries(map);
}
