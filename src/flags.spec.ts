import {flags} from './index.onType'
import {Animal, sample} from './__test__/animal'

test('flags (basic)', () => {
    const housePets = flags([
        sample.cerberus,
        Animal.cat({name: 'Perseus', furnitureDamaged: 0}),
    ]);

    expect(housePets.cat.name).toBe('Perseus');
    expect(housePets.dog.favoriteBall).toBeUndefined();
})