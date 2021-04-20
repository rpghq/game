import { ComponentConstructor } from '../component';
import { Query, WILDCARD, WILDCARD_MULTIPLE } from './query';

/**
 * Cria uma consulta múltipla sem wildcard.
 * @param includes lista de componentes que entidades retornadas deverão conter.
 * @param optional lista de componentes a serem retornados.
 * @param excludes lista de componentes que entidades retornadas não deverão conter.
 * @returns consulta múltipla sem wildcard.
 */
export function findMany(
  includes: ComponentConstructor[],
  optional: ComponentConstructor[] = [],
  excludes: ComponentConstructor[] = [],
): Query<true, false> {
  return { id: null, components: { includes, excludes, optional } };
}

/**
 * Cria uma consulta múltipla com wildcard.
 * @param includes lista de componentes que entidades retornadas deverão conter.
 * @param optional lista de componentes a serem retornados.
 * @param excludes lista de componentes que entidades retornadas não deverão conter.
 * @returns consulta múltipla com wildcard.
 */
export function findManyByWildcardIds(
  includes: ComponentConstructor[],
  optional: ComponentConstructor[] = [],
  excludes: ComponentConstructor[] = [],
): Query<true, true> {
  return { id: WILDCARD_MULTIPLE, components: { includes, excludes, optional } };
}

/**
 * Cria uma consulta com wildcard.
 * @param includes lista de componentes que entidades retornadas deverão conter.
 * @param optional lista de componentes a serem retornados.
 * @param excludes lista de componentes que entidades retornadas não deverão conter.
 * @returns consulta com wildcard.
 */
export function findOneByWildcardId(
  includes: ComponentConstructor[],
  optional: ComponentConstructor[] = [],
  excludes: ComponentConstructor[] = [],
): Query<false, true> {
  return { id: WILDCARD, components: { includes, excludes, optional } };
}
