import { command } from '@rpghq/core';
import { Spawned } from './components/spawned';
import { Character, Player, Vehicle, VehicleEngine, VehicleLock } from './components';
import { Admin } from 'components/player/admin';

export const TurnEngineOn = command([Character, Spawned], [Vehicle, Spawned, VehicleEngine]);
export const ShutEngineOff = command([Character, Spawned], [Vehicle, Spawned, VehicleEngine]);

export const LockVehicle = command([Character, Spawned], [Vehicle, Spawned, VehicleLock]);
export const UnlockVehicle = command([Character, Spawned], [Vehicle, Spawned, VehicleLock]);

export const KickPlayer = command<{ reason: string }>(
  {
    includes: [Player, Admin],
  },
  {
    includes: [Player, Spawned],
    optional: [Admin],
  },
);
