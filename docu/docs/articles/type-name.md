---
title: "'type', 'tag', and 'kind'"
---

Some users may prefer a discriminant other than `type`. The keys `tag` and `kind` are popular in various circles, and `__typename` is used in GraphQL communities. The key `type`is just the default. You can make a new `variant()` function to make variants with another discriminant by calling `variantFactory`.

```typescript
const myVariant = variantFactory('__typename');
type KEY = '__typename';

export const Animal = variantList([
    myVariant('Dog', fields<{name: string, favoriteBall?: string}>()),
    myVariant('Cat', fields<{name: string, furnitureDamaged: number}>()),
    myVariant('Snake', (name: string, pattern = 'striped') => ({name, pattern})),
]);
export type Animal<T extends TypeNames<typeof Animal, KEY> = undefined> = VariantOf<typeof Animal, T, KEY>;
```

type `Animal<'Dog'>` is rendered as:
```typescript
{
    __typename: "Dog";
    name: string;
    favoriteBall?: string | undefined;
}
```

Most of variant's functions will accept an optional `key` as their final parameter, allowing the types to function with a different discriminant.
```typescript
const result = match(animal, {
    Cat: ...
    Dog: ...
    Snake: ...
}, '__typename')
```
