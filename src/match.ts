import {DEFAULT_KEY, Limited, Message, Func, VariantModule, VariantOf, VariantError} from './precepts'

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

type WithDefault<T, DefaultTerm> = Partial<T> & {
    [DEFAULT_KEY]: (instance: DefaultTerm) => any;
}

/**
 * Pick just the functions of an object.
 */
type FuncsOnly<T> = {
    [P in keyof T]: T[P] extends Func ? T[P] : never;
}

export type LiteralToUnion<
    T extends string | number | symbol,
    K extends string
> = {[P in T]: Record<K, P>}[T];

export type MatchFuncs<K extends string> = {
    /**
     * Match function.
     */
    match: MatchOverloads<K>;

    /**
     * Create a variant from a catalog or enum. In other words, 
     * elevate a literal `A | B | C` to a type union `{type: A} | {type: B} | {type: C}`
     * @param instance 
     */
    ofLiteral<T extends string | number | symbol>(instance: T): LiteralToUnion<T, K>;

    /**
     * Elevate a literal `A | B | C` to a type union `{type: A} | {type: B} | {type: C}`
     * @deprecated use `ofLiteral`
     * @param instance 
     */
    onLiteral<T extends string | number | symbol>(instance: T): LiteralToUnion<T, K>;

    /**
     * Match against a function ahead of time.
     */
    prematch: PrematchFunc<K>;
    
}

/**
 * Ensure that the handler object is not empty.
 */
export type EnforceHandler<T> = {} extends T ? VariantError<['Handler cannot be empty', 'Are you sure you are using this inline?']> : T;

export interface CurriedMatchOverloads<K extends string> {
    /**
     * Curried overload - handler.
     */
    <
        T extends Record<K, string>,
        H extends AdvertiseDefault<Handler<T, K>>
    >(handler: EnforceHandler<H>): (instance: T) => ReturnType<H[keyof H]>;
    /**
     * Curried overload - **partial** handler.
     */
    <
        T extends Record<K, string>,
        H extends WithDefault<Handler<T, K>, T>,
    >(handler: EnforceHandler<H>): (instance: T) => ReturnType<FuncsOnly<H>[keyof H]>;
}

export type MatchOverloads<K extends string> = CurriedMatchOverloads<K> & {
    /**
     * Matchmaker, matchmaker, find me a match.
     * @param object 
     * @param handler 
     */
    <
        T extends Record<K, string>,
        H extends AdvertiseDefault<Handler<T, K>>,
    >(object: T, handler: H): ReturnType<H[T[K]]>;
    /**
     * Matchmaker I'm desperate find me a partial match.
     * @param object 
     * @param handler 
     */
    <
        T extends Record<K, string>,
        H extends WithDefault<Handler<T, K>, T>,
    >(object: T, handler: Limited<H, T[K] | DEFAULT_KEY>): ReturnType<FuncsOnly<H>[keyof H]>;
    /**
     * Matchmaker I'm very specific and I want to enumerate my remaining options.
     * @param object 
     * @param handler 
     * @param elseFunc 
     */
    <
        T extends Record<K, string>,
        H extends Partial<Handler<T, K>>,
        EF extends (instance: Exclude<T, Record<K, keyof H>>) => any
    > (object: T, handler: Limited<H, T[K]>, elseFunc: EF): ReturnType<FuncsOnly<H>[keyof H]> | ReturnType<EF>;

}

export interface PrematchFunc<K extends string> {
    /**
     * Placeholder - prematch on variant module instance
     */
    <T extends VariantModule<K>>(animal: T): TypedCurriedMatchFunc<VariantOf<T>, K>;
    /**
     * Placeholder docs - prematch on variant union type.
     */
    <T extends Record<K, string>>(): TypedCurriedMatchFunc<T, K>;
}

/**
 * Curried match func set to a specific type from `prematch`.
 */
export interface TypedCurriedMatchFunc<T extends Record<K, string>, K extends string> {
    /**
     * Placeholder documentation - match against full list.
     */
    <H extends AdvertiseDefault<Handler<T, K>>>(handler: H): (instance: T) => ReturnType<H[keyof H]>;
    /**
     * Placeholder documentation - 
     */
    <H extends WithDefault<Handler<T, K>, T>>(handler: H): (instance: T) => ReturnType<FuncsOnly<H>[keyof H]>;
}

export function matchImpl<K extends string>(key: K): MatchFuncs<K> {
    // curryable wrapper around match.
    const prematch: Func = (_?: {}) =>
        (handler: Handler<Record<K, string>, K>) =>
            (instance: Record<K, string>) =>
                match(instance, handler);

    function match<
        T extends Record<K, string>,
        H extends Handler<T, K>,
        EF extends (instance: Exclude<T, Record<K, keyof H>>) => any,
    >(...args: any[]) {
        if (args.length === 1) {
            const [handler] = args as [H];
            return (instance: T) => match(instance, handler);
        } else if (args.length === 2) {
            const [instance, handler] = args as [T, H];
            if (instance[key] in handler) {
                return handler[instance[key]]?.(instance as any);
            } else if (DEFAULT_KEY in handler) {
                return handler[DEFAULT_KEY as keyof H]?.(instance as any);
            }
        } else if (args.length === 3) {
            const [instance, handler, elseClause] = args as [T, H, EF];
            if (instance[key] in handler) {
                return handler[instance[key]]?.(instance as any)
            } else {
                elseClause(instance as any);
            }
        }
    }

    const onLiteral = ofLiteral;

    function ofLiteral<T extends string | number | symbol>(instance: T) {
        return {
            [key]: instance,
        } as LiteralToUnion<T, K>;
    }
    return {match, ofLiteral, onLiteral, prematch};
}
