import { expectType } from 'ts-expect';
import { Component, PrimitiveParameter, Query, QueryModifier, QueryParameter } from '../../types';
import { command } from './command';
import { optional } from '../schema';
import { and, multi, single } from '../resource';

describe('builder command', () => {
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

  it('examples', () => {
    const Admin = class extends Component {};
    const Player = class extends Component {};
    const Connected = class extends Component {};

    const KickCommand = command(Admin, { target: and(Player, Connected), reason: optional(String) }, {});

    expect(KickCommand).toEqual({
      source: single(Admin),
      args: {
        target: new QueryParameter(single(Player, Connected), true),
        reason: new PrimitiveParameter(String, false),
      },
      res: {},
    });

    const LoggedAdminKickManyCommand = command(
      [Admin, Connected],
      { target: multi(Player, Connected), reason: optional(String) },
      { kicked: multi(Player, Connected) },
    );

    expect(LoggedAdminKickManyCommand).toEqual({
      source: single(Admin, Connected),
      args: {
        target: new QueryParameter(multi(Player, Connected), true),
        reason: new PrimitiveParameter(String, false),
      },
      res: {
        kicked: new QueryParameter(multi(Player, Connected), true),
      },
    });
  });
});
