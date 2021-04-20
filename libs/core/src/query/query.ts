import { ComponentConstructor } from '../component';
import { Entity } from '../entity';

export const WILDCARD = Symbol();
export const WILDCARD_MULTIPLE = Symbol();

/**
 * Representa uma consulta simples nas entidades.
 */
export interface Query<TMulti extends boolean, TWildcard extends boolean> {
  /**
   *  representa uma consulta por id de entidade.
   *  * valores em array e `null` retornarão múltiplas entidades.
   *  * valores que não são array retornarão uma única entidade.
   *  * {@link WILDCARD} representa um wildcard, ou valor que será populado mais tarde.
   *  * {@link WILDCARD_MULTIPLE} representa um wildcard multiplo, ou array de valores que será populado mais tarde.
   */
  id: TMulti extends false
    ? TWildcard extends true
      ? typeof WILDCARD
      : number
    : TWildcard extends true
    ? typeof WILDCARD_MULTIPLE
    : null | number[];
  components: {
    includes: ComponentConstructor[];
    optional: ComponentConstructor[];
    excludes: ComponentConstructor[];
  };
}

/**
 * Resolve para o tipo a ser retornado dado um tipo de Query sendo executada.
 *
 * @example
 *  // resolve como Entity[]
 *  type Test = QueryResult<{ id: WILDCARD_MULTIPLE; components: { includes: []; excludes: []; optional: [] } }>;
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryResult<T> = T extends Query<infer TSingle, infer _TWildcard>
  ? TSingle extends false
    ? Entity
    : Entity[]
  : never;
