import {Func, RawVariant} from './precepts';

import {VariantRecord} from './variant';

/**
 * Expand the functionality of a variant as a whole by tacking on 
 * computed properties. These are configured through a function parameter.
 * 
 * Used in conjunction with `variantModule` or `variant`.
 * 
 * ```typescript
 * export const Action = variantModule(augmented(
 *     () => ({created: Date.now()}), 
 *     {
 *         AddTodo: fields<{text: string, due?: number}>(),
 *         UpdateTodo: fields<{todoId: number, text?: string, due?: number, complete?: boolean}>(),
 *     },
 * ));
 * ```
 * @param variantDef 
 * @param f
 * @deprecated - needs to be rewritten for modern types
 */
export function augmented<T extends RawVariant, F extends (x: VariantRecord<T, string>) => any>(f: F, variantDef: T) {
    return Object.keys(variantDef).reduce((acc, key: keyof T) => {
        return {
            ...acc,
            [key]: (...args: T[typeof key] extends (...args: infer TArgs) => any ? TArgs : []) => {
                let branch = variantDef[key];
                let item = typeof branch === 'function' ? branch(...args) : {};
                return {
                    ...f(item),
                    ...item,
                }
            }
        }
    }, {}) as AugmentedRawVariant<T, F>;
}

type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

type FullyFuncRawVariant<V extends RawVariant> = {
    [P in keyof V & string]: CleanResult<V[P], () => {}>
}
/**
 * @deprecated - needs to be modernized. 
 */
export type AugmentedRawVariant<V extends RawVariant, F extends Func> = {
    [P in keyof V & string]: (...args: Parameters<FullyFuncRawVariant<V>[P]>) => (ReturnType<F> & ReturnType<FullyFuncRawVariant<V>[P]>)
}