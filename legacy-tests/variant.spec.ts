


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



test('', () => {})
