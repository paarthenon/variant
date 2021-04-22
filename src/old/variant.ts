// import {Func, RawVariant, VariantCreator} from '../precepts';


// function safeKeys<O extends {}>(o: O) {
//     return Object.keys(o) as (keyof O & string)[];
// }


// type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

// type FullyFuncRawVariant<V extends RawVariant> = {
//     [P in keyof V & string]: CleanResult<V[P], () => {}>
// }
// export type OutVariant<T extends RawVariant>
//     = {[P in (keyof T & string)]: VariantCreator<P, CleanResult<T[P], () => {}>>}
// ;

// type ScopedVariant<T extends RawVariant, Scope extends string> = {
//     [P in (keyof T & string)]: VariantCreator<`${Scope}__${P}`, CleanResult<T[P], () => {}>>;
// }

// /**
//  * Unstable.
//  * @alpha - unstable API
//  * @param v 
//  * @param _contract 
//  */
// export function scopedVariant<
//     T extends RawVariant,
//     Scope extends string,
// >(scope: Scope, v: T): Identity<ScopedVariant<T, Scope>> {
//     return safeKeys(v).reduce((acc, key) => {
//         return {
//             ...acc,
//             [key]: variant(`${scope}__${key}`, typeof v[key] === 'function' ? v[key] as any : identityFunc),
//         };
//     }, {} as Identity<ScopedVariant<T, Scope>>);
// }
