import { Query, QueryModifier } from '../resource';
import { Command } from '../channel';
import { Parameter } from '../schema';
import { Trigger } from './trigger';

export class CommandTrigger<
  TArgs extends Record<string, Parameter<boolean>>,
  TRes extends Record<string, Parameter<boolean>>
> extends Trigger<{ source: Query<QueryModifier.SINGLE>; params: TArgs }, TRes> {
  public readonly command: Command<TArgs, TRes>;

  constructor(command: Command<TArgs, TRes>) {
    super({ source: command.source, params: command.args }, command.res);
    this.command = command;
  }
}
