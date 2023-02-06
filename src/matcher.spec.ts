import {match, matcher, ofLiteral, types} from './type';
import {constant} from './match.tools';
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

test('matcher exhaust', () => {
    const rating = (animal: Animal) => matcher(animal)
        .when('cat', _ => 1)
        .exhaust({
            dog: _ => 2,
            snake: _ => 3,
        });

    expect(rating(sample.cerberus)).toBe(2);
    expect(rating(sample.perseus)).toBe(1);
})

test('matcher register', () => {
    const rating = (animal: Animal) => matcher(animal).register({
        cat: 4,
    }).execute();

    expect(rating(sample.perseus)).toBe(4);
    expect(rating(sample.cerberus)).toBeUndefined();
})

test('matcher register repeating', () => {
    const rating = (animal: Animal) => matcher(animal)
        .register({
            cat: 'kitty',
        })
        .register({
            dog: 'puppy',
            snake: 'snek',
        })
        .complete();
})


test('matcher lookup remaining', () => {
    const rating = (animal: Animal) => matcher(animal)
        .register({
            cat: 'kitty',
        })
        .lookup({
            dog: 'puppy',
            snake: 'snek',
        })
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
        .with({
            cat: c => c.furnitureDamaged,
            [Animal.dog.output.type]: d => d.favoriteBall,
            snake: s => s.pattern,
        })
        .complete();

    expect(getFeature(sample.cerberus)).toBeUndefined();
    expect(getFeature(sample.perseus)).toBe(0);
    expect(getFeature(Animal.snake('Tanya', 'spotted'))).toBe('spotted');
})

test('matcher (repeated withs)', () => {
    const getFeature = (a: Animal) => matcher(a)
        .with({cat: c => c.furnitureDamaged})
        .with({
            dog: d => d.favoriteBall,
            snake: s => s.pattern,
        })
        .complete();
    
    expect(getFeature(sample.cerberus)).toBeUndefined();
    expect(getFeature(sample.perseus)).toBe(0);
    expect(getFeature(Animal.snake('Tanya', 'spotted'))).toBe('spotted');
})

test('matcher (ofLiteral)', () => {
    const rate = (type: Animal['type']) => matcher(ofLiteral(type))
        .lookup({
            cat: 1,
            dog: 2,
            snake: 3,
        });

    expect(rate(Animal.cat.output.type)).toBe(1);
    expect(rate(Animal.dog.output.type)).toBe(2);
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

test('matcher (of literal directly)', () => {
    const rate = (type: Animal['type']) => matcher(type)
        .lookup({
            cat: 1,
            dog: 2,
            snake: 3,
        });

    expect(rate(Animal.cat.output.type)).toBe(1);
    expect(rate(Animal.dog.output.type)).toBe(2);
})

test('match enum directly', () => {
    enum Alpha {
        A = 'A',
        B = 'B',
    }

    const rate = (a: Alpha) => matcher(a)
        .when(Alpha.A, _ => 0)
        .when(Alpha.B, _ => 1)
        .complete();

    expect(rate(Alpha.A)).toBe(0);
    expect(rate(Alpha.B)).toBe(1);
})

test('matcher greeks', () => {
    const greeks = [
        'alpha',
        'beta',
        'gamma',
    ] as const;

    const greekLetters = greeks.map(letter => matcher(letter)
        .register({
            alpha: 'A',
            beta: 'B',
            gamma: 'Γ',
        } as const)
        .complete());

    expect(greekLetters[0]).toBe('A');
    expect(greekLetters[1]).toBe('B');
    expect(greekLetters[2]).toBe('Γ');
})

test('matcher lookup', () => {
    const greeks = [
        'alpha',
        'beta',
        'gamma',
    ] as const;

    const greekLetters = greeks.map(letter => matcher(letter)
        .with({
            alpha: _ => 'A',
            beta: _ => 'B',
            gamma:_ => 'Γ',
        })
        .complete()
    );

    expect(greekLetters[0]).toBe('A');
    expect(greekLetters[1]).toBe('B');
    expect(greekLetters[2]).toBe('Γ');
})

test('matcher with fallback', () => {
    const rating = (a: Animal) => 
        matcher(a)
            .with({
                cat: _ => 1,
                dog: _ => 2,
                snake: _ => 3,
            })
            .complete({
                withFallback: _ => 0,
            })

    expect(rating(Animal.dog({name: 'Buffy'}))).toBe(2);
    expect(rating({type: 'none'} as any)).toBe(0);
})


test('matcher remaining', () => {
    const rating = (a: Animal) => matcher(a)
        .when('cat', _ => 1)
        .remaining({
            dog: _ => 2,
            snake: _ => 3,
        })
        .complete()

    expect(rating(sample.cerberus)).toBe(2);
    expect(rating(undefined as any)).toBeUndefined();
})

test('matcher remaining withFallback', () => {
    const rating = (a: Animal) => matcher(a)
        .when('cat', _ => 1)
        .remaining({
            dog: _ => 2,
            snake: _ => 3,
        })
        .complete({
            withFallback: _ => 0
        })

    expect(rating(sample.cerberus)).toBe(2);
    expect(rating(undefined as any)).toBe(0);
})
