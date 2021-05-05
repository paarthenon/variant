import {keymap, keynum} from './keynum';
import {CapsAnimal} from './__test__/animal';

test('keymap match', () => {
    const km = keynum(CapsAnimal);

    expect(km.CAT).toBe('CAT');
    expect(km.DOG).toBe('DOG');
    expect(km.SNAKE).toBe('SNAKE');
})

test('keymap match', () => {
    const km = keymap(CapsAnimal);

    expect(km.cat).toBe('CAT');
    expect(km.dog).toBe('DOG');
    expect(km.snake).toBe('SNAKE');
})

test('keymap object instance', () => {
    const cat = CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}) as CapsAnimal;
    const km = keymap(CapsAnimal);
    
    expect(cat.type).toBe(km.cat);
})