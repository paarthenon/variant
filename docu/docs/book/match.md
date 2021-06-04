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