import {VariantModule, Property} from './variant';

/**
 * Useful in generating friendly types. Intersections are rendered as the type of the intersection, not as A & B.
 */
export type Identity<T> = {} & {
    [P in keyof T]: T[P]
};

export const identityFunc = <T>(x = {} as T) => x as T extends unknown ? {} : T ;

export type Func = (...args: any[]) => any;

export interface FuncObject {
    [key: string]: Func
}

/**
 * Extract the data type from a function, whether it returns the
 * object directly or does so with a promise.
 */
export type GetDataType<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof T]: ReturnType<T[P]> extends PromiseLike<infer R>
        ? R extends Property<K, string> ? R : never
        : ReturnType<T[P]>
}

/**
 * Given a union of types all of which meet the contract {[K]: string}
 * extract the type that is specifically {[K]: TType}
 */
export type ExtractOfUnion<T, TType extends string, K extends string = 'type'> = T extends Property<K, TType> ? T : never;

/** 
 * Utility function to create a K:V from a list of strings 
 * 
 * Taken from: https://basarat.gitbook.io/typescript/type-system/literal-types#string-based-enums
 * */
export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}

/**
 * Determine whether or not a variable is a promise.
 * @param x 
 */
export function isPromise<T>(x: T | PromiseLike<T>): x is PromiseLike<T> {
    return x != undefined && typeof x === 'object' && 'then' in x && typeof x.then === 'function';
}
