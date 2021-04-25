import { Query, QueryModifier } from '../resource';
import { Trigger } from './trigger';

export class ChangeTrigger extends Trigger<Query<QueryModifier.SINGLE>> {
  constructor(source: Query<QueryModifier.SINGLE>) {
    super(source, {}, {});
  }
}
