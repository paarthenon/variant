---
title: Organization
---

Let's discuss some strategies for organizing variants as our applications grow.

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