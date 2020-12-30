/**
 * Loose things until I find a better place to put them in the re-org.
 */

import {OutVariant, Property, variantModule} from './variant';

export const pass = <T>(x: T) => x;
/**
 * Used in conjunction with variantModule to have empty tags.
 */
export const nil = () => {};

type ExtractVC<T extends {type: string}> = {
    [P in T['type']]: (...args: any[]) => Omit<Extract<T, {type: P}>, 'type'>;
}

type FromVariant<T, K extends string> = Extract<T, {type: K}>;


type FieldsFromVariant<T, K extends string> = Omit<Extract<T, {type: K}>, 'type'>;
export type ExactVC<T extends {type: string}> = {
    [P in T['type']]: (input: FieldsFromVariant<T, P>) => FieldsFromVariant<T, P>;
}

export function typedVariant<T extends {type: string}>(def: ExactVC<T>): OutVariant<ExactVC<T>> {
    return variantModule(def);
}
/**
 * strip the type field from some object type.
 */
export type VariantWithoutType<T, K extends string = 'type'> = Omit<T, K>;

export type SpecificVariantFields<T, TType extends string, K extends string = 'type'> = VariantWithoutType<Extract<T, Property<K, TType>>>;
export type ExactDefinition<T extends Property<K, string>, K extends string = 'type'> = {
    [P in T[K]]: (input: SpecificVariantFields<T, P, K>) => SpecificVariantFields<T, P, K>;
}

export function typed<T extends Property<'type', string>>(def: ExactDefinition<T>) {
    return def;
}
export function typedWithKey<T extends Property<K, string>, K extends string = 'type'>(def: ExactDefinition<T, K>) {
    return def;
}