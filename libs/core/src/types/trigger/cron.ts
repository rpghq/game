import { Trigger } from './trigger';

export type CronTriggerInput = Record<string, never>;

export type CronTriggerOutput = Record<string, never>;

export class CronTrigger extends Trigger<CronTriggerInput, CronTriggerOutput> {
  public readonly expression: string;

  constructor(expression: string) {
    super();
    this.expression = expression;
  }
}
