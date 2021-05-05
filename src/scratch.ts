// import {fields, match, payload, TypeNames, Variant, variant, just, typed, augmented, variation} from '.';
// import {GenericVariantTypeSpread, GVariantOf, onTerms} from './generic';
// import {ExactDefinition, pass} from './typed';
// import {CapsAnimal} from './__test__/animal';

// const Opt2 = variant(onTerms(({T}) => {
//     return {
//         /**
//          * let's go
//          */
//         Some: payload(T),
//         None: {},
//     }
// }))
// // type blah = GenericVariantTypeSpread<typeof Opt2>;
// // type blah2 = GenericVariantTypeSpread<typeof Opt2>[keyof typeof Opt2];
// // type asf = TypeNames<typeof Opt2>;
// type Opt2<T, TType extends TypeNames<typeof Opt2> = undefined> = GVariantOf<typeof Opt2, TType, {T: T}>;


// // type asdf = Opt2<number>;



// // const a = Opt2.None();
// // let b = Opt2.Some(5);
// // const c = Opt2.Some('hello');

// // export function extract<T>(opt: Opt2<T>) {
// //     return match(opt, {
// //         None: just(undefined),
// //         Some: ({payload}) => payload,
// //     });
// // }


// const Matcher = variant(onTerms(({T}) => ({
//     Specific: payload(T),
//     Custom: (payload: (v: typeof T) => boolean) => ({payload}),
// })))
// type Matcher<T, TType extends TypeNames<typeof Matcher> = undefined> = GVariantOf<typeof Matcher, TType, {T: T}>;

// // const matcher: Matcher<string> = Matcher.Custom((v: number) => v === 1)

// const thing = Matcher.Specific(5);

// const Tree = variant(onTerms(({T}) => {
//     type Tree<T> =
//         | Variant<'Branch', {payload: T, left: Tree<T>, right: Tree<T>}>
//         | Variant<'Leaf', {payload: T}>
//     ;
//     return {
//         Branch: fields<{left: Tree<typeof T>, right: Tree<typeof T>, payload: typeof T}>(),
//         Leaf: payload(T),
//     }
// }));
// type Tree<T, TType extends TypeNames<typeof Tree> = undefined> 
//     = GVariantOf<typeof Tree, TType, {T: T}>;

// // in use
// const binTree = Tree.Branch({
//     payload: 1,
//     left: Tree.Branch({
//         payload: 2,
//         left: Tree.Leaf(4),
//         right: Tree.Leaf(5),
//     }),
//     right: Tree.Leaf(3),
// })

// function depthFirst<T>(node: Tree<T>): T[] {
//     return match(node, {
//         Leaf: ({payload}) => [payload],
//         Branch: ({payload, left, right}) => {
//             return [payload, ...depthFirst(left), ...depthFirst(right)];
//         }
//     })
// }

// // const [d1, d2, d3, d4, d5] = depthFirst(binTree);
// // expect(d1).toBe(1);
// // expect(d2).toBe(2);
// // expect(d3).toBe(4);
// // expect(d4).toBe(5);
// // expect(d5).toBe(3);


// const Option = variant(onTerms(({T}) => ({
//     Some: payload(T),
//     None: {},
// })));
// type Option<T, TType extends TypeNames<typeof Option> = undefined>
//     = GVariantOf<typeof Option, TType, {T: T}>;

// const num = Option.Some(4);
// const name = Option.Some('Steve');


// /**
//  * Retrieve the inner value of some `Option<T>`
//  * @param opt the option instance
//  * @returns the inner value
//  */
// function extract<T>(opt: Option<T>) {
//     return match(opt, {
//         Some: ({payload}) => payload,
//         None: just(undefined),
//     });
// }


// // /**
// //  * strip the type field from some object type.
// //  */
// //  export type VariantWithoutType<T, K extends string = 'type'> = Omit<T, K>;

// //  export type SpecificVariantFields<T, TType extends string, K extends string = 'type'> = VariantWithoutType<Extract<T, Record<K, TType>>>;
// //  export type ExactDefinition<T extends Record<K, string>, K extends string = 'type'> = {
// //      [P in T[K]]: (input: SpecificVariantFields<T, P, K>) => SpecificVariantFields<T, P, K>;
// //  }
 
// //  export function typed<T extends {[K]: string}, K extends string>(def: {[P in T]}) {
// //      return def;
// //  }



// // const asdf = augmented(() => ({better: true}), CapsAnimal)
// // type af = typeof asdf['cat'];
// // const thing = variation('thing', asdf.cat);
// // type a = ReturnType<typeof thing>;
// // const cat1 = thing({name: 'Test', furnitureDamaged: 0});
// // const BetterCapsAnimal = variant(augmented(() => ({better: true}), CapsAnimal));
// // const test = BetterCapsAnimal.cat({name: 'Test', furnitureDamaged: 0});

// // const snek = BetterCapsAnimal.snake('steve');