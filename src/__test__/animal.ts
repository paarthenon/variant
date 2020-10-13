import {variantList, variant, fields, TypeNames, VariantOf} from '..';
import {match, matchElse, partialMatch} from '../match';
import {lookup, partialLookup2} from '../variant'
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

type z = Animal;


export const AmphibiousAnimal = variantList([
    variant('frog', fields<{color: string}>()),
]);
export type AmphibiousAnimal<T extends TypeNames<typeof AmphibiousAnimal> = undefined> = VariantOf<typeof AmphibiousAnimal, T>;

export const WaterAnimal = variantList([
    variant('goldfish', fields<{memoryInSeconds: number}>()),
]);
export type WaterAnimal<T extends TypeNames<typeof WaterAnimal> = undefined> = VariantOf<typeof WaterAnimal, T>;
