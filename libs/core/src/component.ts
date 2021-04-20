/**
 * Representa o tipo de todas as classes de componente.
 */
export type ComponentConstructor = { new (...args: unknown[]): Component };

export abstract class Component {}
