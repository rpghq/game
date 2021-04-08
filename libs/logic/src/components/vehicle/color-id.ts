import { Component } from '@rpghq/core';

/**
 * Veículos com esse componente têm sua cor definida através de um id.
 * @see Vehicle
 */
export class IdVehicleColor extends Component {
  primary!: number;
  secondary!: number;
}
