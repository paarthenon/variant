---
title: Utilities
---

Beyond the core functionality provided, variant includes a couple of utilities that may be beneficial.

## HOI
**H**igher-**O**rder **I**dentity.
A higher order factory for this very useful wrapper function.

```ts
// Enforce the type constraint *and* narrow the return type.
function defineThing<T extends Template>(definition: T): T {
    return definition;
}
```
The above `defineThing` can now be generated through
```ts
const defineThing = HOI<Template>();
```

## `Identity<T>`
