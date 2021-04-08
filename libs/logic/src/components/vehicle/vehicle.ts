import { Component } from '@rpghq/core';

/**
 * Representa um veículo.
 */
export class Vehicle extends Component {
  model!: string;
  licensePlate!: string;
}
