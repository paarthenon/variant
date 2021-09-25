---
slug: new-in-3.0
title: New in Variant 3.0 ✨
---

Variant 3.0 brings some significant and exciting changes to the library. It has been written from the ground up to be more flexible, powerful, and usable than ever before. Documentation has been integrated more tightly into all types and functions. The benefit of experience has inspired the removal or restructuring of some functionality and the implementation of much more.

# Overall

## The great name swap

The first breaking change involves the function `variant()`. In previous versions of the library, the `variant` function was used to create a tag constructor (redux users, think `createAction`). While this was originally the only way to create a variant, later versions of the library introduced [variantModule](api#variantModule) and [variantList](api#variantList), functions that could construct a variant from either an object or list template respectively. With the utility these new functions offered, `variant()` was almost never used. Its only remaining purpose was to create a distinction between the name of a tag constructor and its underlying type. When used it could not compose with variantModule or variantList. Eventually it no longer made sense for a function with so little purpose to hold prime real estate in the API.

The `variant()` function now, as may be expected, creates a variant. It can accept *either* the object template of variantModule or the list template of variantList. It has also been built to synergize with newly introduced helper functions to achieve generic variants.

The old functionality is held in `variation()`, the factory function for constructors of one *form* of a variant. Even here, functionality has improved. `variation()` now works within calls to `variant()`.

```ts
const variant = variant({
    dog: ...,
    cat: ...,
    boa: variation('BoaConstrictor'),
})
```

## No more `"type"`-first.

Previously, the `type` field was assumed to be the default and everything was built against that. This caused a divide in the library and its functionality as things tended to be written with `"type"` in mind and then later generalized. However, this was not ideal and that generalization did not always happen.

For variant 3.0, we will be absolutely sure that the library has first-class support for other discriminants like `kind`, `tag`, and `__typename` by writing for the general case and instantiating the default `type`-focused functions as a special case of the more general library.

This set of all entities in the library concerned with the discriminant can be accessed through `variantCosmos()`. Destructuring the return value provides direct access to these functions.

```ts
export const {isType, match, variant, variation} = variantCosmos({key: 'type'});

// simply change the key type.
export const {isType, match, variant, variation} = variantCosmos({key: '__typename'});
```

## Improved documentation.

Comments left on variants will now propogate to the resulting functions and objects. 

See [the full article](articles/documentation) for more info.

# Matching

Both `match` and `matcher()` have received major changes in 3.0.

The functions `lookup`, `partialLookup`, and `partialMatch` have been removed.

A `prematch()` function was introduced.

## Literals

The `matchLiteral()` function has been removed. Instead, an `ofLiteral` helper function has been provided that lifts a literal union to a discriminated union. Every match function can simply proceed from there.

```ts
return match(ofLiteral(colorMode), {
    'light': _ => <FaSun />
    'dark': _ => <FaMoon />
})
// or
return matcher(ofLiteral(colorMode)).lookup({
    'light': <FaSun />,
    'dark': <FaMoon />,
})
```

## Death of `lookup()`

Both `lookup()` and `partialLookup()` have been removed. This functionality lives on in `matcher().lookup()` (with `.register()` for partials). The regular match functcion can approximate with `constant()`.

## `matcher()`

Matcher has been rewritten and should be *much* easier to contribute to. It's also the first use of a `class` within the library. Go figure.

### Improved exhaustiveness messaging

Through the magic of conditional types, `matcher()` can now report *exactly* which keys are missing from the handler. Attempting to complete a matcher with an incomplete handler will result in the following error message:

```ts
This expression is not callable.
  Type 'VariantError<["The handler has not been fully completed. Keys", "snake" | "bird", "expected"]>' has no call signatures.ts(2349)
```

indicating that snake and bird still need to be handled.

### New exhaustive terminal

This new terminal, `.exhaust()` forces the remaining cases of the matcher to be handled. The matcher will be immediately executed now that the handler is certainly complete. 

```ts
const describeAnimal = (a: Animal) => matcher(a)
    .when('dog', ({favoriteBall}) => `The dog is playing with their ${favoriteBall}-colored ball.`)
    .exhaust({
        cat: constant('The cat is scratching their post'),
        snake: constant('The snake is sunning their skin.'),
    })
;
```

As a terminal, it also enables a better inline experience.

```tsx
<IconButton
    icon={matcher(animal).exhaust({
        cat: _ => '🐱',
        dog: _ => '🐕',
        snake: _ => '🐍',
    })}
    text='...'
/>
```

### New handling for lookups, including terminal

With the removal of `lookup()`, the `matcher()` seemed a perfect place for that functionality.

As a terminal, like `exhaust()`, it will close out a matcher. Unlike `exhaust()`, it requires a *lookup table* rather than a handler object. In many cases this can be a more useful abstraction. Here are the same code samples made better.

```ts
const describeAnimal = (a: Animal) => matcher(a)
    .when('dog', ({favoriteBall}) => `The dog is playing with their ${favoriteBall}-colored ball.`)
    .lookup({
        cat: 'The cat is scratching their post',
        snake: 'The snake is sunning their skin.',
    })
;
```

```tsx
<IconButton
    icon={matcher(animal).lookup({
        cat: '🐱',
        dog: '🐕',
        snake: '🐍',
    })}
    text='...'
/>
```

There is a `.register()` function to set these up ahead of time.

```
const cuteName = (a: Animal) => matcher(a)
    .register('dog', 'pup')
    .lookup({
        cat: 'kitten',
        snake: 'noodle',
    })
```

These integrate well with the existing parts of the matcher. Feel free to mix and match calls to `.when()` and `.register()`. 


## prematch

Match on a type ahead of time. 

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

# Variant Creation

## Class-based variants

Classes have been getting some love recently from the language designers and are preferred coding style by some developers. 3.0 will bring support for classes as parts of a variant definition. This library was built off factory functions, not class constructors. Thankfully, the former can easily wrap the latter.

I've provided a `construct()` helper function that will allow class definitions wherever variant bodies are required.

```ts
const ClassyAnimal = variant({
    dog: construct(class {
        constructor(
            private barkVolume: number;
        )
        public bark() {
            return (this.barkVolume > 5) ? 'BARK' : 'bark';
        }
    }),
    cat: construct(Cat), // predefined
    snake: construct(class {
        public pattern = 'striped';
    })
});

const cat = ClassyAnimal.cat();

const isCat = cat instanceof Cat; // true!
```

## Generics

