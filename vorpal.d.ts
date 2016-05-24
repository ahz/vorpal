import { EventEmitter } from 'events';

declare function vorpal(): vorpal.Vorpal;

// https://github.com/Microsoft/TypeScript/issues/5073
declare namespace vorpal {
    export class Vorpal extends EventEmitter {
        command<TArgs>(cmd: string, description?: string, opts?): Command<TArgs>;

        parse(argv, options?): this;
        delimiter(delimiter: string): this;
        show(): this;
        hide(): this;
        find(command: string);
        exec(command, callback?);
        execSync(command, options?);
        log(...msg: string[]): void;
        history(id);
        localStorage(id);
        help(fn: (cmd) => string);
        pipe(fn: (stdout) => string);
        use(extension: (vorpal: Vorpal) => void | string): void;
    }

    export interface IArgs<TOptions> {
        stdin?: string[]; // TODO: really array???
        options: TOptions;
    }

    export type Autocomplete = { (input: string, cb?: () => void): string[] | Promise<string[]> };

    export class Command<TArgs> extends EventEmitter {
        alias(name: string, ...names: string[]): this;
        types(types: { [arg: string]: string | string[] }): this;

        autocomplete(cfg: string[] | { data: Autocomplete }): this;

        option(flags: string, description?: string, autocomplete?: string[] | Autocomplete): this;

        validate<TOptions>(fn: (args: IArgs<TOptions> & TArgs) => boolean | string): this;

        action<TOptions>(fn: (args: IArgs<TOptions> & TArgs, cb) => void): this;
        action<TOptions>(fn: (args: IArgs<TOptions> & TArgs) => Promise<any>): this;
    }
}

export = vorpal;
