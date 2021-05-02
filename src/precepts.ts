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
 */
export type PatchObjectOrPromise<
    T extends {} | PromiseLike<{}>,
    U extends {}
> = T extends PromiseLike<infer R> 
    ? PromiseLike<Identity<U & R>> 
    : Identity<U & T>
;

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
        ? R extends Record<VC['key'], string> ? R : never
        : ReturnType<VC>
;

/**
 * Basic building block, the loose function signature.
 */
export type Func = (...args: any[]) => any;

/**
 * A variant module definition. Literally an object to group together
 * a set of variant constructors.
 */
 export type VariantModule<K extends string> = {
    [name: string]: VariantCreator<string, Func, K>
}

export type KeyMap<T extends VariantModule<string>> = {
    [P in keyof T]: T[P]['type'];
}

/**
 * For a 
 */
export type GetTypeLabel<T extends VariantModule<string>, Key extends KeysOf<T>> = {[P in keyof T]: T[P]['type'] extends Key ? P : never}[keyof T];

/**
 * Warning: may be expensive.
 */
export type KeyLookup<T extends VariantModule<string>> = {
    [P in KeysOf<T>]: GetTypeLabel<T, P>;
}

export type KeysOf<T extends VariantModule<string>> = KeyMap<T>[keyof T];
/**
 * Get the valid options for a variant type's names, plus `undefined`.
 */
 export type TypeNames<T extends VariantModule<string>> = KeysOf<T> | undefined;

export type VariantTypeSpread<T extends VariantModule<string>> = {
    [P in keyof T]: CreatorOutput<T[P]>
}

export type SumType<T extends VariantModule<string>> = VariantTypeSpread<T>[keyof T];

export type VariantOf<
    T extends VariantModule<string>,
    TType = undefined,
> = TType extends undefined ? SumType<T> : TType extends KeysOf<T> ? Extract<SumType<T>, Record<T[keyof T]['key'], TType>> : SumType<T>;

/**
 * Input type for VariantModule
 */
export type RawVariant = {[type: string]: Func | {}};

/**
 * Catch-all type to express type errors.
 */
export interface VariantError<T> { __error: never, __message: T };

/**
 * A message.
 */
export interface Message<T> { __: never, message: T };


/**
 * Prevents 'overflow' in a literal.
 */
export type Limited<T, U> = Exclude<keyof T, U> extends never 
    ? T 
    : VariantError<['Expected keys of handler', keyof T, 'to be limited to possible keys', U]>
;

/**
 * The key used to indicate the default handler.
 */
export const DEFAULT_KEY = 'default';
export type DEFAULT_KEY = typeof DEFAULT_KEY;
