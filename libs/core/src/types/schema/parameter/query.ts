import { Query, QueryModifier } from '../../resource';
import { Parameter } from './parameter';

export class QueryParameter<T extends Query<QueryModifier>, U extends boolean> implements Parameter<U> {
  public readonly query: T;
  public readonly required: U;

  constructor(query: T, required: U) {
    this.query = query;
    this.required = required;
  }
}
