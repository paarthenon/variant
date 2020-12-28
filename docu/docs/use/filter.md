---
id: filter
title: Filtering & Analyzing
---

The last section covered how to create and group variants. Here, we'll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.


## Filtering the discriminated union

The `Animal` type allows some filtering out of the box. We have access to the type of a specific form through the `Animal<'snake'>` syntax, and can create a type union `Animal<'dog'> | Animal<'cat'>` as expected. Remember that it's possible to compute `Animal<'dog'>` yourself with the built in `Extract<T, U>` type.

```ts
type Dog = Extract<Animal, {type: 'dog'}>;
```

It's also possible to leverage that`Extract<T, U>` type to filter the union to only the possibilities matching a given interface. For example, our variant may be structured such that every winged animal has a `wingCount: number` property.

```typescript
// assume every winged animal has a wingCount property
// and other animals don't.
type WingedAnimal = Extract<Animal, {wingCount: number}>;
```

## isOfVariant

It's possible to use `isOfVariant` to **narrow** a variable to a variant type. `isOfVariant()` is a [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) that expects two parameters

1. The variable to be evaluated
2. The variant module to compared against

```typescript
const flap = (animal: WingedAnimal) => {...} 
declare var a: Animal;

if (isOfVariant(a, WingedAnimal)) {
    // a is now known to be an WingedAnimal
    // so this is safe.
    flap(a);
}
```

Note it's possible to construct the variant module `isOfVariant` is expecting on the fly. 

```typescript
if (isOfVariant(a, variantList([Animal.bird, Animal.pegasus]))) {
    flap(a);
}
```

