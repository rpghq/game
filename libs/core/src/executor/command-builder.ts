import { findMany, findOneByWildcardId } from '../query';
import { Command, CommandParameters, CommandResult, CommandSource, MakeHandler } from './command';

export const source = findOneByWildcardId;
export const target = findOneByWildcardId;
export const fetch = findMany;

export function command<
  TSource extends CommandSource,
  TParams extends CommandParameters,
  TResult extends CommandResult
>(sourceQuery: TSource, parameters: TParams, result: TResult): Command<MakeHandler<TSource, TParams, TResult>> {
  return {
    sourceQuery,
    parameters,
    result,
  };
}
