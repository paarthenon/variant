type Constructable = {new (...args: any[]): any};

type ConstructableToFactory<T extends Constructable> =
    T extends {new (...args: infer Args): infer Return}
        ? (...args: Args) => Return
        : T
;

/**
 * Create a variant based on a class.
 * @param cls class definition / constructor
 * @returns a variant creator that wraps the class constructor into a factory function.
 */
export function construct<T extends Constructable>(cls: T): ConstructableToFactory<T> {
    return ((...args: any[]) => new cls(args)) as ConstructableToFactory<T>;
}