import { ChangeTrigger, Component, Constructor, Criteria, CriteriaItem, Event, EventTrigger } from '../types';
import { and } from './resource/query';

export function change(...items: (Criteria | CriteriaItem | Constructor<Component>)[]): ChangeTrigger {
  return new ChangeTrigger(and(...items));
}

export function event<T extends Event>(event: Constructor<T>): EventTrigger<T> {
  return new EventTrigger(event);
}
