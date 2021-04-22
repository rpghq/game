import { QueryParameter } from '../../types';
import { Query, QueryModifier } from '../resource';
import { Trigger } from './trigger';

export class ChangeTrigger<T extends Query<QueryModifier.SINGLE>> extends Trigger<{
  query: QueryParameter<T, true>;
}> {
  public readonly query: T;

  constructor(query: T) {
    super({ query: new QueryParameter(query, true) }, {});
    this.query = query;
  }
}
