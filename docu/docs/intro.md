---
slug: intro
title: Introduction
---
> _**Variant** is a language feature disguised as a library._

Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](http://web.archive.org/web/20191018040436/https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

[🧠 Click here to jump straight to the API Reference](api.md)

## Quick start

Variant has zero dependencies and doesn't need any setup.

```bash
yarn add variant # npm install --save variant
```

Let's use [**Variant**](book/creation) to describe a simple domain — **Animals**. Much like an enum, our `Animal` variant can be in one of several forms. Unlike an enum, our variant can carry *data* with each of its forms. 

For this application, we care about dogs, cats, and snakes. These might be the various pets our player can have. We have different concerns for each animal, so we'll want to define them with distinct fields. The [`fields`](api#fields) function below is shorthand to help do this. We'll see more of how it works in the [first section of the User Guide](book/creation).

<a id="animal-ts"></a>

```twoslash include animal
import {variant, fields, VariantOf} from 'variant';

export const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
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

This process is error prone, tedious, and confusing to new developers. Adding a new case requires modifications in multiple locations and duplication of effort. Variant is based on the idea that the subtype (`Animal<'dog'>`) can be inferred from whatever the `dog()` function returns, and that the larger type `Animal` can be calculated from a set of these constructor functions. By grouping these cases in one place, we define the bounds of our [**domain**](glossary/#domain), automate the relation of these types, and provide clarity of intent.

But it's not just in how we construct the variants. **The experience as a consumer is significantly improved.** For example, there's a lot that can be done with this single import. Because we used the name `Animal` for the value and the type, this statement imports them both.

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
// ---cut---
import {Animal} from './animal';
```

#### Create new instances

With the const `Animal` (*a collection of tag constructors*) we can easily create new instances, even if custom logic is involved. Creating steve added a __pattern__ property set to `'striped'`, thanks to the default property of the `snake()` creator from [`animal.ts`](#animal-ts).  

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

With type `Animal`, we can describe the shape of the union. It's our way of saying _this is some animal, but we don't know which one_. Even when we aren't aware of the specific type, we can access properties shared among all animals.

```ts twoslash
// @noErrors
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';

// ---cut---
declare var animal: Animal;
const type = animal.type;
const nombre = animal.name;
```

#### Type specific instances

With the [full type](articles/that-type) for `Animal`, we can access specific members of the union.

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

I have **3** possible `Animal`s, and there are going to be times where I'll need to decide how to proceed based on the specific type. In my ideal world, I could just write what I want to happen in each scenario. Those instructions could pull data from the animal itself. I can be absent-minded, so it would be great to have some kind of assurance that I've handled every case. I can also be lazy, so autocompletion and strong implicit typing wouldn't hurt.

Somebody once told me to be the change I wanted to see in the world.

```ts twoslash
// @filename: animal.ts
// @include: animal-fullType
// @filename: index.ts
import {Animal} from './animal';


```



Be the change you want to see. 

Pattern matching is the crown jewel of variant types.  It lets us consolidate the logic to handle each variations we might receive in a 


 - developer experience of autocomplete
 - developer