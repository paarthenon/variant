---
slug: new-in-3.0
title: New in Variant 3.0 ✨
---

Variant 3.0 brings some significant and exciting changes to the library. It has been written from the ground up to be more flexible, powerful, and usable than ever before. Documentation has been integrated more tightly into all types and functions. The benefit of experience has inspired the removal or restructuring of some functionality and the implementation of much more.

## The great name swap

The first breaking change involves the function `variant()`. In previous versions of the library, the `variant` function was used to create a tag constructor (redux users, think `createAction`). While this was originally the only way to create a variant, later versions of the library introduced [variantModule](api#variantModule) and [variantList](api#variantList), functions that could construct a variant from either an object or list template respectively. With the utility these new functions offered, `variant()` was almost never used. Its only remaining purpose was to create a distinction between the name of a tag constructor and its underlying type. When used it could not compose with variantModule or variantList. Eventually it no longer made sense for a function with so little purpose to hold prime real estate in the API.

The `variant()` function now, as may be expected, creates a variant. It can accept *either* the object template of variantModule or the list template of variantList. It has also been built to synergize with newly introduced helper functions to achieve generic variants.

The old functionality is held in `variation()`, the factory function for constructors of one *form* of a variant. Even here, functionality has improved. `variation()` now works within calls to `variant()`. 