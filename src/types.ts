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

    /**
     * Create a type catalog from an *instance* of a variant.
     * 
     * Note this leverages proxies and is based on the perceived
     * type union for `instance`
     * @param instance 
     */
    inferTypes<T extends Record<K, string>>(instance: T): {[P in T[K]]: P}
}

export function typesImpl<K extends string>(key: K): TypesFunc<K> {
    function types(content: VariantModule<K> | Record<K, string>[]) {
        if (Array.isArray(content)) {
            return content.map(c => c[key]);
        } else {
            return Object.values(content).map(c => c.type);
        }
    }
    function inferTypes<T extends Record<K, string>>(_: T) {
        return new Proxy({} as {[P in T[K]]: P}, {
            get: (_, property) => {
                return property;
            }
        })
    }

    return {types, inferTypes};
}

