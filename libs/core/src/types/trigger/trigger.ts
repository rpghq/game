export class Trigger<TArgs, TRes> {
  public readonly args: TArgs;
  public readonly res: TRes;

  constructor(args: TArgs, res: TRes) {
    this.args = args;
    this.res = res;
  }
}
