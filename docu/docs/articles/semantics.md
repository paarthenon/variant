---
title: Internal Semantics
---

:::info
You'll know if you should be reading this.
:::

## Variant

A variant is some arbitrary algebraic data type. TypeScript does not have any top-level ADT syntax like OCaml so we cannot conjure tag constructors into scope on a whim. Note that even if we manage to create tag constructors and instances they will be inherently structural, and so behave more like polymorphic variants than traditional variants i.e. they have no inherent relation to each other. This is heavily emphasized in the section on "organization".

A variant definition is a collection of tag constructors a.k.a. `VariantCreator` stored as an object sometimes called the **Variant Record** or **Variant Module**.

## VariantCreator

A variant creator is a function that returns an object and possesses several extra properties:

 - a symbol that announces the function as a variant creator. 
 - `creator.type`, the string literal used as the type for this form.
 - `creator.toString()` renders `creator.type`.
 - `creator.name` copies `creator.type`.
 - `creator.key` is the string literal used as the discriminant key.

So it is possible to inspect a random creator function and determine the type it will output. This can be leveraged in procedural generation.

It's also possible to check whether or not a function is a variant creator by looking for the brand. The `variant()` function takes advantage of this feature to transparently pass through variant creators (calls to `variation`). This may be done when recombining a variant or when adjusting the underlying type of some variation. 

## Variant Record

The internal construction of a variant is as an object.