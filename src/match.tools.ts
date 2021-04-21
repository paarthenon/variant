
/**
 * Used in conjunction with variantModule to have empty tags.
 */
export const nil = () => {};

/**
 * Meant to be used inside of a `match`
 * @param x 
 */
export function constant<T>(x: T) {
    return () => x;
}

/**
 * Extract the payload element from the object and return it.
 * 
 * Unstable API. 
 * 
 * Shorthand for
 * 
 * ```ts
 * match(object, {
 *     ...
 *     case: unpack,
 *     ...
 * })
 * ```
 * @param x 
 */
export const unpack = <T>(x: {payload: T}) => x.payload;
/**
 * Ignore the matched object and return a specific value.
 * 
 * Unstable API.
 * 
 * ```ts
 * match(object, {
 *     ...
 *     case: just(true),
 *     ...
 * })
 * ```
 * @param x 
 */
export const just = <T>(x: T) => () => x;