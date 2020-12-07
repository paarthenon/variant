---
id: generic
title: Generic variants
---

We can use generics to create a more flexible binary tree

```typescript
type Tree<T> =
    | Variant<'Leaf', {payload: T}>
    | Variant<'Branch', {left: Tree<T>, right: Tree<T>}>
;

const Tree = genericVariant(({T}) => ({
    Branch: fields<{left: Tree<typeof T>, right: Tree<typeof T>}>(),
    Leaf: payload(T),
}));

const leaf = Tree.Leaf(5);

const numTree = Tree.Branch({
    left: Tree.Leaf(4),
    right: Tree.Leaf(66),
});

const strTree = Tree.Branch({
    left: Tree.Leaf('hello'),
    right: Tree.Branch({
        left: Tree.Leaf('world'),
        right: Tree.Leaf('people'),
    }),
})
```

To use the `genericVariant()`, pass in a function that returns a variant module. `genericVariant` will provide *your* function with a set of sigils that you can use as **placeholder** types. These will be replaced by true generics in the resulting type! In the above example, I use T, but this is actually an object that is being destructured and that object contains the full alphabet `{A: _, B: _, C: _, ..., Z: _}`. Use whichever letter best fits your use case.