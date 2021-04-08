/* eslint-disable @typescript-eslint/no-unused-vars */
import { World } from './world';

export type CommandInput<P> = P extends Command<infer T, infer _U> ? T : never;
export type CommandOutput<P> = P extends Command<infer _T, infer U> ? U : never;

export abstract class Command<TInput, TOutput> {
  abstract run(input: TInput, world: World): Promise<TOutput>;
}
