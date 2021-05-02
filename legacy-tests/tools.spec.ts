// import {variant} from './variant';
// import {payload, fields} from './tools'

// test('payload variant', () => {
//     const func = variant('MsgWrapper', payload<string>());
//     const result = func('hello');

//     expect(result).toEqual({type: 'MsgWrapper', payload: 'hello'});
// });

// test('fields variant (empty)', () => {
//     const type = 'EmptyFields';
//     const func = variant(type, fields());
    
//     expect(func({})).toEqual({type})
// })

// test('Fields variant (non-empty)', () => {
//     const type = 'Fields';
//     const func = variant(type, fields<{name: string}>());

//     const name = 'Steve';
//     expect(func({name})).toEqual({type, name});
// });

test('', () => {})