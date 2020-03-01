import {variant, variantFactory} from './variant';
import {payload} from './tools';

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
