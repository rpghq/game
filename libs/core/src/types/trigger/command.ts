import { Entity } from 'types/entity';
import { Command, CommandParameter } from '../command';

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
  TCommand extends Command<Record<string, CommandParameter<boolean>>, Record<string, CommandParameter<boolean>>>
> {
  public readonly command: TCommand;

  constructor(command: TCommand) {
    this.command = command;
  }
}
