import { Component, Event } from '../types';
import { system } from './system';
import { change, event } from './trigger';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};
const FooEvent = class extends Event {};

describe('builder system', () => {
  it('change', () => {
    const sys = system({}, change(FooComponent, BarComponent));
    expect(sys).toBeTruthy();
  });

  it('event', () => {
    const sys = system({}, event(FooEvent));
    expect(sys).toBeTruthy();
  });

  it('command', () => {
    const sys = system({}, event(FooEvent));
    expect(sys).toBeTruthy();
  });
});
