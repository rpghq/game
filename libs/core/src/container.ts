import { Command, Component, Constructor, Event, System } from './types';

export type EntryTypes = Constructor<Component> | Constructor<Event> | Command | System;

export interface Container {
  register: (element: EntryTypes) => void;
}
