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
 *
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

The `match()` function includes **exhaustiveness checking**. `describeAnimal()` will gain the ease of mind of knowing its covered all the bases. 

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

Now this would never happen, of course, but let's pretend I made a mistake while typing `4`, and accidentally wrote the string `'4'`.
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
 *  - cool cats haven't damaged any furniture
 *  - cool dogs like red balls
 *  - every snake is cool
 */
const coolAnimals = animals.filter(a => match(a, {
    cat: ({furnitureDamaged}) => furnitureDamaged === 0,
    dog: ({favoriteBall}) => favoriteBall === 'red',
    snake: _ => true,
}));
```

**Last minute color selections.** Conveniently switch based on type for various properties. Since literals are retained, this even works for fields like the react library [@blueprintjs/core](https://blueprintjs.com/)'s `icon` property which is required to be a valid literal from a selection. 
```typescript
<Icon
    icon='upload'
    color={match(uploadState, {
        sucess: _ => 'green',
        failure: _ => 'red',
    })}
/>
```

### Partial Matching


Sometimes it won't be necessary to handle every case, or many cases can be handled in the same way. In this scenario, add a default handler. There are two simple ways to do this.

 1. Add a `default` case to the handler object

    ```typescript
    const rating = (animal: Animal) => match(animal, {
        cat: _ => 1,
        default: _ => 2,
    });
    ```
    The input to the `default` case is the full union (`Animal`).
 1. Add a second parameter to handle the 'else' clause. This is sometimes called the _**`match-else`**_ overload.
    ```typescript
    const rating = (animal: Animal) => match(animal, {
        cat: _ => 1,
    }, _ => 2);
    ```
    The input to this function is more specific. Since we handled `cat` the type of `_` for the else clause isn't `Animal`. It's the more specific subset `Animal<'dog'> | Animal<'snake'>`. As always, users are free to reference any properties common to that union. 
    ```typescript
    // describe a file attribute
    const attributeToString = (attr: Attribute) => match(attr, {
        Filename: ({payload}) => `Filename: ${payload}`,
        Resolution: ({width, height}) => `Resolution: ${width} x ${height}`,
    }, rest => `Unknown Attribute: ${rest.type}`);
    ```

### Match Helpers

I have added two functions to assist with common use cases.

 1. Returning a constant (**`just()`**).

    As a user engages with match more, their ring finger may become tired from typing excessive numbers of `() =>` and `_ =>`expressions. I've made the function `just()` available as shorthand for this use case. `just(x)` returns a function `() => x`.

    Note that `just()` can also be used in variant *creation* as a way of creating a case that takes no parameters and yet returns an object with multiple fields.
 2. Extracting the payload (**`unpack()`**).

    `payload<T>()` is an extremely commonly used function. Instead of repeatedly typing `({payload}) => payload` in order to extract the data, use `unpack`.

```ts
// Variant variety (payload, fields, empty).
const Test1 = variantModule({
    Alpha: payload<string>(),
    Beta: fields<{prop: string}>(),
    Gamma: {},
});
type Test1<T extends TypeNames<typeof Test1> = undefined> = VariantOf<typeof Test1, T>;

// Example of unpack, the regular way of doing things, and just.
const test1Result = (thing: Test1) => match(thing, {
    Alpha: unpack,
    Beta: ({prop}) => prop,
    Gamma: just('gamma'),
});
```

## 🔮 `matcher()` 

:::note Preview Content
🔮 denotes preview content. These are features that are available, but not well-documented and may be modified in the near future as they see better integration.
:::

The `match` function is wonderful, but requires explicit handling of individual cases and so can be tiresome to use when multiple cases follow the same flow. This library provides an alternate matching tool called `matcher()` that operates in a builder pattern. Here's our original describeAnimal function, but with a `matcher()` instead.

```typescript
const describeAnimal = (animal: Animal) => matcher(animal)
    .when({
        cat: ({name}) => `${name} is sleeping on a sunlit window sill.`,
        dog: ({name, favoriteBall}) => [
            `${name} is on the rug`,
            favoriteBall ? `nuzzling a ${favoriteBall} ball.` : '.' 
        ].join(' '),
        snake: s => `${s.name} is enjoying the heat of the lamp on his ${s.pattern} skin`,
    })
    .complete();
```

It seems pretty familiar. This function shines when we can combine branches, so let's do that here. Unlike a snake, cats and dogs both have fur and enjoy having it pet.

```typescript
const describeAnimal = (animal: Animal) => matcher(animal)
    .when({
        snake: s => `${s.name} is enjoying the heat of the lamp on his ${s.pattern} skin`,
    })
    .when(['cat', 'dog'], ({name}) => `${name} is hoping you will pet their fur.`)
    .complete();
```

The matcher type is smart enough to understand which cases have already been handled. Attempting to handle a case twice will result in a compiler error. The `.complete()` function is only available when all cases are handled. Partial matching is still entirely possible by using `.execute()` instead.

****

Let's take a look at `matcher()` in detail. This function accepts a single object as its only parameter. It returns a `Matcher<T, H, K?>` where T is the instance of the variant, H is the current state of the handler object being built, and K is an optional type key (if your variants do not use `type` and instead use `__typeName` or `kind`).

The return type of `matcher()` follows the same rules as `match()` (it will be a union of the handler return types). To actually *execute* the matcher, use one of its **terminal** methods, like `complete()`.

### To use this function

 1. **Call `matcher()` on a variable** to create the matcher object.
    ```ts
    const greeting = matcher(animal)
        ...
    ```
 1. **Handle one or more cases** with one or more `.when()` calls.
    
    The `.when()` method has two overloads.

    1. The first accepts an object, which will operate just like `match()`
    
        ```ts
            ...
            .when({
                snake: just('Hello, snake.'),
            })
        ```

    1. The second accepts an array of keys a function to handle the variant types corresponding to those keys.
        ```ts
        ...
        .when(['cat', 'dog'], just('Hello, furry one.'))
        ```
        Just like `isType`, it's okay to use the constructor in this array instead.
        ```ts
        ...
        .when([Animal.cat, Animal.dog], just('Hello, furry one.'))
        ```
 1. **Execute the handler** with a **terminal** method. So far you've seen `complete()`, but that won't always be applicable or even available. The `complete()` method only exists on the matcher if every case has been handled. There are three terminals, `.complete()`, `.execute()`, and `.else()`.

    1. **`.complete()`** gives you **exhaustiveness checking**. This function will only be defined if the handler completely covers the variant. Adding a new case will raise a compiler error in the relevant matchers as the `complete()` function will disappear until the new case is handled.
    1. **`.execute()`** immediately executes the handler whether or not every case can be processed, a form of *partial matching*. If the handler is complete, `.execute()` is functionally equivalent to `.complete()`. However, if there are some cases unhandled, `.execute()` may return `undefined` (and the return type will be updated to reflect this).
    1. **`.else(e => ...)`** immediately executes the handler and processes any unhandled cases with the function passed into the `.else()` method. Another form of *partial matching*, this is most similar to the match-else overload of `match()`.


