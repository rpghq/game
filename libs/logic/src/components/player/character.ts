import { Component } from '@rpghq/core';
import { Gender } from './gender';

/**
 * Representa um cidadão do mundo.
 */
export class Character extends Component {
  name!: string;
  gender!: Gender;
  cash!: number;
}
