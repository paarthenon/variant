import {Identity, Func, identityFunc, FuncObject, ReturnTypes, Functions, ExtractOfUnion} from './util';

// Consider calling this ObjectEntry or Entry. Also Pair? No, more like KVPair. Mapping?
export type TypeExt<K extends string, T> = K extends keyof infer LitK ? {[P in keyof LitK]: T} : never;
export type WithProperty<K extends string, T> = TypeExt<K, T>;

export type Outputs<K, T> = {
    outputKey: K
    outputType: T
};

export type VariantCreator<
    T extends string,
    Args extends any[] = [],
    Return extends {} = {},
    K extends string = 'type'>
= ((...args: Args) => Identity<WithProperty<K, T> & Return>) & Outputs<K, T>;

export function variantFactory<K extends string>(key: K) {

    // Type fuckery ensues.
    function variantFunc<T extends string>(tag: T): VariantCreator<T, [], {}, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func: F): VariantCreator<T, Parameters<F>, ReturnType<F>, K>
    function variantFunc<T extends string, F extends Func>(tag: T, func?: F) {
        let maker = (...args: Parameters<F>) => ({
            [key]: tag,
            ...(func || identityFunc)(...args),
        })
        const outputType = {
            outputKey: key,
            outputType: tag,
        };
        return Object.assign(maker, outputType);
    }
    const outputKey = {outputKey: key};
    return Object.assign(variantFunc, outputKey);
}

export const variant = variantFactory('type');
export default variant;

type Creators<T extends FuncObject, PropName extends string = 'type'> = {
    [P in keyof T]: ReturnType<T[P]> extends WithProperty<PropName, any> ? T[P] : never
}

export type VariantsOf<T, PropName extends string ='type'> = ReturnTypes<Creators<Functions<T>, PropName>>;
export type Oneof<T> = T[keyof T];

type FilterVariants<T, Type extends string, K extends string = any> = T extends VariantCreator<Type, any, any, K> ? T : never;

export function variantList<T extends VariantCreator<any, any, any, any>>(variants: Array<T>): {[P in T['outputType']]: FilterVariants<T, P>} {
    return variants.reduce((o, v) => ({
        ...o,
        [v.outputType]: v,
    }), Object.create(null))
}

export type Handler<T> = {
    [P in keyof T]: (variant: T[P]) => any
}
export type VariantsOfUnion<T extends WithProperty<K, string>, K extends string = 'type'> = {
    [P in T[K]]: ExtractOfUnion<T, P, K>
}
export function match<
    T extends WithProperty<K, string>,
    H extends Partial<Handler<VariantsOfUnion<T, K>>>,
    K extends string = 'type'
> (
    obj: T,
    handler: H,
    typeKey?: K,
): H extends Handler<VariantsOfUnion<T, K>> ? ReturnType<H[T[K]]> : ReturnType<Functions<H>[keyof H]> | undefined {
    const typeString = obj[typeKey ?? 'type' as K];
    return handler[typeString]?.(obj as any);
}

type VariantObj = {[tag: string]: VariantCreator<string, any>};
export type AugmentVariant<T extends VariantObj, U> = {
    [P in keyof T]: ((...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & U>) & Outputs<T[P]['outputKey'], T[P]['outputType']>
}
export function augment<T extends VariantObj, F extends Func>(variantDef: T, f: F) {
    return Object.keys(variantDef).reduce((acc, key) => ({
        ...acc,
        [key]: (...args: any[]) => (Object.assign({}, f(), variantDef[key](...args)))
    }), {} as AugmentVariant<T, ReturnType<F>>)
}
