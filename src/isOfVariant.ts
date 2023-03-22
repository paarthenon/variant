import {SumType, VariantModule} from './precepts';

export interface IsOfVariantFunc<K extends string> {
    /**
     * Checks if an object was created from one of a set of variants. This function is a 
     * [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) 
     * so TypeScript will narrow the type of `object` correctly.
     * 
     * @remarks
     * The variant module may be a pre-existing module or one constructed on the fly.
     * 
     * @param instance an instance of a variant.
     * @param variant {T extends VariantModule<K>} the variant module.
     * @param typeKey the key used as the discriminant.
     * 
     * @returns instance is variant 
     */
    isOfVariant<T extends VariantModule<K>>(instance: {} | null | undefined, variant: T): instance is SumType<T>;
    /**
     * Checks if an object was created from one of a set of variants. This function is a 
     * [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) 
     * so TypeScript will narrow the type of `object` correctly.
     * 
     * @remarks
     * The variant module may be a pre-existing module or one constructed on the fly.
     * @param variant the variant model.
     * 
     * @returns user-defined type guard.
     */
    isOfVariant<T extends VariantModule<K>>(variant: T): (instance: {} | null | undefined) => instance is SumType<T>;
}

export function isOfVariantImpl<K extends string>(key: K): IsOfVariantFunc<K> {
    function isOfVariant<T extends VariantModule<K>>(instance: {} | null | undefined, variant: T): instance is SumType<T>;
    function isOfVariant<T extends VariantModule<K>>(variant: T): (instance: {} | null | undefined) => instance is SumType<T>;
    function isOfVariant<
        T extends VariantModule<K>,
    >(
        ...args: [T] | [{} | null | undefined, T]
    ) {
        if (args.length === 1) {
            const [variant] = args;

            return (instance: {} | null | undefined) => instance != undefined
                && Object.values(variant).some(vc => vc.output.type === (instance as Record<K, string>)[key]);
        } else if (args.length === 2) {
            const [instance, variant] = args;
            return instance != undefined
                && Object.values(variant).some(vc => vc.output.type === (instance as Record<K, string>)[key]);
        }
        return false;
    }

    return {isOfVariant}
}
