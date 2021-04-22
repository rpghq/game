import { ChannelTypes } from './types';

export interface Container {
  registerChannel: (element: ChannelTypes) => void;
}
