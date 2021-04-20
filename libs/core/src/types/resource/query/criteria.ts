import { Component } from '../../component';
import { Entity } from '../../entity';
import { Constructor } from '../../utility';
import { Testable } from './testable';

/**
 * Indica logica binária para busca da lista de componentes;
 */
export enum CriteriaModifier {
  AND,
  OR,
}

/**
 * Representa item na listagem de componentes, podendo ser positivo ou negativo.
 */
export class CriteriaItem<T extends Constructor<Component> = Constructor<Component>> implements Testable {
  public readonly item: T;
  public readonly expected: boolean;

  constructor(item: T, expected: boolean) {
    this.item = item;
    this.expected = expected;
  }

  test(subject: Entity): boolean {
    return subject.has(this.item) === this.expected;
  }

  get dependencies(): T[] {
    return [this.item];
  }
}

/**
 * Representa um critério de busca para uma consulta.
 */
export class Criteria implements Testable {
  /**
   * Define os itens que precisão ser testados contra um componente para retorno.
   */
  public readonly children: (Criteria | CriteriaItem)[];
  /**
   * Indica a lógica binária de validação. Se todos os itens precisam estar presentes ou se apenas um.
   */
  public readonly modifier: CriteriaModifier;

  constructor(children: (Criteria | CriteriaItem)[], modifier: CriteriaModifier = CriteriaModifier.AND) {
    this.children = children;
    this.modifier = modifier;
  }

  /**
   * Testa uma entidade para saber se passa no critério ou não.
   * @param entity entidade a ser testada
   * @returns resultado do teste
   */
  test(entity: Entity): boolean {
    if (this.modifier === CriteriaModifier.AND) {
      return this.children.every((child) => child.test(entity));
    } else {
      return this.children.some((child) => child.test(entity));
    }
  }

  /**
   * Obtém dependências de componentes a serem trazidos e populados na entidade para teste ser bem sucedido.
   * @returns lista de componentes
   */
  get dependencies(): Constructor<Component>[] {
    return this.children.flatMap((child) => (child instanceof Criteria ? child.dependencies : child.item));
  }
}
