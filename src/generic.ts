import {payload, variantList, TypeNames, VariantOf, match, just} from '.';
import {fields} from './tools';
import {Func, Identity} from './util';
import {flags, Matrix, Outputs, OutVariant, Property, RawVariant, Variant, variantFactory, variantModule} from './variant';

type primitive = number | string | symbol | boolean;

type GenericMapping = {[key: string]: any};

type VGenericTuple<T extends ReadonlyArray<any>, Map extends GenericMapping> = {
    [P in keyof T]: Identity<Generify<T[P], Map>>;
};

type VGenericFunction<T, Map extends GenericMapping> = 
    T extends (...args: infer TArgs) => infer TR 
        ? (...anonArgs: VGenericTuple<TArgs, Map>) => Identity<Generify<TR, Map>>
        : T;
;

type VGenericObject<T, Map extends GenericMapping> = {
    [P in keyof T]: Generify<T[P], Map>;
};

export type Generify<T, Map extends GenericMapping> = 
    T extends VGeneric<infer Label> 
        ? Map[Label]
    : T extends ReadonlyArray<any>
        ? VGenericTuple<T, Map>
    : T extends Func
        ? VGenericFunction<T, Map>
    : T extends primitive
        ? T
    : T extends object
        ? VGenericObject<T, Map>
    : T
;

type VGeneric<Label extends string> = {
    __gen: Label;
}
const gParamKey = '__gen';
const gParam = variantFactory(gParamKey);
export const GParam = variantList([
    gParam('A'),
    gParam('B'),
    gParam('C'),
    gParam('D'),
    gParam('E'),
    gParam('F'),
    gParam('G'),
    gParam('H'),
    gParam('I'),
    gParam('J'),
    gParam('K'),
    gParam('L'),
    gParam('M'),
    gParam('N'),
    gParam('O'),
    gParam('P'),
    gParam('Q'),
    gParam('R'),
    gParam('S'),
    gParam('T'),
    gParam('U'),
    gParam('V'),
    gParam('W'),
    gParam('X'),
    gParam('Y'),
    gParam('Z'),
]);
export type GParam<T extends TypeNames<typeof GParam, typeof gParamKey> = undefined> = VariantOf<typeof GParam, T, typeof gParamKey>;
const Alpha = flags(Object.values(GParam).map(f => f()), gParamKey);
type Alpha = Matrix<typeof GParam, typeof gParamKey>;

export type GFunc<TFunc> = TFunc extends (...args: infer TArgs) => infer TR 
    ? <T> (...args: VGenericTuple<TArgs, {[GP: string]: T}>) => Identity<Generify<TR, {[GP: string]: T}>>
    : TFunc
;
export type GFunced<T> = {
    [P in keyof T]: GFunc<T[P]>;
};

export function gg<T extends RawVariant>(f: (alpha: Alpha) => T) {
    const rawModule = f(Alpha);
    const vmod = variantModule(rawModule);
    return [vmod as Identity<GFunced<OutVariant<T>>>, vmod as Identity<OutVariant<T>>] as const;
}
export const genericVariant = gg;

type BaselineG<K extends string = 'type'> = {[key: string]: (...args: any[]) => Property<K, string>};
export type GSum<T extends BaselineG<K>, K extends string = 'type'> = ReturnType<T[keyof T]>;
export type GKeysOf<T extends BaselineG<K>, K extends string = 'type'> = ReturnType<T[keyof T]>[K];
export type GTypeNames<T extends BaselineG<K>, K extends string = 'type'> = GKeysOf<T, K> | undefined;
export type GVariantOf<T extends BaselineG, TType extends GTypeNames<T>, TypeReplacement extends {[GP: string]: any}>
 = TType extends undefined 
    ? Identity<Generify<GSum<T>, TypeReplacement>>
    : TType extends GKeysOf<T>
        ? Generify<Extract<GSum<T>, Property<'type', TType>>, TypeReplacement>
        : Identity<Generify<GSum<T>, TypeReplacement>>
;

