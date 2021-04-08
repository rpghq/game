import { Command, CommandInput, CommandOutput } from './command';

export interface World {
  run<T extends Command<unknown, unknown>>(
    command: { new (...args: unknown[]): T },
    parameters: CommandInput<T>,
  ): Promise<CommandOutput<T>>;
}
