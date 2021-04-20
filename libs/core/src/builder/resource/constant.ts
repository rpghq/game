import { Constant, ConstantTypes } from '../../types';

export function constant<T extends ConstantTypes>(constant: T): Constant<T> {
  if (['number', 'string', 'boolean'].includes(typeof constant)) {
    throw new Error('unexpected value for constant');
  }
  return new Constant(constant);
}

export type ResolvedConstant<T> = T extends Constant<infer U> ? U : never;
