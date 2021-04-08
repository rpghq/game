import { EntityList, System } from '@rpghq/core';
import { VehicleEngine } from 'components';

export class BurnFuel extends System {
  async run(entities: EntityList): Promise<void> {
    for (const entity of entities) {
      const engine = await entity.get(VehicleEngine);

      if (engine.running) {
        if (engine.fuel <= 0) {
          entity.update(VehicleEngine, { ...engine, running: false });
        } else {
          entity.update(VehicleEngine, { ...engine, fuel: engine.fuel - 0.1 });
        }
      }
    }
  }
}
