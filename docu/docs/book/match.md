---
title: Match
---

Pattern matching is the crown jewel of variant types. Like the traditional switch statement, a match expression can process some arbitrary variant with special handling based on its type at runtime. Unlike a switch statement, matches are expressions and they are **exhaustive** by default. As expressions, matches can be used inline as the results of expression-bodied lambdas, JSX attributes, and more. As exhaustive handlers, matches can be assumed to resolve. 

The most direct use of the match expression requires an instance and a handler object.

```ts
const result = match(instance, {
    typeOne: _ => _.
})
```


## Matching Literals

Match can be used on *any* valid string literal union. These can be generated simply with `catalog()` or may come from other libraries. For example, **Chakra-UI** provides a hook `useColorMode` hook.

```ts
const {colorMode} = useColorMode();
```

The `colorMode` variable is a string `'dark' | 'light'`. As such, it can be processed with match.

```ts
const result = match(onLiteral(colorMode), {
    dark: _ => ...,
    light: _ => ...,
});
```

****

- describe match
- describe partial functionality
- describe inline matcher
- describe matching on literals
- mention `unpack`
- mention `constant`/`just`
- bring up descoping a variant.

Introduce the matcher

Prematch