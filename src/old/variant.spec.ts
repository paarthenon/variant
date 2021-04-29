// import {
//     variant, 
//     variantFactory, 
//     augment, 
//     TypeNames, 
//     VariantOf, 
//     narrow,
//     cast,
//     VariantsOfUnion, 
//     KeysOf,
//     keys,
//     KeyMap,
//     Variant,
//     keymap,
//     variantModule,
//     variantList,
//     fields,
//     match,
//     pass,
//     typedVariant,
//     isType,
//     genericVariant,
//     payload,
//     just,
//     GTypeNames,
//     GVariantOf,
//     unpack,
// } from './index';
// import {ExactDefinition, typed, typedWithKey} from './loose';
// import {Identity} from './util';
// import {augmented, constrained, flags, patterned, types} from './variant';
// import {Animal, cerberus} from './__test__/animal';


// test('nice variant (complex)', () => {
//     const niceVariant = variantFactory('kind');
//     const func = niceVariant('TestType', (testData: number) => ({testData}));
//     const result = func(45);

//     expect(result).toEqual({kind: 'TestType', testData: 45});
// })


// test('augment', () => {
//     const BetterAnimal = augment(Animal, () => ({better: true}));
//     type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;

//     const snek = BetterAnimal.snake('steve');
//     expect(snek.name).toBe('steve');
//     expect(snek.better).toBeDefined();
//     expect(snek.better).toBe(true);
// })

// test('augmented', () => {
//     const BetterAnimal = variantModule(augmented(() => ({better: 4}),{
//         dog: fields<{name: string, favoriteBall?: string}>(),
//         cat: fields<{name: string, furnitureDamaged: number}>(),
//         snake: (name: string, pattern = 'striped') => ({name, pattern}),
//     }));
//     type BetterAnimal<T extends TypeNames<typeof BetterAnimal> = undefined> = VariantOf<typeof BetterAnimal, T>;


//     const snek = BetterAnimal.snake('steve');
//     expect(snek.name).toBe('steve');
//     expect(snek.better).toBeDefined();
//     expect(snek.better).toBe(4);
// })


// test('keynum', () => {
//     const aKeys = keys(Animal);

//     expect(aKeys).toHaveProperty(Animal.dog.type);
//     expect(aKeys).toHaveProperty('cat');
// });

// test('keynum values', () => {
//     const aKeys = keys(Animal);

//     expect(aKeys.cat).toBe('cat');
//     expect(aKeys.dog).toBe('dog');
//     expect(aKeys.snake).toBe('snake');
// });

// test('async variant', async () => {
//     // from issue #3 on github
//     const bla = () => 'hello';

//     const TaskExtractMetadata = variant('extract_metadata', async function() {
//         // do async stuff
//         const stuff1 = await bla();
//         return {
//             stuff1
//         }
//     });

//     const thing = await TaskExtractMetadata();

//     expect(thing.type).toBe('extract_metadata');
//     expect(thing.stuff1).toBe('hello');
// });

// test('', () => {
//     const Anim2 = variantModule({
//         dog(name: string) {
//             return {
//                 name,
//             }
//         },
//         frog(name: string, color: string) {
//             return {
//                 name,
//                 color,
//             }
//         },
//     })
// })

// test('async variant output types', async () => {
//     const nonce = Promise.resolve(5);

//     const AsyncTask = variant('A_TASK', async () => ({
//         nonce: await nonce,
//         four: 4,
//     }))

//     const result = AsyncTask();

//     expect(AsyncTask.type).toBe('A_TASK');
//     expect(AsyncTask.key).toBe('type');

//     expect((result as any).four).toBeUndefined();
//     expect((await result).four).toBe(4);
// })

// test('keymap', () => {
//     const Anim = {
//         dog: Animal.dog,
//         kitty: Animal.cat,
//     };
//     type Anim<T extends TypeNames<typeof Anim> = undefined> = VariantOf<typeof Anim, T>;
    
//     const thing = keymap(Anim);
//     type asdf = KeyMap<typeof Anim>;
//     thing.dog;
// })


// test('variantModule', () => {
//     const AnimClone = typedVariant<Animal>({
//         cat: pass,
//         dog: pass,
//         snake: pass,
//     })
//     const Anim = variantModule({
//         dog(name: string) {
//             return {name};
//         },
//         bird: {},
//     })

//     Anim.bird()

// });

// test('variantModuleTyped', () => {
//     const AnimClone = variantModule(typed<Animal>({
//         dog: pass,
//         cat: pass,
//         snake: pass,
//     }))
//     type AnimClone<T extends TypeNames<typeof AnimClone> = undefined> = VariantOf<typeof AnimClone, T>;

//     const dog = AnimClone.dog({name: 'Twix'});

//     expect(dog.name).toBe('Twix');
//     expect(dog.favoriteBall).toBeUndefined();

// })

// test('variantModuleTyped match', () => {
//     const AnimClone = variantModule(typed<Animal>({
//         dog: pass,
//         cat: pass,
//         snake: pass,
//     }))
//     type AnimClone<T extends TypeNames<typeof AnimClone> = undefined> = VariantOf<typeof AnimClone, T>;

//     const dog = AnimClone.dog({name: 'Twix'});

//     const getName = (a: AnimClone) => match(a, {
//         cat: c => c.name,
//         dog: d => d.name,
//         snake: s => s.name,
//     });
//     const betterGetName = (a: AnimClone) => a.name;

//     expect(dog.name).toBe('Twix');
//     expect(dog.favoriteBall).toBeUndefined();

//     expect(getName(dog)).toBe('Twix');
//     expect(betterGetName(dog)).toBe('Twix');

// })
// test('YOOOOOO', () => {
    
//     type Tree =
//         | Variant<'node', {data: string}>
//         | Variant<'branch', {left?: Tree, right?: Tree}>
//     ;

//     const Tree = typedVariant<
//         | Variant<'node', {data: string}>
//         | Variant<'branch', {left?: Tree, right?: Tree}>
//     >({
//         branch: pass,
//         node: pass,
//     });

//     const x = Tree.branch({right: Tree.node({data: 'yolo'})});

//     expect(x.right?.type === 'node' && x.right.data).toBe('yolo');
// })

// test('New Generics', () => {
    
//     const [Tree, __Tree] = genericVariant(({T}) => {
//         type Tree<T> =
//             | Variant<'Branch', {payload: T, left: Tree<T>, right: Tree<T>}>
//             | Variant<'Leaf', {payload: T}>
//         ;
//         return {
//             Branch: fields<{left: Tree<typeof T>, right: Tree<typeof T>, payload: typeof T}>(),
//             Leaf: payload(T),
//         }
//     });
//     type Tree<T, TType extends GTypeNames<typeof __Tree> = undefined> 
//         = GVariantOf<typeof __Tree, TType, {T: T}>;


//     const binTree = Tree.Branch({
//         payload: 1,
//         left: Tree.Branch({
//             payload: 2,
//             left: Tree.Leaf(4),
//             right: Tree.Leaf(5),
//         }),
//         right: Tree.Leaf(3),
//     })

//     function depthFirst<T>(node: Tree<T>): T[] {
//         return match(node, {
//             Leaf: ({payload}) => [payload],
//             Branch: ({payload, left, right}) => {
//                 return [payload, ...depthFirst(left), ...depthFirst(right)];
//             }
//         })
//     }

//     const [d1, d2, d3, d4, d5] = depthFirst(binTree);
//     expect(d1).toBe(1);
//     expect(d2).toBe(2);
//     expect(d3).toBe(4);
//     expect(d4).toBe(5);
//     expect(d5).toBe(3);
// })

// test('New Generics (Option)', () => {
//     const [Option, __Option] = genericVariant(({T}) => ({
//         Some: payload(T),
//         None: {},
//     }));
//     type Option<T, TType extends GTypeNames<typeof __Option> = undefined>
//         = GVariantOf<typeof __Option, TType, {T: T}>;

//     const num = Option.Some(4);
//     const name = Option.Some('Steve');

//     // Option<T> -> T | undefined
//     function extract<T>(opt: Option<T>) {
//         return match(opt, {
//             Some: unpack,
//             None: just(undefined),
//         });
//     }
//     expect(num.payload).toBe(4);
//     expect(extract(num)).toBe(4);
//     expect(extract(name)).toBe('Steve');
//     expect(extract(Option.None())).toBeUndefined();
// })

// test('YOOOOOO (generic)', () => {
//     type Tree<T> =
//         | Variant<'node', {data: T}>
//         | Variant<'branch', {left?: Tree<T>, right?: Tree<T>}>
//     ;

//     function getTree<T>() {
//         return typedVariant<Tree<T>>({
//             branch: pass,
//             node: pass,
//         })
//     };

//     const strTree = getTree<string>();
//     const stringX = strTree.branch({right: strTree.node({data: 'yolo'})});

//     const numTree = getTree<number>();
//     const numX = numTree.branch({right: numTree.node({data: 34})});

//     expect(stringX.right?.type === 'node' && stringX.right.data).toBe('yolo');
//     expect(numX.right?.type === 'node' && numX.right.data).toBe(34);
// });


// test('issue #2', () => {
//     type Employee = unknown;

//     type Fetched<T> =
//         | Variant<'fetching', {progress: number, previousData?: T}>
//         | Variant<'fetched', {data: T}>
//         | Variant<'error', {error: string}>
//     ;

//     const getFetched = <T>() => typedVariant<Fetched<T>>({
//         fetching: pass,
//         fetched: pass,
//         error: pass,
//     });

//     const FetchedAnimal = getFetched<Animal>();
//     const FetchedEmployee = getFetched<Employee>();

//     function showFetchedStatus<T>(fetched: Fetched<T>) {
//         return match(fetched, {
//             fetching: ({progress}) => `fetching ${progress}%`,
//             fetched: () => 'fetched',
//             error: ({error}) => `fetch error ${error}`,
//         })
//     }

//     expect(showFetchedStatus(FetchedEmployee.fetching({progress: 50}))).toBe('fetching 50%');
//     expect(showFetchedStatus(FetchedAnimal.fetching({progress: 10}))).toBe('fetching 10%');
// })

// test('better variantList', () => {
//     const Animal = variantList([
//         variant('dog', fields<{name: string}>()),
//         'bird',
//     ]);

//     expect(Animal.bird().type).toBe('bird');
// });

// test('card variantList', () => {
//     const Suit = variantList(['Diamonds', 'Hearts', 'Spades', 'Clubs']);

//     expect(Suit.Clubs().type).toBe('Clubs');
// })

// test('Animal filter', () => {
//     const animals = [cerberus, Animal.snake('Steve')];

//     const result = animals.filter(isType(Animal.dog));
//     expect(result.length).toBe(1);
//     expect(result[0].name).toBe('Cerberus');
// })


// test('IsType 0', () => {
//     const kitty = Animal.cat({name: 'Yannis', furnitureDamaged: 0}) as Animal;

//     const isCat = isType(kitty, 'cat');
//     const isDog = isType(kitty, 'dog');
//     expect(isCat).toBe(true);
//     expect(isDog).toBe(false);
// });

// test('IsType UDTG', () => {
//     const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'});

//     if (isType(kerb, 'dog')) {
//         expect(kerb.favoriteBall).toBe('yellow');
//     } else {
//         fail('isType did not register kerb as a dog');
//     }
// });

// test('IsType UDTG (func)', () => {
//     const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'});

//     if (isType(kerb, Animal.dog)) {
//         expect(kerb.favoriteBall).toBe('yellow');
//     } else {
//         fail('isType did not register kerb as a dog');
//     }
// });

// test('IsType UDTG wrong', () => {
//     const kerb = Animal.dog({name: 'Kerberos', favoriteBall: 'yellow'}) as Animal;

//     if (isType(kerb, Animal.snake)) {
//         fail('isType did not register kerb as a dog');
//     } else {
//         expect(kerb.type).toBe('dog');
//     }
// })

// test('constrained', () => {
//     const Test1 = variantModule(constrained((_x: string) => ({min: 4}), {
//         Yo: (_x: string, min: number) => ({min}),
//     }));
//     type Test1<T extends TypeNames<typeof Test1> = undefined> = VariantOf<typeof Test1, T>;

//     const instance = Test1.Yo('hello', 4);

//     expect(instance.type).toBe('Yo');
//     expect(instance.min).toBe(4);
// })

// test('constrained 2', () => {
//     enum HairLength {
//         Bald,
//         Buzzed,
//         Short,
//         Medium,
//         Long,
//         BackLength,
//     }

//     const HairStyle = variantModule(constrained(just<{min?: HairLength, max?: HairLength}>({}), {
//         Bald: just({max: HairLength.Bald}),
//         Pixie: just({min: HairLength.Short, max: HairLength.Medium}),
//         Straight: just({min: HairLength.Short}),
//         Waves: just({min: HairLength.Medium}),
//     }));
//     type HairStyle<T extends TypeNames<typeof HairStyle> = undefined> = VariantOf<typeof HairStyle, T>;

//     const baldie = HairStyle.Bald() as HairStyle;

//     expect(baldie.max).toBe(HairLength.Bald);
// });

// // test('scoped', () => {
// //     const Animal2 = scopedVariant('Animal', {
// //         Cat: fields<{name: string}>(),
// //         Dog: fields<{name: string, toy?: string}>(),
// //     });
// //     type Animal2<T extends TypeNames<typeof Animal2> = undefined> = VariantOf<typeof Animal2, T>;

// //     const rating = (animal: Animal2) => match(animal, {
// //         [Animal2.Cat.type]: c => c.name,
// //         default: just('yo'),
// //     })

// //     expect(rating(Animal2.Cat({name: 'steve'}))).toBe('steve');
// // });

// // test('scopedMatch')

test('', () => {})
