import { findMany } from '../query';
import { MakeHandler, System, SystemParameters } from './system';

export const fetch = findMany;

export function system<TParams extends SystemParameters>(
  parameters: TParams,
  schedule: number,
): System<MakeHandler<TParams>> {
  return {
    schedule,
    parameters,
  };
}

export function seconds(seconds: number): number {
  return seconds;
}
