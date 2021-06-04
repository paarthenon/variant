---
title: Organization
---
Managing variants as they grow.

You might want to do this for
 - logical grouping
 - performance. (large discriminated unions can slow down type checking). 

A variant definition is, very simply, an object comprised of 0 or more tag constructors. There are no other properties. This enables the direct enumeration of variants.

> TODO: Add a for key in variantDefiniton { } loop code sample.

```ts
// Every single one of these is equivalent. 
const V0 = Animal; // assignment
const V1 = {...Animal}; // shallow clone
const V2 = variant(Animal); // variant passthrough
const V3 = variant({...Animal}); // variant passthrough of a shallow clone
const V4 = variant([...Object.values(Animal)]); //
```

### Recombination

A variant can be grouped, subsetted, concatenated, etc.

```ts

const Reptiles = variant([
    Animal.snake,
])

```

### Compose

Make variants *members* of other variants. This is especially useful in different types of settings. 


****

Possibly
 - augmentation, lets you patch some object. 
 - remotes (experimental)
