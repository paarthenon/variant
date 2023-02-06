import {TypeMap, TypesOf, VariantModule} from './precepts';
import {Identity} from './util';

/**
 * A catalog object listing the types inherent to some `VariantModule`
 */
export type TypeCatalog<T extends VariantModule<string>> = {
    [P in TypesOf<T>]: P;
}

/**
 * Create an a string enum-like object containing the type literals of a variant.
 * @param variant the definition of the variant in question.
 * @template T the variant template, an object containing variant creators.
 * @returns an object `{[T: string]: T}`
 * @tutorial
 * ```ts
 * const Animal = variant({...}); // cat, dog, snake
 * 
 * const animalType = typeCatalog(Animal); 
 * // animalType: {cat: 'cat', dog: 'dog', snake: 'snake'};
 * ```
 */
export function typeCatalog<T extends VariantModule<string>>(variant: T) {
    return Object.values(variant).reduce((result, vc) => {
        return {
            ...result,
            [vc.output.type]: vc.output.type,
        }
    }, {} as Identity<TypeCatalog<T>>)
}

/**
 * Create a mapping object containing the friendly names of a variant's forms
 * and the type literals they correspond to.
 * @param variant the definition of the variant in question.
 * @template T the variant template, an object containing variant creators.
 * @tutorial
 * 
 * In the trivial case where each property label of a variant is exactly the
 * type it generates, this is equivalent to `typeCatalog`
 * ```ts
 * const Animal = variant({...}); // cat, dog, snake
 * 
 * const animalType = typeMap(Animal); 
 * // animalType: {cat: 'cat', dog: 'dog', snake: 'snake'};
 * ```
 * However, `typeMap` shines when differences come into play.
 * ```ts
 * const Animal = scopedVariant('@animal', {...}); // cat, dog, snake
 * const animalType = typeMap(Animal);
 * // animalType: {cat: '@animal/cat', dog: '@animal/dog', snake: '@animal/snake'};
 * ```
 */
export function typeMap<T extends VariantModule<string>>(variant: T) {
    return Object.keys(variant).reduce((result, key) => {
        return {
            ...result,
            [key]: variant[key].output.type,
        }
    }, {} as Identity<TypeMap<T>>)
}
