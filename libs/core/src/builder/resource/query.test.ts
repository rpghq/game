import { Component, Constructor, Entity } from '../../types';
import { and, not, or, single } from './query';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};
const BazComponent = class extends Component {};

const makeEntity = (...components: Constructor<Component>[]) =>
  ({
    has: (component: Constructor<Component>) => components.includes(component),
  } as Entity);

describe('builder resource query', () => {
  it('simples', () => {
    const query = single(FooComponent);
    expect(query.test(makeEntity(FooComponent))).toBe(true);
    expect(query.test(makeEntity(BarComponent))).toBe(false);
  });

  it('usando not', () => {
    const query = single(not(FooComponent));
    expect(query.test(makeEntity(FooComponent))).toBe(false);
    expect(query.test(makeEntity(BarComponent))).toBe(true);
  });

  it('usando and implícito', () => {
    const query = single(FooComponent, BarComponent);
    expect(query.test(makeEntity(FooComponent, BarComponent))).toBe(true);
    expect(query.test(makeEntity(BarComponent))).toBe(false);
  });

  it('usando or', () => {
    const query = single(or(FooComponent, BarComponent));
    expect(query.test(makeEntity(FooComponent))).toBe(true);
    expect(query.test(makeEntity(BarComponent))).toBe(true);
    expect(query.test(makeEntity())).toBe(false);
  });

  it('em cascata', () => {
    const query = single(or(and(FooComponent, BarComponent), BazComponent));
    expect(query.test(makeEntity(FooComponent))).toBe(false);
    expect(query.test(makeEntity(FooComponent, BarComponent))).toBe(true);
    expect(query.test(makeEntity(BazComponent))).toBe(true);
    expect(query.test(makeEntity())).toBe(false);
  });
});
