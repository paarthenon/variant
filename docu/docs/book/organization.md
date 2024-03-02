---
title: Organization
---

As an application grows, managing a list of options in the dozens or hundreds can be difficult to do in one place. Users are encouraged to create smaller variants (across files as appropriate) which are then combined to generate these larger unions.

## Extending a variant

A variant definition can be used as the base for a larger variant definition. Simply use the ES6 spread operator to pre-populate the values of the variant expression. 

```ts

const MoreAnimal = variant({
    ...Animal,
    bird: fields<{
        name: string;
        flying: boolean;
    }>(),
})

```

## Merging
Let's say we have two variants, creatively named `Variant1` and `Variant2`.

```ts
const Variant1 = ...
const Variant2 = ...

const CombinedVariant = variant({
    ...Variant1,
    ...Variant2,
})
```

If we wanted a `CombinedVariant` with the properties of both, we could merge them together, again leveraging the ES6 spread operator.

- ! Be aware that name conflicts will be handled the same way they are in ES6—latest wins. If `Variant1` and `Variant2` define the same variation in two different ways, it's `Variant2`'s definition that will be used in `CombinedVariant`

### Mechanics

The `variant()` function is designed to pass through existing instances. If a variant creator is detected, it will be passed on without modification. The resulting variant is simply an object collecting together some constructor functions.

```ts
// Every single one of these is equivalent. 
const V0 = Animal; // assignment
const V1 = {...Animal}; // shallow clone
const V2 = variant(Animal); // variant passthrough
const V3 = variant({...Animal}); // variant passthrough of a shallow clone
const V4 = variant([...Object.values(Animal)]); //variant passthrough of list of Animal constructors.
```
The only difference between the forms is that `V4` potentially lost [property documentation](../articles/documentation) when it was transformed into an array.

### Recombination

A variant can be grouped, subsetted, concatenated, etc.

```ts

const Reptiles = variant([
    Animal.snake,
])

```

### Composition

Make variants *members* of other variants. This is especially useful in different types of settings. 


****

Possibly
 - augmentation, lets you patch some object. 
 - remotes (experimental)



You might want to do this for
 - logical grouping
 - performance. (large discriminated unions can slow down type checking). 

A variant definition is, very simply, an object comprised of 0 or more tag constructors. There are no other properties. This enables the direct enumeration of variants.

> TODO: Add a for key in variantDefiniton { } loop code sample.