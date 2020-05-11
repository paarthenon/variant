---
id: intro
title: Introduction
---
Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

## Quick Start 

Let's use `variant` to describe a domain — **Animals**. [Or if you'd like a redux example...](#lets-say-you-use-redux)
```typescript
import variant, {variantList, VariantOf, fields, TypeNames} from 'variant';

const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

and using the created variant `Animal` looks something like...

```typescript
import {Animal} from '...';

const snek = Animal.snake('steve');
console.log(snek); 
// {type: 'snake', name: 'steve', pattern: 'striped'}
const describeSnake = (snake: Animal<'snake'>) => {...}
const describeAnimal = (animal: Animal) => {...}
```

### Match

We can now process the union using **match**, an alternative to the switch statement. [See test examples](src/variant.match.spec.ts).

```typescript
import {match} from 'variant';

const describeAnimal = (animal: Animal) => match(animal, {
    cat: ({name}) => `${name} is sleeping on a sunlit window sill.`,
    dog: ({name, favoriteBall}) => [
        `${name} is on the rug`,
        favoriteBall ? `nuzzling a ${favoriteBall} ball.` : '.' 
    ].join(' '),
    snake: s => `Hi ${s.name}, your ${s.pattern} skin looks nice today.`,
});
```

### `match` is...


 - **exhaustive by default**. If you only need to handle some cases, use `partialMatch`.
 - **pure TypeScript.** This will work on any valid discriminated union, whether or not it was made with `variant`.
 - **well typed**. `match`'s return type is the union of the return types of all the potential handler functions. `partialMatch` does the same but adds `undefined` to the union.
 - **familiar**. It's meant to imitate the [OCaml / Reason ML **`match`** statement](https://ocaml.org/learn/tutorials/data_types_and_matching.html#Pattern-matching-on-datatypes).
 - **flexible**. By default `match` switches on the `type` property which can be overridden using the function's optional third paramater. 

### Lookup

If you don't need to perform any actions or use any of the union's data, use **lookup**.

```typescript
import {lookup} from 'variant';

const cuteName = lookup(animal, {
    cat: 'kitty',
    dog: 'pupper',
    snake: 'snek',
});
```

The above notes on `match` also apply to `lookup`
