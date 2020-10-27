---
id: 'recursive'
title: 'Recursive variants'
---

Recursive variants are a wonderful pattern for expressing and evaluating tree and list-like data. The traditional example involves a binary tree, so let's do a binary tree of `Animal`s. I know this doesn't make sense but please bear with me.

## `typedVariant<T>()`
So far we've been letting the **type** flow from the **value**. However, this makes recursive variants impossible. Attempting to reference `AnimalNode` in the *definition* for `AnimalNode` causes an error in the time-loop (and `tsc`).

So we've got flip our approach. We're going to make a **type** and *then* create the variant module, the **value**, based on that type.

```typescript
type AnimalTreeNode =
    | Variant<'Leaf', {animal: Animal}>
    | Variant<'Branch', {left?: AnimalTreeNode, right?: AnimalTreeNode}>
;

const AnimalTreeNode = typedVariant<AnimalTreeNode>({
    Leaf: pass,
    Branch: pass,
});

const tree = AnimalTreeNode.Branch({
    left: AnimalTreeNode.Leaf({animal: Animal.dog({name: 'Cerberus'})}),
    right: AnimalTreeNode.Branch({
        right: AnimalTreeNode.Leaf({animal: Animal.cat({name: 'Sikandar'})}),
    })
})
```

In this example we created a recursive type, a binary tree of `Animal`s. We then created the implementation of that type as a variant module by calling `typedVariant<T>()`. 

### `pass`

`pass` achieves the most common use case—create a variant that accepts an object of a given type and returns that object plus the `type: ...` property. The user is welcome to write the implementation themselves, but most often `pass` is sufficient.

### custom implementation

`typedVariant<T>()` uses the type `T` to restrict the object you offer as the implementation, meaning you can safely destructure the variant's input in its own implementation.

```typescript
const AnimalTreeNode = typedVariant<AnimalTreeNode>({
    Leaf: ({animal}) => {
        console.log('creating leaf node with animal', animal);
        return {animal};
    },
    Branch: pass,
});

```