import { expectType } from 'ts-expect';
import { Component, PrimitiveParameter, Query, QueryModifier, QueryParameter } from '../types';
import { optional, required } from './command';
import { and, multi, query } from './resource/query';

describe('builder command', () => {
  it('primitive parameters', () => {
    const numberReq = required(Number);
    expectType<PrimitiveParameter<NumberConstructor, true>>(numberReq);
    expect(numberReq).toEqual({ required: true, value: Number });

    const numberOpt = optional(Number);
    expectType<PrimitiveParameter<NumberConstructor, false>>(numberOpt);
    expect(numberOpt).toEqual({ required: false, value: Number });

    const stringReq = required(String);
    expectType<PrimitiveParameter<StringConstructor, true>>(stringReq);
    expect(stringReq).toEqual({ required: true, value: String });

    const stringOpt = optional(String);
    expectType<PrimitiveParameter<StringConstructor, false>>(stringOpt);
    expect(stringOpt).toEqual({ required: false, value: String });

    const booleanReq = required(String);
    expectType<PrimitiveParameter<StringConstructor, true>>(booleanReq);
    expect(booleanReq).toEqual({ required: true, value: String });

    const booleanOpt = optional(Boolean);
    expectType<PrimitiveParameter<BooleanConstructor, false>>(booleanOpt);
    expect(booleanOpt).toEqual({ required: false, value: Boolean });
  });

  it('component parameters', () => {
    const FooComponent = class extends Component {};

    const componentReq = required(FooComponent);
    expectType<QueryParameter<Query<QueryModifier.SINGLE>, true>>(componentReq);
    expect(componentReq).toEqual({
      required: true,
      query: query(QueryModifier.SINGLE, and(FooComponent)),
    });

    const componentOpt = optional(FooComponent);
    expectType<QueryParameter<Query<QueryModifier.SINGLE>, false>>(componentOpt);
    expect(componentOpt).toEqual({
      required: false,
      query: query(QueryModifier.SINGLE, and(FooComponent)),
    });
  });

  it('query parameters', () => {
    const FooComponent = class extends Component {};
    const multiQuery = multi(FooComponent);

    const queryReq = required(multiQuery);
    expectType<QueryParameter<Query<QueryModifier.MULTI>, true>>(queryReq);
    expect(queryReq).toEqual({
      required: true,
      query: multi(FooComponent),
    });

    const queryOpt = optional(multiQuery);
    expectType<QueryParameter<Query<QueryModifier.MULTI>, false>>(queryOpt);
    expect(queryOpt).toEqual({
      required: false,
      query: multi(FooComponent),
    });
  });
});
