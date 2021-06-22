type Constructable = {new (...args: any[]): any};

type ConstructableToFactory<T extends Constructable> =
    T extends {new (...args: infer Args): infer Return}
        ? (...args: Args) => Return
        : T
;

export function construct<T extends Constructable>(cls: T): ConstructableToFactory<T> {
    return ((...args: any[]) => new cls(args)) as ConstructableToFactory<T>;
}