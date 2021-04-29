import {types} from '.';
import {Animal, sample} from './__test__/animal';

test('types (on variant)', () => {
    const animalTypes = types(Animal);

    expect(animalTypes.length).toBe(3);
    expect(animalTypes.includes(Animal.cat.type)).toBe(true);
    expect(animalTypes.includes(Animal.dog.type)).toBe(true);
    expect(animalTypes.includes(Animal.snake.type)).toBe(true);
})

test('types (on empty variant)', () => {
    const emptyTypes = types({});

    expect(emptyTypes.length).toBe(0);
})

test('types (on creator list)', () => {
    const animalTypes = types(Object.values(Animal));

    expect(animalTypes.includes('cat')).toBeTruthy();
    expect(animalTypes.includes('dog')).toBeTruthy();
    expect(animalTypes.includes('snake')).toBeTruthy();
    expect(animalTypes.length).toBe(3);
})

test('types func (on instance list)', () => {
    const dogAndCat = [
        sample.cerberus,
        Animal.cat({name: 'Zagreus', furnitureDamaged: 2}),
    ];
    const animalTypes = types(dogAndCat);

    expect(animalTypes.includes('cat')).toBeTruthy();
    expect(animalTypes.includes('dog')).toBeTruthy();
    expect(animalTypes.length).toBe(2);
})