import { Entity } from '../entity';
import { Criteria } from '../resource';
import { Trigger } from './trigger';

export type ChangeTriggerInput = {
  source: Entity;
};

export type ChangeTriggerOutput = Record<string, never>;

export class ChangeTrigger extends Trigger<ChangeTriggerInput, ChangeTriggerOutput> {
  public readonly criteria: Criteria;

  constructor(criteria: Criteria) {
    super();
    this.criteria = criteria;
  }
}
