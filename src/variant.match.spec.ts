

import variant, {match, partialMatch, variantList, TypeNames, VariantOf} from './variant'
import {fields} from './tools';
import Chance from 'chance';


const chance = new Chance();
const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

const cerberus = Animal.dog({name: 'Cerberus'});

test('match with string', () => {

    const rating = (animal: Animal) => match(animal, {
        dog: _ => 1,
        cat: _ => 2,
        snake: _ => 3,
    });

    const animal = Animal.dog({name: 'Cerberus'});

    expect(rating(animal)).toBe(1);
});

test('match with type prop', () => {
    const rating = (animal: Animal) => match(animal, {
        [Animal.dog.type]: _ => 1,
        [Animal.cat.type]: _ => 2,
        [Animal.snake.type]: _ => 3,
    });

    expect(rating(cerberus)).toBe(1);
});


test('partial match', () => {
    const rating = (animal: Animal) => partialMatch(animal, {
        cat: _ => 1,
    });

    expect(rating(cerberus)).toBeUndefined();
    expect(rating(Animal.cat({name: 'Loki', daysSinceDamage: 8}))).toBe(1);
});