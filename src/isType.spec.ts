import {isType} from './type';
import {Animal, sample} from './__test__/animal';


test('isType (curried)', () => {
    const isDog = isType('dog');
    expect(isDog(sample.cerberus)).toBe(true);
})
test('isType (curried)', () => {
    const isDog = isType(Animal.dog);
    expect(isDog(sample.cerberus)).toBe(true);
})

test('Animal filter', () => {
    const animals = [sample.cerberus, Animal.snake('Steve')];

    const result = animals.filter(isType(Animal.dog));
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Cerberus');
})

test('IsType 0', () => {
    const kitty = Animal.cat({name: 'Yannis', furnitureDamaged: 0}) as Animal;

    const isCat = isType(kitty, 'cat');
    const isDog = isType(kitty, 'dog');
    expect(isCat).toBe(true);
    expect(isDog).toBe(false);
});

test('IsType UDTG', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'});

    if (isType(kerb, 'dog')) {
        expect(kerb.favoriteBall).toBe('yellow');
    } else {
        fail('isType did not register kerb as a dog');
    }
});

test('IsType UDTG (func)', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'});

    if (isType(kerb, Animal.dog)) {
        expect(kerb.favoriteBall).toBe('yellow');
    } else {
        fail('isType did not register kerb as a dog');
    }
});

test('IsType UDTG wrong', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'}) as Animal;

    if (isType(kerb, Animal.snake)) {
        fail('isType did not register kerb as a dog');
    } else {
        expect(kerb.type).toBe('dog');
    }
})
