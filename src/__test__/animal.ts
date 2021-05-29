import {variant, TypeNames, VariantOf, fields, variation} from '..';

export const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
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
    perseus: Animal.cat({name: 'Perseus', furnitureDamaged: 0}),
    STEVE: CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}),
}
