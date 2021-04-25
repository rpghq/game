import { Parameter, Query, QueryModifier } from '../../types';

export class Trigger<
  TSource extends Query<QueryModifier.SINGLE> | void = void,
  TArgs extends Record<string, Parameter<boolean>> = Record<string, never>,
  TRes extends Record<string, Parameter<boolean>> = Record<string, never>
> {
  public readonly source: TSource;
  public readonly args: TArgs;
  public readonly res: TRes;

  constructor(source: TSource, args: TArgs, res: TRes) {
    this.source = source;
    this.args = args;
    this.res = res;
  }
}
