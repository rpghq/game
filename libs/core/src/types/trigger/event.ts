import { Parameter } from '../../types';
import { Event } from '../channel';
import { Trigger } from './trigger';

export class EventTrigger<T extends Record<string, Parameter<boolean>>> extends Trigger<T, Record<string, never>> {
  public readonly event: Event<T>;

  constructor(event: Event<T>) {
    super(event.args, {});
    this.event = event;
  }
}
