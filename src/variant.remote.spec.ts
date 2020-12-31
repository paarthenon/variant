import {remote} from '.';
import {just} from './match';
import {Animal, cerberus} from './__test__/animal'

const $Animal = remote(Animal);

test('remote', () => {
    expect($Animal.is.cat(cerberus)).toBeFalsy();
    expect($Animal.is.dog(cerberus)).toBeTruthy();
});

test('remote is narrows', () => {
    const a = cerberus as Animal;
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
    const result = $Animal.match(cerberus, {
        cat: just(4),
        dog: just(5),
        snake: just('jo'),
    })
})