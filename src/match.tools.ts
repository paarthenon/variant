
/**
 * Create a function that returns a value after being called.
 * @param x the value to be returned
 */
export function constant<T>(x: T) {
    return () => x;
}
export const just = constant;

/**
 * Extract the payload element from the object and return it.
 * @example
 * ```
 * match(object, {
 *     ...
 *     case: unpack,
 *     ...
 * })
 * ```
 */
export const unpack = <T>(x: {payload: T}) => x.payload;