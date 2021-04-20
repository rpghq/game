import { Component } from '../../component';
import { Entity } from '../../entity';
import { Constructor } from '../../utility';

/**
 * Representa uma classe que pode ser testada contra um valor.
 */
export interface Testable {
  dependencies: Constructor<Component>[];
  test: (subject: Entity) => boolean;
}
