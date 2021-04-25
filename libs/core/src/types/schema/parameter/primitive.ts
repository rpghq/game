import { Parameter } from './parameter';

export type PrimitiveConstructorTypes = NumberConstructor | StringConstructor | BooleanConstructor;

export class PrimitiveParameter<T extends PrimitiveConstructorTypes, U extends boolean> implements Parameter<U> {
  public readonly value: T;
  public readonly required: U;

  constructor(value: T, required: U) {
    this.value = value;
    this.required = required;
  }
}
