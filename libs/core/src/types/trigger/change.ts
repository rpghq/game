import { Entity } from '../entity';
import { Query, QueryModifier } from '../resource';
import { Trigger } from './trigger';

export type ChangeTriggerInput = {
  source: Entity;
};

export type ChangeTriggerOutput = Record<string, never>;

export class ChangeTrigger extends Trigger<ChangeTriggerInput, ChangeTriggerOutput> {
  public readonly source: Query<QueryModifier.SINGLE>;

  constructor(source: Query<QueryModifier.SINGLE>) {
    super();
    this.source = source;
  }
}
