import { Component } from '@rpghq/core';

/**
 * Define os aspectos da trava de um veículo.
 */
export class VehicleLock extends Component {
  /** Se a trava do veículo está ligada ou não. */
  engaged!: boolean;
}
