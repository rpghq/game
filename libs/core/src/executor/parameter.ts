import { Query, QueryResult } from '../query';

/**
 * Define os tipos primitivos.
 */
export type Primitives = typeof String | typeof Number | typeof Boolean;

/**
 * Converte o tipo de um objeto de definição em um tipo de uma definição concretizada.
 *
 * Exemplo:
 *  const example = {
 *    parameter: {
 *      foo: String,
 *    }
 *  }
 *
 * Resultado:
 *  type Example = BasicDefinitionType<typeof example["parameter"]>;
 *  type ExampleResult = {
 *    foo: string;
 *  }
 */
export type ExtractPrimitiveValue<T> = T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : never;

/**
 * Converte o tipo de um objeto de definição em um tipo de uma definição concretizada, suportando arrays.
 *
 * Exemplo:
 *  const example = {
 *    parameter: {
 *      foo: [String],
 *    }
 *  }
 *
 * Resultado:
 *  type Example = ArrayDefinitionType<typeof example["parameter"]>;
 *  type ExampleResult = {
 *    foo: string[];
 *  }
 */
export type ExtractArrayValue<T> = T extends StringConstructor[]
  ? string[]
  : T extends NumberConstructor[]
  ? number[]
  : T extends BooleanConstructor[]
  ? boolean[]
  : ExtractPrimitiveValue<T>;

/**
 * Converte o tipo de um objeto de definição em um tipo de uma definição concretizada, suportando arrays e objetos compostos.
 *
 * Exemplo:
 *  const example = {
 *    parameter: {
 *      foo: {
 *        bar: [String],
 *        baz: Number,
 *      },
 *    }
 *  }
 *
 * Resultado:
 *  type Example = CompoundDefinitionType<typeof example["parameter"]>;
 *  type ExampleResult = {
 *    foo: {
 *      bar: string[],
 *      baz: number,
 *    }
 *  }
 */
export type ExtractCompositeValue<T> = T extends Record<string, unknown>
  ? { [P in keyof T]: ExtractCompositeValue<T[P]> }
  : ExtractArrayValue<T>;

/**
 * Converte o tipo de um objeto de definição e query em um tipo de definição concretizada.
 *
 * Exemplo:
 *  const example = {
 *    parameter: {
 *      foo: makeBasicQuery([Vehicle]),
 *    }
 *  }
 *
 * Resultado:
 *  type Example = QueryDefinitionType<typeof example["parameter"]>;
 *  type ExampleResult = {
 *    foo: Entity[],
 *  }
 */
export type ExtractQueryValue<T> = T extends Query<boolean, boolean> ? QueryResult<T> : ExtractCompositeValue<T>;
