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


### Boilerplate 

Here is a [VS Code snippet](https://code.visualstudio.com/docs/editor/userdefinedsnippets) to make following the grouping pattern very easy.
```json
	"VariantModule": {
		"prefix": ["variant-module", "vm"],
		"body": [
			"export const $1 = variantList([",
			"    $2",
			"]);",
			"export type $1<T extends TypeNames<typeof $1> = undefined> = VariantOf<typeof $1, T>;",
			""
		],
		"description": "Initialize a module for variants"
	},
```