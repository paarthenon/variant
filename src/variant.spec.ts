import {
    variant, 
    variantFactory, 
    outputTypes, 
    augment, 
    TypeNames, 
    VariantOf, 
    narrow,
    cast,
    VariantsOfUnion, 
    KeysOf,
    keys,
    KeyMap,
    Variant,
    keymap,
    variantModule,
    variantList,
    fields,
    match,
    pass,
    typedVariant,
    isType,
    genericVariant,
    payload,
    just,
} from './index';
import {constrainedVariant, keylist, patternedVariant} from './variant';
import {Animal, cerberus} from './__test__/animal';

test('empty variant', () => {
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

test('output types', () => {
    expect(outputTypes(Animal)).toEqual(['dog', 'cat', 'snake']);
})

test('augment', () => {
    const BetterAnimal = augment(Animal, () => ({better: true}));
    type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;

    const snek = BetterAnimal.snake('steve');
    expect(snek.name).toBe('steve');
    expect(snek.better).toBeDefined();
    expect(snek.better).toBe(true);
})

test('cast', () => {
    const animal = Animal.snake('Steven') as any as Animal;

    const thing = cast(animal, 'snake');

    expect(thing.name).toBe('Steven');
    expect(thing.pattern).toBe('striped');
});

test('narrow', () => {
    const animal = Animal.snake('Steven') as any as Animal;

    const thing = narrow(animal, 'snake');

    expect(thing!.name).toBe('Steven');
    expect(thing!.pattern).toBe('striped');
});

test('cast failure', () => {
    const animal = Animal.dog({name: 'Fido'}) as any as Animal;

    const thing = cast(animal, 'snake');

    expect(thing.name).toBe('Fido');
    expect(thing.pattern).toBe(undefined);
});

test('keynum', () => {
    const aKeys = keys(Animal);

    expect(aKeys).toHaveProperty(Animal.dog.type);
    expect(aKeys).toHaveProperty('cat');
});

test('keynum values', () => {
    const aKeys = keys(Animal);

    expect(aKeys.cat).toBe('cat');
    expect(aKeys.dog).toBe('dog');
    expect(aKeys.snake).toBe('snake');
});

test('async variant', async () => {
    // from issue #3 on github
    const bla = () => 'hello';

    const TaskExtractMetadata = variant('extract_metadata', async function() {
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

test('async variant output types', async () => {
    const nonce = Promise.resolve(5);

    const AsyncTask = variant('A_TASK', async () => ({
        nonce: await nonce,
        four: 4,
    }))

    const result = AsyncTask();

    expect(AsyncTask.type).toBe('A_TASK');
    expect(AsyncTask.key).toBe('type');

    expect((result as any).four).toBeUndefined();
    expect((await result).four).toBe(4);
})

test('keymap', () => {
    const Anim = {
        dog: Animal.dog,
        kitty: Animal.cat,
    };
    type Anim<T extends TypeNames<typeof Anim> = undefined> = VariantOf<typeof Anim, T>;
    
    const thing = keymap(Anim);
    const list = keylist(Anim);
    type asdf = KeyMap<typeof Anim>;
    thing.dog;
})


test('variantModule', () => {
    const AnimClone = typedVariant<Animal>({
        cat: pass,
        dog: pass,
        snake: pass,
    })
    const Anim = variantModule({
        dog(name: string) {
            return {name};
        },
        bird: {},
    })

    Anim.bird()

})
test('YOOOOOO', () => {
    
    type Tree =
        | Variant<'node', {data: string}>
        | Variant<'branch', {left?: Tree, right?: Tree}>
    ;

    const Tree = typedVariant<
        | Variant<'node', {data: string}>
        | Variant<'branch', {left?: Tree, right?: Tree}>
    >({
        branch: pass,
        node: pass,
    });

    const x = Tree.branch({right: Tree.node({data: 'yolo'})});

    expect(x.right?.type === 'node' && x.right.data).toBe('yolo');
})

test('YOOOOOO (generic)', () => {
    type Tree<T> =
        | Variant<'node', {data: T}>
        | Variant<'branch', {left?: Tree<T>, right?: Tree<T>}>
    ;

    function getTree<T>() {
        return typedVariant<Tree<T>>({
            branch: pass,
            node: pass,
        })
    };

    const strTree = getTree<string>();
    const stringX = strTree.branch({right: strTree.node({data: 'yolo'})});

    const numTree = getTree<number>();
    const numX = numTree.branch({right: numTree.node({data: 34})});

    expect(stringX.right?.type === 'node' && stringX.right.data).toBe('yolo');
    expect(numX.right?.type === 'node' && numX.right.data).toBe(34);
});


test('issue #2', () => {
    type Employee = unknown;

    type Fetched<T> =
        | Variant<'fetching', {progress: number, previousData?: T}>
        | Variant<'fetched', {data: T}>
        | Variant<'error', {error: string}>
    ;

    const getFetched = <T>() => typedVariant<Fetched<T>>({
        fetching: pass,
        fetched: pass,
        error: pass,
    });

    const FetchedAnimal = getFetched<Animal>();
    const FetchedEmployee = getFetched<Employee>();

    function showFetchedStatus<T>(fetched: Fetched<T>) {
        return match(fetched, {
            fetching: ({progress}) => `fetching ${progress}%`,
            fetched: () => 'fetched',
            error: ({error}) => `fetch error ${error}`,
        })
    }

    expect(showFetchedStatus(FetchedEmployee.fetching({progress: 50}))).toBe('fetching 50%');
    expect(showFetchedStatus(FetchedAnimal.fetching({progress: 10}))).toBe('fetching 10%');
})

test('better variantList', () => {
    const Animal = variantList([
        variant('dog', fields<{name: string}>()),
        'bird',
    ]);

    expect(Animal.bird().type).toBe('bird');
});

test('card variantList', () => {
    const Suit = variantList(['Diamonds', 'Hearts', 'Spades', 'Clubs']);

    expect(Suit.Clubs().type).toBe('Clubs');
})

test('Animal filter', () => {
    const animals = [cerberus, Animal.snake('Steve')];

    const result = animals.filter(isType(Animal.dog));
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Cerberus');
})


test('IsType 0', () => {
    const kitty = Animal.cat({name: 'Yannis', furnitureDamaged: 0}) as Animal;

    const isCat = isType(kitty, 'cat');
    const isDog = isType(kitty, 'dog');
    expect(isCat).toBe(true);
    expect(isDog).toBe(false);
});

test('IsType UDTG', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'});

    if (isType(kerb, 'dog')) {
        expect(kerb.favoriteBall).toBe('yellow');
    } else {
        fail('isType did not register kerb as a dog');
    }
});

test('IsType UDTG (func)', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'});

    if (isType(kerb, Animal.dog)) {
        expect(kerb.favoriteBall).toBe('yellow');
    } else {
        fail('isType did not register kerb as a dog');
    }
});

test('IsType UDTG wrong', () => {
    const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'}) as Animal;

    if (isType(kerb, Animal.snake)) {
        fail('isType did not register kerb as a dog');
    } else {
        expect(kerb.type).toBe('dog');
    }
})

test('Generic 1', () => {
    type Tree<T> =
        | Variant<'Branch', {left: Tree<T>, right: Tree<T>}>
        | Variant<'Leaf', {payload: T}>
    ;

    const Tree = genericVariant(({A}) => ({
        Branch: fields<{left: Tree<typeof A>, right: Tree<typeof A>}>(),
        Leaf: payload(A),
    }));

    const leaf = Tree.Leaf(4);

    expect(leaf.payload).toBe(4);
})

test('Generic error', () => {
    type Tree<T> =
        | Variant<'Branch', {left: Tree<T>, right: Tree<T>}>
        | Variant<'Leaf', {payload: T}>
    ;

    const Tree = genericVariant(({T}) => ({
        Branch: fields<{left: Tree<typeof T>, right: Tree<typeof T>}>(),
        Leaf: payload(T),
    }));

    const branch = Tree.Branch({
        left: Tree.Leaf('Yo'),
        //@ts-expect-error
        right: Tree.Branch({
            left: Tree.Leaf(4),
            right: Tree.Leaf(5),
        })
    });
})

test('Generic (maybe)', () => {
    const Maybe = genericVariant(({T}) => ({
        Some: payload(T),
        None: {},
    }));
    const somenum = Maybe.Some(4);
    expect(somenum.payload).toBe(4);
})


test('constrained', () => {
    const Test1 = constrainedVariant((_x: string) => ({min: 4}), {
        Yo: (_x: string, min: number) => ({min}),
    });
    type Test1<T extends TypeNames<typeof Test1> = undefined> = VariantOf<typeof Test1, T>;

    const instance = Test1.Yo('hello', 4);

    expect(instance.type).toBe('Yo');
    expect(instance.min).toBe(4);
})

test('constrained 2', () => {
    enum HairLength {
        Bald,
        Buzzed,
        Short,
        Medium,
        Long,
        BackLength,
    }

    const HairStyle = constrainedVariant(just<{min?: HairLength, max?: HairLength}>({}), {
        Bald: just({max: HairLength.Bald}),
        Pixie: just({min: HairLength.Short, max: HairLength.Medium}),
        Straight: just({min: HairLength.Short}),
        Waves: just({min: HairLength.Medium}),
    });
    type HairStyle<T extends TypeNames<typeof HairStyle> = undefined> = VariantOf<typeof HairStyle, T>;

    const baldie = HairStyle.Bald() as HairStyle;

    expect(baldie.max).toBe(HairLength.Bald);
});


// test('scoped', () => {
//     const Animal2 = scopedVariant('Animal', {
//         Cat: fields<{name: string}>(),
//         Dog: fields<{name: string, toy?: string}>(),
//     });
//     type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

//     const rating = (animal: Animal2) => match(animal, {
//         [Animal2.Cat.type]: c => c.name,
//         default: just('yo'),
//     })

//     expect(rating(Animal2.Cat({name: 'steve'}))).toBe('steve');
// });

// test('scopedMatch')