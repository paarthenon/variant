import {Handler} from './match';
import {just} from './match.tools';
import {Func, Splay, VariantCreator, VariantError} from './precepts';
import {Identity, TypeStr} from './util';
import {isVariantCreator} from './variant';

/**
 * From a lookup table to a handler record.
 */
export type LookupTableToHandler<T extends {}> = {
    [P in keyof T]: () => T[P];
}

/**
 * Strip all non-function options.
 */
type EnsureFunc<T> = T extends Func ? T : never;

/**
 * Utility func to create a handler from a lookup table.
 * @param table 
 * @returns 
 */
export function tableToHandler<
    T extends Record<K, string>,
    K extends string,
    Table extends Record<T[K], unknown>
>(table: Table) {
    return Object.keys(table).reduce((acc, cur) => {
        const key = cur as keyof Table;
        return {
            ...acc,
            [key]: just(table[key]),
        }
    }, {} as Handler<T, K>);
}

type CompleteFunc<RemainingKeys, Return> = {
    /**
     * Execute the matcher with all cases and retrieve the result.
     */
    complete(): Return;
    /**
     * The **incomplete** complete function.
     * 
     * > This is not callable. 
     */
    incomplete: VariantError<['The handler has not been fully completed. Keys', RemainingKeys, 'expected']>
}

/**
 * Determine the complenetary handler.
 */
type RestOfHandler<
    T extends Record<K, string>,
    H extends Partial<Handler<T, K>>,
    K extends string,
> = keyof H extends never 
    ? Handler<T, K> // the extract will fail if asked to retrieve Record<K, never>
    : Handler<Extract<T, Record<K, keyof H>>, K>;

/**
 * Retrieve keys not yet handled.
 */
type RemainingKeys<
    T extends Record<K, string>,
    K extends string,
    H extends Partial<Handler<T, K>>,
> = keyof H extends never ? T[K] : Exclude<T[K], keyof H>;

/**
 * The matcher, a builder-pattern form of `match()`
 * 
 * * Create a matcher `matcher(animal)`
 * * Define cases
 *     * `.when('cat', _ => _.name)`
 *     * `.when(Animal.cat, c => c.name)`
 *     * `.when(['cat', Animal.dog], cd => cd.name)`,
 *     * `.when({cat: c => c.name, dog: d => d.name})`
 *     * `.register({cat: 'purr', dog: 'woof'})` for constants.
 * 
 * * Execute the matcher
 *     * `.complete()` brings exhaustiveness checking
 *     * `.execute()` immediately runs the matcher, whether or not all cases are handled.
 *     * `.else(_ => {...})` immediately runs the matcher, resolving unhandled cases with a function.
 */
export class Matcher<
    T extends Record<K, string>,
    K extends string,
    H extends Partial<Handler<T, K>>,
> {
    /**
     * Create a new matcher from the target
     * @param target the 
     * @param handler the initial handler. Use `{}` for standard functionality.
     * @param key the discriminant. Use `'type'` for standard functionality.
     */
    constructor(
        /**
         * The match target. 
         */
        readonly target: T,
        /**
         * The discrimant used for the union `T`
         */
        readonly key: K,
        /**
         * The in-progress handler object.
         */
        readonly handler: H,
    ) { }

    /**
     * Immediately execute the matcher. Exhaustiveness is not guaranteed.
     * 
     * This is a **terminal** and resolves the matcher.
     */
    execute() {
        const chosenHandler: (target: T) => unknown
            = this.handler[this.target[this.key]] as Func;

        return chosenHandler?.(this.target) as RemainingKeys<T, K, H> extends never 
            ? ReturnType<EnsureFunc<H[keyof H]>> 
            : (ReturnType<EnsureFunc<H[keyof H]>> | undefined) 
    }

    /**
     * Handle all unhandled cases and immediately execute. 
     * 
     * This is a **terminal** and resolves the matcher.
     * @param remainingCases 
     * @returns 
     */
    exhaust<R extends RestOfHandler<T, H, K>>(remainingCases: R): ReturnType<(H & R)[T[K]]> {
        const combinedHandler = {
            ...this.handler,
            ...remainingCases,
        };
        return combinedHandler[this.target[this.key]]?.(this.target as any);
    }

    complete = this.execute as
        RemainingKeys<T, K, H> extends never
            ? CompleteFunc<RemainingKeys<T, K, H>, ReturnType<EnsureFunc<H[keyof H]>>>['complete']
            : CompleteFunc<RemainingKeys<T, K, H>, ReturnType<EnsureFunc<H[keyof H]>>>['incomplete']
    ;

    /**
     * Execute the match. If the target type has been explicitly handled, use that logic.
     * Otherwise use the function passed here.
     * 
     * This is a **terminal** and resolves the matcher.
     * @param func 
     * @returns 
     */
    else<
        ElseFunc extends (variant: Exclude<T, Record<K, keyof H>>) => any
    >(func: ElseFunc): ReturnType<EnsureFunc<H[keyof H]> | ElseFunc> {
        if (this.target[this.key] in this.handler) {
            return this.handler[this.target[this.key]]?.(this.target as Extract<T, Record<K, string>>);
        } else {
            return func(this.target as Exclude<T, Record<K, keyof H>>);
        }
    }

    /**
     * Register a series of options as a lookup table.
     * 
     * ```ts
     * const getSound = (a: Animal) => matcher(a)
     *     .register({
     *         cat: 'purr',
     *         dog: 'woof',
     *         snake: 'hiss',
     *     })
     *     .complete()
     * ```
     * @param table 
     * @returns 
     */
    register<Table extends Splay<Record<T[K], any>>>(table: Table): Matcher<T, K, H & LookupTableToHandler<Table>> {
        const newHandler = {
            ...this.handler,
            ...tableToHandler(table),
        } as H & LookupTableToHandler<Table>
        return new Matcher(this.target, this.key, newHandler);
    }

    /**
     * Provide an exhaustive table of the unhandled options and look up which value
     * to use based on the instance.
     * 
     * This is a **terminal** and resolves the matcher.
     * 
     * ```ts
     * const getSound = (a: Animal) => matcher(a)
     *     .lookup({
     *         cat: 'purr',
     *         dog: 'woof',
     *         snake: 'hiss',
     *     })
     * ```
     * @param table 
     * @returns 
     */
    lookup<Table extends Record<T[K], any>>(table: Table): ReturnType<(H & LookupTableToHandler<Table>)[T[K]]> {
        const combinedHandler = {
            ...this.handler,
            ...tableToHandler(table),
        } as H & LookupTableToHandler<Table>

        return combinedHandler[this.target[this.key]]?.(this.target as any);
    }

    /**
     * Handle one or more cases, object-style.
     * @param variations
     */
    when<
        Variations extends Splay<Handler<T, K>>,
    >(variations: Variations): Matcher<T, K, H & Variations>;

    /**
     * Handle one or more cases with a set of types and a handler.
     * @param variations 
     * @param handler 
     */
    when<
        Variation extends T[K] | VariantCreator<T[K], Func, K>,
        Handler extends (x: Extract<T, Record<K, TypeStr<Variation, K>>>) => any
    >(variations:Variation | Variation[], handler: Handler): Matcher<T, K, H & Record<TypeStr<Variation, K>, Handler>>;
    /**
     * Actual impl.
     * @param variations 
     * @param handler 
     * @returns 
     */
    when<
        Variation1 extends T[K],
        Variation2 extends VariantCreator<T[K], Func, K>,
        Variation3 extends Variation1[],
        Variation4 extends Splay<Handler<T, K>>,
        HandlerFunc extends (x: Extract<T, Record<K, TypeStr<Variation1, K>>>) => any
    >(variations: Variation1 | Variation2 | Variation3 | Variation4, handler?: HandlerFunc) {
        if (handler != undefined) {
            // 2 param case
            const list = Array.isArray(variations) ? variations : [variations];
            const newCases = list.reduce((acc, cur) => {
                const type = typeof cur === 'string' ? cur : isVariantCreator(cur) ? cur.type : undefined;
    
                return type != undefined ? (
                    {...acc, [type]: handler}
                ) : (
                    acc
                );
            }, {} as Record<TypeStr<Variation1, K>, HandlerFunc>);

            return new Matcher(this.target, this.key, {
                ...this.handler,
                ...newCases
            });
        } else {
            //1 param case
            return new Matcher(this.target, this.key, {
                ...this.handler,
                ...(variations as Variation4)
            });
        }
    }
}

export interface MatcherFunc<K extends string> {
    /**
     * Create a matcher on some target variant instance.
     * @param target 
     */
    matcher<T extends Record<K, string>>(target: T): Matcher<T, K, {}>
}

export function matcherImpl<K extends string>(key: K): MatcherFunc<K> {
    function matcher<T extends Record<K, string>>(target: T) {
        return new Matcher(target, key, {})
    }

    return {matcher};
}
