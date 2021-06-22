---
title: Generic Variants
---

Use the `onTerms` helper function to create generic variants.

```ts
const Option = variant(onTerms(({T}) => ({
    Some: payload(T),
    None: nil,
})));
```


### How does it work?

The `T` property of the parameter is a placeholder - an instance of a variant meant to represent a generic term. The object that we destructured to get `T` has a placeholder for each letter of the roman alphabet, 26 in total. `onTerms()` brands the return type of the template function with a symbol to indicate the template has generic term placeholders. When this symbol is present, a special overload of `variant()` is triggered which will rewrite the `T` placeholder with an actualized generic type.