---
id: matching
title: Matching
---

Pattern matching is the crown jewel of variant types. In general, pattern matching compares a given object to a series of patterns and executes the relevant code block when a match is found. Variant features a match expression and several more specific versions for use depending on the situation.

:::note Glossary: Exhaustiveness
The term **exhaustive** gets tossed around a lot when talking about variant types, especially in the term **exhaustiveness checking**. Simply speaking, it's a check for whether or not you've handled all the possibilities. Having access to this feature *greatly* simplifies refactoring because breaking changes to the variant (adding a new case, for example) will point you to every point in the code that then needs to add support for that case to its handler.
:::

## `match()` 

The `match` expression inspects the type of an unknown variant and executes the code relevant to that type.

```typescript
/**
 * Describe how some animal is lounging around the player's room.

 *  returns: description [string]
 * */
const describeAnimal = (animal: Animal) => match(animal, {
    cat: ({name}) => `${name} is sleeping on a sunlit window sill.`,
    dog: ({name, favoriteBall}) => [
        `${name} is on the rug`,
        favoriteBall ? `nuzzling a ${favoriteBall} ball.` : '.' 
    ].join(' '),
    snake: s => `${s.name} is enjoying the heat of the lamp on his ${s.pattern} skin`,
});
```
Not only was `describeAnimal()` able to capture the serene beauty of domestic life with a pet, it did so while referencing information *specific* to the pet, like the color of a dog's favorite ball or the pattern of a snake's skin. It also did so without requiring any casting, null checks, or type checks on the part of the user. 

The `match()` function includes **exhaustiveness checking**. `describeAnimal()` will gain the ease of mind of knowing its covered all the bases. If the intention is to not handle every case, use [`partialMatch()`](matching#partialmatch)

### The Handler

The second object `match` expects is the *handler*. It's an object with a property for each case of the unknown variant. The property key is the case's `type` and the value is a function that takes a variant of that type and returns... well... anything.

> Given `Animal` has possible types `dog`, `cat`, and `snake`, this is the type of the handler.
> ```typescript
> {
>    dog: (x: Animal<'dog'>) => any,
>    cat: (x: Animal<'cat'>) => any,
>    snake: (x: Animal<'snake'>) => any,
> }
> ```

The syntax seen in the code is enabled by [destructuring the parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) of [arrow functions](https://basarat.gitbook.io/typescript/future-javascript/arrow-functions).

### The Return Type

The return type of a `match()`expression will respect TypeScript's type inference. If every branch returns a number, the type of the expression will be `number`. If there are a variety of types returned, `match`'s return type will be the union of those types.

```typescript
// rate from 1-10
const rating = (a: Animal) => match(a, {
    dog: ({name}) => name === 'Chewbacca' ? 10 : 7, 
    cat: _ => 5,
    snake: ({name}) => name.startsWith('S') ? 7 : 4,
})
```
**type:** `const rating: (a: Animal) => number`

:::note Arguments named `_`
Use `_` as the label for throwaway arguments in the handler functions. This convention is concise and helps limit `tsc`'s whining when the `noUnusedParameters` flag is on.
:::

Now let's pretend I made a mistake while typing `4`, and accidentally wrote `'4'`.
```typescript {4}
const rating = (a: Animal) => match(a, {
    dog: ({name}) => name === 'Chewbacca' ? 10 : 7, 
    cat: _ => 5,
    snake: ({name}) => name.startsWith('S') ? 7 : '4',
})
```

**type:** `const rating: (a: Animal) => number | "4"`

Thanks to this feature, this slip-up will raise a compiler error when the result of `rating()` is used where a number is expected.

### Inline Matching

As a type-safe and elegant flow control expression, `match` can be used inline as part of other expressions. These can be language features or elements of other libraries.

**Filtering a list of variants**. Heterogeneous lists are a #1 use case for variants. Matching that list to make decisions allows for some very succinct and powerful code.

```typescript
/**
 * Filter to the animals that are just quake-in-your-booties cool.
 *  - cool cats haven't broken anything in a week
 *  - cool dogs like red balls
 *  - every snake is cool
 */
const coolAnimals = animals.filter(a => match(a, {
    cat: ({daysSinceDamage}) => daysSinceDamage > 7,
    dog: ({favoriteBall}) => favoriteBall === 'red',
    snake: _ => true,
}));
```

**Last minute color selections.** Conveniently switch based on type for various properties. Since literals are retained, this even works for fields like the react library [@blueprintjs/core]()'s `icon` property which is required to be a valid literal from a selection. 
```typescript
<Icon
    icon='upload'
    color={match(uploadState, {
        sucess: _ => 'green',
        failure: _ => 'red',
    })}
/>
```
- Though [`partialLookup`](matching#partiallookup) is a better candidiate here.

### `partialMatch()`

Specifically for when you don't want to handle every case. Optionaly use `??` to provide default behavior.

```typescript
const favoriteBallColor = (a: Animal) => partialMatch(a, {
    dog: ({favoriteBall}) => favoriteBall,
}) ?? 'none';
```

### `matchElse()`

> A hybrid between `match()` and `partialMatch()`.

The `matchElse()` function lets a user handle the specific cases they want, like partialMatch, but then collects the type that the handler *didn't* have branches for and passes that union into a function.
```typescript
const attributeToString = (attr: Attribute) => matchElse(attr, {
    Filename: ({payload}) => `Filename: ${payload}`,
    Resolution: ({width, height}) => `Resolution: ${width} x ${height}`,
}, rest => `Unknown Attribute: ${rest.type}`);
```
## `lookup()`

A much simpler kind of pattern matcher, `lookup()` leverages a [lookup table](https://en.wikipedia.org/wiki/Lookup_table) and uses the `type` property of the object as the key.

```typescript
const cuteName = lookup(animal, {
    cat: 'kitty',
    dog: 'pupper',
    snake: 'snek',
});
```
### `partialLookup()`

The same as before, but none of the properties are required. If there is not a branch that matches the variant's type, this function returns `undefined`.
```typescript
<Icon
    icon='upload'
    color={partialLookup(uploadState, {failure: 'red'})}
/>
```