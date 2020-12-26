import {Func} from './util';
import {TypeExt, UnionHandler, VariantsOfUnion, VariantModule, KeysOf, Variant, Property} from './variant';



/**
 * Built to describe an object with the same keys as a variant but instead of constructors
 * for those objects has functions that handle objects of that type.
 */
export type Handler<T, U = any> = {
    [P in keyof T]: (variant: T[P]) => U
}

/**
 * Either the full handler or the partial set plus 'default'
 */
type WithDefault<T, U = any> = 
    | Partial<T> & {default: (...args: Parameters<FuncsOnly<T>[keyof T]>) => U}
    | T
;

/**
 * Pick just the functions of an object.
 */
type FuncsOnly<T> = {
    [P in keyof T]: T[P] extends Func ? T[P] : never;
}

/**
 * The key used to indicate the default handler.
 */
export const DEFAULT_KEY = 'default';
export type DEFAULT_KEY = typeof DEFAULT_KEY;

/**
 * Catch-all type to express type errors.
 */
export interface VariantError<T> { __error: never, __message: T };

/**
 * Prevents 'overflow' in a literal.
 * 
 * @todo this may be unnecessary if you use that 'splay partial' trick.
 */
export type Limited<T, U> = Exclude<keyof T, U> extends never 
    ? T 
    : VariantError<['Expected keys of handler', keyof T, 'to be limited to possible keys', U]>
;

/**
 * Strip undefined from a union of types.
 */
export type Defined<T> = T extends undefined ? never : T;


/**
 * Match a variant against its possible options and do some processing
 * based on the type of variant received. 
 * @param obj the variant in question
 * @param handler an object whose keys are the type names of the variant's type and values are handler functions for each option.
 * @returns The union of the return types of the various branches of the handler object
 */
export function match<
    T extends Property<'type', string>,
    H extends WithDefault<Handler<VariantsOfUnion<T>>>,
>(obj: T, handler: H & Limited<H, T['type'] | DEFAULT_KEY>):
 ReturnType<Limit<FuncsOnly<H>, T['type'] | DEFAULT_KEY>[keyof H]>;
/**
 * Match a variant against its possible options and do some processing
 * based on the type of variant received. 
 * @param obj the variant in question
 * @param handler an object whose keys are the type names of the variant's type and values are handler functions for each option.
 * @param {string?} typeKey override the property to inspect. By default, 'type'.
 * @returns The union of the return types of the various branches of the handler object
 */
export function match<
T extends Property<K, string>,
H extends WithDefault<Handler<VariantsOfUnion<T, K>>>,
K extends string = 'type'
>(obj: T, handler: H & Limited<H, T[K] | DEFAULT_KEY>, typeKey?: K): ReturnType<Limit<FuncsOnly<H>, T[K] | DEFAULT_KEY>[keyof H]>;
/**
 * Match a variant against it's some of its possible options and do some 
 * processing based on the type of variant received. Finally, take the remaining
 * possibilities and handle them in a function.
 * 
 * The input to the 'or' clause is well-typed. 
 * 
 * @param obj the variant in question
 * @param handler an object whose keys are the type names of the variant's type and values are handler functions for each option.
 * @param {string?} typeKey override the property to inspect. By default, 'type'.
 * @returns {The union of the return types of the various branches of the handler object}
 */
export function match<
    T extends Property<K, string>,
    H extends Partial<Handler<VariantsOfUnion<T, K>>>,
    E extends (rest: Exclude<T, TypeExt<K, keyof H>>) => any,
    K extends string = 'type'
>(obj: T, handler: H, _else: E, typeKey?: K): ReturnType<Defined<FuncsOnly<H>[keyof H]>> | ReturnType<E>;
/**
 * Actual impl
 */
export function match<
    T extends Property<K, string>,
    H extends Partial<Handler<VariantsOfUnion<T, K>>> | WithDefault<Handler<VariantsOfUnion<T, K>>>,
    E extends (rest: Exclude<T, TypeExt<K, keyof H>>) => any,
    K extends string = 'type'
> (obj: T, handler: H, _elseOrKey?: E | K, key?: K) {
    const typeKey = typeof _elseOrKey === 'string' ? _elseOrKey : key;
    const typeString = obj[typeKey ?? 'type' as K];

    if (typeString in handler) {
        return handler[typeString]?.(obj as any);
    } else {
        if (_elseOrKey != undefined && typeof _elseOrKey === 'function') {
            return _elseOrKey(obj as any);
        } else {
            if ('default' in handler) {
                return (handler as {default(t: T): any}).default(obj);
            }
            return undefined;
        }
    }
}

/**
 * Match a literal against some of its possible options and do some processing based
 * on the type of literal received. Works well with strEnum
 * @param literal
 * @param handler 
 */
export function matchLiteral<T extends string, H extends UnionHandler<T>>(literal: T, handler: H): ReturnType<H[T]> {
    return handler[literal]?.(literal);
}

// I'm not sure if this is still necessary but I don't want to mess
// with the match types until I add more strict tests.
type Limit<T, Keys extends string> = {
    [P in keyof T]: P extends Keys ? T[P] : never;
}


export const noop = (..._: any[]) => {};
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