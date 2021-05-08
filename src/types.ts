import {TypesOf, VariantModule} from './precepts';
import {Identity} from './util';
export interface TypesFunc<K extends string> {
    /**
     * Get the list of types from a variant.
     * @param content some variant definition.
     * @returns list of string literal types.
     */
    types<T extends VariantModule<K>>(content: T): Identity<TypesOf<T>>[];
    /**
     * Get the list of types from the instances of a variant.
     * @param content list of instances.
     */
    types<T extends Record<K, string>>(content: T[]): T[K][];
}

export function typesImpl<K extends string>(key: K): TypesFunc<K> {
    function types(content: VariantModule<K> | Record<K, string>[]) {
        if (Array.isArray(content)) {
            return content.map(c => c[key]);
        } else {
            return Object.values(content).map(c => c.type);
        }
    }

    return {types};
}

