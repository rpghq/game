import { Criteria, Query, QueryModifier } from '../resource';

export class CommandParameter<T extends boolean> {
  public readonly required: T;

  constructor(required: T) {
    this.required = required;
  }
}

export type PrimitiveConstructorTypes = NumberConstructor | StringConstructor | BooleanConstructor;

export class PrimitiveParameter<T extends PrimitiveConstructorTypes, U extends boolean> extends CommandParameter<U> {
  public readonly value: T;

  constructor(value: T, required: U) {
    super(required);
    this.value = value;
  }
}

export class QueryParameter<T extends QueryModifier, U extends boolean> extends CommandParameter<U> {
  public readonly query: Query<T>;

  constructor(criteria: Criteria, modifier: T, required: U) {
    super(required);
    this.query = new Query(criteria, modifier);
  }
}
