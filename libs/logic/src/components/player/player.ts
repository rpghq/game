import { Component } from '@rpghq/core';

/**
 * Representa um único jogador que pode ter múltiplos personagens.
 * @see Character
 */
export class Player extends Component {
  handle!: string;
}
