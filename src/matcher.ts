import {Handler} from './match';
import {Func, VariantCreator, VariantError} from './precepts';
import {Identity, TypeStr} from './util';

/**
 * A stateful "match" clause represented by an object.
 * 
 * Create the matcher on some instance of a variant.
 * Express handlers for clauses through `.when()`. 
 * Finish handling with a terminal: `.complete()`, `.execute()`, or `.else()`.
 */
export type Matcher<
    T extends Record<K, string>,
    H extends {[P in T[K]]?: (instance: Extract<T, Record<K, P>>) => any},
    K extends string,
> = {
    /**
     * The in-progress handler.
     */
    readonly handler: H;
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
    when<HPrime extends SplayPartial<Exclude<T, Record<K, keyof H>>, K>>(hp: HPrime): Matcher<T, H & HPrime, K>;
    /**
     * Handle one or more cases by specifying the relevant types in an array
     * then providing a function to process a variant of one of those types.
     */
    when<
        KPrime extends (Exclude<T[K], keyof H> | VariantCreator<Exclude<T[K], keyof H>, Func, K>),
        HFunc extends (x: Extract<T, Record<K, TypeStr<KPrime, K>>>) => any,
    >(
        keys: KPrime[] | KPrime,
        handler: HFunc,
    ): Matcher<T, H & Record<TypeStr<KPrime, K>, HFunc>, K>;

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
    else<F extends (variant: Exclude<T, Record<K, keyof H>>) => any>(f: F): ReturnType<EnsureFunc<H[keyof H]> | F>;

} & (Exclude<T[K], keyof H> extends never ? {
    /**
     * Only exists if all cases are handled.
     */
    complete: () => ReturnType<EnsureFunc<H[keyof H]>>
} : {
    /**
     * The **incomplete** complete function. This is *not* executable, it purely reports the error.
     */
    complete: (_: VariantError<['The handler has not been fully completed. Keys', Exclude<T[K], keyof H>, 'expected']>) => ReturnType<EnsureFunc<H[keyof H]>>
});

type Coalesce<T, U> = T extends undefined ? U : T;
type EnsureFunc<T> = T extends Func ? T : never;

/**
 * *Extremely* beta, do not use unless you've spoken to me.
 * @deprecated - rewrite w/ 3.0 in mind (in closure).
 * @param target 
 * @param handler 
 * @param _typeKey 
 */
export function matcher<
    T extends Record<K, string>,
    H extends {},
    K extends string = 'type',
>(target: T, handler = {} as H, _typeKey = 'type' as K): Matcher<T, {}, K> {
    return {
        target,
        handler,
        key: _typeKey ?? 'type',
        when: function<HPrime extends SplayPartial<Exclude<T, Record<K, keyof H>>, K>>(
            this: Matcher<T, H, K>, 
            hp: HPrime | Array<T[K] | VariantCreator<T[K]>> | T[K],
            hfunc?: Func
        ) {
            if (typeof hp === 'string') {
                if (hfunc) {
                    return {
                        ...this,
                        handler: {
                            ...this.handler,
                            [hp]: hfunc,
                        }
                    }
                } else {
                    return this;
                }
            } else {
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
            }
        } as Func,
        execute: function(this: Matcher<T, H, K>) {
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


type SplayPartial<T extends Record<K, string>, K extends string = 'type'> =
    Identity<SplayCase<T, K>[T[K]]>;

type SplayCase<T extends Record<K, string>,K extends string = 'type'> = {
    [P in T[K]]: KeyCase<T, T[K], P, (x: Extract<T, Record<K, P>>) => any, K>;
}

/**
 * 
 */
type KeyCase<T extends Record<K, string>, Types extends string, Type extends Types, F extends (...args: any[]) => any, K extends string = 'type'> 
    = Partial<Handler<T, K>> & Record<Type, F>;

