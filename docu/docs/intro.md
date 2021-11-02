---
slug: intro
title: Introduction
---
> _**Variant** is a language feature disguised as a library._

Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domains and problem spaces. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](http://web.archive.org/web/20191018040436/https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

[🧠 Click here to jump straight to the API Reference](api/modules)

## Quick start

Variant has zero dependencies and doesn't need any setup.

```bash
yarn add variant@dev # npm install --save variant@dev
```

Let's use [`variant()`](book/creation) to describe a simple domain — **Animals**. Much like an enum, our `Animal` variant can be in one of several forms. Unlike an enum, our variant can carry *data* with each of its forms. 

For the game we're making, our player can have a pet cat, dog, or snake. We have different concerns for each animal, so we'll want to define them with distinct fields. The [`fields()`](api#fields) function is a useful shorthand here. We'll see more of how it works in the [first section of the User Guide](book/creation). For complete control over the creation process, including default inputs, side effects, or other complex logic, use a function. We'll do so for the snake constructor to give it a default pattern.

<a id="animal-ts"></a>

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

```ts twoslash title="animal.ts"
// @include: animal-variantOnly
export type Animal = VariantOf<typeof Animal>;
```

Let's take a closer look at that last line.

```ts twoslash
// @include: animal-variantOnly
// ---cut---
export type Animal = VariantOf<typeof Animal>;
//          ^?
```

> 🖱️ *Mouse users can hover over any term to see types thanks to [shiki-twoslash](https://shikijs.github.io/twoslash/)*.

Those familiar with TypeScript's discriminated unions will recognize this pattern. The goal of this library is not to replace discriminated unions, but rather to provide the best possible way to *work with them.*

### The power of `variant()`

Well... to work with them, and *to build on them*. The tools Variant provides offer more convenience, safety, and utility than the vanilla approach. Traditionally, a developer would define each form of a discriminated union as its own type, write a factory function for each of those types, and then manually place these types in a union (`type Animal = Dog | Cat | Snake`).

This process is error prone, repetitive, and confusing to new developers. Each of these problems multiply with scale. Adding a new case requires modifications in multiple locations and duplication of effort. Variant is based on the idea that the subtype (`Animal<'dog'>`) can be inferred from the return type of the dog constructor, and that the larger type `Animal` can be calculated from a set of these constructor functions. By grouping our cases in one place, we define the bounds of our [**domain**](glossary/#domain), automate the relation of these types, and provide clarity of intent.

But it's not just in how we construct the variants. **The experience as a consumer is significantly improved.** There's a lot that can be done with this single import. Because we used the name `Animal` for the value *and* the type, this statement will import both.

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
// ---cut---
import {Animal} from './animal';
```

#### Create new instances

With the object `Animal` (*a collection of tag constructors*) we can easily create new instances, even if custom logic is involved. Even though we never specified it, steve has striped skin. This comes from [`animal.ts`](#animal-ts), where the function we wrote to create snakes had a default parameter __pattern__ set to `'striped'`.  

```ts twoslash
// @noErrors
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';

// ---cut---
const cerberus = Animal.dog({name: 'Cerberus'});
const steve = Animal.snake('Steve');
```

#### Type the Union


With the type `Animal`, we can describe the shape of the union. It's our way of saying _this is some animal, but we don't know which one_. We can still access properties shared among all animals, like the name.

```ts twoslash
// @noErrors
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';

// ---cut---
declare var animal: Animal;
const type = animal.type;
const name = animal.name;
```

#### Type specific instances

We can access specific members of the union _(with the [full type annotation](articles/that-type))_

```ts twoslash
// @noErrors
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';

// ---cut---
declare var dog: Animal<'dog'>;
//           ^?
```

or define subsets:

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';

// ---cut---
type furryAnimal = Animal<'cat'> | Animal<'dog'>; // no snake
type furryAnimal2 = Animal<'cat' | 'dog'>; // same thing
```

:::note Next steps
Now that we can express the types we'll run into in our code, we can move on to handling them. Any of the familiar methods will work—`if` statements, `switch` statements, [maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) or [lookup tables](https://en.wikipedia.org/wiki/Lookup_table?)—but I would argue the most effective approach is [**pattern matching**](glossary#matching).

 - Unlike an `if` statement, multiple cases can be handled all at once.
 - Unlike the `if`/`switch` statement(s)
    - the match action is [**exhaustive**](glossary#exhaustive) by default.
    - the match functions are [**expressions**](glossary#expression) and can be used inline or in JSX.
 - Unlike maps and lookup tables, no explicit types are required.
:::

### Make me a `match()` [(🎻)](https://www.youtube.com/watch?v=jVGNdB6iEeA)

Variant's match functions allow us to directly express how to handle each scenario. We can leverage this case-specific logic to make decisions or to render things differently depending on the value at runtime. Let's help our player's **rival** decide on whether or not they want a specific animal as a pet. They are allergic to dogs, so dogs are a no-go. Cats are nice but the rival can't afford to replace furniture, so the cat has to have a history of good behavior. Any snake will do.

```twoslash include rivalWantsAnimal
function rivalWantsAnimal(animal: Animal) {
    return match(animal, {
        dog: _ => false,
        cat: ({furnitureDamaged}) => furnitureDamaged < 3,
        snake: _ => true,
        // - eom
    })
}
```
```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';
import {match, constant} from 'variant';
// ---cut---

// @include: rivalWantsAnimal
```
We can now use this function to evaluate some animal we come across, or we perhaps use it to filter a list of animals. 

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';
import {match, constant} from 'variant';

// @include: rivalWantsAnimal

declare const animals: Animal[];
// ---cut---
const potentialPets = animals.filter(rivalWantsAnimal);
```
Even though we never gave a return type for `rivalWantsAnimal`, `match()` has been written to work with [TypeScript's type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html), allowing the language to infer `boolean` as the correct return type. 

A simple form of [**conditional rendering**](glossary#conditional-rendering) would be to describe how an animal is relaxing. Each description could be a simple line or something more complex, and it could involve information about the animal.

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';
import {match} from 'variant';
// ---cut---

const describeAnimal = (animal: Animal) => match(animal, {
    cat: ({name}) => `${name} is lounging on the windowsill.`,
    dog: ({name, favoriteBall}) => (
        [
            `${name} is on the rug`,
            favoriteBall != undefined
                ? `, nuzzling a ${favoriteBall} ball.`
                : '.'
        ].join('')
    ),
    snake: ({name}) => `${name} is basking in the heat of the sun.`
})

const cerberus = Animal.dog({name: 'Cerberus', favoriteBall: 'red'});

console.log(describeAnimal(cerberus));
// Cerberus is on the rug, nuzzling a red ball.

```
> If this seems unfamiliar, take a look at ES6's [lambda expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), and [parameter destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_function_parameter) features. 

Just like before, TypeScript understands the return type of `describeAnimal`. It has been correctly inferred as `string`. We'll see a more detailed example of conditional rendering when we enter the React portions of the tutorial. Rest assured, Variant isn't a react library and doesn't actually have any react dependencies. Despite that fact, the two work together seamlessly thanks to a shared focus on functional principles and [**composability**](glossary#composability).

By that same token, because variants *are* discriminated unions and TypeScript understands them as such, `match()` doesn't actually need its target to have been created by `variant()`. Match can easily operate on the discriminated unions that are already within your code, and will work with models written by [codegen](glossary#codegen). Any valid discriminated union will work.

#### [Exhaustiveness](glossary#exhaustive) and Partial Matching

Matching is **exhaustive** by default, meaning that a user must handle *every* possibility before the compiler will be satisfied. As our result, our code is much more resilient. If we were to add a new type of `Animal` to the game, say a bird, then every place in the code we match against `Animal` will raise a compiler error. Don't mistake them, these errors are a beautiful thing—they are step-by-step instructions on how to safely incorporate bird logic into the codebase.


```ts twoslash {7}
// @include: animal-eov
    bird: fields<{name: string, canFly: boolean}>(),
});
```

With the bird type in place, autocomplete can help guide us implement our handlers. In VS Code, type `<ctrl>`+`<space>` to show the remaining cases.

![match autocomplete showing 'bird' and 'default'](/img/match_autocomplete.png)

With the new handler in place, the compiler is happy.

```ts twoslash {6}
// @include: animal-eov
    bird: fields<{name: string, canFly: boolean}>(),
});
export type Animal = VariantOf<typeof Animal>;

import {match, constant} from 'variant';
// ---cut---
// @include: rivalWantsAnimal-eom
        bird: ({canFly}) => canFly, // rival only wants flying birds
    })
}
```
However, there will be times when we don't want to handle each case individually, or may only be concerned with a subset of the cases. For those situations, we have **partial matching**. We activate it with the `partial` helper function. Let's create a function to decide on animals for a person who is obsessed with snakes.

```ts twoslash
// @include: animal-eov
    bird: fields<{name: string, canFly: boolean}>(),
});
export type Animal = VariantOf<typeof Animal>;
import {match, constant, just, partial} from 'variant';
// ---cut---

const slytherinFanWantsAnimal = (hopefullyASnake: Animal) =>
    match(hopefullyASnake, partial({
        snake: constant(true), // same as () => true, but nicer to fingers.
        default: just(false), // same as 'constant(false)'. Your choice.
    }))
```

:::note A faster way

In this special case where we are asking "is this a snake", match is overkill. We can use [`isType(hopefullyASnake, 'snake')`](api#isType).
:::

### Harder Better Faster `matcher()` [(🎸)](https://www.youtube.com/watch?v=gAjR4_CbPpQ)


There's an important scenario that is not possible with a regular match statement, but *is* possible with the traditional `switch`. By taking advantage of fallthrough cases, a switch statement can handle multiple cases at once, also known as **multi-matching**.

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';
import {match} from 'variant';
// ---cut---

const hasFur = (animal: Animal) => {
    switch(animal.type) {
        case 'cat':
        case 'dog':
            return true;
        case 'snake':
            return false;
    }
}
```

To access this feature with the benefits of variant's pattern matching, use the [`matcher()`](book/matcher) function.

This [builder-pattern](glossary#builder-pattern) alternative to match can construct the handler piece by piece. When all cases are handled, finish off with a `.complete()` statement (or other [terminal](book/matcher#terminal)) to execute the handler.

```ts twoslash
// @include: animal-eov
    // bird: fields<{name: string, canFly: boolean}>(),
});
export type Animal = VariantOf<typeof Animal>;
import {matcher, constant, just} from 'variant';
// ---cut---

const hasFur = (animal: Animal) => matcher(animal)
    .when(['cat', 'dog'], _ => true)
    .when('snake', _ => false)
    .complete();
```

#### Improved error reporting.

The `matcher()` function has better error reporting than `match()`. When cases are missing, it will raise an error explaining *exactly* which ones.

```ts twoslash
// @errors: 2349
// @include: animal-eov
    // bird: fields<{name: string, canFly: boolean}>(),
});
export type Animal = VariantOf<typeof Animal>;
import {matcher} from 'variant';
// ---cut---
const hasFur = (animal: Animal) => matcher(animal)
    .when('snake', _ => false)
    .complete();
```

#### Built-in tools

There are many options to the `matcher()`. For instance, it can act as a [lookup table](glossary#lookup-table), removing the need for `constant()`/`just()`.

```ts twoslash
// @errors: 2349
// @include: animal-eov
});
export type Animal = VariantOf<typeof Animal>;
import {matcher} from 'variant';
// ---cut---
const animalEmoji = (animal: Animal) => matcher(animal)
    .lookup({
        cat: '🐱',
        dog: '🐕',
        snake: '🐍',
    })
```

#### Scaling up

As the number of cases in a variant grows into the dozens, hundreds, or even thousands, it will become necessary to refactor these elements and handle them one subset at a time. The matcher is the ideal solution to delegate this handling based on these groups.

Animals, when it comes to domain modeling, are a bit like the arithmetic of a coding tutorial. They demonstrate the structures,
but more often your real-life programs will be more complex. In redux applications, for example, it's common to have a reducer, a function that takes a state and some descriptive action (_move to this tile, kill this enemy_) and returns a new state. As an application grows, it becomes necessary to separate reducer logic into smaller chunks. This is no problem. 

```ts
export const rootReducer = (state = initState, action: Action) => {
   return matcher(action)
      .when(types(DebugAction), _ => debugReducer(state, _))
      .when(types(AppAction), _ => appReducer(state, _))
      .when(types(GameAction), _ => ({...state, game: gameReducer(state, _))})
      .else(just(state)); // ignore redux init actions
}
```

My game logic (`GameAction`/`gameReducer`) is separated from my state saving and loading logic (`AppAction`/`appReducer`), which are both further separated from my developer cheat codes (`DebugAction`/`debugReducer`). 

## Variant Applications

*Variant is a language feature disguised as a library*. As such it's relevant to any type of application, and at only `3kb` zipped it's become very easy to include. I find myself using variant in every project I write, to the point that I import it in my personal template.

However there are certainly applications where variants *excel*.

 - **Actions**. Variant types are the ideal solution for expressing a set of possible actions that need dispatching. That's exactly why this example is used in every conversation about discriminated unions. It will come up in this documentation as well, as soon as [the next section](tutorial/part-one), in fact.
 - **Optionals and result objects**. The [`Option<T>` type](https://en.wikipedia.org/wiki/Option_type) is familiar and beloved for good reason as an alternative to null handling. Variants allow us to express this and even more powerful versions of result types with partial success and progress information.
 - **Compilers and interpreters.** Variants closely mirror the recursive rule definitions of S-langs. Expressing grammars in TypeScript feels natural and is feasible with this project's support for recursive and generic types.
 - **Heterogeneous** (mixed) **lists**. These are the best way to express heterogeneous lists that can still be unzipped into separate, well-typed parts. Job or task systems tend to love having access to heterogeneous lists for the task queue, a list made up of different types of jobs.

Variant is smoothly incorporated into existing codebases and should not be relegated to new projects. Recall that variant types simply _are_ discriminated unions. There's very little magic in the product, just its construction. Users may start refactoring from any part of their application while retaining a working build. You may wish to refactor your action creators yet continue processing them with the same old `switch` statement. Or take the opportunity to refresh your complex `switch` statements with the cleaner organization of [`match()`](book/match) or [`matcher()`](book/matcher) while leaving your current constructors in place. Some utilize the match functions but leave type creation entirely to codegen with GraphQL or protobuf.

*Flexibility* has been coded into Variant 3.0 from the gound up. The variants we saw were created with `type` as the [discriminant](glossary#discriminant), but this is simply the default. *Every* variant function can be keyed to a completely different common term, allowing the same level of functionality as `type` for unions that pivot on `kind`, `tag`, or GraphQL's `__typename`.
```ts
const {variant, match} = variantCosmos('kind'); // is all it takes
``` 
The software is open-source, actively maintained, and matures with each update. Every function in the library has its own test suite and documentation. This package has been trusted by individuals, corporations, and governments for mission-critical applications. 

## Next Steps

Thanks for sticking around to this point. The remainder of the documentation is broken down into the following sections to help intuitively understand the library. I recommend the tutorial. [Click here](tutorial/part-one), or the **Next** button below.

 - **The Tutorial**: An exploration into building **"Kind of Super"**, a text-based browser game that leverages variant to simplify a lot of the complexity in becoming a superhero and protecting a city from superpowered threats. Built on standard web technologies and eventually incorporating React + Redux, "Kind of Super" demonstrates *exactly* how to integrate variant into a codebase with real-world tooling.
 - **The Book**: A deep-dive into everything that's possible with these tools, and some things that aren't.
 - **Articles**: Assorted content. Things that are useful to know but don't fit well in a category.
    - See [replacing 'type' with 'kind' or '__typename'](articles/type-name).
 - **Libraries**: Comparisons to competitors, or How-To guides for compatible packages.
 - **API**: A full API reference for the library. Every function, every type, every meaning.
 - **Glosssary**: A consolidated dictionary of the esoteric terms I use.
