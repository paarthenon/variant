---
id: intro
title: Introduction
---
Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

> [🧠 Click here to jump straight to the API Reference](api.md).

:::note glossary: domain
The term [Domain](https://en.wikipedia.org/wiki/Domain_(software_engineering)) has many meanings but here we use domain to mean **your set of concerns**. If you are making a game, you might care about the player state, potential enemies, or items and inventory. If you are writing a budget tracker, your concerns might include income sources and recurring vs. one-time expenses.
:::

Variant doesn't have any dependencies and doesn't need any setup. Simply run `npm install`.

```bash
npm install --save variant
```
## Quick Start 

Let's use [`variant`](use/variant) to describe a simple domain — **Animals**. [Or if you'd like a redux example...](use/redux)

For this application, we care about dogs, cats, and snakes. These will be the various pets our player can have. We have different concerns for each animal, so we'll want to define them with distinct fields. The [`fields`](use/variant#fields) function below is shorthand to help do this. We'll see more of how it works in the [first section of the User Guide](use/variant).
```typescript
import {variant, variantModule, VariantOf, fields, TypeNames} from 'variant';

export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, daysSinceDamage: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

We can now import and use the `Animal` object, which simply collects the tag constructors we care about in one place. To create a new dog, for example, call `Animal.dog({name: 'Guava'})`. When we imported the `Animal` *object* we also imported the [`Animal` *type*](articles/that-type) since we defined these with the same name. This single import will allows us to:

 - **Create** a new animal
    - `Animal.snake('Steve')` — *value*: `{ type: 'snake', name: 'Steve', pattern: 'striped' }`
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

With these building blocks we're ready to write some elegant code. Let's implement the `describeAnimal` function with the [`match`](use/matching) utility.

### Match

Match is a great tool to **process** a variant of unknown type. The function will accept a variant object (*animal*) and a handler object. Think of each entry of the handler like a branch that might execute. We'll have to describe how to deal with every option to be safe. 

In this case, let's describe how each animal is relaxing in the bedroom.

```typescript
import {match} from 'variant';

const describeAnimal = (animal: Animal) => match(animal, {
    cat: ({name}) => `${name} is sleeping on a sunlit window sill.`,
    dog: ({name, favoriteBall}) => [
        `${name} is on the rug`,
        favoriteBall ? `nuzzling a ${favoriteBall} ball.` : '.' 
    ].join(' '),
    snake: s => `${s.name} is enjoying the heat of the lamp on his ${s.pattern} skin`,
});
```

If any of this syntax looks unfamiliar, take a look at ES6 [lambda expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), and [parameter destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_function_parameter) features. 

****
**[`match`](api.md#match)** is...
  - **exhaustive by default**. If you only need to handle some cases, use [`partialMatch`](api.md#partialmatch).
    - *Exhaustiveness* means if you add a new animal, TypeScript will remind you to update the `describeAnimal` function! No more tedious guesswork.
 - **pure TypeScript.** This will work on any valid discriminated union, made with [`variant`](api.md#variant) or not.
 - **well typed**. `match`'s return type is the union of the return types of all the handler functions.
 - **familiar**. It's meant to imitate the [OCaml / Reason ML **`match`** statement](https://ocaml.org/learn/tutorials/data_types_and_matching.html#Pattern-matching-on-datatypes).
 - **flexible**. By default `match` switches on the `type` property but that can easily be overridden.

:::note
[**match**](api.md#match) has a little sister named [**lookup**](api.md#lookup), for when you don't need to use any properties from the variant.

```typescript
const cuteName = lookup(animal, {
    cat: 'kitty',
    dog: 'pupper',
    snake: 'snek',
});
```
:::

### Grouping

Earlier we defined `Animal` using the [`variantModule`](use/grouping#variantmodule) function. This is often the most convenient method, but it's also perfectly valid to use the [`variantList()`](use/grouping#variantlist) function or to construct the `Animal` object directly.

> Here's `variantList()`
```typescript
const Animal = variantList([
    variant('dog', ...),
    variant('cat', ...),
    variant('snake', ...),
])
```

> ...and this is the direct approach.
```typescript
const Animal = {
    dog: variant('dog', ...),
    cat: variant('cat', ...),
    snake: variant('snake', ...),
}
```

Feel free to mix and match styles. This is discussed further in [the page on grouping variants.](use/grouping)

### Applications

**Variant** is a language feature disguised as a library. As such, it's relevant to any type of application. I find myself eventually including variant in every project I write, to the point that I include it in my template repo along with my logger of choice, [daslog](https://github.com/paarthenon/daslog) (which also uses variant 🤣).

However there are certainly applications where variants *excel*

 - **Actions**. Variant types are the ideal solution for expressing a set of possible actions that need dispatching. That's exactly why this example is used in every conversation about discriminated unions.
 - **Optionals and result objects**. The [`Option<T>` type](https://en.wikipedia.org/wiki/Option_type) is familiar and loved for good reason. Variants allow you to express this and more powerful versions of result types with partial success and progress information.
 - **Compilers and interpreters.** Variants closely mirror the recursive rule definitions of S-langs. Expressing grammars in TypeScript feels natural and is feasible with this project's support for recursive and generic types.
 - **Heterogeneous** (mixed) **lists**. These are the best way to express heterogeneous lists that can still be unzipped into separate, well-typed parts. Job or task systems tend to love having access to heterogeneous lists for the task queue, a list made up of different types of jobs.


### Continued

There's more to come. The next page, [Motivation](./motivation), is background information for new and interested readers. *This next section is safe to skip*. It explains why variant matters and what a vanilla TypeScript approach would look like. The [Usage Guide](use/variant) goes over the practical things you need to know and is the next place I'd look as a new user wanting to get things done. [Articles](articles/that-type) are loose writings addressing specific topics. Finally, [the API Reference](api) is available for details on every function and type.