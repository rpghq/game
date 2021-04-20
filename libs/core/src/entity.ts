import { Component } from './component';

export type EntityId = number;

export interface EntityList {
  [Symbol.iterator](): IterableIterator<Entity>;
}

/** Contrato para entidade a ser usado por comandos e sistemas. */
export interface Entity {
  id: EntityId;
  /**
   * Checa se componentes estão acoplados ou não a entidade.
   * @param component Componente a ser verificado.
   */
  has(...components: typeof Component[]): boolean;

  /**
   * Obtém a instância de um componente.
   * @param component Componente a ser obtido.
   * @throws Deve retornar erro caso componente não esteja acoplado.
   */
  get<T extends Component>(component: { new (...args: unknown[]): T }): T;

  /**
   * Acopla um componente a uma entidade.
   * @param component Componente a ser acoplado.
   * @param data Dados a serem populados na instância do componente.
   * @throws Deve retornar erro caso componente já esteja acoplado.
   */
  put<T extends Component>(component: { new (...args: unknown[]): T }, data: T): void;

  /**
   * Atualiza os dados de um componente em uma entidade.
   * @param component Componente a ser atualizado.
   * @param data Dados parciais a serem populados na instância do componente.
   * @throws Deve retornar erro caso componente não esteja acoplado.
   */
  update<T extends Component>(component: { new (...args: unknown[]): T }, data: T): void;

  /**
   * Remove um componente da entidade.
   * @param component Componente a ser removido.
   * @throws Deve retornar erro caso componente não esteja acoplado.
   */
  remove(component: typeof Component): void;
}
