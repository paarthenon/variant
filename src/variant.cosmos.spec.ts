import {variantCosmos} from './cosmos';
import {Matrix} from './flags';
import {constant, just} from './match.tools';
import {GetTypeLabel, TypeNames, VariantOf} from './precepts';
import {fields, payload} from './variant.tools';

const {isType, match, otherwise, ofLiteral, partial, variantList, variation, variant} = variantCosmos({key: 'tag'});

const Animal = variant({
    cat: fields<{
        name: string;
        furnitureDamaged: number,
    }>(),
    dog: fields<{
        name: string;
        favoriteBall?: string;
    }>(),
    snake: (name: string, pattern: string = 'striped') => ({
        name,
        pattern,
    }),
})
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;

test('', () => {
    const thing = variant({
        cat: {},
    })
    const thing2 = variant([
        'reddit',
        variation('yoho', payload<number>()),
    ])
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
        expect(kerb.tag).toBe('dog');
    }
})

function id<T>(x: T): T {
    return x;
}

test('match', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'}) as Animal;
});

test('match 2', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'}) as Animal;

    const kt = kerb.tag;

    const thing = match(kerb, otherwise({
        cat: ({name, furnitureDamaged}) => {
            return name + furnitureDamaged;
        },
        dog() {
            return undefined;
        }
    }, _ => {
        return 5;
    }))

    const otherTest = match(ofLiteral(kerb.tag), partial({
        cat: ({tag}) => tag,
        default: constant(6),
    }))

})

test('', () => {
    type ajfak = GetTypeLabel<typeof Animal, 'dog'>;
    type asdf = ajfak[keyof ajfak];

    type Animatrix = Matrix<typeof Animal>;

});


test('documentation test', () => {
    const {variant} = variantCosmos({key: 'tag'});

    const Test = variant({
        /**
         * T-One
         */
        One: {},
        /**
         * Tea-2
         */
        Two: /**
        test
        */ fields</**A*/ {
            /**
             * Test
             */
            a: number
        }>(),
    });
    type Test<T extends TypeNames<typeof Test> = undefined> = VariantOf<typeof Test, T>;

    Test.One()
    Test.Two({a: 5,})

    type typenames = TypeNames<typeof Test>;
    type sheisa = Test<'Two'>;
})

test('variant list', () => {
    const Ani = variantList([
        'a',
        variation('b', () => ({timestamp: Date.now()})),
    ]);
    type Ani<T extends TypeNames<typeof Ani> = undefined> = VariantOf<typeof Ani, T>;

    const thing = Ani.a();
    const thing2 = Ani.b();

    expect(thing2.timestamp).toBeGreaterThan(0);
})