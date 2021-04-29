import {KeysOf, VariantModule} from './precepts';
import {Identity} from './util';
export interface TypesFunc<K extends string> {
    /**
     * Get the types from a VariantModule
     * @param content 
     * @param key 
     */
    types<T extends VariantModule<K>>(content: T): Identity<KeysOf<T>>[];
    /**
     * Get the types from a list of variant creators *or* a list of variant instances.
     * @param content 
     * @param key 
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

