import variantDefault from '.';
import {Identity, Func, identityFunc, GetDataType, ExtractOfUnion, strEnum, isPromise} from './util';

// Consider calling this ObjectEntry or Entry. Also Pair? No, more like KVPair. Mapping?
export type TypeExt<K extends string, T> = K extends keyof infer LitK ? {[P in keyof LitK]: T} : never;
export type WithProperty<K extends string, T> = TypeExt<K, T>;

/**
 * The type marking metadata. It's useful to know the type of the items the function will generate.
 * 
 * It doesn't *really* matter if it's creator.outputType vs. creator.type, but
 * the latter has the advantage of being tolerable to the group of people who will
 * prefer to use [Animal.dog.type]: rather than dog: . 
 */
export type Outputs<K, T> = {
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
    F extends (...args: any[]) => {} = () => {},
    K extends string = 'type'>
= Stringable<T> & ((...args: Parameters<F>) => PatchObjectOrPromise<ReturnType<F>, WithProperty<K, T>>) & Outputs<K, T>;
export type PatchObjectOrPromise<T extends {} | PromiseLike<{}>, U extends {}> = T extends PromiseLike<infer R> ? PromiseLike<Identity<U & R>> : Identity<U & T>;

/**
 * The overall module of variants. This is equivalent to a polymorphic variant. 
 */
export type VariantModule<K extends string = 'type'> = {
    [name: string]: VariantCreator<string, (...args: any[]) => any, K>
}

/**
 * Use this function to generate a version of the `variant` factory function using
 * some arbitrary key. The default `variant` is just `variantFactory('type')`.
 * @param key The name of the property to use e.g. 'type', 'kind', 'version'
 */
export function variantFactory<K extends string>(key: K) {

    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): VariantCreator<T, () => {}, K>
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

export type Creators<VM extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof VM]: VM[P] extends VariantCreator<string, Func, K>
        ? VM[P]
        : never
}

export type Variant<Type extends string, Fields extends {} = {}, Key extends string = 'type'>
    = WithProperty<Key, Type> & Fields;

/**
 * DEPRECATED. Use VariantOf
 */
type VariantsOf<VM extends VariantModule<K>, K extends string ='type'> = GetDataType<Creators<VM, K>, K>;
/**
 * DEPRECATED. Use VariantOf
 */
type OneOf<T> = T[keyof T];

type FilterVariants<T, Type extends string, K extends string = any> = T extends VariantCreator<Type, Func, K> ? T : never;

type validListType = VariantCreator<any, Func, any> | string;

type Variantify<T extends validListType> = T extends string ? VariantCreator<T> : T;

/**
 * Basically works like strEnum to generate an object where the property keys are the variant type strings.
 * @param variants 
 */
export function variantList<T extends validListType>(variants: Array<T>): {[P in Variantify<T>['type']]: FilterVariants<Variantify<T>, P>} {
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

export type RawVariant = {[type: string]: Func | undefined};

type Default<T, U> = T extends undefined ? U : T;

export type OutVariant<T extends RawVariant>
    = {[P in (keyof T & string)]: VariantCreator<P, Default<T[P], () => {}>>}
;

export function variantModule<
    T extends RawVariant,
>(v: T): OutVariant<T> {
    return safeKeys(v).reduce((acc, key) => {
        return {
            ...acc,
            [key]: variant(key, v[key] ?? identityFunc),
        };
    }, {} as OutVariant<T>);
}

/**
 * Give an array of output types for a given variant collection.
 * Useful for checking whether or not a message belongs in your
 * variant set at runtime.
 * @param variantObject 
 */
export function outputTypes<T extends {[name: string]: Outputs<string, string>}>(variantObject: T) {
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
export function isOfVariant<T extends VariantModule<K>, K extends string = 'type'>(object: {} | null | undefined, variant: T, typeKey?: K): object is SumType<T, K> {
    return object != undefined && outputTypes(variant).some(type => type === (object as any)[typeKey ?? 'type']);
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
export type VariantsOfUnion<T extends WithProperty<K, string>, K extends string = 'type'> = {
    [P in T[K]]: ExtractOfUnion<T, P, K>
}

export type AugmentVariant<T extends VariantModule, U> = {
    [P in keyof T]: ((...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & U>) & Outputs<T[P]['key'], T[P]['type']>
}

export function cast<O extends WithProperty<K, string>, T extends O[K], K extends string = 'type'>(obj: O, _type: T, _typeKey?: K) {
    return obj as ExtractOfUnion<O, T, K>;
}
export function narrow<O extends WithProperty<K, string>, T extends O[K], K extends string = 'type'>(obj: O, type: T, typeKey?: K) {
    const typeString = obj[typeKey ?? 'type' as K];
    return typeString === type ? obj as ExtractOfUnion<O, T, K> : undefined;
}

/**
 * Expand the functionality of a variant as a whole by tacking on properties
 * generated by a thunk.
 * @param variantDef 
 * @param f 
 */
export function augment<T extends VariantModule, F extends Func>(variantDef: T, f: F) {
    return Object.keys(variantDef).reduce((acc, key) => {
        const augmentedFuncWrapper = (...args: any[]) => (Object.assign({}, f(), variantDef[key](...args)));
        return {
            ...acc,
            [key]: Object.assign(augmentedFuncWrapper, {key: variantDef[key].key, type: variantDef[key].type})
        };
    }, {} as AugmentVariant<T, ReturnType<F>>);
}



export type SumType<T extends VariantModule<K>, K extends string = 'type'> = VariantsOf<T, K>[keyof T];
export type KeyMap<T extends VariantModule<K>, K extends string = 'type'> = {
    [Label in keyof T]: T[Label] extends VariantCreator<infer TypeStr, Func, K> ? TypeStr : never;
}
export type KeysOf<T extends VariantModule<K>, K extends string = 'type'> = KeyMap<T, K>[keyof T];
export type TypeNames<T extends VariantModule<K>, K extends string = 'type'> = KeysOf<T, K> | undefined;
export type VariantOf<T extends VariantModule<K>, TType = undefined, K extends string = 'type'> = TType extends undefined ? SumType<T, K> : TType extends KeysOf<T, K> ? ExtractOfUnion<SumType<T, K>, TType, K> : SumType<T, K>;

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
 * 
 * This enables 
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

export type Flags<T extends VariantModule> = Partial<Matrix<T>>;

export function flags<T extends WithProperty<K, string>, K extends string = 'type'>(flags: T[]): {[P in T[K]]: ExtractOfUnion<T, P, K>} {
    return flags.reduce((o, v) => ({
        ...o,
        [v.type]: v,
    }), Object.create(null))
}

