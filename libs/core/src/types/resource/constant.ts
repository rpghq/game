import { Resource } from './resource';

export type ConstantTypes = number | string | boolean;

export class Constant<T extends ConstantTypes> extends Resource<T> {
  public readonly value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }
}
