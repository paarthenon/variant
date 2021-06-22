---
title: Matcher (builder pattern)
---

Variant providers a `matcher()`, a builder-pattern API for match.


## Matching Literals

Just like match, matcher can be used on *any* valid string literal union. These can be generated simply with `catalog()` or may come from other libraries. For example, **Chakra-UI** provides a hook `useColorMode` hook.

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

Note that unlike the example for the [match function](book/match)