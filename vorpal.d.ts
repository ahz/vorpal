import { EventEmitter } from 'events';
import { ParsedArgs } from 'minimist';

declare function vorpal(): vorpal.Vorpal;

// https://github.com/Microsoft/TypeScript/issues/5073
declare namespace vorpal {
    export type CallbackFunction<T> = (err?: string | Error, data?: T) => void;

    export class Vorpal extends EventEmitter {
        activeCommand: Command<any>;

        command<TArgs>(cmd: string, description?: string): Command<TArgs>;

        parse(argv: string | string[], options?: { }): this;
        parse(argv: string | string[], options?: { use: 'minimist' }): ParsedArgs;
        delimiter(delimiter: string): this;
        show(): this;
        hide(): this;
        find(command: string): Command<any>;
        exec<T>(command: string, callback?: CallbackFunction<T>): PromiseLike<T>;
        execSync<T>(command: string, options: { fatal: boolean }): T;
        log(...msg: string[]): this;
        history(id: string): this;
        localStorage: typeof localStorage & { (id: string): void };
        help(fn: (cmd: string) => string): void;
        pipe(fn: (stdout: string) => string): this;
        use(extension: (vorpal: Vorpal) => void | string): this;
    }

    export interface IArgs<TOptions> {
        stdin?: string[]; // TODO: really array???
        options: TOptions;
    }

    export type Autocomplete = { (input: string, cb?: () => void): string[] | PromiseLike<string[]> };

    export class Command<TArgs> extends EventEmitter {
        log(...msg: string[]): void;

        alias(name: string, ...names: string[]): this;
        types(types: { [arg: string]: string | string[] }): this;

        autocomplete(cfg: string[] | { data: Autocomplete }): this;

        option(flags: string, description?: string, autocomplete?: string[] | Autocomplete): this;

        validate<TOptions>(fn: (args: IArgs<TOptions> & TArgs) => boolean | string): this;

        action<TOptions>(fn: (args: IArgs<TOptions> & TArgs, cb: () => void) => void): this;
        action<TOptions>(fn: (args: IArgs<TOptions> & TArgs) => PromiseLike<any>): this;
    }
}

export = vorpal;
