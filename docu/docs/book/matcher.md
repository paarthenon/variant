---
title: Matcher (builder pattern)
---

Variant providers a `matcher()`, a builder-pattern API for match. Handle cases one or more at a time then execute whenever ready.

```ts
const describePetting = (animal: Animal) => matcher(animal)
    .when('snake', ({name}) => `You let ${name} wrap your hand.`),
    .when(['cat', 'dog'], ({name}) => `You stroke ${name}'s fur.`)
    .complete()
```

The `.complete()` function will not be callable unless every case has been appropriately handled. If any cases are missing, the error-inducing call to `.complete()` will report exactly which types remain.

For example, let's say we dropped a line from the previous code sample:

```ts {2}
const describePetting = (animal: Animal) => matcher(animal)
    .when('snake', ({name}) => `You let ${name} wrap your hand.`),
    .complete() // Error: This expression is not callable.
```

The type of `.complete()` in this scenario is actually the detailed error message:

```ts
VariantError<["The handler has not been fully completed. Keys", "cat" | "dog", "expected"]>
```

### Multi-match

In the above example, cats and dogs both have fur and so can be handled the same way. Matcher provides full-support for handling more than one case with the same logic. By passing an array of type literals (`['cat', 'dog']`) or tag constructors (`[Animal.cat, Animal.dog]`) as the first term, you allow the handler function to accept `Animal<'cat'> | Animal<'dog'>` as the handler function input.

## Terminals

A **terminal** is some matcher method that executes the handler immediately. The ideal terminal is `.complete()`



## Matching Literals

Just like match, matcher can be used on *any* valid string literal union. These can be generated simply with `catalog()` or may come from other libraries. For example, **Chakra-UI** provides a hook `useColorMode`.

```ts
const {colorMode} = useColorMode();
```

The `colorMode` variable is a string `'dark' | 'light'`. As such, it can be processed with matcher.

```ts
const result = matcher(onLiteral(colorMode)).lookup({
    dark: ...,
    light: ...,
});
```

Note that unlike the example for the [match function](match)