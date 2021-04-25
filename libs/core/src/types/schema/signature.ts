import { Entity } from 'types/entity';
import { QueryModifier } from 'types/resource';
import { PrimitiveParameter, QueryParameter } from './parameter';

type Required<T, U extends boolean> = U extends true ? T : T | undefined;

export type PrimitiveSignature<T> = T extends PrimitiveParameter<infer U, infer V>
  ? U extends NumberConstructor
    ? Required<number, V>
    : U extends StringConstructor
    ? Required<string, V>
    : U extends BooleanConstructor
    ? Required<boolean, V>
    : never
  : never;

export type QuerySignature<T> = T extends QueryParameter<infer U, infer V>
  ? U extends QueryModifier.SINGLE
    ? Required<Entity, V>
    : Required<Iterable<Entity>, V>
  : never;

export type Signature<T> = T extends PrimitiveSignature<T>
  ? PrimitiveSignature<T>
  : T extends QuerySignature<T>
  ? QuerySignature<T>
  : never;
