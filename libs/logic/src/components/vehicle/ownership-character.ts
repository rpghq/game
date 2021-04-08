import { Component } from '@rpghq/core';

/**
 * Veículos com esse componente são propriedade de um personagem,
 * @see Character
 */
export class CharacterVehicleOwnership extends Component {
  characterId!: number;
}
