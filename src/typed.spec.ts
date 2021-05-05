import {pass, variant, Variant, typed, TypeNames, VariantOf, match} from '.'
import {Animal} from './__test__/animal';

test('typed (basic)', () => {
    type Option =
        | Variant<'Some', {payload: any}>
        | Variant<'None'>
    ;
    const Option = variant(typed<Option>({
         Some: pass,
         None: pass,
    }))

    const four = Option.Some({payload: 4});
    const none = Option.None();
    
    expect(four.payload).toBe(4);
    expect(none.type).toBe('None');
})

test('typed (basic)', () => {
    type Option =
        | Variant<'Some', {payload: any}>
        | Variant<'None'>
    ;
    const Option = variant(typed<Option>(_ => ({
         Some: _,
         None: _,
    })))

    const four = Option.Some({payload: 4});
    const none = Option.None();

    expect(four.payload).toBe(4);
    expect(none.type).toBe('None');
})

test('variantModuleTyped match', () => {
    const AnimClone = variant(typed<Animal>({
        dog: pass,
        cat: pass,
        snake: pass,
    }))
    type AnimClone<T extends TypeNames<typeof AnimClone> = undefined> = VariantOf<typeof AnimClone, T>;

    const dog = AnimClone.dog({name: 'Twix'});

    const getName = (a: AnimClone) => match(a, {
        cat: c => c.name,
        dog: d => d.name,
        snake: s => s.name,
    });
    const betterGetName = (a: AnimClone) => a.name;

    expect(dog.name).toBe('Twix');
    expect(dog.favoriteBall).toBeUndefined();

    expect(getName(dog)).toBe('Twix');
    expect(betterGetName(dog)).toBe('Twix');
})