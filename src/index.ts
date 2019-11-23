export * from './nominal';

const emptyFunc = () => ({});

type Func = (...args: any[]) => any;
type FuncyDictionary = {[variant:string]: Func};

type Outputs<K, T> = {
    outputKey: K
    outputType: T
};

/**
 * Useful in generating friendly types. Intersections are rendered as the type of the intersection, not as A & B.
 */
type Identity<T> = {} & {
    [P in keyof T]: T[P]
};

// Consider calling this ObjectEntry or Entry. Also Pair? No, more like KVPair. Mapping?
export type TypeExt<K extends string, T extends string> = K extends keyof infer LitK ? {[P in keyof LitK]: T} : never;

// type TypedOutput
export function variantFactory<K extends string>(key: K) {

    // type 
    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): (() => TypeExt<K, T>) & Outputs<K, T>
    function variantFunc<T extends string, F extends Func >(tag: T, func: F):((...args: Parameters<F>) => Identity<TypeExt<K, T> & ReturnType<F>>) & Outputs<K, T>;
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => ({
            [key]: tag,
            ...(func || emptyFunc)(...args),
        })
        const outputType = {
            outputKey: key,
            outputType: tag,
        };
        Object.assign(maker, outputType);
        return maker as typeof maker & typeof outputType;
    }
    const outputKey = {outputKey: key};
    Object.assign(variantFunc, outputKey);
    return variantFunc as typeof variantFunc & typeof outputKey;
}

export const variantOn = variantFactory;

export const variant = variantFactory('type');
export default variant;

export type Values<T> = T[keyof T];
export type Variant<T extends FuncyDictionary> = Values<{[P in keyof T]: ReturnType<T[P]>}>;

export type FunctionsOnly<T> = {
    [K in keyof T]: T[K] extends Func ? T[K] : never;
}

export function exhaust(x: never, options = {key: 'type', throw: false}) {
    // Should never be called. If it ever *does* happen to be called it'll dump the type string.
    // I find this to be a reasonable balance between avoiding data in the logs and providing
    // useful debugging info.

    const msg = `Switch does not handle all cases. Failed case:${(x as any)[options.key]}`;
    if (options.throw) {
        throw new Error(msg);
    }
}
