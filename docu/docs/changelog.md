---
title: Changelog
---
Summary of the changes in each patch.

## 2.0.3
 - added `remote()` and `order()`.
 - Improved handling of primitives in conditional types
 - Added `types()` function to replace `outputTypes()` and extend its functionality.
 - Added `matcher()` function
 - Added `constrained()`, `patterned()`, and `augmented()`.
 - Added match helpers `just()` (alias for `constant()`) and `unpack()`
 - `outputTypes()` gets a more specific return type.
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
 - Acknowledgments
     - *Thank you [@ohana54](https://github.com/paarthenon/variant/issues/7) for the discussion that led to `isType` and the `match` overloads.*

## 2.0.1
 - exposed `variantModule`

## 2.0
 - first overhaul of library
 - added recursive and generic variants
 - added `variantModule`
 - `variantList` now accepts raw string literals
 - match gets a helper, `constant()`