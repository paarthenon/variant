---
title: Generic Variants
---

Use the `onTerms` helper function to create generic variants. Let's create the classic **Option** type, with `Some`, which contains data, and `None`, which doesn't. Some of you know it as **Maybe**, with `Just` and `Nothing` instead. These are an excellent alternative to null handling, which has been referred to by its creator as his [billion dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).

```twoslash include optionDef
import {variant, onTerms, payload, nil, TypeNames, GVariantOf} from 'variant';

export const Option = variant(onTerms(({T}) => ({
    Some: payload(T),
    None: nil,
})));
export type Option<T, TType extends TypeNames<typeof Option> = undefined>
    = GVariantOf<typeof Option, TType, {T: T}>;
```

```ts twoslash
// @include: optionDef
```
Here's the type in action.

```ts twoslash
// @filename: option.ts
// @include: optionDef
// @filename: index.ts
// ---cut---
import {Option} from './option';

const num = Option.Some(4);
const str = Option.Some('thing');
//     ^?
```
The `Option.Some` function is parameterized, meaning that it will infer its return value from whatever is passed in. Here, `num` has is one case of `Option<number>`, while `str` is one of `Option<string>`. More complex types may also be stored, and generic functions can be written to process arbitrary types.
```ts twoslash
// @filename: option.ts
// @include: optionDef
// @filename: index.ts
// ---cut---
import {constant, isType, match} from 'variant';
import {Option} from './option';

export const extract = <T> (option: Option<T>) => match(option, {
    Some: ({payload}) => payload,
    None: constant(undefined),
});

const probablyFour = extract(Option.Some(4));
//      ^?
export function returnSomes<T>(options: Option<T>[]) {
    return options
        .filter(isType(Option.Some))
        .map(some => some.payload)
}
```
The `returnSomes` function has been correctly typed as returning `T[]` without our explicitly saying so.


### How does it work?

The `T` property of the parameter is a placeholder - an instance of a variant meant to represent a generic term. The object that we destructured to get `T` has a placeholder for each letter of the roman alphabet, 26 in total. `onTerms()` brands the return type of the template function with a symbol to indicate the template has generic term placeholders. When this symbol is present, a special overload of `variant()` is triggered which will rewrite the `T` placeholder with an actualized generic type.

****

Upcoming: Incorporate tree example properly. 

#### Tree<T\>

Trees will need to be defined type-first like all recursive variants. 
```ts
const Tree = variant(onTerms(({T}) => {
    type Tree<T> =
        | Variant<'Branch', {payload: T, left: Tree<T>, right: Tree<T>}>
        | Variant<'Leaf', {payload: T}>
    ;
    return {
        Branch: fields<{left: Tree<typeof T>, right: Tree<typeof T>, payload: typeof T}>(),
        Leaf: payload(T),
    }
}));
type Tree<T, TType extends TypeNames<typeof Tree> = undefined> 
    = GVariantOf<typeof Tree, TType, {T: T}>;
```

but otherwise follow the same process. 

```ts

const binTree = Tree.Branch({
    payload: 1,
    left: Tree.Branch({
        payload: 2,
        left: Tree.Leaf(4),
        right: Tree.Leaf(5),
    }),
    right: Tree.Leaf(3),
})

function depthFirst<T>(node: Tree<T>): T[] {
    return match(node, {
        Leaf: ({payload}) => [payload],
        Branch: ({payload, left, right}) => {
            return [payload, ...depthFirst(left), ...depthFirst(right)];
        }
    })
}

const [d1, d2, d3, d4, d5] = depthFirst(binTree);
expect(d1).toBe(1);
expect(d2).toBe(2);
expect(d3).toBe(4);
expect(d4).toBe(5);
expect(d5).toBe(3);
```