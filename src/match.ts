import {LookupTableToHandler} from './matcher'
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
     * Handle some cases, deal with the rest in a  well-typed function. If the discriminated union
     * is `A | B | C` and `A` has been handled, then the else function will understand it will receive
     * only `B | C`.
     * @param branches 
     * @param elseFunc 
     */
    otherwise<
        P extends Partial<Handler<T, K>>,
        T extends Record<K, string>,
        Else extends (remainder: Exclude<T, Record<K, keyof P>>) => any,
    >(branches: P, elseFunc: Else): (input: T) =>  HandlerFromPartial<P & {default: Else}, T[K]>

    // partial helper function.
    partial: PartialOverloads<K>;

    // match against a variant ahead of time.
    prematch: PrematchFunc<K>;
    
    /**
     * Resolve the match with a lookup table. 
     * @param handler 
     */
    lookup<H extends Record<T[K], any>, T extends Record<K, string>>(handler: H): (instance: T) => LookupTableToHandler<H>;
}

type HandlerFromPartial<H extends Record<'default', unknown>, Keys extends string> = {
    [K in Keys]: H extends Record<K, any> ? H[K] : H['default'];
}

export interface PartialOverloads<K extends string> {
    /**
     * Handle some cases, use **`default:`** to handle the remainder.
     */
    <H extends AdvertiseDefault<Handler<T, K>>, T extends Record<K, string>>(handler: H | ((t: T) => H)): (input: T) => H;
    /**
     * Handle some cases, use **`default:`** to handle the remainder (Active).
     */
    <H extends WithDefault<Handler<T, K>, T>, T extends Record<K, string>>(handler: H | ((t: T) => H)): (input: T) => HandlerFromPartial<H, T[K]>;
}

export interface MatchOverloads<K extends string> {
    /**
     * **(inline)** Match an instance of a variant or literal union against its possible cases.
     * @remarks
     * This point-free overload is intended for inline use, not pre-matching.
     * 
     * @param handler a handler object. This type will be properly constrained when used inline.
     * @template T instance of a variant
     * @template H handler object
     */
    <
        T extends Record<K, TType>,
        H extends Handler<T, K>,
        TType extends string,
    >(handler: EnforceHandler<H> | ((t: T) => H)): (instance: T | TType) => ReturnType<H[keyof H]>;

    /**
     * Match an instance of a variant or literal union against its possible cases.
     * @remarks
     * Supports exhaustiveness checking, partial matching, and literals.
     * 
     * @param target the target instance
     * @param handler an object with a function corresponding to each case
     * @returns The result of the appropriate branch based on the instance type
     */
    <
        T extends Record<K, TType>,
        H extends Handler<T, K>,
        TType extends string,
    >(target: T | TType, handler: H | ((t: T) => H)): ReturnType<H[T[K]]>;
}

/**
 * Ensure that the handler object is not empty.
 */
export type EnforceHandler<T> = {} extends T ? VariantError<['Handler cannot be empty', 'Are you sure you are using this inline?']> : T;


export interface PrematchFunc<K extends string> {
    /**
     * Match against a variant model
     * 
     * @param variant an object containing variant creators.
     * @returns a function to handle an instance of that type.
     */
    <T extends VariantModule<K>>(variant: T): TypedCurriedMatchFunc<VariantOf<T>, K>;
    /**
     * Match against a variant by type
     * 
     * @template T a discriminated union
     * @returns a function to handle an instance of that type.
     */
    <T extends Record<K, string>>(): TypedCurriedMatchFunc<T, K>;
}

/**
 * Curried match func set to a specific type from `prematch`.
 */
export interface TypedCurriedMatchFunc<T extends Record<K, string>, K extends string> {
    /**
     * Resolve the predefined matcher.
     */
    <H extends Handler<T, K>>(handler: H | ((t: T) => H)): (instance: T) => ReturnType<H[keyof H]>;
}

export function matchImpl<K extends string>(key: K): MatchFuncs<K> {
    // curryable wrapper around match.
    const prematch = (_?: {}) =>
        (handler: Handler<Record<K, string>, K> | ((t: {}) => Handler<Record<K, string>, K>)) =>
            (instance: Record<K, string>) =>
                match(instance, handler);

    function match<
        T extends Record<K, TType>,
        H extends Handler<T, K> | ((t: T) => Handler<T, K>),
        TType extends string,
    >(...args: any[]) {
        if (args.length === 1) {
            // inline match
            const [handler] = args as [H];
            return (instance: T | TType) => match(instance, handler);
        } else if (args.length === 2) {
            // regular match
            const [instanceOrType, handlerParam] = args as [T | TType, H];

            const instance = typeof instanceOrType === 'string'
                ? ofLiteral(instanceOrType) as T
                : instanceOrType
            ;
            // unpack handler from function if necessary.
            const handler: WithDefault<Handler<T, K>, T> = typeof handlerParam === 'function'
                ? (handlerParam as Extract<H, Func>)(instance)
                : handlerParam
            ;

            if (instance[key] in handler) {
                return handler[instance[key]]?.(instance as any);
            } else if (DEFAULT_KEY in handler) {
                return handler[DEFAULT_KEY]?.(instance as any);
            }
        }
    }

    const partial = <H> (h: H) => () => h;

    const onLiteral = ofLiteral;

    function ofLiteral<T extends string | number | symbol>(instance: T) {
        return {
            [key]: instance,
        } as LiteralToUnion<T, K>;
    }

    function lookup<H extends Record<T[K], any>, T extends Record<K, string>>(handler: H): (instance: T) => LookupTableToHandler<H> {
        const handlerWithFuncs = Object.keys(handler).reduce((acc, cur) => {
            return {...acc, [cur]: () => handler[cur as keyof H]}
        }, {} as LookupTableToHandler<H>);
        return _ => handlerWithFuncs;
    }

    function otherwise<
        P extends Partial<Handler<T, K>>,
        T extends Record<K, string>,
        Else extends (remainder: Exclude<T, Record<K, keyof P>>) => any,
    >(branches: P, elseFunc: Else): (input: T) =>  HandlerFromPartial<P & {default: Else}, T[K]> {
        return _ => ({...branches, default: elseFunc});
    }

    return {match, ofLiteral, onLiteral, otherwise, partial, prematch, lookup};
}
