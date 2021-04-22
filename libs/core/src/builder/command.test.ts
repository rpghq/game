import { Component, Entity, Event } from '../types';
import { command, optional } from './command';
import { and, query, single } from './resource/query';
import { system } from './system';
import { change, event } from './trigger';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};

describe('builder system', () => {
  it('simples', () => {
    const a = {
      test: String,
      testb: Boolean,
      testn: Number,
      testarr: [String],
      optest: optional(String),
      optestarr: optional([String]),
      target: FooComponent,
      optarget: optional(FooComponent),
      optargetand: optional(and(FooComponent, BarComponent)),
      optargetmulti: optional([FooComponent]),
      optargetmultiand: optional([and(FooComponent, BarComponent)]),
    };

    type Expected = {
      test: string;
      testb: boolean;
      testn: number;
      testarr: string[];
      optest: string | undefined;
      optestarr: string[] | undefined;
      target: Entity;
      optarget: Entity | undefined;
      optargetand: Entity;
      optargetmulti: Iterable<Entity>;
      optargetmultiand: Iterable<Entity> | undefined;
    };

    const cmd = command<{ lucky: number }>(and(FooComponent, BarComponent), {
      target: single(FooComponent),
      reason: String,
    });
    expect(cmd).toBeTruthy();
  });
});
