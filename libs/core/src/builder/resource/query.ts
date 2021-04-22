import { Component, Constructor, Criteria, CriteriaItem, CriteriaModifier, Query, QueryModifier } from '../../types';

export function query<T extends QueryModifier>(
  modifier: T,
  ...items: (Criteria | CriteriaItem | Constructor<Component>)[]
): Query<T> {
  return new Query(and(...items), modifier);
}

export function single(...items: (Criteria | CriteriaItem | Constructor<Component>)[]): Query<QueryModifier.SINGLE> {
  return query(QueryModifier.SINGLE, ...items);
}

export function multi(...items: (Criteria | CriteriaItem | Constructor<Component>)[]): Query<QueryModifier.MULTI> {
  return query(QueryModifier.MULTI, ...items);
}

export function and(...items: (Criteria | CriteriaItem | Constructor<Component>)[]): Criteria {
  const members = items.map((item) => {
    if (item instanceof Criteria || item instanceof CriteriaItem) {
      return item;
    }
    if (item.prototype instanceof Component) {
      return is(item);
    }
    throw new Error('unexpected argument');
  });
  return new Criteria(members, CriteriaModifier.AND);
}

export function or(...items: (Criteria | CriteriaItem | Constructor<Component>)[]): Criteria {
  const members = items.map((item) => {
    if (item instanceof Criteria || item instanceof CriteriaItem) {
      return item;
    }
    if (item.prototype instanceof Component) {
      return is(item);
    }
    throw new Error('unexpected argument');
  });
  return new Criteria(members, CriteriaModifier.OR);
}

export function not(item: CriteriaItem | Constructor<Component>): CriteriaItem {
  if (item instanceof CriteriaItem) {
    return new CriteriaItem(item.item, !item.expected);
  }
  if (item.prototype instanceof Component) {
    return new CriteriaItem(item, false);
  }
  throw new Error('unexpected argument');
}

export function is(item: CriteriaItem | Constructor<Component>): CriteriaItem {
  if (item instanceof CriteriaItem) {
    return item;
  }
  if (item.prototype instanceof Component) {
    return new CriteriaItem(item, true);
  }
  throw new Error('unexpected argument');
}
