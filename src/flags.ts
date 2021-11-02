import {CreatorOutput, GetTypeLabel, TypesOf, VariantModule} from './precepts';

/**
 * Transform a sum type (a variant) into a product type.
 */
export type Matrix<T extends VariantModule<string>> = {
    [P in TypesOf<T>]: CreatorOutput<T[GetTypeLabel<T, P>]>;
}

/**
 * Turn a sum type (a variant) into a partial product type.
 * 
 * @see {@link Matrix}
 */
export type Flags<T extends VariantModule<string>> = Partial<Matrix<T>>;

export interface FlagsFunc<K extends string> {
    /**
     * Turn a list of sum type instances (variants) into a product type.
     * 
     * In other words, perform a unique groupBy on the list, grouping on the type property.
     * @param flags An array of variant instances.
     * @template T The discriminated union 
     * @returns An object where each property's key is a type string and its value is the instance of that type.
     */
    flags<T extends Record<K, string>>(flags: T[]): {[P in T[K]]: Extract<T, Record<K, P>>};
}

/**
 * groupBy list of variant instances. Assumes one object per variation.
 * @param key 
 */
export function flagsImpl<K extends string>(key: K): FlagsFunc<K> {
    function flags<T extends Record<K, string>>(flags: T[]): {[P in T[K]]: Extract<T, Record<K, P>>} {
        return flags.reduce((o, v) => ({
            ...o,
            [v[key]]: v,
        }), Object.create(null));
    }
    
    return {flags};
}

