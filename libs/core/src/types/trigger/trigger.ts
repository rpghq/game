export class Trigger<TArgs = Record<string, unknown>, TRes = Record<string, unknown>> {
  public readonly args: TArgs;
  public readonly res: TRes;

  constructor(args: TArgs, res: TRes) {
    this.args = args;
    this.res = res;
  }
}
