---
title: "Creating Variants"
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

A call to `variant()` must be accompanied by a **template** that expresses the possibilities of the variant. This template may be given as an object or an array.

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
## Complications
If only real-world use always resembled ideal cases. Here are some ways to complicate the setup for various purposes.

- Computed keys allow for the type literals to be based on a pre-existing enum or const object.
- Top-level constructors allow for fp-like tags (though be warned, they are still polymorphic variants)
- Labels that don't match the type literals they generate can be useful for scoped types or supporting legacy protocols.

### Computed Keys

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

It's also possible to use a string enum to similar effect.

```ts twoslash
export enum AniType {
    dog = 'dog',
    cat = 'cat', 
    snake = 'snake',
}
```

Though my recommendation for `AniType`'s definition would be [catalog](catalog).

```ts twoslash
import {variant, fields, catalog} from 'variant';
// ---cut---
export const AniType = catalog(['dog', 'cat', 'snake']);
```

### Top-level Constructors

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

### Differing key labels and names

In many cases, the label used when referring to a variant is exactly what is used in the underlying `type` field. However, this is not always desirable.

 - Sometimes coding conventions will dictate `camelCase` or `PascalCase` names while database/network conventions will demand `ALL_CAPS`.
 - The `UPPER_SNAKE_CASE` format has historically been the most common naming scheme for constant values. Perhaps you'll need to support them to support existing code or data models.
 - In larger codebases, it may be necessary to start introducing scopes to avoid name collisions. These might look something like `@player/update` or `AUDIT::END_RECORDING`. These strings contain special characters and so are not valid property names, but may be required by your code. Ideally, the variant creators would manage that complexity.

Using `variation()` resolves these concerns. The first parameter, the string, will be the *actual* underlying type (both at runtime and compile time). The second parameter is the function that will handle the rest of the body.

```ts twoslash
import {variant, variation, fields} from 'variant';

const Action = variant({
    DoSomething: variation('DO_SOMETHING'),
    LoadThing: variation('LOAD_THING', fields<{thingId: number}>()),
    RefreshPage: variation('REFRESH_PAGE'),
})

const doAction = Action.DoSomething();
doAction.type
//        ^?
```


`variation()` can also be used individually, similarly to `createAction`. 