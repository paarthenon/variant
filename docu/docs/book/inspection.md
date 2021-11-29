---
title: Inspection
---
```twoslash include animal
import {variant, fields, VariantOf} from 'variant';

export const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
    // - eov
});
// - variantOnly
import {TypeNames} from 'variant';
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
// - fullType
```
Tools to answer two simple questions

1. **How do we check if we have a certain type?** 
2. **How do we list all of the types of a given variant?** Perhaps I want to print them, or need to reference a subset of types to further delegate processing.

## Checking types

Let's talk about how to check if an animal is a dog, or if a protocol message is a session initiation packet. Matching allows for case-by-case handling, but can be overkill when we only care about one possibility.

### `type` equality

The classic discriminated unions approach, simply check if the type equals a string literal. 

```ts twoslash
// @include: animal
declare var animal: Animal;
// ---cut---
if (animal.type === 'dog') {
    const ballColor = animal.favoriteBall;
//                      ^?
}
```
This literal is constrained to the union `'cat' | 'dog' | 'snake'`, but users who prefer to avoid string literals may use `Animal.dog.type` to access the literal `dog`. As your type strings become longer or more complex, the ability to reference them in this way becomes more useful.

### `isType()`
The `istype()` function is a _user-defined type guard_ that answers whether or not an instance is of a given type. It accepts the type as either a string or a variant creator function.
```ts twoslash
// @include: animal
declare var animal: Animal;
import {isType} from 'variant';
// ---cut---
if (isType(animal, 'dog')) {
    const ballColor = animal.favoriteBall;
}
```
#### Variant creator

```ts twoslash
// @include: animal
declare var animal: Animal;
import {isType} from 'variant';
// ---cut---
if (isType(animal, Animal.dog)) {
    const ballColor = animal.favoriteBall;
}
```

#### Point-free overload

`isType()` may be used without an instance, where it will resolve to a function, roughly `(instance: T) => T is Type`, making it a perfect fit for filtering.

```ts twoslash
// @include: animal
declare var animal: Animal;
import {isType} from 'variant';
declare var animals: Animal[];
// ---cut---
const dogs = animals.filter(isType(Animal.dog));
```

### `isOfVariant()`

Check if an element is of a given variant. This is a _user-defined type guard_ that accepts a variant to compare against.

```ts twoslash
// @include: animal
import {isOfVariant} from 'variant';
// ---cut---
declare var animal: object;
if (isOfVariant(animal, Animal)) {
    const name = animal.name; // safe, since all animals have a 'name'.
    console.log('found animal named', name);
}
```

#### Partial overload

If an instance is not currently available, a predicate may still be generated.

```ts twoslash
// @include: animal
import {isOfVariant} from 'variant';
// ---cut---
declare var animal: object;

const isAnimal = isOfVariant(Animal);
if (isAnimal(animal)) {
    const name = animal.name; // safe, since all animals have a 'name'.
    console.log('found animal named', name);
}
```

This may be used to filter arrays, the same as `isType()`.

```ts twoslash
// @include: animal
import {isOfVariant} from 'variant';
// ---cut---
declare var potentialAnimals: object[];

const animals = potentialAnimals.filter(isOfVariant(Animal));
//      ^?
```

## Listing types

The possible types of a variant may be retrieved in various forms.

### `types()`

Get an array of the types in a variant. For `Animal`, it would return `['cat', 'dog', 'snake']`.

```ts twoslash
// @include: animal
declare var animal: Animal;
import {types} from 'variant';
// ---cut---
const animalTypes = types(Animal);
```
To be safe, expect the order to be unspecified, but in some modern stacks it will match the order of the template. 

#### On instances

`types()` may be used on a list of variant instances as opposed to the model.

```ts twoslash
// @include: animal
declare var animal: Animal;
import {types} from 'variant';
// ---cut---
const animals = [
    Animal.cat({name: 'Perseus', furnitureDamaged: 0}),
    Animal.dog({name: 'Cerberus'}),
];
const animalTypes = types(animals);
```

### `typeCatalog()`

The `types()` function returns an array. This is often appropriate, but suffers from O(n) membership checking. `typeCatalog()`, by contrast, returns a constant object of string literals (a.k.a. what you get it if you call `catalog(types(_____))`on some variant.

```ts twoslash
// @include: animal
declare var animal: Animal;
import {typeCatalog} from 'variant';
// ---cut---
const animalTypes = typeCatalog(Animal);
//     ^?
```

### `inferTypes()`

Create a proxy catalog for a variant based on the instance.

While any instance of an animal will only ever have one string literal as its the uniquely identifying property at runtime, at compile time TypeScript can see multiple possibilities in that type and will express them as a union. 

```ts twoslash
// @filename: animal.ts
// @include: animal
// ---cut---
import {inferTypes} from 'variant';

const animal = Animal.dog({name: 'Twix'}) as Animal;
const ani = inferTypes(animal);

console.log(ani.cat); // cat
console.log(animal.type === ani.dog); // true
```

:::note Proxy limitations
As a proxy object, this has no runtime information about the full list of types. Unlike a typical type catalog, we *cannot* use `Object.keys()` or `Object.values()` to capture or enumerate the items contained within. Proxies are a clever trick. The string "dog" becomes real only when we used the string "dog" to reference the property. It just spat back what we asked for.
:::

### `typeMap()`

There's a quiet assumption that's held true so far. The type of `Animal.dog` has been the same string, `dog`. This is by no means required, and there will be situations that benefit from breaking that assumption.

The `typeMap()` function creates and returns an object where the keys are the friendly names used for the variant and the values are the literal types used in the discriminant. In the trivial case where these are the same this function will return the same result as `typeCatalog()`

```ts twoslash
import {scoped, variant, typeMap} from 'variant';
// ---cut---
const ScopedAnimal = scoped('animal', variant(['cat', 'dog', 'snake']))
const scopeMap = typeMap(ScopedAnimal);
//     ^?
```
