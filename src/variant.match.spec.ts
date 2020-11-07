import {match, partialMatch, matchLiteral, matchElse, partialLookup, lookup} from '.';
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


test('error match with type prop', () => {
    //@ts-expect-error
    const rating = (animal: Animal) => match(animal, {
        [Animal.cat.type]: _ => 2,
        dogg: () => 5,
        default: _ => 3,
    });

    expect(rating(cerberus)).toBe(3);
});

test('partial match', () => {
    const rating = (animal: Animal) => match(animal, {
        cat: () => 1,
        default: () => 4,
    });

    expect(rating(cerberus)).toBe(4);
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
    const rating = (animal: Animal) => match(animal, {
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

test('default handler', () => {
    const x = cerberus as Animal;
    const result = match(x, {
        cat: _ => 5,
        default: _ => 0,
    });

    expect(result).toBe(0);
});

test('default handler 2', () => {
    const x = Animal.cat({name: 'Stevie', daysSinceDamage: 0}) as Animal;
    const result = match(x, {
        cat: _ => 5,
        default: _ => 0,
    });

    expect(result).toBe(5);
});


test('partial match2', () => {
    const x = cerberus as Animal;
    const result = match(x, {
        cat: c => c.daysSinceDamage,
        zorg: () => new Date(),
        dog: d => d.favoriteBall,
    }, z => z.pattern);
})

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
            default: _ => _.name,
        });
    }

    const namesdfg = getName(cerberus);

    function getDaysSinceDamage(animal: Animal) {
        return matchElse(animal, {
            cat: ({daysSinceDamage}) => daysSinceDamage,
            dog: ({name}) => name,
        }, _ => {
            return 'yellow';
        })
    }
    const name = getName(Animal.dog({name: 'Frodo'}));

    const result = handleAnimal(Animal.dog({name: 'Frodo'}));
});