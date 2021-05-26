import {variation} from './index.onType';
import {fields} from './variant.tools';

test('fields empty', () => {
    const testV = variation('test', fields<{test?: 5}>());

    const emptyUse = testV();
    const emptyObjectUse = testV({});
    const validUse = testV({test: 5});

    expect(emptyUse).toEqual({type: 'test'});
    expect(emptyObjectUse).toEqual({type: 'test'});
    expect(validUse).toEqual({type: 'test', test: 5});
})

