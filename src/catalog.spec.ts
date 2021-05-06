import {catalog} from './catalog';

test('strEnum functionality', () => {
    const Suit = catalog([
        'Spades',
        'Hearts',
        'Clubs',
        'Diamonds',
    ]);
    type Suit = keyof typeof Suit;

    expect(Object.values(Suit).length).toBe(4);
    expect('Spades' in Suit).toBe(true);
    expect('Hearts' in Suit).toBe(true);
    expect('Clubs' in Suit).toBe(true);
    expect('Diamonds' in Suit).toBe(true);
    expect(Suit.Spades).toBe('Spades');
})

test('strEnum (empty)', () => {
    const Item = catalog([]);
    type Item = keyof typeof Item;

    expect(Item).toEqual({});
})

test('catalog - count items', () => {
    const Count = catalog([
        'One',
        'Two',
        'Three',
    ], (_, i) => i + 1);

    expect(Count.One).toBe(1);
    expect(Count.Two).toBe(2);
    expect(Count.Three).toBe(3);
});

test('capitalize', () => {
    // this isn't actually good, because each item is a union, but whatever. 
    const primitive = catalog([
        'boolean',
        'number',
        'string',
    ], (s) => s.toUpperCase() as Uppercase<typeof s>);

    expect(primitive.boolean).toBe('BOOLEAN');
    expect(primitive.number).toBe('NUMBER');
})

test('catalog - object literal', () => {
    const Custom = catalog({
        name: 'Steve',
        four: 'Four',
    } as const)

    expect(Custom.four).toBe('Four');
})