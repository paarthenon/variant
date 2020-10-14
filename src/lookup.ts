import {WithProperty, VariantsOfUnion} from './variant';

/**
 * An object that has the same keys as a variant but has arbitrary values for the data. 
 * a.k.a. a lookup table.
 */
export type Lookup<T, U = any> = {
    [P in keyof T]: U
}

/**
 * Map a variant to some value based on the type of variant provided.
 * @param obj 
 * @param handler 
 * @param typeKey 
 */
export function lookup<
    T extends WithProperty<K, string>,
    L extends Lookup<VariantsOfUnion<T, K>>,
    K extends string = 'type'
>(obj: T, handler: L, typeKey?: K): L[keyof L] {
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString];
}
/**
 * Map a variant to some value or undefined based on the type of variant
 * provided. If he handler does not account for your use case, undefined
 * will be returned. The type of undefined is the union of the various
 * values in the object. 
 * @param obj 
 * @param handler 
 * @param typeKey 
 */
export function partialLookup<
    T extends WithProperty<K, string>,
    L extends Lookup<VariantsOfUnion<T, K>>,
    K extends string = 'type'
>(obj: T, handler: Partial<L>, typeKey?: K): L | undefined {
    // Takes advantage of the fact that handler with missing keys will return undefined.
    return lookup(obj, handler as L, typeKey);
}
