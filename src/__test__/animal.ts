import {variantList, variant, fields, TypeNames, VariantOf} from '..';

export const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

export const cerberus = Animal.dog({name: 'Cerberus'});
