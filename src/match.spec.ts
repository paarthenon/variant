import {fields, match, payload, scoped, TypeNames, VariantOf, variation} from '.';
import {lookup, ofLiteral, otherwise, partial, prematch, variant} from './type';
import {typeMap} from './typeCatalog';
import {constant, just, unpack} from './match.tools';
import {Animal, CapsAnimal, sample} from './__test__/animal';
import {catalog} from './catalog';


test('match (basic)', () => {
    const rate = (animal: Animal) => match(animal, {
        cat: _ => _.furnitureDamaged,
        dog: _ => 4,
        snake: just(5),
    })

    expect(rate(sample.cerberus)).toBe(4);
    expect(rate(Animal.cat({name: 'Yellow', furnitureDamaged: 2}))).toBe(2);
    expect(rate(Animal.snake('Paleos'))).toBe(5);
})

test(`match (inline)`, () => {
    const animalList: Animal[] = [
        sample.cerberus,
        Animal.cat({name: 'Perseus', furnitureDamaged: 0}),
        Animal.dog({name: 'Twix'}),
    ];

    const renamed = animalList.map(match({
        cat: _ => ({..._, name: `${_.name}-paw`}),
        dog: _ => ({..._, name: `${_.name}-floof`}),
        snake: _ => ({..._, name: `${_.name}-noodle`}),
    }));


    expect(renamed[0].name).toBe('Cerberus-floof');
    expect(renamed[1].name).toBe('Perseus-paw');
    expect(renamed[2].name).toBe('Twix-floof');
})
test(`match (inline partial)`, () => {
    const animalList: Animal[] = [
        sample.cerberus,
        Animal.cat({name: 'Perseus', furnitureDamaged: 0}),
        Animal.dog({name: 'Twix'}),
        Animal.snake('Terra'),
    ];

    const renamed = animalList.map(match(partial({
        cat: _ => ({..._, name: `${_.name}-paw`}),
        dog: _ => ({..._, name: `${_.name}-floof`}),
        default: _ => ({..._, name: `${_.name}-animal`}),
    })));


    expect(renamed[0].name).toBe('Cerberus-floof');
    expect(renamed[1].name).toBe('Perseus-paw');
    expect(renamed[2].name).toBe('Twix-floof');
    expect(renamed[3].name).toBe('Terra-animal');
})

test('(m2 otherwise', () => {
    
    const rate = (a: Animal) => match(a, otherwise({
        dog: d => d.type,
    }, _ => {
        return 6;
    }))
})

test('prematch on type', () => {
    const test = prematch<Animal>()({
        cat: _ => 5,
        dog: _ => 6,
        snake: _ => 9,
    });

    prematch<Animal>()({
        default: _ => 5,
    })
    const result = test(sample.cerberus);

    expect(result).toBe(6)
    expect(test(Animal.snake('Kailash'))).toBe(9);
})

test('prematch on module', () => {
    const test = prematch(Animal)({
        cat: _ => 5,
        dog: _ => 6,
        default: _ => 8,
    });

    const result = test(sample.cerberus);

    expect(result).toBe(6)
    expect(test(Animal.snake('Kailash'))).toBe(8);
})

test('match (partial)', () => {
    const rate = (animal: Animal) => match(animal, partial({
        cat: _ => _.furnitureDamaged,
        default: _ => 5,
    }));

    expect(rate(Animal.cat({name: 'Yellow', furnitureDamaged: 2}))).toBe(2);
    expect(rate(sample.cerberus)).toBe(5);
})

test('caps animal', () => {
    const cat = CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}) as CapsAnimal;
    
    match(cat, {
        [CapsAnimal.cat.type]: just(5),
        [CapsAnimal.dog.type]: just(4),
        [CapsAnimal.snake.type]: just(4),
    });
})

test('caps animal, keymap (destructured)', () => {
    const catInstance = CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}) as CapsAnimal;
    
    const _ = typeMap(CapsAnimal);
    
    const result = match(catInstance, {
        [_.cat]: just(5),
        [_.dog]: just(4),
        [_.snake]: just(3),
    });

    expect(result).toBe(5);
})

test('caps animal, keymap (destructured)', () => {
    const catInstance = CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}) as CapsAnimal;
    
    const {cat, dog, snake} = typeMap(CapsAnimal);
    
    const result = match(catInstance, {
        [cat]: just(5),
        [dog]: just(4),
        [snake]: just(3),
    });

    expect(result).toBe(5);
})

test('scoped match', () => {
    const Animal2 = scoped('Animal', {
        Cat: fields<{name: string}>(),
        Dog: fields<{name: string, toy?: string}>(),
    });
    type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

    const cat = Animal2.Cat({name: 'Perseus'});

    const rating = (animal: Animal2) => match(animal, partial({
        [Animal2.Cat.type]: c => c.name,
        default: just('yo'),
    }))

    expect(rating(Animal2.Cat({name: 'steve'}))).toBe('steve');
})


test('unpack', () => {
    const thing = Test1.Alpha('yolo') as Test1;
    
    expect(test1Result(thing)).toBe('yolo');
})

test('unpack (solo)', () => {
    const thing = Test1.Alpha('yolo');

    const ret = match(thing, {
        Alpha: unpack,
    })

    expect(ret).toBe('yolo');
})


const Test1 = variant({
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

test('just (solo)', () => {
    const thing = Test1.Alpha('yolo');

    const ret = match(thing, {
        Alpha: just(5),
    })

    expect(ret).toBe(5);
})

test('just (complex)', () => {
    const result = test1Result(Test1.Gamma());

    expect(result).toBe('gamma');
})

test('just (object)', () => {
    const result = (animal: Animal) => match(animal, partial({
        snake: just({
            hello: 'world',
            complex: 4,
        }),
        default: just(2),
    }))

    expect(result(sample.cerberus)).toBe(2);
    expect(result(Animal.snake('Test'))).toEqual({
        hello: 'world',
        complex: 4,
    })
})

const wrapEnum = <T extends string | number>(a: T) => ofLiteral(a);

test('onEnum basic', () => {
    enum Alpha {
        A = 'A',
        B = 'B',
    }

    expect(wrapEnum(Alpha.A).type).toBe(Alpha.A);
    expect(wrapEnum(Alpha.B).type).toBe(Alpha.B);
})


test('onEnum numeric', () => {
    enum Numba {
        A = 1,
        B = 2,
    }
    expect(wrapEnum(Numba.A).type).toBe(Numba.A);
    expect(wrapEnum(Numba.B).type).toBe(Numba.B);
})

test('match enum', () => {
    enum Alpha {
        A = 'A',
        B = 'B',
    }

    const rate = (a: Alpha) => match(ofLiteral(a), {
        [Alpha.A]: constant(0),
        [Alpha.B]: constant(1),
    })

    expect(rate(Alpha.A)).toBe(0);
    expect(rate(Alpha.B)).toBe(1);
})

test('match enum (numeric)', () => {
    enum Alpha {
        A = 'A',
        B = 'B',
    }

    const rate = (a: Alpha) => match(ofLiteral(a), {
        [Alpha.A]: constant(0),
        [Alpha.B]: constant(1),
    })

    expect(rate(Alpha.A)).toBe(0);
    expect(rate(Alpha.B)).toBe(1);
})


test('lookup rate', () => {
    const rate = (a: Animal) => {
        return match(a, lookup({
            cat: 1,
            dog: 2,
            snake: 3,
        }))
    }

    expect(rate(sample.cerberus)).toBe(2);
})


test('match literal (quiet)', () => {
    const rate = (a: Animal) => {
        const aKey = a.type;
        return match(aKey, {
            cat: () => 1,
            dog: () => 2,
            snake: () => 3,
        })
    }
    expect(rate(sample.cerberus)).toBe(2);
})

test('match literal (lookup)', () => {
    const rate = (a: Animal) => {
        const aKey = a.type;
        return match(aKey, lookup({
            cat: 1,
            dog: 2,
            snake: 3,
        }))
    }
    expect(rate(sample.cerberus)).toBe(2);
})


test('inline match literal lookup', () => {
    const greeks = [
        'alpha',
        'beta',
        'gamma',
    ] as const;

    const greekLetters = greeks.map(match(lookup({
        alpha: 'A',
        beta: 'B',
        gamma: 'Γ',
    })))

    expect(greekLetters[0]).toBe('A');
    expect(greekLetters[1]).toBe('B');
    expect(greekLetters[2]).toBe('Γ');
})

test('match promise inline', async () => {
    const animal = Promise.resolve(sample.cerberus as Animal);

    const result = await animal.then(match({
        cat: c => c.type,
        dog: d => d.name,
        snake: s => s.pattern,
    }));

    expect(result).toBe('Cerberus');
})
