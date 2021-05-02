import {Generify, GP, Alpha, onTerms, GVariantOf, GenericVariantTypeSpread} from './generic';
import {TypeNames, variant, VariantOf} from './index';
import {payload} from './variant.tools';

test('generic 1', () => {
    const Option = variant({
        Some: payload(Alpha.T),
        None: {},
    });




    const Opt2 = variant(onTerms(({T}) => {
        return {
            /**
             * let's go
             */
            Some: payload(T),
            None: {},
        }
    }))
    type blah = GenericVariantTypeSpread<typeof Opt2>;
    type blah2 = GenericVariantTypeSpread<typeof Opt2>[keyof typeof Opt2];
    type asf = TypeNames<typeof Opt2>;
    type Opt2<T, TType extends TypeNames<typeof Opt2> = undefined> = GVariantOf<typeof Opt2, TType, {T: T}>;

    type asdf = Opt2<{n: 5}>;
    // type Matcher<T, TType extends GTypeNames<typeof __Matcher> = undefined> = GVariantOf<typeof __Matcher, TType, { T: T }>

    const a = Opt2.None();
    let b = Opt2.Some(5);
    const c = Opt2.Some('hello');
    // b = c;

    const templ = onTerms(({T}) => {
        return {
            /**
             * let's go
             */
            Some: payload(T),
            None: {},
        }
    })


})


// TODO: Integrate a type testing library.

test('Generify 1', () => {
    type T = Alpha['A'];

    const _ = {nonce: 5};
    type _ = typeof _;
    type RESULT = Generify<T, {A: _}>;

    type EXPECT = RESULT extends _ ? true : false;
})


test('Generify (array)', () => {
    type T = [string, number, Alpha['A']];

    const _ = {nonce: 5} as const;
    type _ = typeof _;
    type RESULT = Generify<T, {A: _}>;

    type EXPECT = RESULT extends [string, number, _] ? true : false;
})


test('Generify (function)', () => {
    type T = (input: Alpha['A']) => typeof input;

    const _ = {nonce: 5} as const;
    type _ = typeof _;
    type RESULT = Generify<T, {A: _}>;

    type EXPECT = RESULT extends (input: _) => _ ? true : false;
})

test('Generify (higher order function)', () => {
    type T = (func: (input: Alpha['A']) => typeof input) => true;

    const _ = {nonce: 5} as const;
    type _ = typeof _;
    type RESULT = Generify<T, {A: _}>;

    type EXPECT = RESULT extends ((func: (input: _) => _) => true) ? true : false;
})

test('Generify (github #13)', () => {
    type T = (payload: (input: Alpha['A']) => boolean) => ({payload: typeof payload});

    const _ = {nonce: 5} as const;
    type _ = typeof _;
    type RESULT = Generify<T, {A: _}>;

    type EXPECT = RESULT extends ((payload: (input: _) => boolean) => ({payload: typeof payload})) ? true : false;
})

