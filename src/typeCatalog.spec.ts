import {variant, fields} from '.';
import {Flags} from './flags';
import {typeMap, typeCatalog} from './typeCatalog';
import {CapsAnimal} from './__test__/animal';

test('typeCatalog', () => {
    const km = typeCatalog(CapsAnimal);

    expect(km.CAT).toBe('CAT');
    expect(km.DOG).toBe('DOG');
    expect(km.SNAKE).toBe('SNAKE');
})

test('keymap match', () => {
    const km = typeMap(CapsAnimal);

    expect(km.cat).toBe('CAT');
    expect(km.dog).toBe('DOG');
    expect(km.snake).toBe('SNAKE');
})

test('keymap object instance', () => {
    const cat = CapsAnimal.cat({name: 'Steve', furnitureDamaged: 0}) as CapsAnimal;
    const km = typeMap(CapsAnimal);
    
    expect(cat.type).toBe(km.cat);
})


test('asdf', () => {
    enum PriorityLevel {
        Low,
        Medium,
        High,
    }
    const Attribute = variant({
        dueDate: fields<{timestamp: number}>(),
        priority: fields<{level: PriorityLevel}>(),
        reminder: fields<{message?: string, timestamp: number}>(),
    });

    type Attributes = Flags<typeof Attribute>;
    
})