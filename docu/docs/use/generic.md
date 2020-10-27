---
id: generic
title: Generic variants
---

While we're being generic let's do a binary tree again.

> ⚠️ This assumes you've read the [recursive variants article](recursive).

```typescript
// but better this time
type TreeNode<T> =
    | Variant<'Leaf', {data: T}>
    | Variant<'Branch', {left?: TreeNode<T>, right?: TreeNode<T>}>
;

/**
 * factory for TreeNode<T>
 */
const treeNode = <T>() => typedVariant<TreeNode<T>>({
    Leaf: pass,
    Branch: pass,
});
const AnimalTreeNode = treeNode<Animal>();

// and we're back
const tree = AnimalTreeNode.Branch({
    left: AnimalTreeNode.Leaf({data: Animal.dog({name: 'Cerberus'})}),
    right: AnimalTreeNode.Branch({
        right: AnimalTreeNode.Leaf({data: Animal.cat({name: 'Sikandar'})}),
    })
})

// works for other types, too!
const NumTree = treeNode<number>();
const numTree = NumTree.Branch({
    left: NumTree.Leaf({data: 4}),
    right: NumTree.Leaf({data: 66}),
})
```
