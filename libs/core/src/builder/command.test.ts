import { expectType } from 'ts-expect';
import { Component, PrimitiveParameter, Query, QueryModifier, QueryParameter } from '../types';
import { command, optional, required } from './command';
import { multi, single } from './resource/query';

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
      query: single(FooComponent),
    });

    const componentOpt = optional(FooComponent);
    expectType<QueryParameter<Query<QueryModifier.SINGLE>, false>>(componentOpt);
    expect(componentOpt).toEqual({
      required: false,
      query: single(FooComponent),
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

  it('command', () => {
    const FooComponent = class extends Component {};

    const cmdQuery = command(
      single(FooComponent),
      {
        numberReq: Number,
        numberOpt: optional(Number),
        componentReq: FooComponent,
        componentOpt: optional(FooComponent),
      },
      {},
    );

    const cmdComponent = command(
      FooComponent,
      {
        numberReq: Number,
        numberOpt: optional(Number),
        componentReq: FooComponent,
        componentOpt: optional(FooComponent),
      },
      {},
    );

    const cmdComponenArr = command(
      [FooComponent],
      {
        numberReq: Number,
        numberOpt: optional(Number),
        componentReq: FooComponent,
        componentOpt: optional(FooComponent),
      },
      {},
    );

    type ExpectedArgsType = {
      numberReq: PrimitiveParameter<NumberConstructor, true>;
      numberOpt: PrimitiveParameter<NumberConstructor, false>;
      componentReq: QueryParameter<Query<QueryModifier.SINGLE>, true>;
      componentOpt: QueryParameter<Query<QueryModifier.SINGLE>, false>;
    };

    expectType<ExpectedArgsType>(cmdQuery.args);
    expectType<ExpectedArgsType>(cmdComponent.args);
    expectType<ExpectedArgsType>(cmdComponenArr.args);

    const expectedResult = {
      source: single(FooComponent),
      args: {
        numberReq: new PrimitiveParameter(Number, true),
        numberOpt: new PrimitiveParameter(Number, false),
        componentReq: new QueryParameter(single(FooComponent), true),
        componentOpt: new QueryParameter(single(FooComponent), false),
      },
      res: {},
    };

    expect(cmdQuery).toEqual(expectedResult);
    expect(cmdComponent).toEqual(expectedResult);
    expect(cmdComponenArr).toEqual(expectedResult);
  });
});
