import {fields, match, TypeNames, variant, VariantOf, variation} from '.';
import {augmented} from './augmented';
import {Animal, CapsAnimal} from './__test__/animal';

test('augmented (inline)', () => {
    const BetterAnimal = variant(augmented(() => ({better: 4}),{
        dog: fields<{name: string, favoriteBall?: string}>(),
        cat: fields<{name: string, furnitureDamaged: number}>(),
        snake: (name: string, pattern = 'striped') => ({name, pattern}),
    }));
    type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;


    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.better).toBeDefined();
    expect(snek.better).toBe(4);
})

test('augmented (referencing pre-existing module)', () => {
    const BetterAnimal = variant(augmented(() => ({better: true}), Animal));
    type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;

    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.better).toBeDefined();
    expect(snek.better).toBe(true);
})

test('augmented (referencing mismatched module)', () => {
    const BetterCapsAnimal = variant(augmented(() => ({better: true}), CapsAnimal));
    const test = BetterCapsAnimal.cat({name: 'Test', furnitureDamaged: 0});
    
    const snek = BetterCapsAnimal.snake('steve');
    expect(snek.better).toBe(true);
    expect(snek.name).toBe('steve');
    expect(snek.type).toBe('SNAKE');
})

test('augmented (variable augment)', () => {
    const BetterAnimal = variant(augmented(
        animal => ({nameLength: animal.name.length}),
        Animal
    ));
    
    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.type).toBe('snake');
    expect(snek.nameLength).toBe(5);
})

test('augmented (conditional augment)', () => {
    const BetterAnimal = variant(augmented(
        animal => ({
            epithet: match(animal, {
                cat: ({furnitureDamaged}) => furnitureDamaged > 5 ? 'dangerous' : 'safe',
                dog: ({favoriteBall}) => favoriteBall === 'yellow' ? 'bad' : 'good',
                snake: ({pattern}) => pattern,
            })
        }),
        Animal,
    ));
    
    const snek = BetterAnimal.snake('steve');
    const pup = BetterAnimal.dog({name: 'Spot', favoriteBall: 'red'});

    expect(snek.name).toBe('steve');
    expect(snek.epithet).toBe('striped');
    expect(pup.name).toBe('Spot');
    expect(pup.epithet).toBe('good');
})

