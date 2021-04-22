/**
 * strip the type field from some object type.
 */
export type VariantWithoutDiscriminant<T, K extends string> = Omit<T, K>;
/**
 * Helper to retrieve the fields of a variation.
 */
export type VariationFields<T, TType extends string, K extends string> =
    VariantWithoutDiscriminant<Extract<T, Record<K, TType>>, K>;
/**
 * Enforce the expectation of a module that meets the contract.
 */
export type ExactDefinition<T extends Record<K, string>, K extends string> = {
    [P in T[K]]: (input: VariationFields<T, P, K>) => VariationFields<T, P, K>;
}

/**
 * A helper function for variantModule.
 * 
 * This is the identity function by a better name.
 * @param x 
 */
export const pass = <T>(x: T) => x;

/**
 * Helper function to enforce the structure (i.e. grant autocomplete) of
 * a type-first variant.
 * @param variant
 */
export function typed<
    T extends Record<K, string>,
    K extends string = 'type',
>(variant: ExactDefinition<T, K>): ExactDefinition<T, K>;
/**
 * Helper that takes pass as a '_' parameter.
 * @param defHelper 
 */
export function typed<
    T extends Record<K, string>,
    K extends string = 'type',
>(factory: (_: typeof pass) => ExactDefinition<T, K>): ExactDefinition<T, K>;
/**
 * Final impl.
 */
export function typed<
    T extends Record<K, string>,
    K extends string = 'type',
>(defOrFactory: ExactDefinition<T, K> | ((_: typeof pass) => ExactDefinition<T, K>)) {
    if (typeof defOrFactory === 'function') {
        return defOrFactory(pass);
    } else {
        return defOrFactory;
    }
}

