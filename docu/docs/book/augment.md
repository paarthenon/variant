---
title: Augmented Variants
---

A variant can *augment* some template or other variant with extra properties. 

****

 - You can add timestamps to actions as simply as `() => ({timestamp: Date.now()})`.
 - You can actually use data in the instance to create the new property.
    - validity
    - name length?
 - You can compose this with *match* to actually process subtype logic.
    - This will probably work with the inline match o_O.

