import {DEFAULT_KEY, Limited, Message, Func} from './precepts'

/**
 * A set of functions meant to handle the variations of an object.
 */
export type Handler<T extends Record<K, string>, K extends string> = {
    [P in T[K]]: (instance: Extract<T, Record<K, P>>) => any;
}
type AdvertiseDefault<T> = T & {
    /**
     * Adding a `default` value will make make this a partial match,
     * disabling exhaustiveness checking.
     */
    default?: Message<'Use this option to make the handling optional.'>;
}

type WithDefault<T> = Partial<T> & {
    default: (instance: T) => any;
}

/**
 * Pick just the functions of an object.
 */
type FuncsOnly<T> = {
    [P in keyof T]: T[P] extends Func ? T[P] : never;
}


export type LiteralToUnion<T extends string | number | symbol, K extends string> = {[P in T]: Record<K, P>}[T];


export type MatchFuncs<K extends string> = {
    /**
     * Matchmaker, matchmaker, find me a match.
     * @param object 
     * @param handler 
     */
    match<
        T extends Record<K, string>,
        H extends AdvertiseDefault<Handler<T, K>>,
    >(object: T, handler: H): ReturnType<H[T[K]]>;
    /**
     * Matchmaker I'm desperate find me a partial match.
     * @param object 
     * @param handler 
     */
    match<
        T extends Record<K, string>,
        H extends WithDefault<Handler<T, K>>,
    >(object: T, handler: Limited<H, T[K] | 'default'>): ReturnType<FuncsOnly<H>[keyof H]>;
    /**
     * Matchmaker I'm very specific and I want to enumerate my remaining options.
     * @param object 
     * @param handler 
     * @param elseFunc 
     */
    match<
        T extends Record<K, string>,
        H extends Partial<Handler<T, K>>,
        EF extends (instance: Exclude<T, Record<K, keyof H>>) => any
    > (object: T, handler: Limited<H, T[K]>, elseFunc: EF): ReturnType<FuncsOnly<H>[keyof H]> | ReturnType<EF>;

    onLiteral<T extends string | number | symbol>(instance: T): LiteralToUnion<T, K>;
}

export function matchImpl<K extends string>(key: K): MatchFuncs<K> {
    function match<
        T extends Record<K, string>,
        H extends Handler<T, K>,
        EF extends (instance: Exclude<T, Record<K, keyof H>>) => any,
    >(object: T, handler: H, elseFunc?: EF) {
        const type = object[key];

        if (type in handler) {
            return handler[type]?.(object as any); // TODO: Check if ?. is necessary.
        } else {
            if (elseFunc != undefined) {
                return elseFunc(object as any);
            } else if ('default' in handler) {
                return (handler as (H & {default: (instance: T) => any})).default(object)
            }
        }
    }

    function onLiteral<T extends string | number | symbol>(instance: T) {
        return {
            [key]: instance,
        } as LiteralToUnion<T, K>;
    }

    return {match, onLiteral};
}

