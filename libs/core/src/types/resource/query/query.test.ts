import { Component } from '../../component';
import { Entity } from '../../entity';
import { Constructor } from '../../utility';
import { Criteria, CriteriaItem, CriteriaModifier } from './criteria';
import { Query, QueryModifier } from './query';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};
const fooCriteria = new Criteria([new CriteriaItem(FooComponent, true)], CriteriaModifier.AND);

const makeEntity = (...components: Constructor<Component>[]) =>
  ({
    has: (component: Constructor<Component>) => components.includes(component),
  } as Entity);

describe('query', () => {
  it('include', () => {
    const query = new Query(fooCriteria, QueryModifier.MULTI, [BarComponent]);
    expect(query.test(makeEntity())).toBe(false);
    expect(query.dependencies).toEqual([FooComponent, BarComponent]);
  });
});
