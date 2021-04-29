import {scopeType, variantImpl} from './variant';
import {fields, payload} from './variant.tools';

const str = {
    discriminant: 'type',
    kerberos: 'kerberos',
} as const;
const DISCRIMINANT = 'type';
const {variation} = variantImpl(DISCRIMINANT);

/**
 * Begin tests.
 */

test('variation (string only)', () => {
    const dog = variation('dog');

    const kerberos = dog();

    expect(kerberos.type).toBe('dog');
    expect(Object.keys(kerberos).length).toBe(1);
})

test('variation (custom func, 0 param)', () => {
    const dog = variation('dog', () => ({name: str.kerberos}));

    const kerberos = dog();

    expect(kerberos.type).toBe('dog');
    expect(kerberos.name).toBe(str.kerberos);
})

test('variation (custom func, 1 param)', () => {
    const dog = variation('dog', (name: string) => ({name}));

    const kerberos = dog('kerberos');

    expect(kerberos).toBeDefined();
    expect(kerberos.type).toBe('dog');
    expect(kerberos.name).toBe('kerberos');
})

test('variation (payload)', () => {
    const dog = variation('dog', payload<string>());
    const kerberos = dog('kerberos');

    expect(kerberos).toBeDefined();
    expect(kerberos.type).toBe('dog');
    expect(kerberos.payload).toBe('kerberos');
})

test('variation (fields)', () => {
    const dog = variation('dog', fields<{
        name: string;
        favoriteBall?: string;
    }>());

    const kerberos = dog({
        name: 'kerberos',
        favoriteBall: 'yellow',
    });
    expect(kerberos.name).toBe('kerberos');
    expect(kerberos.favoriteBall).toBe('yellow');
})


test('variation .toString()', () => {
    const yoc = variation('yo');

    expect('' + yoc).toBe('yo');
    expect(yoc.toString()).toBe('yo');
})

test('variation .name', () => {
    const yoc = variation('yo');

    expect(yoc.name).toBe('yo');
})

test('variation outputs', () => {
    const yoc = variation('yo');

    expect(yoc.key).toBe(DISCRIMINANT);
    expect(yoc.type).toBe('yo');
})
