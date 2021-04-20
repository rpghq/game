import { Criteria, Query, QueryModifier } from '../resource';

export class CommandParameter {
  public readonly required: boolean;

  constructor(required: boolean) {
    this.required = required;
  }
}

export class PrimitiveParameter<
  T extends NumberConstructor | StringConstructor | BooleanConstructor
> extends CommandParameter {
  public readonly value: T;

  constructor(required: boolean, value: T) {
    super(required);
    this.value = value;
  }
}

export class QueryParameter<T extends QueryModifier> extends CommandParameter {
  public readonly query: Query<T>;

  constructor(required: boolean, criteria: Criteria, modifier: T) {
    super(required);
    this.query = new Query(criteria, modifier);
  }
}
