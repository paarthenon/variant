---
id: intro
title: Introduction
---
Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

> [🧠 Click here to jump straight to the API Reference](api.md).

## Quick Start 

Let's use [`variant`](use/variant) to describe a domain — **Animals**. [Or if you'd like a redux example...](use/redux)

For this application, we care about dogs, cats, and snakes. We have different concerns for each animal, so we'll want to define them with distinct fields. The [`fields`](api.md#fields) function below is shorthand to help do this. We'll see more of how it works in the [first section of the User Guide](use/variant).
```typescript
import variant, {variantList, VariantOf, fields, TypeNames} from 'variant';

export const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

We can now import and use the `Animal` object, which simply collects the tag constructors we care about in one place. To create a new dog, for example, call `Animal.dog({name: 'Guava'})`. When we imported the `Animal` *object* we also imported the `Animal` *type* since we defined these with the same name. This single import will allows us to:

 - **Create** a new animal
    - `Animal.snake('steve')` — *value*: `{ type: 'snake', name: 'steve', pattern: 'striped' }`
 - **Annotate** the type for a **single** animal.
    - `Animal<'snake'>` — *type*: `{ type: 'snake', name: string, pattern: string }`
 - **Annotate** the **union** of all animals.
    - `Animal` — *type*: `Animal<'dog'> | Animal<'cat'> | Animal<'snake'>`

```typescript
import {Animal} from '...';

const snek = Animal.snake('steve');
const describeSnake = (snake: Animal<'snake'>) => {...}
const describeAnimal = (animal: Animal) => {...}
```

With these building blocks we're ready to write some elegant code. Let's expand the `describeAnimal` function with the [`match`](api.md#match) utility.

### Match

Match is a great tool to **process** a variant of unknown type. The function will accept an variant object (*animal*) and a handler object. Think of each entry of the handler like a branch that might execute. To be safe the object will need an entry for every case of the variant. In this example that means one for each animal. 

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

If any of this looks unfamiliar, this sample leverages the ES6 [lambda expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), and [parameter destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_function_parameter) features. 

****
**[`match`](api.md#match)** is...
  - **exhaustive by default**. If you only need to handle some cases, use [`partialMatch`](api.md#partialmatch).
 - **pure TypeScript.** This will work on any valid discriminated union, whether or not it was made with [`variant`](api.md#variant).
 - **well typed**. `match`'s return type is the union of the return types of all the potential handler functions. `partialMatch` does the same but adds `undefined` to the union.
 - **familiar**. It's meant to imitate the [OCaml / Reason ML **`match`** statement](https://ocaml.org/learn/tutorials/data_types_and_matching.html#Pattern-matching-on-datatypes).
 - **flexible**. By default `match` switches on the `type` property which can be overridden using the function's optional third paramater. 

:::note
[**match**](api.md#match) has a little sister named [**lookup**](api.md#lookup), for when you don't need to use any properties of the variant.

```typescript
const cuteName = lookup(animal, {
    cat: 'kitty',
    dog: 'pupper',
    snake: 'snek',
});
:::

### Grouping

Earlier we defined `Animal` using the [`variantList`](api.md#variantlist) function. It's also valid to construct the `Animal` object directly.

```typescript
const Animal = {
    dog: variant('dog', ...),
    cat: variant('cat', ...),
    snake: variant('snake', ...),
}
```

This is discussed further in [the page on grouping variants.](use/grouping)

### Continued

There's more to come. The next page, [Motivation](motivation), is context and can be skipped. It explains why variant matters and what a vanilla TypeScript approach would look like. The [Usage Guide](use/variant) goes over the practical things you need to know and is the next place I'd look as a new user wanting to get things done. Finally, [the API Reference](api) is available for details on every function and type.