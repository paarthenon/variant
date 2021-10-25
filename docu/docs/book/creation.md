---
title: Making Variants
---
```twoslash include animal
import {variant, fields, VariantOf} from 'variant';
 
export const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
});
export type Animal = VariantOf<typeof Animal>;
```

Variant aims to give the user complete control over how their objects are created. A variant's constructor may perform side effects, rely on asynchronous information, or generate objects of any kind.

A call to Variant must be accompanied by a **template** that expresses the possibilities of the variant. This template may be given as an object or an array.

> #### Object Templates
>
> ```ts twoslash
// @include: animal
```
>
> When given an object template, `variant()` will treat each property as one of the variations. The property's label will become the type and the value will be used to create a  factory function.
>
> #### Array Templates
>
> ```ts twoslash
import {variant, VariantOf} from 'variant';
// ---cut---
const Suit = variant(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
type Suit = VariantOf<typeof Suit>;
```
>
> In the array template, each element must be a string literal (which will become the empty variant `{type: T extends string})`, or a call to `variation()`, like so:
>
>```ts twoslash
// @include: animal
import {payload, variation} from 'variant';
// ---cut---
const Action = variant([
    'RefreshAnimals',
    'StartGame',
    variation('RescueAnimal', payload<Animal>()),
])
type Action = VariantOf<typeof Action>;
```

The object notation is recommended most of the time. The array notation is more convenient when most members of the variant are simple types with no data, but the object notation is a little clearer to read and will [forward documentation on the template down to the final constructors and interfaces](../articles/documentation).


## Defining Bodies

The body of a variant—the shape of the data carried by some particular form—is defined by a function. More specifically, it is defined by that function's return value. In our snake example from earlier, we returned an object containing the properties `name` and `pattern`, which we sourced from our inputs. 

When a variant is defined, it wraps the body of the function it receives into a new function. That new variant creator has the same inputs, and *almost* the same output (it merges in the `type` property).

Most of the time we will use helper functions like `payload()` or `fields()`, not because they increase our capabilities, but because they streamline how we think about and manage our domain.

:::note On Functions
The beautiful thing about using a function as the definition of a variant is that it is both the simplest option and the nuclear option. Functions are capable of

 - zero, one, multiple, [optional/default](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters), and [variadic](https://en.wikipedia.org/wiki/Variadic_function) parameters. 
 - arbitrary processing logic like validation.
 - asynchronous calls.
 - side effects like logging.
 - referencing [closures](https://basarat.gitbook.io/typescript/recap/closure).

Adding to that power, the objects they return may contain internal state, methods, and property accessors. In the few cases that isn't sufficient variants can also be generated from full classes with `construct()`.
:::

### For empty bodies

To express a case that has no data, use `nil`, or `{}`. Pick whichever speaks to you.

```ts twoslash
// @include: animal
import {payload, nil} from 'variant';
// ---cut---
const Action = variant({
    RefreshAnimals: {},
    StartGame: nil,
    RescueAnimal: payload<Animal>(),
});
```
Some syntax highlighters will interpret `{}` as a block and change the color of the key. If this bothers you, use `nil`

### For one piece of data

Use `payload<T>()`, *or* use a simple function to retain the name.

```ts twoslash
import {variant, VariantOf, payload} from 'variant';

const Something = variant({
    first: payload<string>(),
    second: (label: string) => ({label}),
})
type Something = VariantOf<typeof Something>;
//    ^?
```

### For one or more named fields

The `fields<T>()` function from earlier allows us to do this.

```ts twoslash
// @include: animal
```


### For classes

Use `construct()` to work with classes. This function can accept anonymous class definitions, or work with previously defined classes in-scope to support `instanceof` checks down the road. Let's make a class-based dog with some internal state

```twoslash include dogClass
class Dog {
    constructor(
        private barkVolume: number
    ) { }

    public bark() {
        // can access class members.
        const msg = this.barkVolume > 5 ? 'BARK' : 'bark';
        console.log(msg);
    }
}
```
```ts twoslash
// @include: dogClass
```
This class can be incorporated in our new version of `Animal`.
```ts twoslash {2, 19-20}
// @include: dogClass
import {variant, construct, VariantOf} from 'variant';
// ---cut---
const ClassyAnimal = variant({
    dog: construct(Dog),
    cat: construct(class {
        public furnitureDamaged = 0;
    }),
    snake: construct(class {
        constructor(
            private color: string,
            private isStriped: boolean = false,
        ) { }

        get skin() {
            return `${this.isStriped && 'striped '}${this.color}`;
        }
    })
});
type ClassyAnimal = VariantOf<typeof ClassyAnimal>;

const dog = ClassyAnimal.dog(4);
const isDog = dog instanceof Dog; // true!
```

## Computed Keys

In the earlier examples we defined a variant template as an object literal. The keys of the literal are what will become the types of each variant. However, the library is perfectly happy to accept computed keys including constants objects or string literals.

```ts twoslash
import {variant, fields} from 'variant';
// ---cut---
export const AniType = {
    dog: 'dog',
    cat: 'cat', 
    snake: 'snake',
} as const;

export const Animal = variant({
    [AniType.dog]: fields<{name: string, favoriteBall?: string}>(),
    [AniType.cat]: fields<{name: string, furnitureDamaged: number}>(),
    [AniType.snake]: (name: string, pattern: string = 'striped') => ({name, pattern}),
})
```
The `AniType` definition would be a good use of catalog.

```ts twoslash
import {variant, fields, catalog} from 'variant';
// ---cut---
export const AniType = catalog(['dog', 'cat', 'snake']);
```

It's also possible to use a string enum to similar effect.

```ts twoslash
export enum AniType {
    dog = 'dog',
    cat = 'cat', 
    snake = 'snake',
}
```

## Top-level Constructors

I find great utility in consolidating the relevant cases, but I'm sympathetic to the desire to have these tag constructors as top-level functions in the scope, rather than being under `Animal`. This works just fine. The object `Animal` is very intentionally just a loose collection of the constructors, destructure or regroup it as you wish.

```ts twoslash
import {variant, fields, TypeNames, VariantOf} from 'variant';

const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
});
// ---cut---
export const {cat, dog, snake} = Animal;

const garfield = cat({name: 'Garfield', furnitureDamaged: 12});
const echidna = snake('Echidna', 'speckled');
```

The instance type for `cat` can be retrieved as `ReturnType<typeof cat>`. However. there's nothing wrong with exporing the constructors at the top level and also exporting the Animal type. Doing so means consumers still have the ability to type something as `Animal<'cat'>`, which will save you some typing and duplication of effort.

Under the hood, `variant()` creates variant constructors by calling the function `variation()`. This function can be used directly to create variant constructors at the top level.

```ts twoslash
import {variation} from 'variant';

const snake = variation('snake',  (name: string, pattern: string = 'striped') => ({name, pattern}));
const echidna = snake('Echidna',  'speckled');
```
## Catalog

Use a catalog when you don't need state and just want a group of literals types. These objects are essentially maps of constants. The most common case takes an array of strings. In this scenario, it is essentially the same as the common [`strEnum`](https://github.com/basarat/typescript-book/blob/master/docs/types/literal-types.md) function.

```ts twoslash
import {catalog} from 'variant';
// ---cut---
const Suit = catalog(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
type Suit = keyof typeof Suit;
```

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