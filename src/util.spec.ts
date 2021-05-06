import {identityFunc, isPromise} from './util';

test('identity func', () => {
    expect(identityFunc(4)).toBe(4);
    expect(identityFunc({})).toEqual({});
    expect(identityFunc('str')).toBe('str');
})

test('isPromise (positive)', () => {
    const test = Promise.resolve(4);

    expect(isPromise(test)).toBe(true);
});


test('isPromise (positive)', () => {
    const test = {};

    expect(isPromise(test)).toBe(false);
});