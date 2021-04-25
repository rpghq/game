import { ChangeTrigger, Component, Constructor, Query, QueryModifier } from '../../types';
import { single } from '../resource';

export function change(
  source: Query<QueryModifier.SINGLE> | Constructor<Component> | Constructor<Component>[],
): ChangeTrigger {
  return new ChangeTrigger(source instanceof Query ? source : single(...(Array.isArray(source) ? source : [source])));
}
