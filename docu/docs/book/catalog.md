---
title: Catalog
---

A **Catalog** is a union of literal types. Use a catalog when needing to track which state some element is in, but no additional details. These maps of constants are most often used to store strings, but may also be used with `number`s or `boolean`s. 

```ts twoslash
import {catalog} from 'variant';
// ---cut---
const Suit = catalog(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
//    ^?
type Suit = keyof typeof Suit;
//    ^?
```

In this scenario, catalog is quite similar to the [`strEnum`](https://github.com/basarat/typescript-book/blob/master/docs/types/literal-types.md) function users may be familiar with.


### Numbers

```ts twoslash
import {catalog} from 'variant';
// ---cut---
const logLevels = catalog({
    trace: 100,
    debug: 200,
    info: 300,
    warn: 400,
    error: 500,
    fatal: 600,
})
```

`catalog()` will enforce that all values are of the same type, ensuring that a stray `'600'` will raise an error.

### Programmatic values

The values of the literals can be defined programmatiocally. For example, the `logLevels` values follow a strict formula—the index times `100`. Catalog allows us to express this programmatically.

```ts twoslash
import {catalog} from 'variant';
// ---cut---
const logLevels = catalog(
   ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
   (_, i) => (i+1) * 100
);
```
This version of the code can be shorter and is often more resilient against refactoring.


### Matching Catalogs

In order to streamline domain-modeling, literal unions (such as those from `catalog()`) may be directly processed through `match()` and `matcher()`.

```ts twoslash
import {variant, catalog, match} from 'variant';
// ---cut---
const animal = catalog(['cat', 'dog', 'snake']);
type animal = keyof typeof animal;

const fittingPokemon = (a: animal) => match(a, { 
    cat: _ => 'Meowth',
    dog: _ => 'Arcanine',
    snake: _ => 'Ekans',
})
```

Other library functions can be accessed by elevating the literal union to a full discriminated union through `ofLiteral()`. 