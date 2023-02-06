import {Func, TypesOf, VariantCreator, VariantModule} from './precepts';
import {isVariantCreator} from './variant';
import {Identity} from './util';
export interface TypesFunc<K extends string> {
    /**
     * Get the list of types from a variant.
     * @param content some variant definition.
     * @template T target discriminated union
     * @returns list of string literal types.
     */
    types<T extends VariantModule<K>>(content: T): Identity<TypesOf<T>>[];
    /**
     * Get the list of types from a list of variant creators.
     * @param content list of variant creators.
     * @template T target discriminated union
     * @returns list of string literal types.
     */
    types<C extends VariantCreator<string, Func, K>>(content: C[]): C['output']['type'][];
    /**
     * Get the list of types from the instances of a variant.
     * @param content list of instances.
     * @template T target discriminated union
     * @returns list of string literal types.
     */
    types<T extends Record<K, string>>(content: T[]): T[K][];

    /**
     * Create a type catalog from an *instance* of a variant.
     * 
     * Note this leverages proxies and is based on the perceived
     * type union for `instance`
     * @param instance
     * @template T target discriminated union
     * @returns a proxy TypeCatalog
     */
    inferTypes<T extends Record<K, string>>(instance: T): {[P in T[K]]: P}
}

export function typesImpl<K extends string>(key: K): TypesFunc<K> {
    function types(content: VariantModule<K> | VariantCreator<string, Func, K>[] | Record<K, string>[]) {
        if (Array.isArray(content)) {
            if (content.length && isVariantCreator(content[0])) {
                return (content as VariantCreator<string, Func, K>[]).map(c => c.output.type);
            } else {
                return (content as Record<K, string>[]).map(c => c[key]);
            }
        } else {
            return Object.values(content).map(c => c.output.type);
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

