---
title: Procedural Generation
---

I'd like to generate an `Animal` to populate my little pet store. This is complicated by the fact that different animals require different parameters to create, or may need to be constructed in different ways.

To assist with this, variant creators come with a `type` property that broadcasts the type of variant they will return. Well... now we've got a collection of objects (*functions count*) that each possess a unique `type` property. That's a discriminated union, isn't it? The `match()` functions seem to think so :).

```ts
// get a random name for the animal.
declare function randomName(): string;

export function generateAnimal() {
    const animalCtrs = Object.values(Animal);
    const animalCtr = animalCtrs[Math.floor(animalCtrs.length * Math.random())];

    return match(animalCtr, {
        cat: c => {
            const furnitureDamaged = Math.floor(3 * Math.random());
            return c({name: randomName(), furnitureDamaged});
        },
        dog: d => d({name: randomName()}),
        snake: s => s(randomName()),
    })
}
```

So not only can we match on the instances, we can perform this same control flow analysis on collections of functions to streamline procedural generation or metaprogramming tasks. It's okay that `cat` needs some extra data to be generated, or that `snake` uses a custom function, we can handle that in the appropriate blocks of the handler. As functions, these blocks won't execute at all if we are passed a `dog` so we do not need to be concerned about the impact on other branches. 

### Multi-matching.

Procedurally generating results from a variant that may have one or more variations that all work the same way can be cleanly handled two ways:

#### `.else()` terminal

When every case that needs specific handling has been described, the remaining cases can be directly executed with no parameters. The [matcher](matcher)'s `.else()` function takes into account which cases have already been handled and only passes the remaining cases into the else's handler function. If all the remaining cases are empty variants, `.else(f => f())` should be type-safe.

```ts
// Code sample TBD
```

#### `.when([type1, type2], handlerForBoth)` method

The above `.else()` method only works if you have one group of similar cases. Should your application have multiple, use the multi-match API of the `.when()` clause.

```ts
// Code sample TBD
```