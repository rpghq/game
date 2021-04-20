import { Resource } from './resource';
import { Trigger } from './trigger';

export class System {
  resources: Record<string, Resource>;
  trigger: Trigger;

  constructor(resources: Record<string, Resource>, trigger: Trigger) {
    this.resources = resources;
    this.trigger = trigger;
  }
}
