import {match, matcher, ofLiteral, types} from './type';
import {constant, just} from './match.tools';
import {typeCatalog} from './typeCatalog';
import {Animal, sample} from './__test__/animal';

test('matcher creation', () => {
    const m = matcher(sample.cerberus as Animal);

    expect(m).toBeDefined();
    expect(m.target).toEqual(sample.cerberus);
    expect(m.key).toBe('type');
    expect(m.handler).toEqual({});
})

test('matcher exhaust', () => {
    const rating = (animal: Animal) => matcher(animal).exhaust({
        cat: _ => 1,
        dog: _ => 2,
        snake: _ => 3,
    });

    expect(rating(sample.cerberus)).toBe(2);
    expect(rating(sample.perseus)).toBe(1);
})

test('matcher lookup', () => {
    const rating = (animal: Animal) => matcher(animal).register({
        cat: 4,
    }).execute();

    expect(rating(sample.perseus)).toBe(4);
    expect(rating(sample.cerberus)).toBeUndefined();
})

test('matcher lookupTable', () => {
    const rating = (animal: Animal) => matcher(animal)
        .lookup({
            cat: 1,
            dog: 2,
            snake: 3,
        });

    expect(rating(sample.cerberus)).toBe(2);
})

test('matcher (layered)', () => {
    const rating = (a: Animal) => {
        const matcherThunk = () => matcher(a)
            .exhaust({
                cat: c => c.furnitureDamaged,
                dog: d => d.favoriteBall,
                snake: s => s.pattern,
            })
        ;
        return matcher(a)
            .register({
                cat: 4,
            })
            .else(matcherThunk);
    }

    expect(rating(sample.perseus)).toBe(4);
    expect(rating(sample.cerberus)).toBeUndefined();
})


test('matcher (simple when)', () => {
    const getName = (a: Animal) => matcher(a)
        .when(['cat', 'dog', 'snake'], _ => _.name)
        .complete();
    
    expect(getName(sample.cerberus)).toBe('Cerberus');
    expect(getName(sample.perseus)).toBe('Perseus');
})

test('matcher (simple when using types())', () => {
    const getName = (a: Animal) => matcher(a)
        .when(types(Animal), _ => _.name)
        .complete();
    
    expect(getName(sample.cerberus)).toBe('Cerberus');
    expect(getName(sample.perseus)).toBe('Perseus');
})

test('matcher (simple with creators)', () => {
    const getName = (a: Animal) => matcher(a)
        .when([Animal.cat, Animal.dog], _ => _.name)
        .when(['snake'], s => s.pattern)
        .complete();

    expect(getName(sample.cerberus)).toBe('Cerberus');
    expect(getName(sample.perseus)).toBe('Perseus');
    expect(getName(Animal.snake('Tanya', 'spotted'))).toBe('spotted');
})

test('matcher-else (simple with creators)', () => {
    const getName = (a: Animal) => matcher(a)
        .when([Animal.cat, Animal.dog], _ => _.name)
        .else(s => s.pattern);

    expect(getName(sample.cerberus)).toBe('Cerberus');
    expect(getName(sample.perseus)).toBe('Perseus');
    expect(getName(Animal.snake('Tanya', 'spotted'))).toBe('spotted');
})

test('matcher (simple single-entry when)', () => {
    const getName = (a: Animal) => matcher(a)
        .when([Animal.cat, Animal.dog], _ => _.name)
        .when('snake', s => s.pattern)
        .complete();

    expect(getName(sample.cerberus)).toBe('Cerberus');
    expect(getName(sample.perseus)).toBe('Perseus');
    expect(getName(Animal.snake('Tanya', 'spotted'))).toBe('spotted');
})

test('matcher (when-complete)', () => {
    const getFeature = (a: Animal) => matcher(a)
        .when({
            cat: c => c.furnitureDamaged,
            dog: d => d.favoriteBall,
            snake: s => s.pattern,
        })
        .complete();

    expect(getFeature(sample.cerberus)).toBeUndefined();
    expect(getFeature(sample.perseus)).toBe(0);
    expect(getFeature(Animal.snake('Tanya', 'spotted'))).toBe('spotted');
})

test('matcher (onLiteral)', () => {
    const rate = (type: Animal['type']) => matcher(ofLiteral(type))
        .lookup({
            cat: 1,
            dog: 2,
            snake: 3,
        });

    expect(rate(Animal.cat.type)).toBe(1);
    expect(rate(Animal.dog.type)).toBe(2);
})
declare var animal: Animal;

test('matcher failure', () => {
    
    const greetAnimal = (animal: Animal) => matcher(animal)
        .when('snake', ({name}) => `Hello ${name}`)
        // @ts-expect-error
        .complete()
    ;

})

test('match enum', () => {
    enum Alpha {
        A = 'A',
        B = 'B',
    }

    const rate = (a: Alpha) => match(ofLiteral(a), {
        [Alpha.A]: _ => 0,
        [Alpha.B]: constant(1),
    })

    expect(rate(Alpha.A)).toBe(0);
    expect(rate(Alpha.B)).toBe(1);
})
