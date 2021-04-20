import { EntityList } from './entity';

export abstract class System {
  public readonly query: unknown;

  constructor(query: unknown) {
    this.query = query;
  }

  abstract run(entity: EntityList): Promise<void>;
}
