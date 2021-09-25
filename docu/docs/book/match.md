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

```ts
const result = match(instance, {
    typeOne: _ => _.
})
```


## Matching Literals

Match can be used on *any* valid string literal union. These can be generated simply with `catalog()` or may come from other libraries. For example, **Chakra-UI** provides a hook `useColorMode`.

```ts
const {colorMode} = useColorMode();
```

The `colorMode` variable is a string `'dark' | 'light'`. As such, it can be processed with match.

```ts
const result = match(ofLiteral(colorMode), {
    dark: _ => ...,
    light: _ => ...,
});
```

****

## Partial matching

Use the `default` keyword.

```ts twoslash
// @include: animal
import {match} from 'variant';
declare var animal: Animal;
// ---cut---

const hasFur = match(animal, {
    snake: _ => false,
    default: _ => true,
});
```
### Better typed partial matching

Use the overload `match(item, partialHandler, restHandler)`. In this version of match, the input to the default clause will be better typed. Specifically, it will exclude the items that the handler has already resolved. Notice that in this code sample, snake is absent from the input type.

```ts twoslash
// @include: animal
import {match} from 'variant';
declare var animal: Animal;
// ---cut---

const hasFur = match(animal, {snake: _ => false}, _ => true);
//                                                ^?
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

## Unpack

The `payload()` helper function is commonly used. Unpacking the payload from the variant results in typing `({payload}) => payload,` many times. This lambda is available as `unpack`.

> Code sample TBD.

## Returning a constant

Use the functions `constant(value)` or `just(value)` as an alternative to `() => value`/`_ => value`.

```ts
// Code TBD.

```
## Matching scoped variants.

Use the `descope()` function to remove the scope section, allowing the handler to work with the more friendly names.

```ts
// code tbd.
```

## Prematching

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

****

- describe match
- describe partial functionality
- describe inline matcher
- describe matching on literals
- mention `unpack`
- mention `constant`/`just`
- bring up descoping a variant.

Introduce the matcher

Prematch