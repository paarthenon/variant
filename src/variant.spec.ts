import {variant, variantFactory, outputTypes} from './variant';
import {payload} from './tools';
import {Animal} from './__test__/animal';

test('empty', () => {
    const func = variant('');
    const result = func();
    expect(result).toEqual({type: ''});
});

test('payload, manual', () => {
    const func = variant('payloadTest', (payload: unknown) => ({payload}));
    const result = func(4);

    expect(result).toEqual({type: 'payloadTest', payload: 4});
})

test('nice variant', () => {
    const niceVariant = variantFactory('kind');
    const func = niceVariant('TestType');
    const result = func();

    expect(result).toEqual({kind: 'TestType'});
})

test('nice variant (complex)', () => {
    const niceVariant = variantFactory('kind');
    const func = niceVariant('TestType', (testData: number) => ({testData}));
    const result = func(45);

    expect(result).toEqual({kind: 'TestType', testData: 45});
})


test('variant toString()', () => {
    const yoc = variant('yo');

    expect('' + yoc).toBe('yo');
})

test('output type', () => {
    expect(Animal.cat.type).toBe('cat');
    expect(Animal.cat.toString()).toBe('cat');
    expect(Animal.cat.key).toBe('type');
})

test('legacy output type', () => {
    expect(Animal.cat.outputType).toBe('cat');
    expect(Animal.cat.outputKey).toBe('type');
})

test('output types', () => {
    expect(outputTypes(Animal)).toEqual(['dog', 'cat', 'snake']);
})