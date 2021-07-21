import {fields, match, TypeNames, variant, VariantOf} from '.';
import {augment} from './augment';
import {payload} from './variant.tools';
import {Animal, CapsAnimal} from './__test__/animal';

test('augment (inline)', () => {
    const BetterAnimal = variant(augment({
        dog: fields<{name: string, favoriteBall?: string}>(),
        cat: fields<{name: string, furnitureDamaged: number}>(),
        snake: (name: string, pattern = 'striped') => ({name, pattern}),
    }, () => ({better: 4})));
    type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;


    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.better).toBeDefined();
    expect(snek.better).toBe(4);
})

test('augment (timestamp)', () => {
    const Action = variant(augment(
        {
            DoSomething: {},
            LoadThing: fields<{thingId: number}>(),
            RefreshPage: {},
        },
        () => ({timestamp: Date.now()}),
    ));
    type Action = VariantOf<typeof Action>;

    const loadAction = Action.LoadThing({thingId: 12});
})

test('augment (referencing pre-existing module)', () => {
    const BetterAnimal = variant(augment(Animal, () => ({better: true})));
    type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;

    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.better).toBeDefined();
    expect(snek.better).toBe(true);
})

test('augment (referencing mismatched module)', () => {
    const BetterCapsAnimal = variant(augment(CapsAnimal, () => ({better: true})));
    const test = BetterCapsAnimal.cat({name: 'Test', furnitureDamaged: 0});
    
    const snek = BetterCapsAnimal.snake('steve');
    expect(snek.better).toBe(true);
    expect(snek.name).toBe('steve');
    expect(snek.type).toBe('SNAKE');
})

test('augment (variable augment)', () => {
    const BetterAnimal = variant(augment(Animal, ({name}) => ({nameLength: name.length})));
    
    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.type).toBe('snake');
    expect(snek.nameLength).toBe(5);
})

test('augment (conditional augment)', () => {
    const BetterAnimal = variant(augment(
        Animal,
        animal => ({
            epithet: match(animal, {
                cat: ({furnitureDamaged}) => furnitureDamaged > 5 ? 'dangerous' : 'safe',
                dog: ({favoriteBall}) => favoriteBall === 'yellow' ? 'bad' : 'good',
                snake: ({pattern}) => pattern,
            })
        }),
    ));
    
    const snek = BetterAnimal.snake('steve');
    const pup = BetterAnimal.dog({name: 'Spot', favoriteBall: 'red'});

    expect(snek.name).toBe('steve');
    expect(snek.epithet).toBe('striped');
    expect(pup.name).toBe('Spot');
    expect(pup.epithet).toBe('good');
})

test('augment (conditional augment, inline match)', () => {
    const BetterAnimal = variant(augment(
        Animal,
        animal => ({
            epithet: match(animal, {
                cat: ({furnitureDamaged}) => furnitureDamaged > 5 ? 'dangerous' : 'safe',
                dog: ({favoriteBall}) => favoriteBall === 'yellow' ? 'bad' : 'good',
                snake: ({pattern}) => pattern,
            })
        }),
    ));
    
    const snek = BetterAnimal.snake('steve');
    const pup = BetterAnimal.dog({name: 'Spot', favoriteBall: 'red'});

    expect(snek.name).toBe('steve');
    expect(snek.epithet).toBe('striped');
    expect(pup.name).toBe('Spot');
    expect(pup.epithet).toBe('good');
})

