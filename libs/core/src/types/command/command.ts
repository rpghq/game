import { Query, QueryModifier } from '../resource';
import { CommandParameter } from './parameter';

export class Command<
  TArgs extends Record<string, CommandParameter<boolean>>,
  TRes extends Record<string, CommandParameter<boolean>>
> {
  source: Query<QueryModifier.SINGLE>;
  args: TArgs;
  res: TRes;

  constructor(source: Query<QueryModifier.SINGLE>, args: TArgs, res: TRes) {
    this.source = source;
    this.args = args;
    this.res = res;
  }
}
