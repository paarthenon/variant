import {variation} from './index.onType';
import {Func, PatchObjectOrPromise, RawVariant, VariantCreator, VariantOf} from './precepts';
import {Identity} from './util';
import {isVariantCreator, VariantRecord} from './variant';

/**
 * Expand the functionality of a variant as a whole by tacking on 
 * computed properties. These are configured through a function parameter.
 * 
 * @param variantDefinition a template for the variant, extends `RawVariant`
 * @param f the augment function. This receives the object that is is augmenting, enabling calculated properties.
 * @tutorial
 * Use in conjunction with `variant` (or `variantModule`).
 * 
 * ```typescript
 * // Add a timestamp to every action.
 * export const Action = variant(augment(
 *     {
 *         AddTodo: fields<{text: string, due?: number}>(),
 *         UpdateTodo: fields<{todoId: number, text?: string, due?: number, complete?: boolean}>(),
 *     },
 *     () => ({timestamp: Date.now()}), 
 * ));
 * ```
 */
export function augment<T extends RawVariant, F extends (x: VariantOf<VariantRecord<T, string>>) => any>(variantDefinition: T, f: F) {
    return Object.keys(variantDefinition).reduce((acc, key: keyof T) => {
        let inputFunc = variantDefinition[key] as Func

        let returnFunc = isVariantCreator(inputFunc)
            ? variation(inputFunc.type, (...args: any[]) => {
                let result = inputFunc(...args);
                return {
                    ...f(result),
                    ...result,
                }
            })
            : (...args: T[typeof key] extends (...args: infer TArgs) => any ? TArgs : []) => {
                const branch = variantDefinition[key];
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

type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

type FullyFuncRawVariant<V extends RawVariant> = {
    [P in keyof V & string]: CleanResult<V[P], () => {}>
}

type PatchFunc<F, O extends object> = F extends (...args: infer TArgs) => infer TReturn ? (...args: TArgs) => PatchObjectOrPromise<TReturn, O> : never;

/**
 * A variant patched with an extra property.
 */
export type AugmentedRawVariant<V extends RawVariant, F extends Func> = {
    [P in keyof V]: V[P] extends VariantCreator<infer VT, infer VCF, infer VK> 
        ? VariantCreator<VT, PatchFunc<VCF, ReturnType<F>>, VK>
        : (...args: Parameters<FullyFuncRawVariant<V>[P & string]>) => Identity<ReturnType<F> & ReturnType<FullyFuncRawVariant<V>[P & string]>>
}