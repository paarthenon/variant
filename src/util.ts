import {Func, VariantCreator} from './precepts';

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


/**
 * **H**igher-**O**rder **I**dentity.
 * 
 * A higher order factory for this very useful wrapper function.
 * 
 * ```ts
 * // Enforce the type constraint *and* narrow the return type.
 * function defineThing<T extends Template>(definition: T): T {
 *     return definition;
 * }
 * ```
 * 
 * The above `defineThing` can now be generated through
 * 
 * ```ts
 * const defineThing = HOI<Template>();
 * ```
 * 
 * Or in more advanced to define something like a catalog:
 * 
 * ```ts
 * const defineThings = HOI<Record<string, Template>>();
 * ```
 */
export const HOI = <Constraint> () => <T extends Constraint> (definition: T) => definition;
