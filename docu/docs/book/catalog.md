---
title: Catalog
---

Use a catalog when you don't need state and just want a group of literals types. These objects are essentially maps of constants, with the most common case takes an array of strings. 

```ts twoslash
import {catalog} from 'variant';
// ---cut---
const Suit = catalog(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
//    ^?
type Suit = keyof typeof Suit;
//    ^?
```

In this scenario, it is essentially the same as the common [`strEnum`](https://github.com/basarat/typescript-book/blob/master/docs/types/literal-types.md) function.


The catalog function can also work with different types, like numbers in a key-value map:

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

The advantage being the catalog function will enforce that all values are of the same type, ensuring that a stray `'600'` will raise an error.

### Programmatic values

The `logLevels` values follow a strict formula—the index times `100`. Catalog allows us to express this programmatically.

```ts twoslash
import {catalog} from 'variant';
// ---cut---
const logLevels = catalog(
   ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
   (_, i) => i * 100
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