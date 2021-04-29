import {variantCosmos} from './cosmos';
import {CreatorOutput, GetTypeLabel, KeysOf, TypeNames, VariantModule, VariantOf, VariantTypeSpread} from './precepts';

export type Matrix<T extends VariantModule<string>> = {
    [P in KeysOf<T>]: CreatorOutput<T[GetTypeLabel<T, P>]>;
}

/**
 * Splay a list of variant instances into an object. 
 */
export type Flags<T extends VariantModule<string>> = Partial<Matrix<T>>;

export interface FlagsFunc<K extends string> {
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

