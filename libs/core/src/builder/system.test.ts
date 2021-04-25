import { Component } from '../types';
import { command } from './channel';
import { and } from './resource';
import { optional } from './schema';
import { system } from './system';
import { change } from './trigger';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};

describe('builder system', () => {
  it('change', () => {
    const sys = system({}, change([FooComponent, BarComponent]));
    expect(sys).toBeTruthy();
  });

  it('command', () => {
    const Admin = class extends Component {};
    const Player = class extends Component {};
    const Connected = class extends Component {};

    const KickCommand = command(Admin, { target: and(Player, Connected), reason: optional(String) }, {});
    const sys = system({}, KickCommand);
    expect(sys).toBeTruthy();
  });
});
