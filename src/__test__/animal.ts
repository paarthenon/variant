import {variantList, variant, fields, TypeNames, VariantOf} from '..';
import {OutVariant, RawVariant, scopedVariant, Variant, VariantCreator, variantFactory, variantModule} from '../variant';
export const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, furnitureDamaged: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

const tag = variantFactory('__typename');
export const TaggedAnimal = variantList([
    tag('dog', fields<{name: string, favoriteBall?: string}>()),
    tag('cat', fields<{name: string, furnitureDamaged: number}>()),
    tag('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
export type TaggedAnimal<T extends TypeNames<typeof TaggedAnimal, '__typename'> = undefined> = VariantOf<typeof TaggedAnimal, T, '__typename'>;

export const Animal2 = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, furnitureDamaged: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
    bird: {},
});
export type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

export const ScopedAnimal = scopedVariant('animal', {
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, furnitureDamaged: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
    bird: {},
});
export type ScopedAnimal<T extends TypeNames<typeof ScopedAnimal> = undefined> = VariantOf<typeof ScopedAnimal, T>;


export const cerberus = Animal.dog({name: 'Cerberus'});
export const cerberus2 = Animal2.dog({name: 'Cerberus'});
export const scopedCerberus = ScopedAnimal.dog({name: 'Cerberus'});

type z = Animal;

export const AmphibiousAnimal = variantList([
    variant('frog', fields<{color: string}>()),
]);
export type AmphibiousAnimal<T extends TypeNames<typeof AmphibiousAnimal> = undefined> = VariantOf<typeof AmphibiousAnimal, T>;

export const WaterAnimal = variantList([
    variant('goldfish', fields<{memoryInSeconds: number}>()),
]);
export type WaterAnimal<T extends TypeNames<typeof WaterAnimal> = undefined> = VariantOf<typeof WaterAnimal, T>;
 