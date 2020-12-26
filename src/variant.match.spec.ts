import {match, partialMatch, matchLiteral, matchElse, partialLookup, lookup, TypeNames, variantModule, VariantOf, variantList, variant} from '.';
import {just, unpack} from './match';
import {constant, fields, isType, payload} from './tools';
import {strEnum} from './util';
import {Animal, Animal2, cerberus, ScopedAnimal, scopedCerberus, TaggedAnimal} from './__test__/animal'
import {matcher} from './matcher';
import {atScope, descope} from './variant';
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
    expect(rating(Animal.cat({name: 'Loki', furnitureDamaged: 8}))).toBe(1);
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
    expect(rating(Animal.cat({name: 'Jenna', furnitureDamaged: 2}))).toBe(4);
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
    const x = Animal.cat({name: 'Stevie', furnitureDamaged: 0}) as Animal;
    const result = match(x, {
        cat: _ => 5,
        default: _ => 0,
    });

    expect(result).toBe(5);
});


test('partial match2', () => {
    const x = cerberus as Animal;
    const result = match(x, {
        cat: c => c.furnitureDamaged,
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

    function getFurnitureDamaged(animal: Animal) {
        return match(animal, {
            cat: ({furnitureDamaged}) => furnitureDamaged,
            default: _ => 0,
        })
    }
    const name = getName(Animal.dog({name: 'Frodo'}));

    const result = handleAnimal(Animal.dog({name: 'Frodo'}));


});

const Test1 = variantModule({
    Alpha: payload<string>(),
    Beta: fields<{prop: string}>(),
    Gamma: {},
});
type Test1<T extends TypeNames<typeof Test1> = undefined> = VariantOf<typeof Test1, T>;

const test1Result = (thing: Test1) => match(thing, {
    Alpha: unpack,
    Beta: ({prop}) => prop,
    Gamma: just('gamma'),
});

test('unpack', () => {
    const thing = Test1.Alpha('yolo') as Test1;
    
    expect(test1Result(thing)).toBe('yolo');
})
test('solo unpack', () => {
    const thing = Test1.Alpha('yolo');

    const ret = match(thing, {
        Alpha: unpack,
    })

    expect(ret).toBe('yolo');
})

test('solo just', () => {
    const thing = Test1.Alpha('yolo');

    const ret = match(thing, {
        Alpha: just(5),
    })

    expect(ret).toBe(5);
})

test('complex just', () => {
    const result = test1Result(Test1.Gamma());

    expect(result).toBe('gamma');
})

test('obj just', () => {
    const result = (animal: Animal) => match(animal, {
        snake: just({
            hello: 'world',
            complex: 4,
        }),
        default: just(2),
    })
})


test('matcher', () => {
    const rating = (anim: Animal) => {
        const answer = matcher(anim)
            .when(['cat', 'dog'], c => c.name)
            .when({
                snake: just(4),
                bird: just(4),
            })
            .complete();
        return answer;
    }
    const Animal = Animal2;
    type Animal = Animal2;

    const greetAnimal = (animal: Animal) => matcher(animal)
        .when({
            snake: just('You offer your snake a new rat.'),
            bird: just('You let your bird perch on your finger.'),
        })
        .when(['cat', 'dog'], e => e)
        .complete();

    const asdf = greetAnimal(cerberus);
    expect(rating(Animal.snake('steve'))).toBe(4);
    expect(rating(cerberus)).toBe(cerberus.name);
})

test('matcher else', () => {
    const rating = (anim: Animal) => {
        const answer = matcher(anim)
            .when(['cat', 'dog'], c => c.name)
            .else(just(4))
        ;
        return answer;
    }
    const Animal = Animal2;
    type Animal = Animal2;

    expect(rating(Animal.snake('steve'))).toBe(4);
    expect(rating(cerberus)).toBe(cerberus.name);
})


test('defff', () => {
    const Anim2 = variantList([
        ...Object.values(Animal),
        variant('default', payload<string>()),
        'pegasus',
    ]);
    type Anim2<T extends TypeNames<typeof Anim2> = undefined> = VariantOf<typeof Anim2, T>;
})


test('scoped match', () => {
    const rating = (a: ScopedAnimal) => match(a, {
        "animal/dog": constant(4),
        default: constant(5),
    });

    expect(rating(scopedCerberus)).toBe(4);
})

test('scoped match', () => {
    const rating2 = (a: ScopedAnimal) => {
        return match(descope(a), {
            bird: constant(1),
            cat: constant(2),
            dog: constant(3),
            snake: constant(4),
        })
    }

    expect(rating2(scopedCerberus)).toBe(3);
})