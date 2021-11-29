---
title: Matcher
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

Variant providers **`matcher()`, a builder-pattern API** for matching against variants and literal unions. The matcher allows users to build a handler piece-by-piece, which can become especially important for larger variants. As your unions grow to dozens or hundreds of cases, the matcher will become more and more relevant.

## `.with()`

Its most basic use resembles the `match()` function, accepting an object with each case handled as a property.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// ---cut---
const describePetting = (animal: Animal) => matcher(animal)
    .with({
        cat: ({name}) => `You stroke ${name}'s fur.`,
        dog: ({name}) => `You stroke ${name}'s fur.`,
        snake: ({name, pattern}) => `You pet ${name}'s ${pattern} skin`,
    })
    .complete()
```

The `.complete()` function is a **terminal** method, one of the functions of the matcher that actually executes the match operation. There are [other terminals](#terminals), each with their own purpose. *Error reporting* is `.complete()`'s specialty.

Let's say we overlooked some of the cases in the above function.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// @errors: 2349
// ---cut---
const describePetting = (animal: Animal) => matcher(animal)
    .with({
        snake: ({name}) => `You let ${name} wrap around your hand.`,
    })
    .complete()
```

The matcher will report exactly which keys are missing.

## Multi-matching — `.when()` 

We need to handle cats and dogs again, but it feels a little repetitive to have duplicate logic for the `cat` and `dog` branches since we handle them the same way. The `.when()` method will allow us to handle multiple subtypes with the same logic. 

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// @errors: 2349
// ---cut---
const describePetting = (animal: Animal) => matcher(animal)
    .with({
        snake: ({name}) => `You let ${name} wrap around your hand.`,
    })
    .when(['cat', 'dog'], ({name}) => `You stroke ${name}'s fur.`)
    .complete()
```
Note that the `name` property is available to the handler function, since it is present on both `Animal<'cat'>` and `Animal<'dog'>`. 

`.when()` can handle single cases as well, allowing the previous code to be written as

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// @errors: 2349
// ---cut---
const describePetting = (animal: Animal) => matcher(animal)
    .when('snake', ({name}) => `You let ${name} wrap around your hand.`)
    .when(['cat', 'dog'], ({name}) => `You stroke ${name}'s fur.`)
    .complete()
```

:::info Alternate Syntax
`.when()`, like `isType()`, can accept variant creators as input. 
```ts twoslash
// @include: animal
import {matcher} from 'variant';
// @errors: 2349
// ---cut---
const describePetting = (animal: Animal) => matcher(animal)
    .when(Animal.snake, ({name}) => `You let ${name} wrap around your hand.`)
    .when([Animal.cat, Animal.dog], ({name}) => `You stroke ${name}'s fur.`)
    .complete()
```
:::

### Delegating to sub-matchers 

Pair `.when()` with `types()` for simple and elegant delegation to subtypes. Let's imagine a more complex `Animal` type, broken down into `LandAnimal`s and `AirAnimal`s.

```twoslash include ComplexAnimal
import {variant, fields, VariantOf} from 'variant'

const LandAnimal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
})
type LandAnimal = VariantOf<typeof LandAnimal>;

const AirAnimal = variant({
    bat: fields<{name: string, favoriteFruit: string}>(),
    bird: fields<{name: string, featherColor: string}>(),
})
type AirAnimal = VariantOf<typeof AirAnimal>;

const Animal = variant({
    ...LandAnimal,
    ...AirAnimal,
})
type Animal = VariantOf<typeof Animal>
```
```ts twoslash
// @include: ComplexAnimal
```
Let's assume the existence of two functions—`describeLandAnimal` and `describeAirAnimal`.

```ts twoslash
// @include: ComplexAnimal
import {matcher, types} from 'variant';
// ---cut---
declare function describeLandAnimal(animal: LandAnimal): string;
declare function describeAirAnimal(animal: AirAnimal): string;

export function describeAnimal(animal: Animal): string {
    return matcher(animal)
        .when(types(LandAnimal), describeLandAnimal)
        .when(types(AirAnimal), describeAirAnimal)
        .complete()
}
```

The `describeAnimal` function becomes a dispatcher, delegating the specific logic for subsets of the union to smaller functions tailored to them. It's quite possible that `describeLandAnimal` or `describeAirAnimal` will *themselves* call `match()` or `matcher()` to resolve their cases. Then again, they may be using switch statements or branching ifs. As adherents of encapsulation, the implementation details are frankly none of our concern. All of the above approaches and more (lookup tables, observable mappings) will work with this library.

This pattern appears frequently in react and redux, where multiple smaller reducers may be organized into an overall `rootReducer`.

## Constants — `.register()`

A block of values can be resolved to a set of constants via `.register()`, a function with a similar syntax to `.with()`.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// ---cut---
const animalEmoji = (animal: Animal) => matcher(animal)
    .register({
        dog: '🐕',
        snake: '🐍',
    })
    .when('cat', ({furnitureDamaged}) => furnitureDamaged == 0 ? '😺' : '😾')
    .complete()
```
:::note Rationale
I registered dog (🐕) and snake (🐍) directly, but I used `.when()` to handle cats because I wanted to perform some logic based on the cat's properties. Well-behaved cats will be shown smiling (😺) while cats with a history of poor behavior will frown (😾).
:::

This flexibility in approach is the beauty of matcher. 

## Terminals

A **terminal** is some matcher method that executes the handler immediately. The ideal terminal is `.complete()`

### `.complete()`
Through the magic of conditional types, `.complete()` will either pose no obstacle at all, or complain about keys.

### `.else()`
Handle the remaining cases with a function. Note that snake, since it's already been handled, is not part of the input union.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// ---cut---
const hasScales = (animal: Animal) => matcher(animal)
    .when('snake', _ => true)
    .else(_ => false)
//        ^?
```

### `.execute()`
Immediately execute the matcher, whether or not every case has been handled. The matcher will return undefined if it runs into an unhandled case.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// ---cut---
const ballPreference = (animal: Animal) => matcher(animal)
    .when('dog', ({favoriteBall}) => favoriteBall)
    .execute();
```
Dogs are the only case where ball preference matters, and every other case can simply resolve to void.

### `.exhaust()`
Handle all remaining cases. Unlike `.with()`, `.exhaust()` is not content with one case, it requires every unhandled case be resolved then and there.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// ---cut---
const describeLounging = (animal: Animal) => matcher(animal).exhaust({
    cat: ({furnitureDamaged}) => {
        const term = furnitureDamaged == 0 ? 'sofa' : 'carpet';
        return `preening on the ${term}`;
    },
    dog: ({favoriteBall}) => {
        const ballTerm = favoriteBall ? `${favoriteBall} ` : '';
        return `playing with a ${ballTerm}ball`;
    },
    snake: ({pattern}) => `sunning their ${pattern} skin`,
})
```

If any cases have already been handled, they need not be included.

:::warning
Code sample incoming, post `dev.25`
:::

### `.lookup()`
Similar to exhaust, handle every unresolved case but do so as a lookup table. This can be quite succinct in use.

```ts twoslash
// @include: animal
import {matcher} from 'variant';
// ---cut---
const cuteName = (animal: Animal) => matcher(animal).lookup({
    cat: 'kitty',
    dog: 'puppy',
    snake: 'snek',
})

const cutie = cuteName(Animal.dog({name: 'Twix'})); // puppy
```
If any cases have already been handled, they need not be included.

:::warning
Code sample incoming, post `dev.25`
:::

