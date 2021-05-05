import {fields, scopedVariant, TypeNames, variant, VariantOf, variation} from '.';
import {Identity} from './util';
import {isVariantCreator} from './variant';

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

    expect(Animal.cat.type).toBe('CAT');
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
    expect(Animal.cat.type).toBe('CAT');
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
    expect(Animal.cat.type).toBe('cat');
    expect(Animal.dog.type).toBe('DOG');
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
    const Animal2 = scopedVariant('Animal', {
        Cat: fields<{name: string}>(),
        Dog: fields<{name: string, toy?: string}>(),
    });
    type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

    const cat = Animal2.Cat({name: 'Perseus'});

    expect(cat.name).toBe('Perseus');
    expect(cat.type).toBe('Animal/Cat');
});

