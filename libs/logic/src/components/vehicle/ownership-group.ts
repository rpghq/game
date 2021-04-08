import { Component } from '@rpghq/core';

/**
 * Veículos com esse componente são propriedades de um grupo e estão baseados em uma propriedade.
 * @see Group
 * @see Property
 */
export class GroupVehicleOwnership extends Component {
  groupId!: number;
  propertyId!: number;
}
