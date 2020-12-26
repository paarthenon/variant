import {Property, VariantsOfUnion} from './variant';

/**
 * An object that has the same keys as a variant but has arbitrary values for the data. 
 * a.k.a. a lookup table.
 */
export type Lookup<T, U = any> = {
    [P in keyof T]: U
}

/**
 * Process an unknown variant by comparing it to a provided lookup table and returning the proper result.
 * @param obj some object that extends `{[K]: string}`.
 * @param handler a lookup table going from the various keys of `obj`'s type to any.
 * @param typeKey the key used as the discriminant.
 */
export function lookup<
    T extends Property<K, string>,
    L extends Lookup<VariantsOfUnion<T, K>>,
    K extends string = 'type'
>(obj: T, handler: L, typeKey?: K): L[keyof L] {
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString];
}

/**
 * Process an unknown variant by comparing it to a provided lookup table and returning the proper result.
 * If the handler does not account for the case, returns undefined
 * @param obj some object that extends `{[K]: string}`.
 * @param handler a partial lookup table going from some keys of `obj`'s type to any.
 * @param typeKey the key used as the discriminant.
 */
export function partialLookup<
    T extends Property<K, string>,
    L extends Lookup<VariantsOfUnion<T, K>>,
    K extends string = 'type'
>(obj: T, handler: Partial<L>, typeKey?: K): L | undefined {
    // Takes advantage of the fact that handler with missing keys will return undefined.
    return lookup(obj, handler as L, typeKey);
}
