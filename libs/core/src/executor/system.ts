import { Query } from '../query';
import { ExtractQueryValue, Primitives } from './parameter';

export type ExtractParameterList<T> = T extends Record<string, unknown>
  ? {
      [P in keyof T]: ExtractQueryValue<T[P]>;
    }
  : never;

export type MakeHandler<TParams> = (params: ExtractParameterList<TParams>) => void;

export type SystemParameters = { [key: string]: Query<boolean, false> | Primitives };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type System<_THandler> = {
  schedule: number;
  parameters: SystemParameters;
};

export type Handler<T> = T extends System<infer TSignature> ? TSignature : never;
