import {Handler, Limited, match} from './match';
import {ExtractOfUnion, Func, Identity} from './util';
import {KeysOf, TypeExt, Variant, VariantCreator, VariantsOfUnion} from './variant';

/**
 * UNSTABLE.
 * 
 * A stateful "match" clause represented by an object.
 * 
 * Create the matcher on some instance of a variant.
 * Express handlers for clauses through `.when()`. 
 * Finish handling with a terminal: `.complete()`, `.execute()`, or `.else()`.
 */
export type Matcher<
    T extends TypeExt<K, string>,
    H extends Partial<Handler<VariantsOfUnion<T, K>>>,
    K extends string = 'type',
> = {
    /**
     * The in-progress handler.
     */
    readonly handler?: H;
    /**
     * The target object being matched.
     */
    readonly target: T;
    /**
     * The key used as the discriminant.
     */
    readonly key: K;
    /**
     * Handle one or more cases using a `match`-like handler object.
     */
    when<HPrime extends SplayPartial<Exclude<T, TypeExt<K, keyof H>>, K>>(hp: HPrime): Matcher<T, H & HPrime, K>;
    /**
     * Handle one or more cases by specifying the relevant types in an array
     * then providing a function to process a variant of one of those types.
     */
    when<
        KPrime extends (Exclude<T[K], keyof H> | VariantCreator<Exclude<T[K], keyof H>, Func, K>),
        HFunc extends (x: ExtractOfUnion<T, GetKey<KPrime, K>, K>) => any,
    >(
        keys: KPrime[],
        handler: HFunc,
    ): Matcher<T, H & Record<GetKey<KPrime, K>, HFunc>, K>;
    /**
     * Execute the match immediately. Exhaustiveness is not guaranteed, but if the matcher
     * has missing cases this function may return `undefined`. In that scenario the `undefined` 
     * type will be added to this function's possible return types.
     */
    execute(): Exclude<T[K], keyof H> extends never 
        ? ReturnType<EnsureFunc<H[keyof H]>> 
        : (ReturnType<EnsureFunc<H[keyof H]>> | undefined)
    ;
    /**
     * Take any remaining cases and handle them in a single function. This is a terminal and
     * will execute the match immediately. If a previous `when()` statement 
     */
    else<F extends (variant: Exclude<T, TypeExt<K, keyof H>>) => any>(f: F): ReturnType<EnsureFunc<H[keyof H]> | F>;

} & (Exclude<T[K], keyof H> extends never ? {
    /**
     * Only exists if all cases are handled.
     */
    complete: () => ReturnType<EnsureFunc<H[keyof H]>>
} : {});


type GetKey<T extends (string | VariantCreator<string, Func, K>), K extends string = 'type'> = T extends string ? T : T extends VariantCreator<infer TT, Func, K> ? TT : never;


type Coalesce<T, U> = T extends undefined ? U : T;
type EnsureFunc<T> = T extends Func ? T : never;

/**
 * *Extremely* beta, do not use unless you've spoken to me.
 * @param target 
 * @param handler 
 * @param _typeKey 
 */
export function matcher<
    T extends TypeExt<K, string>,
    H extends {},
    K extends string = 'type',
>(target: T, handler = {} as H, _typeKey = 'type' as K): Matcher<T, {}, K> {
    return {
        target,
        handler,
        key: _typeKey ?? 'type',
        when: function<HPrime extends SplayPartial<Exclude<T, TypeExt<K, keyof H>>, K>>(
            this: Matcher<T, H, K>, 
            hp: HPrime | Array<T[K] | VariantCreator<T[K]>>,
            hfunc?: Func
        ) {
            // The case where an array is passed in.
            if (Array.isArray(hp)) {
                const keys = hp.map(keyOrVC => {
                    if (typeof keyOrVC === 'string') {
                        return keyOrVC;
                    } else {
                        return keyOrVC.type;
                    }
                });
                if (hfunc) {
                    const obj = keys.reduce((acc, key) => {
                        return {...acc, [key]: hfunc};
                    }, {});
                    return {
                        ...this,
                        handler: {
                            ...this.handler,
                            ...obj,
                        }
                    }
                } else {
                    // ERROR
                    return this;
                }
            } else {
                return {
                    ...this,
                    handler: {
                        ...this.handler,
                        ...hp,
                    } as H & HPrime,
                }
            }

        } as Func,
        execute: function(this: Matcher<T, H, K>) {
            console.log(this.handler);
            const result: (x: T) => unknown = (this.handler as any)[this.target[this.key]]
            return result(this.target);
        } as Func,
        complete: function(this: Matcher<T, H, K>) {
            return this.execute();
        } as Func,
        else: function(this: Matcher<T, H, K>, func: (x: T) => unknown) {
            if (this.target[this.key] in (this.handler ?? {})) {
                return this.execute();
            } else {
                return func(this.target);
            }
        }
    } as any;
}



type SplayPartial<T extends TypeExt<K, string>, K extends string = 'type'> =
    Identity<SplayCase<T, K>[T[K]]>;

type SplayCase<T extends TypeExt<K, string>,K extends string = 'type'> = {
    [P in T[K]]: KeyCase<T, T[K], P, (x: ExtractOfUnion<T, P, K>) => any, K>;
}

/**
 * 
 */
type KeyCase<T extends TypeExt<K, string>, Types extends string, Type extends Types, F extends (...args: any[]) => any, K extends string = 'type'> 
    = Partial<Handler<VariantsOfUnion<T, K>>> & TypeExt<Type, F>;

