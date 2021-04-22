import { Parameter } from '../schema';
import { Command } from '../channel';
import { Entity } from '../entity';

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
  TCommand extends Command<Record<string, Parameter<boolean>>, Record<string, Parameter<boolean>>>
> {
  public readonly command: TCommand;

  constructor(command: TCommand) {
    this.command = command;
  }
}
