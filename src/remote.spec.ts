import {remote, sequence} from './index.onType';
import {just} from './match.tools';
import {CompareResult} from './remote';
import {Animal, sample} from './__test__/animal';

const $Animal = remote(Animal);

test('remote', () => {
    expect($Animal.is.cat(sample.cerberus)).toBeFalsy();
    expect($Animal.is.dog(sample.cerberus)).toBeTruthy();
});

test('remote is narrows', () => {
    const a = sample.cerberus as Animal;
    if ($Animal.is.cat(a)) {
        const result = a.furnitureDamaged;
        // this object doesn't have this type, but I can access it. Narrowing works.
        expect(result).toBeUndefined();
    } else {
        const result = a.name;
        expect(result).toBe('Cerberus');
    }
})


test('remote match', () => {
    const test = (animal: Animal) => $Animal.match(animal, {
        cat: just(4),
        dog: just(5),
        snake: just('jo'),
    });

    const result = test(sample.cerberus);

    expect(result).toBe(5);
})

const rank = sequence(Animal, [
    'dog',
    'cat',
    Animal.snake,
])

const perseus = rank.new.cat({name: 'Perseus', furnitureDamaged: 0});

test('order new obj', () => {
    expect(perseus.name).toBe('Perseus');
    expect(perseus.furnitureDamaged).toBe(0);
})

test('order compare', () => {
    expect(rank.compare(perseus, sample.cerberus)).toBe(CompareResult.Greater);
})

test('order compare', () => {
    expect(rank.compare(Animal.cat, sample.cerberus)).toBe(CompareResult.Greater);
})

test('order index', () => {
    expect(rank.index(sample.cerberus)).toBe(0);
    expect(rank.index('cat')).toBe(1);
    expect(rank.index(Animal.snake)).toBe(2);
})

test('get', () => {
    expect(rank.get(0).type).toBe('dog');
    expect(rank.types[0]).toBe('dog');
})