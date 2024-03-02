---
title: Match
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

Pattern matching is the crown jewel of variant types. Like the traditional switch statement, a match expression can process some arbitrary variant with special handling based on its type at runtime. Unlike a switch statement, matches are expressions and they are **exhaustive** by default. As expressions, matches can be used inline as the results of expression-bodied lambdas, JSX attributes, and more. As exhaustive handlers, matches can be assumed to resolve. 

The most direct use of the match expression requires an instance and a handler object.

```ts twoslash
// @include: animal-fullType
import {match} from 'variant';
// ---cut---
const rivalWantsAnimal = (animal: Animal) => match(animal, {
    dog: _ => false, // allergic to dogs
    cat: ({furnitureDamaged}) => furnitureDamaged < 3, // some cats
    snake: _ => true, // snakes are cool
})
```
This handler object requires a property for each case of a variant where the key equals the type literal and the value is a function that handles that type of variant.

## Matching Literals

Match can be used on any valid string literal union. These can be generated simply with `catalog()` or may come from other libraries.

Imagine a `colorMode` variable, a string `'dark' | 'light'`. As a union, it can be processed with match.

```ts
const result = match(colorMode, {
    dark: _ => ...,
    light: _ => ...,
});
```

## Partial matching

Use the `partial()` helper function.

```ts twoslash
// @include: animal
import {match, partial} from 'variant';
declare var animal: Animal;
// ---cut---

const hasFur = match(animal, partial({
    snake: _ => false,
    default: _ => true,
}));
```
### Better typed partial matching

Use the `otherwise(partialHandler, restHandler)` helper function. In this utility, the input to the default clause will be better typed. Specifically, it will exclude the items that the handler has already resolved. Notice that in this code sample, snake is absent from the input type.

```ts
const hasFur = match(animal, otherwise({snake: _ => false}, _ => true));
```

## Returning a constant

Frequently typing `() => value` may be tedious or even painful for some developers.

For a single case, use the functions `constant(value)` or `just(value)` as an alternative to `() => value`/`_ => value`.

```ts
const emoji = (animal: Animal) => match(animal, {
    cat: constant('🐱'),
    dog: constant('🐕'),
    snake: constant('🐍'),
})
```
If every case will be handled by returning a constant value, for example in a lookup table, use the `lookup()` helper function.

```ts
const emoji = (animal: Animal) => match(animal, lookup({
    cat: '🐱',
    dog: '🐕',
    snake: '🐍',
}))
```

## Inline matching

There's a point-free syntax available for match, allowing it to be used as a higher order function when in a properly constrained context. If match can infer what it's required to handle, it can provide autocompletion and exhaustiveness checking for the remaining options.

One of the motivating instance was in processing a promise chain. 

```ts twoslash
// @include: animal
import {match} from 'variant';
// ---cut---

declare function getAnimal(): Promise<Animal>;

const message = getAnimal()
    .then(match({
        dog: _ => `Get a doggy bed`,
        cat: ({furnitureDamaged}) => {
            const really = furnitureDamaged > 3
                ? ' really'
                : ''
            ;
            return `You should${really} buy a cat tree`;
        },
        snake: ({name, pattern}) => `Buy a terrarium`,
    }));
```

But inline matching can also be used in situations like the array functions `.filter`, `.some`, and `.map`.

Combine this with partial matching to do something like:

```ts twoslash

```

## Special Cases
### Matching scoped variants.

Use the `descope()` function to remove the scope section, allowing the handler to work with the more friendly names.

```ts twoslash
import {scoped, descope, fields, match, just, partial, TypeNames, VariantOf} from 'variant';
// ---cut---
const ScopedAnimal = scoped('Animal', {
    Cat: fields<{name: string}>(),
    Dog: fields<{name: string, toy?: string}>(),
});
type ScopedAnimal<T extends TypeNames<typeof ScopedAnimal> = undefined> = VariantOf<typeof ScopedAnimal, T>;

const cat = ScopedAnimal.Cat({name: 'Perseus'});

const rating = (animal: ScopedAnimal) => match(descope(animal), {
    Cat: c => 1,
    Dog: d => 2,
})
```

Though it's also possible to work with the types directly.

```ts twoslash
import {scoped, descope, fields, match, just, partial, TypeNames, VariantOf} from 'variant';
const ScopedAnimal = scoped('Animal', {
    Cat: fields<{name: string}>(),
    Dog: fields<{name: string, toy?: string}>(),
});
type ScopedAnimal<T extends TypeNames<typeof ScopedAnimal> = undefined> = VariantOf<typeof ScopedAnimal, T>;

const cat = ScopedAnimal.Cat({name: 'Perseus'});
// ---cut---
const rating = (animal: ScopedAnimal) => match(animal, {
    'Animal/Cat': c => 1,
    'Animal/Dog': d => 2,
})
```
### Prematching

Match on a type ahead of time. No variable instance necessary. 

```ts
const describeAnimal = prematch(Animal)({
    dog: ({name, favoriteBall}) => `${name} is playing with their ${favoriteBall} ball`,
    cat: ({name}) => `${name} is resting on the windowsill`,
    snake: ({name, pattern}) => `${name} is warming his ${pattern} skin against the light`,
});


const cerberus = Animal.dog({name: 'Cerberus', favoriteBall: 'red'});
const description = describeAnimal(cerberus);
// ^ "Cerberus is playing with their red ball"
```

This can be accessed in two ways:

```ts
const matchAnimal1 = prematch(Animal);
const matchAnimal2 = prematch<Animal>();
```

### Unpack

The `payload()` helper function is commonly used. Unpacking the payload from the variant results in typing `({payload}) => payload,` many times. This lambda is available as `unpack`.

```ts twoslash
import {variant, VariantOf, match, unpack, constant, payload} from 'variant';
const BadOption = variant({
    Some: payload<unknown>(),
    None: {},
});
type BadOption = VariantOf<typeof BadOption>;

const extract = (opt: BadOption) => match(opt, {
    Some: unpack,
    None: () => undefined,
});
```
