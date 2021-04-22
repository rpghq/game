import { Query, QueryModifier } from '../resource';
import { Parameter } from '../schema';

export class Command<
  TArgs extends Record<string, Parameter<boolean>>,
  TRes extends Record<string, Parameter<boolean>>
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
