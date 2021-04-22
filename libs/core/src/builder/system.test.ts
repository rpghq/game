import { Component } from '../types';
import { system } from './system';
import { change } from './trigger';

const FooComponent = class extends Component {};
const BarComponent = class extends Component {};

describe('builder system', () => {
  it('change', () => {
    const sys = system({}, change(FooComponent, BarComponent));
    expect(sys).toBeTruthy();
  });
});
