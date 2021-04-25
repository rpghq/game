import { CronTrigger } from '../../types';

export function cron(expression: string): CronTrigger {
  return new CronTrigger(expression);
}
