import { Component } from '@rpghq/core';

/**
 * Define os aspectos do motor de um veículo.
 * @see Vehicle
 */
export class VehicleEngine extends Component {
  /** Representa a saúde do motor, pode ter valor 0 a 1, sendo 1 totalmente saudável. */
  health!: number;
  /** Se motor está ligado ou não. */
  running!: boolean;
  /** Representa o enchimento do tanque de combustivel de 0 a 1, sendo 1 completo. */
  fuel!: number;
}
