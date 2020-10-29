import {variant, TypeNames, VariantOf, variantList, fields, lookup} from '.';

enum ANIMAL_NAME {
    DOG = 'dog',
    CAT = 'cat',
    SNAKE = 'snake',
}

const Animal = variantList([
    variant(ANIMAL_NAME.DOG, fields<{name: string, favoriteBall?: string}>()),
    variant(ANIMAL_NAME.CAT, fields<{name: string, daysSinceDamage: number}>()),
    variant(ANIMAL_NAME.SNAKE, (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

test('variant enum (string)', () => {
    const dog = Animal.dog({name: 'fluffy'});

    expect(dog.type).toBe('dog');
    expect(dog.name).toBe('fluffy');
    expect(dog.favoriteBall).toBeUndefined();
})

test('basic lookup', () => {
    const dog = Animal.dog({name: 'fluffy'});

    const cuteName = (animal: Animal) => lookup(animal, {
        [ANIMAL_NAME.CAT]: 'kitty',
        [ANIMAL_NAME.DOG]: 'pupper',
        snake: 'snek',
    });

    expect(cuteName(dog)).toBe('pupper');
})