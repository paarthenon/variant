/**
 * Loose things until I find a better place to put them in the re-org.
 */

import {OutVariant, variantModule} from './variant';

export const pass = <T>(x: T) => x;
/**
 * Used in conjunction with variantModule to have empty tags.
 */
export const nil = () => {};

type ExtractVC<T extends {type: string}> = {
    [P in T['type']]: (...args: any[]) => Omit<Extract<T, {type: P}>, 'type'>;
}
export function constrainedVariant<T extends {type: string}>(){
    return function<D extends ExtractVC<T>>(def: D & ThisType<D>): OutVariant<D> {
        return variantModule(def);
    }
}

type FromVariant<T, K extends string> = Extract<T, {type: K}>;
type FieldsFromVariant<T, K extends string> = Omit<Extract<T, {type: K}>, 'type'>;
export type ExactVC<T extends {type: string}> = {
    [P in T['type']]: (input: FieldsFromVariant<T, P>) => FieldsFromVariant<T, P>;
}

export function typedVariant<T extends {type: string}>(def: ExactVC<T>): OutVariant<ExactVC<T>> {
    return variantModule(def);
}
