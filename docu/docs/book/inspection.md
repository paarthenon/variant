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

Most of the time to do something useful with a discriminated union we'll need to examine its members and their types. Matching is a form of inspection, but is often geared toward processing. Here let's focus on some of the ways to analyze these objects.

### `type` equality

Classic. Supports type narrowing
```ts twoslash
// @include: animal
declare var animal: Animal;
// ---cut---
if (animal.type === 'dog') {
    const ballColor = animal.favoriteBall;
//                      ^?
}
```

### `isType()`
A _user-defined type guard_ that can answer whether or not an instance of a variant is of a given type. Takes the type as either a string literal or the variant creator.
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
Note, this also works as a higher order function for filters.

```ts twoslash
// @include: animal
declare var animal: Animal;
import {isType} from 'variant';
declare var animals: Animal[];
// ---cut---
const dogs = animals.filter(isType(Animal.dog));
```

### `types()`

Get a list of the types in a variant. For `Animal`, it would return `['cat', 'dog', 'snake']`. The order is... complicated. Expect it to be unspecified to be safe, but in some modern stacks it will match the order of the template. 

```ts twoslash
// @include: animal
declare var animal: Animal;
import {types} from 'variant';
// ---cut---
const animalTypes = types(Animal);
```

### `typeCatalog()`

The `types()` function returns an array. This is often appropriate, but suffers from O(n) membership checking. `typeCatalog()`, by contrast, returns a constant object of string literals (a.k.a. what you get it if you call `catalog(types(_____))`on some variant.


```ts
const animalTypes = typeCatalog(Animal)
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