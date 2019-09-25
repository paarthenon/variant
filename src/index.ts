const emptyFunc = () => ({});

type Func = (...args: any[]) => any;
type FuncyDictionary = {[variant:string]: Func};
type OutputType<T> = {outputType: T};

export function variantFactory<K extends string>(key: K) {
    // The actual partial object that is patched into the result of the eventual payload function.
    type TypeExt<T> = {[key in typeof key]: T};

    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): (() => TypeExt<T>) & OutputType<T>
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F): ((...args: Parameters<F>) => (ReturnType<F> & TypeExt<T>)) & OutputType<T>;
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => ({
            [key]: tag,
            ...(func || emptyFunc)(...args),
        })
        const outputType = {outputType: tag};
        Object.assign(maker, outputType);
        return maker as typeof maker & typeof outputType;
    }
    const outputKey = {outputKey: key};
    Object.assign(variantFunc, outputKey);
    return variantFunc as typeof variantFunc & typeof outputKey;
}

export const variantOn = variantFactory;

export const variant = variantFactory('type');
export const action = variant;
export const message = variant;
export default variant;

export type Values<T> = T[keyof T];
export type Variant<T extends FuncyDictionary> = Values<{[P in keyof T]: ReturnType<T[P]>}>;

export type FunctionsOnly<T> = {
    [K in keyof T]: T[K] extends Func ? T[K] : never;
}

export function exhaust(x: never, typeProperty = 'type'): never {
    // Should never be called. If it ever *does* happen to be called it'll dump the type string.
    // I find this to be a reasonable balance between avoiding data in the logs and providing
    // useful debugging info.
    throw new Error(`Switch does not handle all cases. Failed case:${(x as any)[typeProperty]}`);
}
