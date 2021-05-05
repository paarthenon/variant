// /**
//  * strip the type field from some object type.
//  */
// export type VariantWithoutDiscriminant<T, K extends string> = Omit<T, K>;

import {Func} from './precepts';
import {TypesFunc} from './types';

/**
 * Helper to retrieve the fields of a variation.
 */
export type VariationFields<T, TType extends string, K extends string> =
    Omit<Extract<T, Record<K, TType>>, K>;
/**
 * Enforce the expectation of a module that meets the contract.
 */
export type ExactDefinition<T extends Record<K, string>, K extends string> = {
    [P in T[K]]: (input: VariationFields<T, P, K>) => VariationFields<T, P, K>;
}

type VoidEmpty<T> = {
    [P in keyof T]: T[P] extends (...args: infer TArgs) => infer TReturn
        ? (...args: {} extends TArgs[0] ? [] : TArgs) => TReturn
        : T[P];
}

/**
 * A helper function for variantModule.
 * 
 * This is the identity function by a better name.
 * @param x 
 */
export const pass = <T>(x: T) => x;

export interface TypedFunc<K extends string> {
    /**
     * Helper function to enforce the structure (i.e. grant autocomplete) of
     * a type-first variant.
     * @param variant
     */
    typed<
        T extends Record<K, string>,
    >(variant: ExactDefinition<T, K>): VoidEmpty<ExactDefinition<T, K>>;
    /**
     * Helper that takes pass as a '_' parameter.
     * @param defHelper 
     */
    typed<
        T extends Record<K, string>,
    >(
        factory: (_: typeof pass) => ExactDefinition<T, K>
    ): VoidEmpty<ExactDefinition<T, K>>;
}

export function typedImpl<K extends string>(_key: K): TypedFunc<K> {
    function typed<
        T extends Record<K, string>,
    >(defOrFactory: ExactDefinition<T, K> | ((_: typeof pass) => ExactDefinition<T, K>)) {
        if (typeof defOrFactory === 'function') {
            return defOrFactory(pass) as VoidEmpty<ExactDefinition<T, K>>;
        } else {
            return defOrFactory as VoidEmpty<ExactDefinition<T, K>>;
        }
    }

    return {typed};
}