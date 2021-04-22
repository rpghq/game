import { Parameter } from '../schema';

export class Event<TArgs extends Record<string, Parameter<boolean>>> {
  args: TArgs;

  constructor(args: TArgs) {
    this.args = args;
  }
}
