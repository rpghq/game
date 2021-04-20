import { Component } from '../../component';
import { Entity, EntityId } from '../../entity';
import { Constructor } from '../../utility';
import { Resource } from '../resource';
import { Criteria } from './criteria';
import { Testable } from './testable';

/**
 * Modificadores da consulta.
 */
export enum QueryModifier {
  /**
   * Representa uma consulta que retornará uma única entidade.
   */
  SINGLE,
  /**
   * Representa uma consulta que retornará múltiplas entidades.
   */
  MULTI,
}

/**
 * Retorna o tipo do resultado de uma consulta baseado em um valor de QueryModifier.
 */
export type QueryModifierResult<T extends QueryModifier> = T extends QueryModifier.SINGLE
  ? Entity | undefined
  : Iterable<Entity>;

/**
 * Retorna o retorna o tipo do resultado de uma consulta baseado em seu tipo.
 */
export type QueryResult<T> = T extends Query<infer U> ? QueryModifierResult<U> : never;

/**
 * Representa uma consulta a ser executada.
 */
export class Query<T extends QueryModifier>
  extends Resource<T extends QueryModifier.SINGLE ? Entity | undefined : Iterable<Entity>>
  implements Testable {
  /**
   * Declara os critérios que a(s) entidade(s) deverão seguir para serem retornadas pela consulta.
   */
  public readonly criteria: Criteria;
  /**
   * Declara os demais componentes que a(s) entidade(s) a serem retornados, estando eles nos critérios ou não.
   */
  public readonly include: Constructor<Component>[];
  /**
   * Indica se a consulta deve retornar uma ou várias entidades.
   */
  public readonly modifier: T;
  /**
   * Quando definido, indica se a consulta deve olhar para apenas uma lista de entidades por seus ids.
   */
  public readonly restrict: EntityId[] | undefined;

  constructor(
    criteria: Criteria,
    modifier: T,
    include: Constructor<Component>[] = [],
    restrict: EntityId[] | undefined = undefined,
  ) {
    super();
    this.criteria = criteria;
    this.modifier = modifier;
    this.include = include;
    this.restrict = restrict;
  }

  /**
   * Testa uma entidade para saber se passa no critério da consulta ou não.
   * @param entity entidade a ser testada
   * @returns resultado do teste
   */
  test(entity: Entity): boolean {
    if (this.restrict) {
      if (!this.restrict.includes(entity.id)) {
        return false;
      }
    }
    return this.criteria.test(entity);
  }

  /**
   * Obtém dependências de componentes a serem trazidos e populados na entidade para teste ser bem sucedido.
   * @returns lista de componentes
   */
  get dependencies(): Constructor<Component>[] {
    return [...this.criteria.dependencies, ...this.include];
  }
}
