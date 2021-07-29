import {catalog} from './catalog';
import {flags, onLiteral} from './index.onType'
import {Animal, sample} from './__test__/animal'

test('flags (basic)', () => {
    const housePets = flags([
        sample.cerberus,
        Animal.cat({name: 'Perseus', furnitureDamaged: 0}),
    ]);

    expect(housePets.cat.name).toBe('Perseus');
    expect(housePets.dog.favoriteBall).toBeUndefined();
})

test('flags on catalog', () => {
    const Element = catalog([
        'fire',
        'air',
        'water',
        'earth',
    ]);
    type Element = keyof typeof Element;
    
    // that's... interesting that this works. I'm not exactly sure what I'd use it for.
    // but still, neat.
    const elementMap = flags(Object.values(Element).map(onLiteral));
})