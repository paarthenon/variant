import {LookupTableToHandler} from './matcher'
import {isVariantCreator} from './variant'
import {DEFAULT_KEY, Limited, Message, Func, VariantCreator, VariantModule, VariantOf, VariantError} from './precepts'

/**
 * A set of functions meant to handle the variations of an object.
 */
export type Handler<T extends Record<K, string>, K extends string> = {
    [P in T[K]]: (instance: Extract<T, Record<K, P>>) => any;
}

/**
 * A set of functions meant to handle the _constructors_ of a variant type
 */
export type CreatorHandler<C extends VariantCreator<string, (...args: any[]) => {}, string>> = {
    [P in C['output']['type']]: (instance: Extract<C, { output: { type: P } }>) => any;
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

    /**
     * Resolve the match but account for edge cases. 
     * @param handler 
     * @param fallback 
     */
    withFallback<
        T extends Record<K, string>,
        H extends Handler<T, K>,
        F extends (instance: T) => any,
    >(handler: H, fallback: F): (input: T) => ExplicitHandler<H, F, T[K]>;
}


/**
 * When H is acting as the generic term and its constraint, the system doesn't understand what to expect.
 * If H is empty, it still satisfies its own contract.
 * 
 * This requires us to inform TS of what the expected keys should be, giving it shape.
 */
type ExplicitHandler<H extends Record<Keys, Func>, F, Keys extends string> = {
    [K in Keys]: H[K];
} & {[DEFAULT_KEY]: F};

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
     * **(inline)** Match a variant creator against the constructors it contains.
     * @remarks
     * This point-free overload is intended for inline use, not pre-matching.
     *
     * @param handler a handler object. This type will be properly constrained when used inline.
     * @template T instance of a variant
     * @template H handler object
     */
    <
        C extends VariantCreator<string, (...args: any[]) => {}, K>,
        H extends CreatorHandler<C>,
    >(handler: EnforceHandler<H> | ((t: C) => H)): (instance: C) => ReturnType<H[keyof H]>;

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


    /**
     * Match a variant creator against the constructors it contains.
     * @remarks
     * Supports exhaustiveness checking, partial matching, and literals.
     *
     * @param target the variant creator
     * @param handler an object with a function corresponding to each case
     * @returns The result of the appropriate branch based on the creator type
     */
    <
        C extends VariantCreator<string, (...args: any[]) => {}, K>,
        H extends CreatorHandler<C>,
    >(target: C, handler: H | ((t: C) => H)): ReturnType<H[C['output']['type']]>;
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
            const [instanceOrTypeOrCreator, handlerParam] = args as [T | TType | VariantCreator<string, (...args: any[]) => {}, K>, H];

            const instanceOrCreator = typeof instanceOrTypeOrCreator === 'string'
                ? ofLiteral(instanceOrTypeOrCreator) as T
                : instanceOrTypeOrCreator
            ;
            // unpack handler from function if necessary.
            const handler: WithDefault<Handler<T, K>, T> = typeof handlerParam === 'function'
                ? (handlerParam as Extract<H, Func>)(instanceOrCreator as any)
                : handlerParam
            ;

            const tType = instanceOrCreator == undefined
                ? undefined
                : isVariantCreator(instanceOrCreator)
                ? instanceOrCreator.output.type as keyof typeof handler
                : (instanceOrCreator as T)[key]
            ;

            if (instanceOrCreator != undefined && tType !== undefined && tType in handler) {
                return handler[tType]?.(instanceOrCreator as any);
            } else if (DEFAULT_KEY in handler) {
                return handler[DEFAULT_KEY]?.(instanceOrCreator as any);
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

    function withFallback<
        T extends Record<K, string>,
        H extends Handler<T, K>,
        F extends (instance: T) => any,
    >(handler: H, fallback: F): (input: T) => ExplicitHandler<H, F, T[K]> {
        return _ => ({...handler, default: fallback});
    }

    return {match, ofLiteral, onLiteral, otherwise, partial, prematch, lookup, withFallback};
}
