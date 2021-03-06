import variant, {Outputs, Property, Variant, VariantCreator} from "./variant";
import {ExtractOfUnion, Func, Identity} from "./util";

/**
 * Enforce exhaustion of a union type by using this in the default case.
 * @param x 
 * @param options 
 */
export function exhaust(x: never, options = {key: 'type', throw: false}) {
    // Should never be called. If it ever *does* happen to be called it'll dump the type string.
    // I find this to be a reasonable balance between avoiding data in the logs and providing
    // useful debugging info.

    const msg = `Switch does not handle all cases. Failed case:${(x as any)[options.key]}`;
    if (options.throw) {
        throw new Error(msg);
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
    return (input: T) => ({
        ...defaults,
        ...input,
    }) as T;
}

/**
 * Take a single variable of type T and store as 'payload'
 */
export function payload<T>(_example?: T) {
    return (payload: T) => ({payload})
}

export function property<K extends string = 'payload'>(key: K) {
    return <T> () => (payload: T) => ({[key]: payload}) as K extends keyof infer KLiteral ? Property<keyof KLiteral & string, T> : never;
}

export function data<T>(x: T) {
    return (override?: T) => ({...x, ...(override != undefined && override)});
}

/**
 * Meant to be used inside of a `match`
 * @param x 
 */
export function constant<T>(x: T) {
    return () => x;
}

type FlattenToTypeStr<T extends (string | VariantCreator<string, Func, K>), K extends string = 'type'> =
    T extends VariantCreator<infer R, Func, K> ? R : T extends string ? T : never;

/**
 * Curried isType, useful for `.filter` or rxjs
 * @param type 
 */
export function isType<T extends (string | VariantCreator<string, Func, K>), K extends string = 'type'>(type: T): <O extends Property<K, string>> (o: O) => o is ExtractOfUnion<O, FlattenToTypeStr<T, K>, K>; 
/**
 * Check if an object is of a given type. The type here
 * may be a string or a variant constructor (i.e. `Animal.dog`).
 * 
 * If the object being analyzed is typed as a union, typing
 * a string will autocomplete the property names and providing
 * a function will be restricted to the set of variant creators
 * for those potential types.
 * @param instance some JS object
 * @param type a string for the type, or the constructor for that variant
 * @param key optional discriminant key override. 'type' by default.
 */
export function isType<
    O extends Property<K, string>,
    T extends (O[K] | VariantCreator<O[K], Func, K>),
    K extends string = 'type',
>(
    instance: O | {} | null | undefined,
    type: T,
    key?: K,
): instance is ExtractOfUnion<O, T extends VariantCreator<infer R, Func, K> ? R : T extends string ? T : never, K>; 
export function isType<
    O extends Property<K, string>,
    T extends (O[K] | VariantCreator<O[K], Func, K>),
    K extends string = 'type',
>(
    instanceOrType: O | {} | null | undefined | T,
    typeOrKey?: T | K,
    key?: K,
) {
    if (instanceOrType != undefined) {
        if (typeof instanceOrType === 'function' || typeof instanceOrType === 'string') {
            const typeArg = instanceOrType as T;
            const typeStr = typeof typeArg === 'string' ? typeArg : (typeArg as VariantCreator<string, any, K>).type;
            return <O extends Property<K, string>>(o: O): o is ExtractOfUnion<O, FlattenToTypeStr<T, K>, K> => isType(o, typeStr);
        } else {
            const instance = instanceOrType as O;
            const type = typeOrKey as T;

            const typeStr = typeof type === 'string' ? type : (type as VariantCreator<string, any, K>).type;
            return instance != undefined && (instance as Property<K, string>)[key ?? 'type'] === typeStr;
        }
    } else {
        return false;
    }
}
