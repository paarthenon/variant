import {isVariantCreator, variantImpl} from './variant';
import {fields, payload} from './variant.tools';

const str = {
    discriminant: 'type',
    kerberos: 'kerberos',
} as const;
const DISCRIMINANT = 'type';
const {variation, descope} = variantImpl(DISCRIMINANT);

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


test('variation (fields, empty)', () => {
    const dog = variation('dog', fields());

    const kerberos = dog();

    expect(kerberos.type).toBe('dog');
    expect(Object.keys(kerberos).length).toBe(1);
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

    expect(yoc.output.key).toBe(DISCRIMINANT);
    expect(yoc.output.type).toBe('yo');
})

test('isVariantCreator', () => {
    const dog = variation('dog');

    expect(isVariantCreator(dog)).toBe(true);
})

test('isVariantCreator', () => {
    const dog = () => ({type: 'dog'} as const);

    expect(isVariantCreator(dog)).toBe(false);
})

test('cyclical variation', () => {
    const one = variation('one');
    const two = variation('two', one);

    const first = one();
    const second = two();
})

test('async variant', async () => {
    // from issue #3 on github
    const bla = () => 'hello';

    const TaskExtractMetadata = variation('extract_metadata', async function() {
        // do async stuff
        const stuff1 = await bla();
        return {
            stuff1
        }
    });

    const thing = await TaskExtractMetadata();

    expect(thing.type).toBe('extract_metadata');
    expect(thing.stuff1).toBe('hello');
});

test('async variation output types', async () => {
    const nonce = Promise.resolve(5);

    const AsyncTask = variation('A_TASK', async () => ({
        nonce: await nonce,
        four: 4,
    }))

    const result = AsyncTask();

    expect(AsyncTask.output.type).toBe('A_TASK');
    expect(AsyncTask.output.key).toBe('type');

    expect((result as any).four).toBeUndefined();
    expect((await result).four).toBe(4);
})


test('descope', () => {
    const scopedLabel = variation('scope/label');
    const scopedInstance = scopedLabel();

    const descopedInstance = descope(scopedInstance);

    expect(descopedInstance.type).toBe('label');
})