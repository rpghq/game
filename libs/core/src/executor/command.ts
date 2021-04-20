import { Query } from '../query';
import { ExtractCompositeValue, Primitives, ExtractQueryValue } from './parameter';

export type ExtractParameterList<T> = T extends Record<string, unknown>
  ? {
      [P in keyof T]: ExtractQueryValue<T[P]>;
    }
  : never;

export type MakeHandler<TSource, TParams, TResult> = (
  source: ExtractQueryValue<TSource>,
  params: ExtractParameterList<TParams>,
) => Result<ExtractCompositeValue<TResult>>;

export type Result<T> = T & {
  success: boolean;
  message?: string;
};

export type CommandSource = Query<false, true>;
export type CommandParameters = { [key: string]: Query<boolean, boolean> | Primitives };
export type CommandResult = { [key: string]: Primitives };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Command<_THandler> = {
  sourceQuery: CommandSource;
  parameters: CommandParameters;
  result: CommandResult;
};

export type Handler<T> = T extends Command<infer TSignature> ? TSignature : never;
