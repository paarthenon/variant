import {Identity, Func, identityFunc, FuncObject, ReturnTypes, Functions, ExtractOfUnion} from './util';

// Consider calling this ObjectEntry or Entry. Also Pair? No, more like KVPair. Mapping?
export type TypeExt<K extends string, T> = K extends keyof infer LitK ? {[P in keyof LitK]: T} : never;
export type WithProperty<K extends string, T> = TypeExt<K, T>;

/**
 * The type marking metadata. It's useful to know the type of the items the function will generate.
 */
export type Outputs<K, T> = {
    outputKey: K
    outputType: T
};
/**
 * It doesn't *really* matter if it's creator.outputType vs. creator.type, but
 * the latter has the advantage of being tolerable to the group of people who will
 * prefer to use [Animal.dog.type]: rather than dog: . 
 */
export type NewOutputs<K, T> = {
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
 */
export type VariantCreator<
    T extends string,
    Args extends any[] = [],
    Return extends {} = {},
    K extends string = 'type'>
= Stringable<T> & ((...args: Args) => Identity<WithProperty<K, T> & Return>) & Outputs<K, T> & NewOutputs<K, T>;

/**
 * The overall module of variants. This is equivalent to a polymorphic variant. 
 */
export type VariantModule<K extends string = 'type'> = {
    [name: string]: VariantCreator<string, any[], any, K>
}

export function variantFactory<K extends string>(key: K) {

    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): VariantCreator<T, [], {}, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func: F): VariantCreator<T, Parameters<F>, ReturnType<F>, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => ({
            [key]: tag,
            ...(func ?? identityFunc)(...args),
        })
        const outputType = {
            outputKey: key,
            outputType: tag,
        };
        const newOutputs = {
            key,
            type: tag,
        }
        return Object.assign(maker, outputType, newOutputs, {toString: function(this: Outputs<K, T>){return this.outputType}});
    }
    // the `variant()` function advertises the key it will use
    const outputKey = {outputKey: key};
    return Object.assign(variantFunc, outputKey);
}

/**
 * Create a new variant of a given type.
 * 
 *     const dog = variant('dog');
 *     const myDog = dog(); // {type: 'dog'}
 * 
 *     const dog = variant('dog', payload<string>());
 *     const myDog = dog('Bandit'); // {type: 'dog', payload: 'Bandit'}
 * 
 *     const dog = variant('dog', fields<{
 *         name: string;
 *         favoriteTreat?: string;
 *     });
 *     const myDog = dog({name: 'Bandit', favoriteTreat: 'carrots'}); // {type: 'dog}
 * 
 *     const dog = variant('dog', (name: string, favoriteTreat = 'kibble') => ({name, favoriteTreat}));
 *     const myDog = dog('Bandit'); // {type: 'dog', name: 'Bandit', favoriteTreat: 'kibble'}
 */
export const variant = variantFactory('type');
/**
 * Create
 */
export default variant;

type Creators<T extends FuncObject, PropName extends string = 'type'> = {
    [P in keyof T]: ReturnType<T[P]> extends WithProperty<PropName, infer TType> ? ((...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & WithProperty<PropName, TType>>) : never
}

export type VariantsOf<T, PropName extends string ='type'> = ReturnTypes<Creators<Functions<T>, PropName>>;
export type OneOf<T> = T[keyof T];

type FilterVariants<T, Type extends string, K extends string = any> = T extends VariantCreator<Type, any, any, K> ? T : never;

/**
 * Basically works like strEnum to generate an object where the property keys are the variant type strings.
 * @param variants 
 */
export function variantList<T extends VariantCreator<any, any, any, any>>(variants: Array<T>): {[P in T['outputType']]: FilterVariants<T, P>} {
    return variants.reduce((o, v) => ({
        ...o,
        [v.outputType]: v,
    }), Object.create(null))
}

/**
 * Give an array of output types for a given variant collection.
 * Useful for checking whether or not a message belongs in your
 * variant set at runtime.
 * @param variantObject 
 */
export function outputTypes<T extends {[name: string]: NewOutputs<string, string>}>(variantObject: T) {
    return Object.keys(variantObject).map(key => variantObject[key].type);
}

/**
 * Checks if an object is in a given variant module. You can give it the object
 * or any destructured subset or a variantList([...]) with specific items. Neat, huh?
 * 
 * TODO: This doesn't yet work for variants that use type keys besides 'type'. 
 * @param object 
 * @param variant 
 */
export function isOfVariant<T extends VariantModule>(object: WithProperty<'type', string>, variant: T): object is SumType<T> {
    return outputTypes(variant).some(type => type === object.type);
}


/**
 * Unused at the moment. Intended to develop the idea of an "ordered" variant.
 * @param variants 
 */
function progression<T extends VariantCreator<any, any, any, any>>(variants: Array<T>): {[P in T['outputType']]: FilterVariants<T, P>} {
    return variants.reduce((o, v) => ({
        ...o,
        [v.outputType]: v,
    }), Object.create(null))
}

/**
 * Built to describe an object with the same keys as a variant but instead of constructors
 * for those objects provides functions that handle objects of that type.
 */
export type Handler<T> = {
    [P in keyof T]: (variant: T[P]) => any
}

export type UnionHandler<T extends string> = {
    [P in T]: (variant: P) => any
}

export type VariantsOfUnion<T extends WithProperty<K, string>, K extends string = 'type'> = {
    [P in T[K]]: ExtractOfUnion<T, P, K>
}
type Defined<T> = T extends undefined ? never : T;

export function match<
    T extends WithProperty<K, string>,
    H extends Handler<VariantsOfUnion<T, K>>,
    K extends string = 'type'
> (
    obj: T,
    handler: H,
    typeKey?: K,
): ReturnType<H[T[K]]>{
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString]?.(obj as any);
}
export function partialMatch<
    T extends WithProperty<K, string>,
    H extends Handler<VariantsOfUnion<T, K>>,
    K extends string = 'type'
> (
    obj: T,
    handler: Partial<H>,
    typeKey?: K,
): ReturnType<Defined<H[T[K]]>> | undefined {
    return match(obj, handler as H, typeKey);
};

export function matchLiteral<T extends string, H extends UnionHandler<T>>(literal: T, handler: H): ReturnType<H[T]> {
    return handler[literal]?.(literal);
}

/**
 * An object that has the same keys as a variant but has arbitrary values for the data. 
 * a.k.a. a lookup table.
 */
export type Lookup<T> = {
    [P in keyof T]: any
}

/**
 * 
 * @param obj 
 * @param handler 
 * @param typeKey 
 */
export function lookup<T extends WithProperty<K, string>, L extends Lookup<VariantsOfUnion<T, K>>, K extends string = 'type'>(obj: T, handler: L, typeKey?: K): ReturnType<L[T[K]]> {
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString];
}
/**
 * 
 * @param obj 
 * @param handler 
 * @param typeKey 
 */
export function partialLookup<T extends WithProperty<K, string>, L extends Lookup<VariantsOfUnion<T, K>>, K extends string = 'type'>(obj: T, handler: Partial<L>, typeKey?: K): ReturnType<L[T[K]]> | undefined {
    // Takes advantage of the fact that handler with missing keys will return undefined.
    return lookup(obj, handler as L, typeKey);
}

export type AugmentVariant<T extends VariantModule, U> = {
    [P in keyof T]: ((...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & U>) & NewOutputs<T[P]['outputKey'], T[P]['outputType']>
}
/**
 * 
 * @param variantDef 
 * @param f 
 */
export function augment<T extends VariantModule, F extends Func>(variantDef: T, f: F) {
    return Object.keys(variantDef).reduce((acc, key) => {
        const {outputKey, outputType} = variantDef[key];
        const augmentedFuncWrapper = (...args: any[]) => (Object.assign({}, f(), variantDef[key](...args)));
        return {
            ...acc,
            [key]: Object.assign(augmentedFuncWrapper, {outputKey, outputType, key: variantDef[key].key, type: variantDef[key].type})
        };
    }, {} as AugmentVariant<T, ReturnType<F>>);
}


type FilterNeverTypedVariants<T extends WithProperty<K, string | never>, K extends string = 'type'> = T extends WithProperty<K, never> ? never : T;

export type Specific<T extends WithProperty<K, string>, TType extends string = string, K extends string = 'type'> = Identity<FilterNeverTypedVariants<T & WithProperty<K, TType>, K>>;

export type SumType<T, K extends string = 'type'> = OneOf<VariantsOf<T, K>>;
export type KeysOf<T, K extends string = 'type'> = SumType<T, K>[K] & string;
export type TypeNames<T, K extends string = 'type'> = KeysOf<T, K> | undefined;
export type VariantOf<T, TType = undefined, K extends string = 'type'> = TType extends undefined ? SumType<T, K> : TType extends KeysOf<T, K> ? ExtractOfUnion<SumType<T, K>, TType, K> : SumType<T, K>;
