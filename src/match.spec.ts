import {fields, match, matcher, scopedVariant, TypeNames, VariantOf, variation} from '.';
import {keymap} from './keynum';
import {just} from './match.tools';
import {Animal, CapsAnimal, sample} from './__test__/animal';

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
    
    const _ = keymap(CapsAnimal);
    
    const result = match(catInstance, {
        [_.cat]: just(5),
        [_.dog]: just(4),
        [_.snake]: just(3),
    });

    expect(result).toBe(5);
})

test('caps animal, keymap (destructured)', () => {
    const catInstance = CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}) as CapsAnimal;
    
    const {cat, dog, snake} = keymap(CapsAnimal);
    
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