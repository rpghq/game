import { Entity } from 'types/entity';
import { Command } from '../command';
import { Trigger } from './trigger';

export type CommandTriggerInput<TParameters> = {
  source: Entity;
  parameters: {
    [TKey in keyof TParameters]: TParameters[TKey];
  };
};

export type CommandTriggerOutput<TSuccess extends boolean, TExtra> = {
  success: TSuccess;
  message?: string;
} & TExtra;

export class CommandTrigger<
  TInput extends CommandTriggerInput<unknown>,
  TOutput extends CommandTriggerOutput<boolean, unknown>
> extends Trigger<TInput, TOutput> {
  public readonly command: Command;

  constructor(command: Command) {
    super();
    this.command = command;
  }
}
