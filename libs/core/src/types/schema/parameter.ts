import { Query, QueryModifier } from '../resource';

export interface Parameter<T extends boolean> {
  readonly required: T;
}

export type PrimitiveConstructorTypes = NumberConstructor | StringConstructor | BooleanConstructor;

export class PrimitiveParameter<T extends PrimitiveConstructorTypes, U extends boolean> implements Parameter<U> {
  public readonly value: T;
  public readonly required: U;

  constructor(value: T, required: U) {
    this.value = value;
    this.required = required;
  }
}

export class QueryParameter<T extends Query<QueryModifier>, U extends boolean> implements Parameter<U> {
  public readonly query: T;
  public readonly required: U;

  constructor(query: T, required: U) {
    this.query = query;
    this.required = required;
  }
}
