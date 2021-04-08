import { Command, Entity } from '@rpghq/core';
import { Character, VehicleEngine } from 'components';

interface Input {
  actor: Entity;
  target: Entity;
}

interface Output {
  success: boolean;
}

export class ShutEngineOff extends Command<Input, Output> {
  async run({ actor, target }: Input): Promise<Output> {
    if ((await actor.has(Character)) && (await target.has(VehicleEngine))) {
      const engine = await target.get(VehicleEngine);
      if (engine.running) {
        target.update(VehicleEngine, { ...engine, running: false });
        return { success: true };
      }
    }
    return { success: false };
  }
}
