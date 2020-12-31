import {CompareResult, order} from './order';
import {Animal, cerberus} from './__test__/animal';

const rank = order(Animal, [
    'dog',
    'cat',
    'snake',
])

const perseus = rank.new.cat({name: 'Perseus', furnitureDamaged: 0});

test('order new obj', () => {
    expect(perseus.name).toBe('Perseus');
    expect(perseus.furnitureDamaged).toBe(0);
})

test('order compare', () => {
    expect(rank.compare(perseus, cerberus)).toBe(CompareResult.Greater);
})

test('order compare', () => {
    expect(rank.compare(Animal.cat, cerberus)).toBe(CompareResult.Greater);
})

test('order index', () => {
    expect(rank.index(cerberus)).toBe(0);
    expect(rank.index('cat')).toBe(1);
    expect(rank.index(Animal.snake)).toBe(2);
})