---
title: Migration
---

**Library Migration**, traditionally a complex and time-consuming task, is made simpler in Variant. Each component
of this library can be individually integrated at your own pace. A call to the match function fits the same places
as a switch statement. Variants aren't an alternative to discriminated unions - they *are* discriminated unions,
presented through a better interface. The objects created by Variant's tag constructors are no different than the
object literals or constructor functions you would construct yourselves. Just like raw discriminated unions, variants
can be narrowed in if statements or processed through a switch statement. In fact because each creator of a variant *is*
simply a function, adapting existing logic to integrate with Variant is often straitforward.

Similarly, the match functions will process any TypeScript discriminated union whether or not it was made by Variant.
I know of several users who rely on codegen for their models and only use Variant to process them.

****

 - It's possible to re-export.