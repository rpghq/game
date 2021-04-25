import { Parameter } from '../../types';
import { Event } from '../channel';
import { Trigger } from './trigger';

export class EventTrigger<T extends Record<string, Parameter<boolean>>> extends Trigger<void, T> {
  public readonly event: Event<T>;

  constructor(event: Event<T>) {
    super(undefined, event.args, {});
    this.event = event;
  }
}
