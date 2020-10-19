---
id: filter
title: Filtering
---

> The last section covered how to create and group variants. Here, we'll cover how to narrow variant types into more specific subsets and automatically extract variants from a module based on various types.


## Filtering the discriminated union

The `Animal` type allows some filtering out of the box. We have access to the type of a specific form through the `Animal<'snake'>` syntax, and can create a type union `Animal<'dog'> | Animal<'cat'>` as expected.

The `Animal` type can also be filtered with a type or interface. It's possible to leverage TypeScript's built in `Extract<T, U>` type to filter the union to only the possibilities matching a given interface.

```typescript
// assume every winged animal has a wingCount property
// and other animals don't.
type AnimalWithWings = Extract<Animal, {wingCount: number}>;
```

## isOfVariant

It's possible to use `isOfVariant` to **narrow** a variable to a variant type. `isOfVariant()` is a [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) that expects two parameters

1. The variable to be evaluated
2. The variant module to compared against

```typescript
const flap = (animal: AnimalWithWings) => {...} 
declare var a: Animal;

if (isOfVariant(a, AnimalWithWings)) {
    // a is now known to be an AnimalWithWings
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

## Cast and Narrow

Let's say you have an `animal: Animal` and you're sure it's a snake or you only care about it if it's a snake. Here are a couple of shortcuts to help with that.

If you're sure it's a snake, use cast.
```typescript
const snake = cast(animal, 'snake'); // typeof snake === Animal<'snake'>;
```
The second property will only allow valid keys of animal.

> Yes this is equivalent to `const snake = animal as Animal<'snake'>` but is cleaner in a `useSelector` call. Imagine `state.view` is a variant of menu states like `Game`, `Settings`, `About`, `MainMenu`.
> ```typescript
> // settingsPage.tsx
> const graphicsSettings = useSelector((state: RootState) => cast(state.view, 'Settings').graphics);
> ```


If you're not sure it's a snake, try to narrow it.

```typescript
const snake = narrow(animal, 'snake'); // typeof snake === (Animal<'snake'> | undefined);

console.log(snake?.pattern);
```
Like before, the second property can only be a valid key of `Animal`. If `animal` is in fact a snake you get it back. If not, you get undefined. This works very well with the optional chaining operator in TypeScript. Especially when you get a deeper object in the tree. 

> Yes this is equivalent to `const snake = partialMatch(animal, {snake: s => s});` but it's more readable. It's also clearer in a `useSelector` call.
> ```typescript
> // settingsPage.tsx
> const graphicsSettings = useSelector((state: RootState) => 
>     narrow(state.view, 'Settings')?.graphics ?? DEFAULT_GRAPHICS_SETTINGS);
> ```
