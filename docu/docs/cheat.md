---
title: Cheat Sheet
---

Assume `Animal` is defined as in the [Introduction](intro)

```typescript
// import 
import {Animal} from '...';

// create
const steve = Animal.snake('steve');

// snake type
type SnakeType = Animal<'snake'>;

// union of all animals
type AllAnimalsType = Animal;
```

### Snippets 

Here are some [VS Code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) to make it easier to write the type annotations.
```json
{
  "VariantTypeAnnotation": {
    "prefix": ["variant-type", "vt"],
    "body": [
      "export type $1<T extends TypeNames<typeof $1> = undefined> = VariantOf<typeof $1, T>;",
    ],
    "description": "Type annotation for variants"
  },
  "VariantSimpleTypeAnnotation": {
    "prefix": ["variant-simple-type", "vst"],
    "body": [
      "export type $1 = VariantOf<typeof $1>;",
    ],
    "description": "Type annotation for generic variants"
  },
  "VariantGenericTypeAnnotation": {
    "prefix": ["variant-generic-type", "vgt"],
    "body": [
      "export type $1<T, TType extends TypeNames<typeof $1> = undefined> = GVariantOf<typeof $1, TType, {T: T}>;",
    ],
    "description": "Type annotation for generic variants"
  },
}
```