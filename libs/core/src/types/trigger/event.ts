import { Event } from '../event';
import { Constructor } from '../utility';
import { Trigger } from './trigger';

export type EventTriggerInput<T> = {
  source: T;
};

export type EventTriggerOutput = Record<string, never>;

export class EventTrigger<T extends Event> extends Trigger<EventTriggerInput<T>, EventTriggerOutput> {
  public readonly event: Constructor<T>;

  constructor(event: Constructor<T>) {
    super();
    this.event = event;
  }
}
