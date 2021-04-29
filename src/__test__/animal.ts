import {variant, TypeNames, VariantOf, fields} from '..';

// export const AmphibiousAnimal = variantList([
//     variant('frog', fields<{color: string}>()),
// ]);
// export type AmphibiousAnimal<T extends TypeNames<typeof AmphibiousAnimal> = undefined> = VariantOf<typeof AmphibiousAnimal, T>;

// export const WaterAnimal = variantList([
//     variant('goldfish', fields<{memoryInSeconds: number}>()),
// ]);
// export type WaterAnimal<T extends TypeNames<typeof WaterAnimal> = undefined> = VariantOf<typeof WaterAnimal, T>;
 

export const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    }),
});
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

export const sample = {
    cerberus: Animal.dog({name: 'Cerberus'}),
}