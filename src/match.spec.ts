import {fields, match, payload, scopedVariant, TypeNames, VariantOf, variation} from '.';
import {prematch, variant} from './index.onType';
import {typeMap} from './typeCatalog';
import {just, unpack} from './match.tools';
import {Animal, CapsAnimal, sample} from './__test__/animal';
import {Handler} from './match';


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
    const test = (animal: Animal) => match(animal, {
        default: just(null),
    });

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


    expect(renamed[0]).toBe(6);
    expect(renamed[1]).toBe(5);
    expect(renamed[2]).toBe(6);
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
    const rate = (animal: Animal) => match(animal, {
        cat: _ => _.furnitureDamaged,
        default: _ => 5,
    });

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
    const Animal2 = scopedVariant('Animal', {
        Cat: fields<{name: string}>(),
        Dog: fields<{name: string, toy?: string}>(),
    });
    type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

    const cat = Animal2.Cat({name: 'Perseus'});

    const rating = (animal: Animal2) => match(animal, {
        [Animal2.Cat.type]: c => c.name,
        default: just('yo'),
    })

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
    const result = (animal: Animal) => match(animal, {
        snake: just({
            hello: 'world',
            complex: 4,
        }),
        default: just(2),
    })

    expect(result(sample.cerberus)).toBe(2);
    expect(result(Animal.snake('Test'))).toEqual({
        hello: 'world',
        complex: 4,
    })
})
