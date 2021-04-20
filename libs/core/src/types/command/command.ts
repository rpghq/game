import { Query, QueryModifier } from '../resource';
import { CommandParameter } from './parameter';

export class Command {
  source: Query<QueryModifier.SINGLE>;
  parameters: Record<string, CommandParameter>;

  constructor(source: Query<QueryModifier.SINGLE>, parameters: Record<string, CommandParameter>) {
    this.source = source;
    this.parameters = parameters;
  }
}
