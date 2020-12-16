---
title: Changelog
---
Summary of the changes in each patch.

## 2.0.3
 - Added `matcher()` function
 - Added `constrainedVariant()` and `patternedVariant()`.
 - Added match helpers `just()` and `unpack()`
## 2.0.2
 - Added `isType` utility
    - and a curried overload
 - The `match` function has some new overloads
    - default functionality
    - type-safe 'else' handling
 - `match` is now stricter, extraneous keys will raise a compiler error
 - `partialMatch` and `matchElse` will soon be deprecated and removed in `3.0`
    - their functionality is now covered by `match`
 - `variantModule` also accepts `{}`
 - improved generic handling (`genericVariant`)

## 2.0.1
 - exposed `variantModule`

## 2.0
 - first overhaul of library
 - added recursive and generic variants
 - added `variantModule`
 - `variantList` now accepts raw string literals
 - match 