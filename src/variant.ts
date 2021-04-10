import {Identity, Func, identityFunc, GetDataType, ExtractOfUnion, strEnum, isPromise} from './util';

/**
 * A type representing an object with a single property.
 *  - `Property<K, T>` evaluates to `{ [K: string]: T }`
 */
export type Property<K extends string, T> = K extends keyof infer LitK ? {[P in keyof LitK]: T} : never;
/**
 * @deprecated
 * Alias of `Property<K extends string, T>`
 */
export type WithProperty<K extends string, T> = Property<K, T>;
/**
 * Alias of `Property<K extends string, T>`
 */
export type TypeExt<K extends string, T> = Property<K, T>;

/**
 * The type marking metadata. It's useful to know the type of the items the function will generate.
 * 
 * It doesn't *really* matter if it's creator.outputType vs. creator.type, but
 * the latter has the advantage of being tolerable to the group of people who will
 * prefer to use [Animal.dog.type]: rather than dog: . 
 */
export type Outputs<K, T> = {
    /**
     * Discriminant property key
     */
    key: K
    /**
     * The type of object created by this function.
     */
    type: T
};

/**
 * More specific toString();
 */
export type Stringable<ReturnType extends string> = {
    toString(): ReturnType;
}

/**
 * The constructor for one tag of a variant type.
 * 
 *  - `T` extends `string` — The literal string used as the type
 *  - `F` extends `(...args: any[]) => {}` = `() => {}` — The function that serves as the variant's *body definition*
 *  - `K` extends `string` = `'type'` — The discriminant
 */
export type VariantCreator<
    T extends string,
    F extends (...args: any[]) => {} = () => {},
    K extends string = 'type'>
= ((...args: Parameters<F>) => PatchObjectOrPromise<ReturnType<F>, Property<K, T>>) 
    & Outputs<K, T>
    & Stringable<T>
;

/**
 * Given an object or a promise containing an object, patch it to
 * include some extra properties.
 * 
 * This is mostly used to merge the `{type: ______}` property into
 * the body definition of a variant.
 */
export type PatchObjectOrPromise<
    T extends {} | PromiseLike<{}>,
    U extends {}
> = T extends PromiseLike<infer R> 
    ? PromiseLike<Identity<U & R>> 
    : Identity<U & T>
;

/**
 * A variant module definition. Literally an object to group together
 * a set of variant constructors.
 */
export type VariantModule<K extends string = 'type'> = {
    [name: string]: VariantCreator<string, (...args: any[]) => any, K>
}


/**
 * Create the `variant` function set to a new discriminant.
 * Use this function to generate a version of the `variant` factory function using
 * some arbitrary key. The default `variant` is just `variantFactory('type')`.
 * @param key The name of the property to use e.g. 'type', 'kind', 'version'
 */
export function variantFactory<K extends string>(key: K) {
    // Type fuckery ensues.
    /**
     * Define a case of a variant type.
     * @param tag the name of this case. Also known as the tag, label, or discriminant.
     * @returns a function `() => {type: tag}`.
     */
    function variantFunc<T extends string>(tag: T): VariantCreator<T, () => {}, K>
    /**
     * Define a case of a variant type with some body.
     * @param tag the name of this case. Also known as the tag, label, or discriminant.
     * @param func The constructor function for the variant.
     * @returns a function `(...args: Parameters<typeof func>) => {type: tag} & ReturnType<typeof func>`.
     */
    function variantFunc<T extends string, F extends Func>(tag: T, func: F): VariantCreator<T, F, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => {
            const returned = (func ?? identityFunc)(...args);
            if (isPromise(returned)) {
                return returned.then(result => ({
                    [key]: tag,
                    ...result,
                }))
            } else {
                return {
                    [key]: tag,
                    ...returned,
                }
            }
        };
        const outputs = {
            key,
            type: tag,
        }
        return Object.assign(maker, outputs, {toString: function(this: Outputs<K, T>){return this.type}});
    }
    // the `variant()` function advertises the key it will use.
    // this has been updated to just use "key" and "type" but
    // this is quietly retained for legacy support.
    const outputKey = {outputKey: key};
    return Object.assign(variantFunc, outputKey);
}

export const variant = variantFactory('type');
export default variant;

export type Creators<VM extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof VM]: VM[P] extends VariantCreator<string, Func, K>
        ? VM[P]
        : never
}

/**
 * Used in writing cases of a type-first variant.
 * 
 * `Variant<'One', {a: number, b: string}>>` generates
 *  - `{type: 'One', a: number, b: string}`
 * 
 * You may write the literals directly, using this is recommended
 * if you'd like to update the literal as this library updates.
 */
export type Variant<
    Type extends string, Fields extends {} = {},
    Key extends string = 'type',
> = Property<Key, Type> & Fields;

type InternalVariantsOf<VM extends VariantModule<K>, K extends string ='type'> = GetDataType<Creators<VM, K>, K>;

/**
 * Reduce an object to just elements that are `VariantCreator`s
 */
type FilterVariants<T, Type extends string, K extends string = any> = T extends VariantCreator<Type, Func, K> ? T : never;

/**
 * A valid entry for `variantList`
 */
type validListType = VariantCreator<any, Func, any> | string;

/**
 * Convert entries for a `variantList` to the same type.
 */
type Variantify<T extends validListType> = T extends string ? VariantCreator<T> : T;

export type VariantModuleFromList<T extends validListType> = {
    [P in Variantify<T>['type']]: FilterVariants<Variantify<T>, P>
}

/**
 * Create a variant module based on a list of variants.
 * 
 * @remarks
 * Best way to create groups of pre-existing variants.
 * 
 * @param variants a list of variant creators and `string`s for tags that have no body
 */
export function variantList<T extends validListType>(variants: Array<T>): VariantModuleFromList<T> {
    return variants
        .map((v): VariantCreator<string> => {
            if (typeof v === 'string') {
                return variant(v);
            } else {
                return v as any;
            }
        })
        .reduce((o, v) => ({
            ...o,
            [v.type]: v,
        }), Object.create(null))
}

function safeKeys<O extends {}>(o: O) {
    return Object.keys(o) as (keyof O & string)[];
}

/**
 * Input type for VariantModule
 */
export type RawVariant = {[type: string]: Func | {}};
export type ConstrainedRawVariant<F extends Func> = {[type: string]: (...args: [...Parameters<F>, ...any[]]) => ReturnType<F>}
export type PatternedRawVariant<F extends Func> = {[type: string]: F}

/**
 * Patched Constrained Raw Variant
 */
type PatchedCRV<T extends ConstrainedRawVariant<F>, F extends Func> = {
    [P in keyof T]: (...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & ReturnType<F>>;
}

type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

type FullyFuncRawVariant<V extends RawVariant> = {
    [P in keyof V & string]: CleanResult<V[P], () => {}>
}
export type OutVariant<T extends RawVariant>
    = {[P in (keyof T & string)]: VariantCreator<P, CleanResult<T[P], () => {}>>}
;

/**
 * Create a variant module from an object describing the variant's structure.
 * Each key of the object is a case of the variant. Each value of the object
 * is the constructor function associated with that key. 
 * @param v 
 */
export function variantModule<
    T extends RawVariant,
>(v: T): Identity<OutVariant<T>> {
    return safeKeys(v).reduce((acc, key) => {
        return {
            ...acc,
            [key]: variant(key, typeof v[key] === 'function' ? v[key] as Func : identityFunc),
        };
    }, {} as Identity<OutVariant<T>>);
}

export function constrained<
    T extends ConstrainedRawVariant<F>,
    F extends Func,
>(_constraint_: F, v: T) {
    return v as PatchedCRV<T, F>;
}
export function patterned<
    T extends PatternedRawVariant<F>,
    F extends Func,
>(_constraint_: F, v: T) {
    return v as PatchedCRV<T, F>;
}

/**
 * Take a variant, including some potential `{}` cases
 * and generate an object with those replaced with the `noop` function.
 */
function funcifyRawVariant<V extends RawVariant>(v: V) {
    return safeKeys(v).reduce((acc, cur) => {
        return {
            ...acc,
            [cur]: typeof v[cur] === 'function' ? v[cur] : () => {},
        }
    }, {}) as FullyFuncRawVariant<V>
}

export type AugmentedRawVariant<V extends RawVariant, F extends Func> = {
    [P in keyof V & string]: (...args: Parameters<FullyFuncRawVariant<V>[P]>) => (ReturnType<F> & ReturnType<FullyFuncRawVariant<V>[P]>)
}
/**
 * Expand the functionality of a variant as a whole by tacking on properties
 * generated by a thunk.
 * 
 * Used in conjunction with `variantModule`
 * 
 * ```typescript
 * export const Action = variantModule(augmented(
 *     () => ({created: Date.now()}), 
 *     {
 *         AddTodo: fields<{text: string, due?: number}>(),
 *         UpdateTodo: fields<{todoId: number, text?: string, due?: number, complete?: boolean}>(),
 *     },
 * ));
 * ```
 * @param variantDef 
 * @param f 
 */
export function augmented<T extends RawVariant, F extends (x: OutVariant<T>) => any>(f: F, variantDef: T) {
    const funkyDef = funcifyRawVariant(variantDef);
    return safeKeys(funkyDef).reduce((acc, key) => {
        return {
            ...acc,
            [key]: (...args: Parameters<FullyFuncRawVariant<T>[typeof key]>) => {
                const item = funkyDef[key](...args);
                return {
                    ...f(item),
                    ...item,
                }
            }
        }
    }, {}) as AugmentedRawVariant<T, F>;
}


type ScopedVariant<T extends RawVariant, Scope extends string> = {
    [P in (keyof T & string)]: VariantCreator<`${Scope}__${P}`, CleanResult<T[P], () => {}>>;
}

/**
 * Unstable.
 * @alpha - unstable API
 * @param v 
 * @param _contract 
 */
export function scopedVariant<
    T extends RawVariant,
    Scope extends string,
>(scope: Scope, v: T): Identity<ScopedVariant<T, Scope>> {
    return safeKeys(v).reduce((acc, key) => {
        return {
            ...acc,
            [key]: variant(`${scope}__${key}`, typeof v[key] === 'function' ? v[key] as any : identityFunc),
        };
    }, {} as Identity<ScopedVariant<T, Scope>>);
}


/**
 * Get a list of types a given module will support.
 * 
 * These are the concrete types, not the friendly keys in the module.
 * This is mostly used internally to check whether or not a message is of
 * a given variant (`outputTypes(Animal).includes(x.type)`)
 * Give an array of output types for a given variant collection.
 * Useful for checking whether or not a message belongs in your
 * variant set at runtime.
 * @param variantObject 
 */
export function outputTypes<
    T extends {[name: string]: Outputs<string, string>}
>(variantObject: T): T[keyof T]['type'][] {
    return Object.keys(variantObject).map(key => variantObject[key].type);
}

/**
 * Get the types from a VariantModule
 * @param content 
 * @param key 
 */
export function types<T extends VariantModule<K>, K extends string = 'type'>(content: T, key?: K): KeysOf<T, K>[];
/**
 * Get the types from a list of variant creators *or* a list of variant instances.
 * @param content 
 * @param key 
 */
export function types<T extends Property<K, string>, K extends string = 'type'>(content: T[], key?: K): T[K][];
export function types<K extends string = 'type'>(content: VariantModule<K> | Property<K, string>[], key?: K) {
    const typeStr = key ?? 'type' as K;
    if (Array.isArray(content)) {
        return content.map(c => c[typeStr]);
    } else {
        return Object.values(content).map(c => c.type);
    }
}

/**
 * Checks if an object was created from one of a set of variants. This function is a 
 * [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) 
 * so TypeScript will narrow the type of `object` correctly.
 * 
 * @remarks
 * The variant module may be a pre-existing module or one constructed on the fly.
 * 
 * @param instance an instance of a variant.
 * @param variant {T extends VariantModule<K>} the variant module.
 * @param typeKey the key used as the discriminant.
 * 
 * @returns instance is variant 
 */
export function isOfVariant<
    T extends VariantModule<K>,
    K extends string = 'type'
>(
    instance: {} | null | undefined,
    variant: T,
    typeKey?: K
): instance is SumType<T, K> {
    return instance != undefined && 
        outputTypes(variant).some(type => type === (instance as any)[typeKey ?? 'type']);
}


/**
 * Unused at the moment. Intended to develop the idea of an "ordered" variant.
 * @param variants 
 */
function progression<T extends VariantCreator<any, Func, any>>(variants: Array<T>): {[P in T['type']]: FilterVariants<T, P>} {
    return variants.reduce((o, v) => ({
        ...o,
        [v.type]: v,
    }), Object.create(null))
}



/**
 * Same as handler but needs to handle literals instead of variants. Used by matchLiteral.
 */
export type UnionHandler<T extends string> = {
    [P in T]: (variant: P) => any
}

/**
 * From a given union type, extract the the variant object's type. 
 */
export type VariantsOfUnion<T extends Property<K, string>, K extends string = 'type'> = {
    [P in T[K]]: ExtractOfUnion<T, P, K>
}

/**
 * Set a variable's type to a new case of the same variant.
 * @param obj object of concern.
 * @param _type new type tag. Restricted to keys of the variant.
 * @param _typeKey discriminant key.
 */
export function cast<O extends Property<K, string>, T extends O[K], K extends string = 'type'>(obj: O, _type: T, _typeKey?: K) {
    return obj as ExtractOfUnion<O, T, K>;
}
/**
 * 
 * @param obj object of concern.
 * @param type new type. Restricted to keys of the variant.
 * @param typeKey discriminant key.
 */
export function narrow<O extends Property<K, string>, T extends O[K], K extends string = 'type'>(obj: O, type: T, typeKey?: K) {
    const typeString = obj[typeKey ?? 'type' as K];
    return typeString === type ? obj as ExtractOfUnion<O, T, K> : undefined;
}


export type SumType<T extends VariantModule<K>, K extends string = 'type'> = InternalVariantsOf<T, K>[keyof T];
export type KeyMap<T extends VariantModule<K>, K extends string = 'type'> = {
    [Label in keyof T]: T[Label] extends VariantCreator<infer TypeStr, Func, K> ? TypeStr : never;
}
/**
 * Extract the key literals of a variant.
 */
export type KeysOf<T extends VariantModule<K>, K extends string = 'type'> = KeyMap<T, K>[keyof T];
/**
 * Get the valid options for a variant type's names, plus `undefined`.
 */
export type TypeNames<T extends VariantModule<K>, K extends string = 'type'> = KeysOf<T, K> | undefined;

export type VariantOf<
    T extends VariantModule<K>,
    TType = undefined,
    K extends string = 'type'
> = TType extends undefined ? SumType<T, K> : TType extends KeysOf<T, K> ? ExtractOfUnion<SumType<T, K>, TType, K> : SumType<T, K>;

/**
 * Return an object cache (`{[P]: P}`) of the keys.
 * 
 * An object cache is more useful than an array because you can do
 * constant time checks and you can still reduce to a well-typed
 * array with Object.keys
 * @param variantDef 
 */
export function keys<T extends VariantModule>(variantDef: T): {[P in KeysOf<T>]: P} {
    return strEnum(outputTypes(variantDef)) as any;
}

/**
 * A variant module does not *necessarily* have a 1-1 mapping from
 * the key used to refer to the object (Animal.bird) and the key generated
 * by the variant (ANIMAL_BIRD, @animal/bird, etc.).
 * @param v 
 */
export function keymap<T extends VariantModule<K>, K extends string = 'type'>(v: T): KeyMap<T, K> {
    return Object.keys(v).reduce((acc, key) => {
        return {
            ...acc,
            [key]: v[key].type,
        };
    }, {} as KeyMap<T,K>);
}

export type Matrix<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in KeysOf<T, K>]: ExtractOfUnion<SumType<T, K>, P, K>
}

/**
 * Splay a list of variant instances into an object. 
 */
export type Flags<T extends VariantModule> = Partial<Matrix<T>>;

/**
 * groupBy list of instances on discriminant key. Assumes unique instance per type.
 * @param flags 
 * @param typeKey 
 */
export function flags<T extends Property<K, string>, K extends string = 'type'>(flags: T[], typeKey?: K): {[P in T[K]]: ExtractOfUnion<T, P, K>} {
    return flags.reduce((o, v) => ({
        ...o,
        [v[typeKey ?? 'type']]: v,
    }), Object.create(null))
}

