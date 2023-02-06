import {Identity} from './util';

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
    Type extends string,
    Fields extends {} = {},
    Key extends string = 'type',
> = Record<Key, Type> & Fields;


/**
 * Given an object or a promise containing an object, patch it to
 * include some extra properties.
 * 
 * This is mostly used to merge the `{type: ______}` property into
 * the body definition of a variant.
 * 
 * Note: Places items at the top of the resulting object - this helps clearly
 * identify the discriminant in a union.
 */
export type PatchObjectOrPromise<
    T extends {} | PromiseLike<{}>,
    U extends {}
> = T extends PromiseLike<infer R> 
    ? PromiseLike<Identity<U & R>> 
    : Identity<U & T>
;

/**
 * The type marking metadata. 
 */
export type Outputs<K, T> = {
    output: {
      /**
       * Discriminant property key
       */
      key: K
      /**
       * The type of object created by this function.
       */
      type: T
    }
};

/**
 * More specific toString();
 */
export type Stringable<ReturnType extends string> = {
    toString(): ReturnType;
}

/**
 * The constructor function for one tag of a variant type
 * 
 * @template T literal string used as the type
 * @template F function serving as the variant definition
 * @template K the discriminant.
 */
export type VariantCreator<
    T extends string,
    F extends (...args: any[]) => {} = () => {},
    K extends string = 'type'>
= ((...args: Parameters<F>) => PatchObjectOrPromise<ReturnType<F>, Record<K, T>>) 
    & Outputs<K, T>
    & Stringable<T>
;

/**
 * Given a VariantCreator, extract the output type. Unpack it
 * from a promise if it is inside one. 
 */
export type CreatorOutput<VC extends VariantCreator<string, Func, string>> = 
    ReturnType<VC> extends PromiseLike<infer R>
        ? R extends Record<VC['output']['key'], string> ? R : never
        : ReturnType<VC>
;

/**
 * Basic building block, the loose function signature.
 */
export type Func = (...args: any[]) => any;

/**
 * A variant module definition. Literally an object serving as
 * a collection of variant constructors.
 */
 export type VariantModule<K extends string> = {
    [name: string]: VariantCreator<string, Func, K>
}

/**
 * A mapping of friendly names to the underlying type literals.
 * 
 * @remarks
 * Most `VariantModule`s will have labels (Animal.dog) that match the
 * underlying type of the object the function will create. Some will not.
 * This type creates a mapping from the name/label to the type.
 */
export type TypeMap<T extends VariantModule<string>> = {
    [P in keyof T]: T[P]['output']['type'];
}

/**
 * Reverse lookup - get the label from the literal type. 
 */
export type GetTypeLabel<
    T extends VariantModule<string>,
    Key extends TypesOf<T>
> = {
    [P in keyof T]: T[P]['output']['type'] extends Key ? P : never
}[keyof T];

/**
 * 
 * Reverse lookup from type literals to the labels on the object.
 * 
 * Warning: may be expensive.
 */
export type TypeNameLookup<T extends VariantModule<string>> = {
    [P in TypesOf<T>]: GetTypeLabel<T, P>;
}

/**
 * Get the literal union for a variant's type property.
 */
export type TypesOf<T extends VariantModule<string>> = TypeMap<T>[keyof T];

/**
 * Get the literal union for a variant type's names, plus `undefined`.
 */
export type TypeNames<T extends VariantModule<string>> = TypesOf<T> | undefined;

/**
 * Simple internal helper to extract the variation types for each key of a `VariantModule`
 */
type VariantTypeSpread<T extends VariantModule<string>> = {
    [P in keyof T]: CreatorOutput<T[P]>
}

/**
 * A union of variation types from any arbitrary `VariantModule`
 */
export type SumType<T extends VariantModule<string>> = Identity<VariantTypeSpread<T>[keyof T]>;


/**
 * **Create a variant type**.
 * 
 * @example
 * ```ts
 * // full form
 * export type SomeVariant<T extends TypeNames<typeof SomeVariant> = undefined>
 *     = VariantOf<typeof SomeVariant, T>;
 * // short form (no Animal<'cat'>)
 * export type SomeVariant = VariantOf<typeof SomeVariant>;
 * ```
 */
export type VariantOf<
    T extends VariantModule<string>,
    TType = undefined,
> = TType extends undefined ? SumType<T> : TType extends TypesOf<T> ? Extract<SumType<T>, Record<T[keyof T]['output']['key'], TType>> : SumType<T>;

/**
 * The input type for `variant`/`variantModule`. 
 */
export type RawVariant = {[type: string]: Func | {}};

/**
 * Express some type error.
 */
export interface VariantError<T> {__error: never, __message: T};

/**
 * Express some arbitrary information.
 */
export interface Message<T> {__: never, message: T};

/**
 * Prevent extraneous properties in a literal.
 */
export type Limited<T, U> = Exclude<keyof T, U> extends never 
    ? T 
    : VariantError<['Expected keys of handler', keyof T, 'to be limited to possible keys', U]>
;

/**
 * The key used to indicate the default handler.
 */
export const DEFAULT_KEY = 'default';
/**
 * The string literal used to indicate the default handler.
 */
export type DEFAULT_KEY = typeof DEFAULT_KEY;


/**
 * One step better than `Partial<T>`.
 * 
 * But only one.
 * 
 * This is like `Partial<T>`, but requires at least one common property.
 */
export type Splay<T> = {
    [P in keyof T]: Identity<Partial<T> & Record<P, T[P]>>;
}[keyof T];
