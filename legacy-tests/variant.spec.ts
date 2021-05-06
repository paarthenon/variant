


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





test('', () => {})
