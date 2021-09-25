import {isOfVariant, match} from '.';
import {just} from './match.tools';
import {partial} from './type';
import {Animal} from './__test__/animal';

test('isOfVariant', () => {
    const kitty = Animal.cat({name: 'Perseus', furnitureDamaged: 0}) as {};

    let flag = false;
    if (isOfVariant(kitty, Animal)) {
        // should work because 'name' is available on all elements of the union Animal.
        const _name = kitty.name;
        flag = match(kitty, partial({
            cat: just(true),
            default: just(false),
        }))
    }

    expect(flag).toBe(true);
})

test('isOfVariant ({})', () => {
    expect(isOfVariant({}, Animal)).toBe(false);
})