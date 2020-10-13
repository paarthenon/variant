import {lookup, partialLookup} from './variant'
import {match, partialMatch, matchLiteral, matchElse} from '.';
import {strEnum} from './util';
import {Animal, cerberus} from './__test__/animal'

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

test('match else', () => {
    const rating = (animal: Animal) => matchElse(animal, {
        cat: _ => 1,
    }, animal => match(animal, {
        dog: _ => 2,
        snake: _ => 3,
    }));

    expect(rating(cerberus)).toBe(2);
})

test('match else default', () => {
    const rating = (animal: Animal) => matchElse(animal, {
        cat: _ => 4,
    }, _others => 5);

    expect(rating(cerberus)).toBe(5);
    expect(rating(Animal.cat({name: 'Jenna', daysSinceDamage: 2}))).toBe(4);
})

const things = strEnum([
    'a',
    'b',
    'c',
])
type things = keyof typeof things;

const handleThing = (thing: things) => matchLiteral(thing, {
    a: _ => 1,
    b: b => b,
    c: _ => '3',
});

test('match return type', () => {
    function handleAnimal(animal: Animal) {
        return partialLookup(animal, {
            snake: 'snek',
            cat: 'yo',
        })
    };

    const result = handleAnimal(Animal.dog({name: 'Frodo'}))

})

test('match literal', () => {
    expect(handleThing('a')).toBe(1);
    expect(handleThing('c')).toBe('3');
});

test('match literal undefined', () => {
    expect(handleThing('asdf' as any)).toBe(undefined);
});


test('above and beyond', () => {
    /**
 * TEST TYPES
 */

    function handleAnimal(animal: Animal) {
        return lookup(animal, {
            snake: 'snek',
            cat: 'yo',
            dog: 4,
        } as const)
    }

    function getName(animal: Animal) {
        return partialMatch(animal, {
            cat: cat => cat.name,
            dog: ({name}) => name,
        })
    }

    function getDaysSinceDamage(animal: Animal) {
        return matchElse(animal, {
            cat: ({daysSinceDamage}) => daysSinceDamage
        }, _ => {
            return 'yellow';
        })
    }
    const name = getName(Animal.dog({name: 'Frodo'}));

    const result = handleAnimal(Animal.dog({name: 'Frodo'}));
});