import { Parameter } from '../../types';
import { Command } from './command';
import { Event } from './event';

export type ChannelTypes =
  | Event<Record<string, Parameter<boolean>>>
  | Command<Record<string, Parameter<boolean>>, Record<string, Parameter<boolean>>>;
