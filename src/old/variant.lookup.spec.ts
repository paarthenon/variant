import {Animal, cerberus} from './__test__/animal';
import {lookup, partialLookup} from '.';

test('basic lookup', () => {
    const cuteName = (animal: Animal) => lookup(animal, {
        cat: 'kitty',
        dog: 'pupper',
        snake: 'snek',
    });

    expect(cuteName(cerberus)).toBe('pupper');
})

test('partial lookup', () => {
    const cuteName = (animal: Animal) => partialLookup(animal, {
        cat: 'kitten',
    });
    const cat = Animal.cat({name: 'Amber', furnitureDamaged: 0})

    expect(cuteName(cat)).toBe('kitten');
    expect(cuteName(cerberus)).toBeUndefined();
})
