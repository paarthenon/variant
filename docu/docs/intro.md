---
slug: intro
title: Introduction
---
> _**Variant** is a language feature disguised as a library._

Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](http://web.archive.org/web/20191018040436/https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

[🧠 Click here to jump straight to the API Reference](api.md)

## Quick start

Variant has zero dependencies and doesn't need any setup.

```bash
yarn add variant
# or
npm install --save variant
```

:::note
There are two good options for the type definition. Both will give a type `Animal` that captures the union of types.

```typescript
// @filename: one.ts
import {TypeNames, VariantOf} from 'variant';
declare var Animal: any;

// The full type definition
export type Animal<T extends TypeNames<typeof Animal> = undefined>
     = VariantOf<typeof Animal, T>;

// @filename: two.ts
import {VariantOf} from 'variant';
declare var Animal: any;

// The simplified type definition
export type Animal = VariantOf<typeof Animal>;
```

### Making the choice

The full definition grants the ability to reference a subtype directly (`Animal<'snake'>`). This generic parameter *must* be one of the types of `Animal` and will autocomplete from the options as you type, resulting in a better developer experience.

The simplified type does not feature this. To get at this snake type, the developer must call `Extract<Animal, {type: 'snake'}>` which results in a more fragile experience.
:::


****

### TODO

 -  Discuss the verbosity of the type and explain that I will be replacing it with a comment.
    - point out the two options, the simple `export const Animal = VariantOf<typeof Animal>;` and the more complex one.
 - Mention that variant is ~ `2kb` gzipped



## Superhero

The demonstration could be about superhero powers. They have excellent and evocative factors to include as fields and are universally understood. There will be a Hero type and they will have powers: `Flags<typeof Power>` ;

Superpowers:
   - flight
      - max speed
   - invisibility
      - method: psychic
   - regeneration
   - superStrength
   - shapeshifter
      domain: animals | bucketsOfWater | 
   - teleportation
      - range
      - cooldown
   - telekinesis
      -


Also talk about the `can() function/object`