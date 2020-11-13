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

const Tree = genericVariant(({A}) => ({
    Branch: fields<{left: Tree<typeof A>, right: Tree<typeof A>}>(),
    Leaf: payload(A),
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
