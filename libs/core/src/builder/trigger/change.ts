import { ChangeTrigger, Component, Constructor, Criteria, CriteriaItem } from '../../types';
import { and } from '../resource';

export function change(...items: (Criteria | CriteriaItem | Constructor<Component>)[]): ChangeTrigger {
  return new ChangeTrigger(and(...items));
}
