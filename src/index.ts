export * from './nominal';

const emptyFunc = () => ({});
const identityFunc = <T>(x?: T) => (x || {}) as T extends unknown ? {} : T ;

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

function _set<T, X, Y>(func: (x: X) => Y, data: T) {
    type fuck = any;
    // remove T from inputs, add T to outputs
    return (input: Identity<Omit<X, keyof T>>) => {
        const combined = Object.assign({}, data, input) as T & X;
        return func(combined) as Y;
    }
}

type MarkOptional<T, O> = {
    [P in keyof T]: P extends keyof O ? (T[P] | undefined) : T[P]
}

function _default<T, X, Y>(func: (x: X) => Y, data: T) {
    return (input: MarkOptional<X, T>) => {
        const combined = Object.assign({}, data, input) as T & X;
        return func(combined) as Y;
    }
}

/**
 * Handles boilerplate with the most common function definiton.
 * Also provides a clean way of describing things in a record-like
 * way.
 * 
 * const ItemOne = variant('ITEM_ONE', fields<{
 *     id: number;
 *     name: string;
 * }>());
 * 
 * You can also use .set() to assign some elements of an interface. For example:
 * 
 * interface Audited<T> extends T {
 *     createdDate: number; // millis
 * }
 * 
 * @param defaults set some default values for the object. Note this does not remove
 */
export function fields<T>(defaults: Partial<T> = {}) {
    return Object.assign(
        (input: T) => ({
            ...defaults,
            ...input,
        }) as T,
        {
            set<D>(this: (x: T) => T, data: D) {
                return _set(this, data);
            },
            default<D>(this: (x: T) => T, data: D) {
                return _default(this, data);
            },
        },
    );
}

// type TypedOutput
export function variantFactory<K extends string>(key: K) {

    // type 
    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): (() => TypeExt<K, T>) & Outputs<K, T>
    function variantFunc<T extends string, F extends Func>(tag: T, func: F):((...args: Parameters<F>) => Identity<TypeExt<K, T> & ReturnType<F>>) & Outputs<K, T>;
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => ({
            [key]: tag,
            ...(func || identityFunc)(...args),
        })
        const outputType = {
            outputKey: key,
            outputType: tag,
        };
        return Object.assign(maker, outputType);
    }
    const outputKey = {outputKey: key};
    return Object.assign(variantFunc, outputKey);
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
