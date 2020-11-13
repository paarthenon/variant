---
id: 'recursive'
title: 'Recursive variants'
---

Recursive variants are a wonderful pattern for expressing and evaluating tree and list-like data. The traditional example involves a binary tree, so let's do a binary tree of `Animal`s. An animal tree may not have many real world applications but please bear with me. We'll create a more universal `Tree<T>` type in the next section on [generic variants](use/generic).

## `typedVariant<T>()`
So far we've been letting the **type** flow from the **value**. However, this makes recursive variants impossible. Attempting to reference `AnimalNode` in the *definition* for `AnimalNode` causes an error in the time-loop (and `tsc`).

So we've got flip our approach. We're going to make a **type** and *then* create the variant module, the **value**, based on that type.

```typescript
type AnimalTree =
    | Variant<'Leaf', {animal: Animal}>
    | Variant<'Branch', {left?: AnimalTree, right?: AnimalTree, label?: string}>
;

const AnimalTree = typedVariant<AnimalTree>({
    Leaf: pass,
    Branch: pass,
});

const tree = AnimalTree.Branch({
    label: 'Animal Kingdom',
    left: AnimalTree.Leaf({animal: Animal.snake({name: 'Steve'})),
    right: AnimalTree.Branch({
        label: 'Mammals',
        left: AnimalTree.Leaf({animal: Animal.dog({name: 'Cerberus'})}),
        right: AnimalTree.Leaf({animal: Animal.cat({name: 'Sikandar'})}),
    })
})
```

In this example we created a recursive type, a binary tree of `Animal`s. We then created the implementation of that type as a variant module by calling `typedVariant<T>()`. 

### `pass`

`pass` achieves the most common use case—create a variant that accepts an object of a given type and returns that object plus the `type: ...` property. The user is welcome to write the implementation themselves, but most often `pass` is sufficient.

### custom implementation

`typedVariant<T>()` uses the type `T` to restrict the object you offer as the implementation, meaning you can safely destructure the variant's input in its own implementation.

```typescript
const AnimalTree = typedVariant<AnimalTree>({
    Leaf: ({animal}) => {
        console.log('creating leaf node with animal', animal);
        return {animal};
    },
    Branch: pass,
});

```