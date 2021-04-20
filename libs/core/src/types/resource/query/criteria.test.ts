import { Component } from '../../component';
import { Entity } from '../../entity';
import { Constructor } from '../../utility';
import { Criteria, CriteriaItem, CriteriaModifier } from './criteria';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};
const BazComponent = class extends Component {};

const makeEntity = (...components: Constructor<Component>[]) =>
  ({
    has: (component: Constructor<Component>) => components.includes(component),
  } as Entity);

describe('criteria', () => {
  it('simples', () => {
    const criteria = new Criteria([new CriteriaItem(FooComponent, true)], CriteriaModifier.AND);
    expect(criteria.test(makeEntity(FooComponent))).toBe(true);
    expect(criteria.test(makeEntity())).toBe(false);
    expect(criteria.dependencies).toEqual([FooComponent]);
  });

  it('múltipla com AND', () => {
    const criteria = new Criteria(
      [new CriteriaItem(FooComponent, true), new CriteriaItem(BarComponent, true)],
      CriteriaModifier.AND,
    );
    expect(criteria.test(makeEntity(FooComponent, BarComponent))).toBe(true);
    expect(criteria.test(makeEntity(FooComponent))).toBe(false);
    expect(criteria.dependencies).toEqual([FooComponent, BarComponent]);
  });

  it('múltipla com OR', () => {
    const criteria = new Criteria(
      [new CriteriaItem(FooComponent, true), new CriteriaItem(BarComponent, true)],
      CriteriaModifier.OR,
    );
    expect(criteria.test(makeEntity(BarComponent))).toBe(true);
    expect(criteria.test(makeEntity())).toBe(false);
    expect(criteria.dependencies).toEqual([FooComponent, BarComponent]);
  });

  it('cascata de AND', () => {
    const criteria = new Criteria(
      [
        new CriteriaItem(FooComponent, true),
        new Criteria(
          [new CriteriaItem(BarComponent, true), new CriteriaItem(BazComponent, true)],
          CriteriaModifier.AND,
        ),
      ],
      CriteriaModifier.AND,
    );
    expect(criteria.test(makeEntity(FooComponent, BarComponent, BazComponent))).toBe(true);
    expect(criteria.test(makeEntity(FooComponent, BarComponent))).toBe(false);
    expect(criteria.dependencies).toEqual([FooComponent, BarComponent, BazComponent]);
  });

  it('cascata de OR', () => {
    const criteria = new Criteria(
      [
        new CriteriaItem(FooComponent, true),
        new Criteria([new CriteriaItem(BarComponent, true), new CriteriaItem(BazComponent, true)], CriteriaModifier.OR),
      ],
      CriteriaModifier.OR,
    );
    expect(criteria.test(makeEntity(FooComponent, BarComponent, BazComponent))).toBe(true);
    expect(criteria.test(makeEntity())).toBe(false);
    expect(criteria.dependencies).toEqual([FooComponent, BarComponent, BazComponent]);
  });

  it('cascata misturada', () => {
    const criteria = new Criteria(
      [
        new CriteriaItem(FooComponent, true),
        new Criteria(
          [new CriteriaItem(BarComponent, true), new CriteriaItem(BazComponent, true)],
          CriteriaModifier.AND,
        ),
      ],
      CriteriaModifier.OR,
    );
    expect(criteria.test(makeEntity(FooComponent))).toBe(true);
    expect(criteria.test(makeEntity(BarComponent, BazComponent))).toBe(true);
    expect(criteria.test(makeEntity(FooComponent, BarComponent, BazComponent))).toBe(true);
    expect(criteria.test(makeEntity(FooComponent, BazComponent))).toBe(true);
    expect(criteria.test(makeEntity())).toBe(false);
    expect(criteria.test(makeEntity(BarComponent))).toBe(false);
    expect(criteria.test(makeEntity(BazComponent))).toBe(false);
    expect(criteria.dependencies).toEqual([FooComponent, BarComponent, BazComponent]);
  });
});
