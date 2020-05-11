---
id: grouping
title: Grouping

---

Getting to the "Algebra" of algebraic data types, variants can be mixed and matched in a number of ways. If you have a functional programming background, `variant()` is a factory function to generate tag constructors of [polymorphic variants](https://www.cs.cornell.edu/courses/cs3110/2019sp/textbook/data/polymorphic_variants.html). If you don't have a functional programming background, ignore that sentence. `variant()` describes one shape your data may take, but we want to understand the options.

To make that as easy as possible, try `variantList([ ... ])`.

```typescript
export const MediaFile = variantList([
    variant('image', fields<{src: string}>(),
    variant('video', fields<{src: string, duration: number}>()),
]);
```
If you'd prefer not to use that, no problem. Use an object.

```typescript
export const MediaFile = {
    image: variant('image', fields<{src: string}>(),
    video: variant('video', fields<{src: string, duration: number}>()),
}
```
Either way, follow up with this type

```typescript
export type MediaFile<T extends TypeNames<typeof MediaFile> = undefined> = VariantOf<typeof MediaFile, T>;
```

The line does two main things.

1.  It takes place of this tedious mess:

    ```typescript
    export type Action =
        | Action.addTodo
        | Action.toggleTodo
        | Action.setVisibilityFilter
    ;
    ```
    and will automatically update. 

2. It provides a way to access subtypes easily. `MediaFile<'image'>` refers to `{ type: 'image', src: string }`. 

### Boilerplate 

Here is a [VS Code snippet](https://code.visualstudio.com/docs/editor/userdefinedsnippets) to make following this pattern very easy.
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