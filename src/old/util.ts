import {VariantModule, Property, VariantCreator} from './variant';

/**
 * Basic building block, the loose function signature.
 * @deprecated
 */
 export type Func = (...args: any[]) => any;

/**
 * Useful in generating friendly types. Intersections are rendered as the type of the intersection, not as A & B.
 * @deprecated
 */
export type Identity<T> = T extends object ? {} & {
    [P in keyof T]: T[P]
} : T;

/**
 * 
 * @deprecated
 * @param x 
 */
export const identityFunc = <T>(x = {} as T) => x as T extends unknown ? {} : T ;

/**
 * Extract the data type from a function, whether it returns the
 * object directly or does so with a promise.
 * @deprecated
 */
export type GetDataType<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof T]: ReturnType<T[P]> extends PromiseLike<infer R>
        ? R extends Property<K, string> ? R : never
        : ReturnType<T[P]>
}

/**
 * Given a union of types all of which meet the contract {[K]: string}
 * extract the type that is specifically {[K]: TType}
 * @deprecated
 */
export type ExtractOfUnion<T, TType extends string, K extends string = 'type'> = T extends Property<K, TType> ? T : never;
