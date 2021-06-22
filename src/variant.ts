import {GenericTemplate, GenericVariantRecord} from './generic';
import {Func, Outputs, RawVariant, Variant, VariantCreator} from './precepts';
import {Identity, identityFunc, isPromise} from './util';

/**
 * A variant rendered as an object.
 */
export type VariantRecord<T extends RawVariant, K extends string> = {
    [P in keyof T]: T[P] extends VariantCreator<string, Func, string> 
        ? T[P]
        : VariantCreator<(P & string), T[P] extends Func ? T[P] : () => {}, K>
}

type ValidListType = string | VariantCreator<string, Func, string>;
type CreatorFromListType<T extends ValidListType, K extends string> =
    T extends VariantCreator<string, Func, string>
        ? T
        : T extends string
            ? VariantCreator<T, () => {}, K>
            : never
;

/**
 * Variant-Module-From-Variant-Creator(s)
 * 
 * Create something that satisfies `VariantModule<K>` from some `VariantCreator`.
 */
export type VMFromVC<T extends VariantCreator<string, Func, string>> = {
    [P in T['type']]: Extract<T, Record<'type', P>>;
}

type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

type ScopedVariant<T extends RawVariant, Scope extends string> = {
    [P in (keyof T & string)]: VariantCreator<ScopedType<Scope, P>, CleanResult<T[P], () => {}>>;
}

/**
 * TS 4.1-compatible scoped type.
 */
type ScopedType<Scope extends string, Type extends string> = `${Scope}/${Type}`;

/**
 * Internal function to consistently generate a scoped type.
 * @param scope 
 * @param type 
 * @returns 
 */
export const scopeType = <Scope extends string, Type extends string>(scope: Scope, type: Type) => `${scope}/${type}` as ScopedType<Scope, Type>

function descopeType<S extends string, T extends string>(s: ScopedType<S, T>): T {
    return (s.split('/')[1] ?? s) as T;
}

const VARIANT_CREATOR_BRAND = Symbol('Variant Creator');

export interface CreatorBranded {
    [VARIANT_CREATOR_BRAND]: typeof VARIANT_CREATOR_BRAND;
}

export function isVariantCreator(func: Function | object): func is VariantCreator<string> {
    return VARIANT_CREATOR_BRAND in func;
}

export interface VariantFuncs<K extends string> {
    /**
     * Strip the scope prefix from an object passed into `match`
     * @param target object used as the match target.
     * 
     * @tutorial
     * ```ts
     * match(descope(target), {
     *     ...,
     * })
     * ```
     */
    descope<
        T extends Record<K, ScopedType<string, string>>,
    >(target: T): T extends Record<K, ScopedType<string, infer TType>> ? Identity<Omit<T, K> & Record<K, TType>> : T;
    /**
     * 
     * @param scope 
     * @param v 
     */
    scopedVariant<
        T extends RawVariant,
        Scope extends string,
    >(scope: Scope, v: T): Identity<ScopedVariant<T, Scope>>;

    /**
     * Create a **variant** from a list of elements. Each element may be a `string`
     * or a `VariantCreator`.
     * @param template A list of string literals or calls to `variation()`
     * @returns a variant module.
     * 
     * @tutorial
     * 
     * The simplest use involves purely strings.
     * 
     * ```ts
     * const Suit = variant(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
     * ```
     * 
     * It is possible to use `VariantCreator`s as well. Generate through `variation()`.
     * 
     * ```ts
     * const Shape = variant([
     *     variation('circle', fields<{center: [number, number], radius: number}>()),
     *     variation('rectangle', fields<{center: [number, number], length: number, width: number}>()),
     * ]);
     * ```
     * Feel free to mix the approaches as necessary.
     * ```ts
     * const DebugAction = variant([
     *     variation('LoadState', payload<RootState>()),
     *     'ResetState',
     *     'ToggleDebugMode',
     * ]);
     * ```
     */
    variantList<T extends ValidListType>(template: T[]): Identity<VMFromVC<CreatorFromListType<T, K>>>;

    /**
     * Create a **variant** from some template. 
     * @param template an object where each property represents a possible variation.
     * The **key** is the string literal used as the type and the **value** is a function
     * that handles the creation logic for that shape. This may be `{}` or `nil` for an
     * empty-bodied variant (`{type: 'someType'}`). 
     * @returns a variant module.
     * @tutorial
     * 
     * ```
     * const Action = variant({
     *     AddTodo: fields<{message: string}>(),
     *     Reload: {},
     * });
     * ```
     * 
     * Pair with `variation` to override the type returned by the creator function
     * while still using a friendly name. For example,
     * 
     * ```
     * const Action = variant({
     *     AddTodo: variation('TODO:AddTodo', fields<{message: string}>()),
     *     Reload: variation('TODO:Reload'),
     * });
     * ``` 
     */
    variantModule<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>>,

    /**
     * Create a *generic* **variant** from some template. Use with `onTerms()`.
     * @param template - a call to `onTerms` with some element.
     * 
     * @tutorial
     * 
     * To create the classic `Option<T>` type (a.k.a. `Maybe<T>`)
     * ```ts
     * const Option = variant(onTerms(({T}) => ({
     *     Some: payload(T),
     *     None: {},
     * })));
     * type Option<T, TType extends TypeNames<typeof Option> = undefined>
     *     = GVariantOf<typeof Option, TType, {T: T}>;
     * ```
     * Note the use of `GVariantOf` instead of `VariantOf`.
     */
    variant<VM extends RawVariant>(template: GenericTemplate<VM>): Identity<GenericVariantRecord<VM, K>>,

    /**
     * Create a **variant** from some template. 
     * @param template an object where each property represents a possible variation.
     * The **key** is the string literal used as the type and the **value** is a function
     * that handles the creation logic for that shape. This may be `{}` or `nil` for an
     * empty-bodied variant (`{type: 'someType'}`). 
     * @returns a variant module.
     * @tutorial
     * 
     * ```
     * const Action = variant({
     *     AddTodo: fields<{message: string}>(),
     *     Reload: {},
     * });
     * ```
     * 
     * Pair with `variation` to override the type returned by the creator function
     * while still using a friendly name. For example,
     * 
     * ```
     * const Action = variant({
     *     AddTodo: variation('TODO:AddTodo', fields<{message: string}>()),
     *     Reload: variation('TODO:Reload'),
     * });
     * ``` 
     */
    variant<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>>,

    /**
     * Create a **variant** from a list of elements. Each element may be a `string`
     * or a `VariantCreator`.
     * @param template A list of string literals or calls to `variation()`
     * @returns a variant module.
     * 
     * @tutorial
     * 
     * The simplest use involves purely strings.
     * 
     * ```ts
     * const Suit = variant(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
     * ```
     * 
     * It is possible to use `VariantCreator`s as well. Generate through `variation()`.
     * 
     * ```ts
     * const Shape = variant([
     *     variation('circle', fields<{center: [number, number], radius: number}>()),
     *     variation('rectangle', fields<{center: [number, number], length: number, width: number}>()),
     * ]);
     * ```
     * Feel free to mix the approaches as necessary.
     * ```ts
     * const DebugAction = variant([
     *     variation('LoadState', payload<RootState>()),
     *     'ResetState',
     *     'ToggleDebugMode',
     * ]);
     * ```
     */
    variant<T extends ValidListType>(template: T[]): Identity<VMFromVC<CreatorFromListType<T, K>>>;

    /**
     * Specify a variation of a variant. One variant will have many variations.
     * 
     * @param type the string literal used as the distinguishing type.
     * @param creator a function that acts as the body of the constructor.
     * @returns a variation creator a.k.a. a tag construtor.
     * @tutorial
     * Use directly, use as an element of a list for a variant, *or* use to provide
     * a more specific underlying type.
     * 1. Use directly
     *     ```ts
     *     const snake = variation('snake', (name: string, pattern = 'string') => ({name, pattern}));
     *     ```
     * 1. In `variant` list
     *     ```ts
     *     const Animal = variant([
     *         ...
     *         variation('snake', (name: string, pattern = 'striped') => ({name, pattern}));
     *     ]);
     *     ```
     * 1. In `variant` object
     *     ```ts
     *     const Animal = variant({
     *         ...,
     *         snake: variation('ANIMAL_SNAKE', (name: string, pattern = 'striped') => ({name, pattern})),
     *     });
     *     ```
     */
    variation<
        T extends string,
        F extends Func = () => {}
    >(type: T, creator?: F): VariantCreator<T, F extends VariantCreator<string, infer VF> ? VF : F, K>;
}

export function variantImpl<K extends string>(key: K): VariantFuncs<K> {
    function scopedVariant<
        T extends RawVariant,
        Scope extends string,
    >(scope: Scope, v: T): Identity<ScopedVariant<T, Scope>> {
        return Object.keys(v).reduce((acc, key) => {
            return {
                ...acc,
                [key]: variation(
                    scopeType(scope, key),
                    typeof v[key] === 'function' ? v[key] as any : identityFunc
                ),
            };
        }, {} as Identity<ScopedVariant<T, Scope>>)
    }

    function descope<
        T extends Record<K, ScopedType<string, string>>,
    >(obj: T): T extends Record<K, ScopedType<string, infer TType>> ? Identity<Omit<T, K> & Record<K, TType>> : T {
        return {
            ...obj,
            [key]: descopeType(obj[key] as ScopedType<string, string>),
        } as any
    }

    function variation<T extends string, F extends Func = () => {}>(type: T, creator?: F) {
        let maker = (...args: Parameters<F>) => {
            const returned = (creator ?? identityFunc)(...args);
            if (isPromise(returned)) {
                return returned.then(result => {
                    if (type in (result ?? {})) {
                        return result;
                    } else {
                        return Object.assign(result ?? {}, {[key]: type})
                    }
                })
            } else {
                if (type in (returned ?? {})) {
                    return returned;
                } else {
                    return Object.assign(returned ?? {}, {[key]: type});
                }
            }
        };
        Object.defineProperty(maker, 'name', {value: type, writable: false});
        const outputs: Outputs<K, T> = {key, type};
        return Object.assign(
            maker,
            outputs,
            {
                [VARIANT_CREATOR_BRAND]: VARIANT_CREATOR_BRAND,
                toString: function(this: Outputs<K, T>){return this.type}
            }
        ) as VariantCreator<T, F extends VariantCreator<string, infer VF> ? VF : F, K>;
    }

    function variantModule<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>> {
        return Object.entries(template).reduce((result, [vmKey, vmVal]) => {
            // whether to use the existing value (pass-through variations), or create a new variation.
            const creator = typeof vmVal === 'function'
                ? isVariantCreator(vmVal)
                    ? vmVal
                    : variation(vmKey, vmVal as Func)
                : variation(vmKey, identityFunc)
            ;
            return {
                ...result,
                [vmKey]: creator,
            }
        }, {} as Identity<VariantRecord<VM, K>>);
    }

    function variantList<T extends ValidListType>(template: T[]): Identity<VMFromVC<CreatorFromListType<T, K>>> {
        return template.map((t) => {
            if (typeof t === 'string') {
                return variation(t);
            } else if (typeof t === 'function') {
                return t;
            }
            return t;
        }).reduce((result, t) => {
            let creator = ((typeof t === 'string') ? variation(t) : t) as VariantCreator<string, Func, K>;
            return {
                ...result,
                [creator.type]: creator,
            }
        }, {} as Identity<VMFromVC<CreatorFromListType<T, K>>>)
    }

    function variant(template: {} | []) {
        if (Array.isArray(template)) {
            return variantList(template);
        } else {
            return variantModule(template);
        }
    }

    return {descope, scopedVariant, variant, variantList, variantModule, variation};
}