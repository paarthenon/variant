

// /**
//  * What should a progression do?
//  * 
//  *  - Be able to create a variant
//  *      - maybe this isn't necessary.
//  *  - do a .compare(a: T, b: T) and get back a number;
//  */

// import {Func, KeysOf, VariantCreator, VariantModule} from './precepts';
// import {Remote} from './remote';

// export enum CompareResult {
//     Lesser = -1,
//     Equal,
//     Greater
// }

// type ValidTypeCreatorInput<K extends string = 'type', T extends string = string> = T | VariantCreator<T, Func, K>;
// type ValidTypeInput<K extends string = 'type', T extends string = string> = ValidTypeCreatorInput<K, T> | Record<K, T>;
// type ExtractType<T, K extends string = 'type'>
//     = T extends ValidTypeInput<K>
//         ? T extends string
//             ? T
//             : T extends VariantCreator<infer TType, Func, K>
//                 ? TType
//                 : T extends Record<K, infer TType>
//                     ? TType
//                     : never
//         : never;
// ;
// // TODO: Rewrite
// type ExtractKeys<T extends readonly ValidTypeInput<K>[], K extends string = 'type'> = T extends readonly (infer R)[] ? ExtractType<R, K> : never;

// type Objectify<T extends readonly ValidTypeInput<K>[], K extends string = 'type'> = {
//     [P in ExtractKeys<T, K>]: undefined;
// }

// /**
//  * A valid entry for `variantList`
//  */
// type validListType = VariantCreator<string, Func, any> | string;

// /**
//  * Convert entries for a `variantList` to the same type.
//  */
// type Variantify<T extends validListType> = T extends string ? VariantCreator<T> : T;

// /**
//  * @alpha
//  * 
//  */
// export interface Sequence<
//     T extends VariantModule<K>,
//     L extends ValidTypeInput<K, KeysOf<T>>[], 
//     K extends string = 'type',
//     RT extends Pick<T, ExtractKeys<L, K>> = Pick<T, ExtractKeys<L, K>>,
// > extends Remote<RT, K> {
//     compare: (
//         a: ValidTypeInput<K, KeysOf<RT>>, 
//         b: ValidTypeInput<K, KeysOf<RT>>,
//     ) => CompareResult;
//     /**
//      * Get the index of some type in the sequence.
//      */
//     index: (a: ValidTypeInput<K, KeysOf<RT>>) => number;
//     get: (index: number) => T[keyof T];
//     readonly length: number;
//     readonly types: KeysOf<T>[];
// }

// function _sequenceFromScratch<L extends ValidTypeCreatorInput<'type', T>[], T extends string>(list: L): Sequence<
//     VariantModuleFromList<L[number]>,
//     ValidTypeInput<'type', KeysOf<VariantModuleFromList<L[number]>>>[]
// > {
//     type asdf = VariantModuleFromList<L[number]>;
//     const mod = variantList(list);
//     const order = list.map(i => getType(i)) as (KeysOf<typeof mod>)[];

//     const seq = sequence(mod, order as any);
//     return seq as any;
// }

// function _sequence<
//     T extends VariantModule<K>,
//     L extends ValidTypeInput<K, KeysOf<T>>[],
//     K extends string = 'type'
// >(vmod: T, order: L): Sequence<T, L, K> {
//     let rawStringOrder = order.map(i => typeof i === 'string' ? i : i.type);
//     const restrictedVmod = Object.keys(vmod).reduce((acc, key) => {
//         return {
//             ...acc,
//             [key]: vmod[key],
//         }
//     }, {}) as Pick<T, ExtractKeys<L, K>>;
//     const keyType = Object.values(vmod)[0].key;

//     return {
//         ...remote(restrictedVmod, keyType),
//         length: order.length,
//         compare: (a, b) => {
//             const ai = rawStringOrder.findIndex(i => i === getType(a, keyType));
//             const bi = rawStringOrder.findIndex(i => i === getType(b, keyType));
//             const diff = ai - bi;
//             return diff === 0 ? diff : (diff / Math.abs(diff)) as CompareResult;
//         },
//         get(i: number) {
//             const type = this.types[i];
//             return (this.new as VariantModule<K>)[type] as any;
//         },
//         index: a => rawStringOrder.findIndex(i => i === getType(a)),
//         types: rawStringOrder,
//     }
// }

// export function sequence<L extends ValidTypeCreatorInput<'type', T>[], T extends string>(list: L): Sequence<
//     VariantModuleFromList<L[number]>,
//     ValidTypeInput<'type', KeysOf<VariantModuleFromList<L[number]>>>[]
// >;
// export function sequence<
//     T extends VariantModule<K>,
//     L extends ValidTypeInput<K, KeysOf<T, K>>[],
//     K extends string = 'type'
// >(vmod: T, order: L): Sequence<T, L, K>;
// export function sequence(...args: [any[]] | [any, any[]]): any {
//     if (Array.isArray(args[0])) {
//         const [list] = args;
//         return _sequenceFromScratch(list);
//     } else {
//         const [vmod, list] = args;
//         return _sequence(vmod, list!);
//     }
// }

// function getType<
//     T extends VariantModule<K>,
//     O extends VariantOf<T, undefined, K>,
//     C extends Creators<T, K>,
//     S extends KeysOf<T, K>,
//     K extends string = 'type',
// >(object: O | C | S, typeKey?: K): string {
//     const key = typeKey ?? 'type' as K;
//     if (typeof object === 'string') {
//         return object;
//     } else {
//         if (typeof object === 'function') {
//             return (object as VariantCreator<string, Func, K>).type;
//         } else {
//             return (object as Property<K, string>)[key];
//         }
//     }
// }


// export interface SequenceFunc<K extends string> {
//     key: unknown;
// }
// export function sequenceImpl<K extends string>(key: K) {
    
// }