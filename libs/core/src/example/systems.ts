import { Handler } from 'executor/system';
import { system, fetch, seconds } from 'executor/system-builder';
import { Vehicle, VehicleEngine } from './components';

export const BurnFuel = system(
  {
    vehicles: fetch([Vehicle, VehicleEngine]),
  },
  seconds(60),
);

export const burnFuelHandler: Handler<typeof BurnFuel> = ({ vehicles }) => {
  for (const vehicle of vehicles) {
    const engine = vehicle.get(VehicleEngine);
    if (engine.running) {
      if (engine.fuel > 0) {
        engine.fuel -= 0.1;
      } else {
        engine.running = false;
      }
      vehicle.update(VehicleEngine, engine);
    }
  }
};
