import { Component } from '@rpghq/core';

/**
 * Veículos com esse componente têm sua cor definida através um código RGB.
 * @see Vehicle
 */
export class RgbVehicleColor extends Component {
  primary!: [number, number, number];
  secondary!: [number, number, number];
}
