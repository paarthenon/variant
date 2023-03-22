import {fields, payload, scoped, TypeNames, variant, VariantOf, variation} from '.';

test('Simple module', () => {
    const Animal = variant({
        cat: fields<{name: string, furnitureDamaged: number}>(),
        dog: fields<{name: string, favoriteBall?: string}>(),
        snake: (name: string, patternName?: string) => ({
            name,
            pattern: patternName ?? 'striped',
        }),
    })
    type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

    expect(Animal.cat.output.type).toBe('cat');
})

test('Renamed module', () => {
    const Animal = {
        cat: variation('CAT', fields<{name: string, furnitureDamaged: number}>()),
        dog: variation('DOG', fields<{name: string, favoriteBall?: string}>()),
        snake: variation('SNAKE', (name: string, patternName?: string) => ({
            name,
            pattern: patternName ?? 'striped',
        })),
    }
    type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

    expect(Animal.cat.output.type).toBe('CAT');
})

test('variant with variations', () => {
    const Animal = variant({
        cat: variation('CAT', fields<{name: string, furnitureDamaged: number}>()),
        dog: variation('DOG', fields<{name: string, favoriteBall?: string}>()),
        snake: variation('SNAKE', (name: string, patternName?: string) => ({
            name,
            pattern: patternName ?? 'striped',
        })),
    })
    type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

    const snek = Animal.snake('Steve');
    expect(Animal.cat.output.type).toBe('CAT');
    expect(snek.name).toBe('Steve');
})

test('variant with variations', () => {
    const Animal = variant({
        cat: fields<{name: string, furnitureDamaged: number}>(),
        dog: variation('DOG', fields<{name: string, favoriteBall?: string}>()),
        snake: (name: string, patternName?: string) => ({
            name,
            pattern: patternName ?? 'striped',
        }),
    })
    type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

    const snek = Animal.snake('Steve');
    expect(Animal.cat.output.type).toBe('cat');
    expect(Animal.dog.output.type).toBe('DOG');
    expect(snek.name).toBe('Steve');
})

test('method-style variant', () => {
    const Animal = variant({
        cat(name: string) {
            return {
                name,
                furnitureBroken: 0,
            }
        },
        dog(name: string) {
            return {
                name,
                favoriteBall: 'black',
            }
        },
        snake(name: string, pattern = 'striped') {
            return {
                name,
                pattern,
            }
        },
    })
    type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

    const cerberus = Animal.dog('cerberus');

    expect(cerberus.name).toBe('cerberus');
    expect(cerberus.favoriteBall).toBe('black');
})

test('better variantList', () => {
    const Animal = variant([
        variation('dog', fields<{name: string}>()),
        'bird',
    ]);

    expect(Animal.bird().type).toBe('bird');
});

test('card variantList', () => {
    const Suit = variant(['Diamonds', 'Hearts', 'Spades', 'Clubs']);

    expect(Suit.Clubs().type).toBe('Clubs');
    expect(Object.keys(Suit).length).toBe(4);
})

test('scoped', () => {
    const Animal2 = variant(scoped('Animal', {
        Cat: fields<{name: string}>(),
        Dog: fields<{name: string, toy?: string}>(),
    }));
    type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

    const cat = Animal2.Cat({name: 'Perseus'});

    expect(cat.name).toBe('Perseus');
    expect(cat.type).toBe('Animal/Cat');
});


test('variation w/ override', () => {
    const resultF = variation('one', () => ({type: 'two'}));

    const result = resultF();

    // TODO: This is intentional, but the type is wrong. Either change the intention
    // of the design or change the type to consider the function passed in.
    expect(result.type).toBe('two');
})


test('variant from enum', () => {
    enum AniType {
        d = 'dog',
        c = 'cat',
        s = 'snake',
    }

    const Animal = variant({
        [AniType.d]: payload<'woof'>(),
        [AniType.c]: payload<'meow'>(),
        [AniType.s]: payload<'hiss'>(),
    })
    type Animal = VariantOf<typeof Animal>;
})

test('variant retains mismatched names', () => {
    const Animal2 = scoped('Animal', {
        Cat: fields<{name: string}>(),
        Dog: fields<{name: string, toy?: string}>(),
    });
    type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

    const Animal3 = variant(Animal2);

    expect(Animal3.Cat).toBeDefined();
    expect(Animal3.Cat.output.type).toBe('Animal/Cat');
    expect(Animal3.Dog.output.type).toBe('Animal/Dog');
})
