import {variant, TypeNames, VariantOf, fields, variation} from '..';

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
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

export const CapsAnimal = {
    cat: variation('CAT', fields<{name: string, furnitureDamaged: number}>()),
    dog: variation('DOG', fields<{name: string, favoriteBall?: string}>()),
    snake: variation('SNAKE', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
}
export type CapsAnimal<T extends TypeNames<typeof CapsAnimal> = undefined> = VariantOf<typeof CapsAnimal, T>;


export const sample = {
    cerberus: Animal.dog({name: 'Cerberus'}),
    STEVE: CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}),
}