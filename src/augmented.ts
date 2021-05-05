import {variant, variation} from '.';
import {Func, PatchObjectOrPromise, RawVariant, VariantCreator, VariantOf} from './precepts';
import {Identity} from './util';

import {isVariantCreator, VariantRecord} from './variant';

/**
 * Expand the functionality of a variant as a whole by tacking on 
 * computed properties. These are configured through a function parameter.
 * 
 * Used in conjunction with `variantModule` or `variant`.
 * 
 * ```typescript
 * export const Action = variant(augmented(
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
export function augmented<T extends RawVariant, F extends (x: VariantOf<VariantRecord<T, string>>) => any>(f: F, variantDef: T) {
    return Object.keys(variantDef).reduce((acc, key: keyof T) => {
        let inputFunc = variantDef[key] as Func

        let returnFunc = isVariantCreator(inputFunc)
            ? variation(inputFunc.type, (...args: any[]) => {
                let result = inputFunc(...args);
                return {
                    ...f(result),
                    ...result,
                }
            })
            : (...args: T[typeof key] extends (...args: infer TArgs) => any ? TArgs : []) => {
                const branch = variantDef[key];
                let item = typeof branch === 'function' ? branch(...args) : {};
                return {
                    ...f(item),
                    ...item,
                }
            }
        ;

        return {
            ...acc,
            [key]: returnFunc,
        }
    }, {}) as AugmentedRawVariant<T, F>;
}

type asdf = VariantCreator<'test', (name: string) => {four: 5}>;
type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

type FullyFuncRawVariant<V extends RawVariant> = {
    [P in keyof V & string]: CleanResult<V[P], () => {}>
}

type PatchFunc<F, O extends object> = F extends (...args: infer TArgs) => infer TReturn ? (...args: TArgs) => PatchObjectOrPromise<TReturn, O> : never;

/**
 * Augment a variant with some value. 
 */
export type AugmentedRawVariant<V extends RawVariant, F extends Func> = {
    [P in keyof V]: V[P] extends VariantCreator<infer VT, infer VCF, infer VK> 
        ? VariantCreator<VT, PatchFunc<VCF, ReturnType<F>>, VK>
        : (...args: Parameters<FullyFuncRawVariant<V>[P & string]>) => Identity<ReturnType<F> & ReturnType<FullyFuncRawVariant<V>[P & string]>>
}