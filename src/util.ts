import {Func, VariantCreator} from './precepts';

/**
 * Useful in generating friendly types. Intersections are rendered as the type of the intersection, not as A & B.
 */

/**
 * Collapse a complex type into a more easily read object.
 */
export type Identity<T> = T extends object ? {} & {
    [P in keyof T]: T[P]
} : T;


/**
 * Identity function. Doubles as the noop func.
 * @param x 
 */
export const identityFunc = <T>(x = {} as T) => x as T extends unknown ? {} : T ;

/**
 * Determine whether or not a variable is a promise.
 * @param x potential promise.
 */
 export function isPromise<T>(x: T | PromiseLike<T>): x is PromiseLike<T> {
    return x != undefined && typeof x === 'object' && 'then' in x && typeof x.then === 'function';
}

/**
 * Extract a type string from either a string or `VariantCreator`
 */
export type TypeStr<T extends (string | VariantCreator<string, Func, K>), K extends string = 'type'> =
    T extends VariantCreator<infer R, Func, K> ? R : T extends string ? T : never;
