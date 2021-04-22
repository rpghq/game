import { Trigger } from './trigger';

export class CronTrigger extends Trigger {
  public readonly expression: string;

  constructor(expression: string) {
    super({}, {});
    this.expression = expression;
  }
}
