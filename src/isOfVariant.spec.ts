import {isOfVariant, match} from '.';
import {just} from './match.tools';
import {partial, variant} from './type';
import {Animal, sample} from './__test__/animal';

test('isOfVariant', () => {
    const kitty = Animal.cat({name: 'Perseus', furnitureDamaged: 0}) as {};

    let flag = false;
    if (isOfVariant(kitty, Animal)) {
        // should work because 'name' is available on all elements of the union Animal.
        const _name = kitty.name;
        flag = match(kitty, partial({
            cat: just(true),
            default: just(false),
        }))
    }

    expect(flag).toBe(true);
})

test('isOfVariant, dynamic set', () => {
    const kitty = Animal.cat({name: 'Perseus', furnitureDamaged: 0}) as {};

    // just the furry animals.
    const flag = isOfVariant(kitty, variant([Animal.cat, Animal.dog]));

    expect(flag).toBe(true);
})

test('isOfVariant, dynamic set', () => {
    const kitty = Animal.cat({name: 'Perseus', furnitureDamaged: 0}) as {};

    // just the furry animals.
    const flag = isOfVariant(kitty, variant(['cat', 'dog']));
    
    // yes, this is all it ever checked.
    expect(flag).toBe(true);
})

test('isOfVariant ({})', () => {
    expect(isOfVariant({}, Animal)).toBe(false);
})

test('isOfVariant, curried', () => {
    const isAnimal = isOfVariant(Animal);

    expect(isAnimal(sample.cerberus)).toBe(true);
    expect(isAnimal(sample.perseus)).toBe(true);
    expect(isAnimal({})).toBe(false);
})

test('isOfVariant, curried array', () => {
    const animals = [
        sample.cerberus,
        sample.perseus,
        sample.STEVE,
    ]
    const isAnimalList = animals.map(isOfVariant(Animal))

    expect(isAnimalList[0]).toBe(true);
    expect(isAnimalList[1]).toBe(true);
    expect(isAnimalList[2]).toBe(false);
})