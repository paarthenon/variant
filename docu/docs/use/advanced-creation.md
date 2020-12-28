---
title: Advanced Creation
---

We may wish to have more control or convenience in our variant creation. This library provides a series of *inline* and *top-level* helper functions to assist with these efforts. The inline functions are called as an element of `variantModule` and can be chained. The top-level helpers require special handling.

Inline helpers:
 - [`constrained`](#constrained-variants) — every case must handle these inputs and provide these outputs.
 - [`patterned`](#patterned-variants) — every case must handle **exactly** these inputs and no more, while providing these outputs.
 - [`augmented`](#augmented-variants) — every case gets some dynamic properties patched into its output.

The top-level helpers:
 - [`typedVariant`](#recursive-variants) — the cases follow a pre-existing type (necessary for recursive variants).
 - [`genericVariant`](#generic-variants) — some cases may use generic parameters.
 - [`scopedVariant`](#scoped-variants) — the variant is *scoped*, meaning the types you provide are prefixed with `${scope}/`.
## Constrained Variants

We can use the `constrained` to create a module where every variant must support the inputs and output types of an example function we pass in. In my hypothetical game the player can change their hairstyle, but only if the currently have enough hair to fit that style. Someone who is bald cannot restyle their hair into a ponytail, but it is perfectly okay for a person with a ponytail to cut their hair to fit a shorter style. To help represent that I'm going to give each hairstyle an optional minimum and maximum length. When it comes time to check if a particular restyling is valid I can simply check if `player.hair.length >= (targetStyle.min ?? 0)`.

```ts
/**
 * Hairstyles with listed min and max length requirements.
 *  - HairLength is an enum
 */
export const Hairstyle = variantModule(constrained(
    just<{min?: HairLength, max?: HairLength}>({}), 
    {
        Afro: just({min: HairLength.Short}),
        Bald: just({max: HairLength.Bald}),
        Bun: just({min: HairLength.Medium, max: HairLength.Long}),
        CrewCut: just({min: HairLength.Buzzed, max: HairLength.Short}),
        Dreadlocks: just({min: HairLength.Short}),
        Mohawk: just({min: HairLength.Buzzed, max: HairLength.Long}),
        Ponytail: just({min: HairLength.Medium}),
        Shaved: just({min: HairLength.Bald, max: HairLength.Buzzed}),
        Undercut: just({min: HairLength.Buzzed}),
        Waves: just({min: HairLength.Medium}),
    },
));
```

The first parameter was our example function, which evaluates to `() => {min?: HairLength, max?: HairLength}`. Now when we implement our variants we will have autocomplete for our return values. If our example function had an input, every case constructor would need to accept that type of variable as its first argument.

When using constrainedVariant, optional properties of the return type *will* be available on the union. It will be possible to inspect `min` and `max` without needing to understand the 

Note that these variant bodies can still require extra information. Any such variants can simply require multiple parameters as long as the first parameters line up with the example. If you need to *ensure* that every case constructor takes *no* parameters, this isn't the best choice, you want *`patternedVariant()`.*

### Patterned Variants

`patterned` is the same as as `constrained`, except your case constructors are not allowed any extraneous properties—they must *exactly* match the example function.

Our previous code will work again, as is.

```ts
/**
 * Hairstyles with listed min and max length requirements.
 *  - HairLength is an enum
 */
export const Hairstyle = variantModule(patterned(
    just<{min?: HairLength, max?: HairLength}>({}), 
    {
        Afro: just({min: HairLength.Short}),
        Bald: just({max: HairLength.Bald}),
        Bun: just({min: HairLength.Medium, max: HairLength.Long}),
        CrewCut: just({min: HairLength.Buzzed, max: HairLength.Short}),
        Dreadlocks: just({min: HairLength.Short}),
        Mohawk: just({min: HairLength.Buzzed, max: HairLength.Long}),
        Ponytail: just({min: HairLength.Medium}),
        Shaved: just({min: HairLength.Bald, max: HairLength.Buzzed}),
        Undercut: just({min: HairLength.Buzzed}),
        Waves: just({min: HairLength.Medium}),
    },
));
```

The difference is that now I cannot add any extra inputs to the functions. This is an excellent feature if we would like to automatically create an instance of a variant *without knowing which constructor we're using*. It is now safe for me to operate under the assumption I will never have to pass properties to a hairstyle constructor, enabling random generation like so:

```ts
const styleList = Object.values(Hairstyle);
const styleCreator = styleList[Math.floor(Math.random() * styleList.length)];
const style = styleCreator();
```
### Augmented Variants

I found myself wanting to add a `{timestamp: number}` property to one of my variants. It was representing time-series data and I didn't want to pass in a timestmap each and every time, nor did I want to ensure one existed in every constructor, so I wrote `augmented` to address this. Like the functions so far, `augmented` is used inside of a `variantModule` call.

```ts
export const Protocol = variantModule(augmented(
    () => ({timestamp: Date.now()}),
    {
        ServerInit: {},
        ClientConnected: payload<ClientInfo>(),
        ClientDisconnected: fields<{clientId: string, message: string}>(),
        TextMessage: fields<{id: string, text: string, senderId: string}>(),
        ReadReceipt: fields<{id: string, textId: string, readerId: string}>(),
    }
));
```

## Recursive Variants

Recursive variants are a wonderful pattern for expressing and evaluating tree and list-like data. The traditional example involves a binary tree and we'll implement a proper one in the next section on [generic variants](use/advanced-creation.md#generic-variants).. In the meantime, let's do a binary tree of `Animal`s. An animal tree may not have many real world applications but please bear with me. 

## `typedVariant<T>()`
So far we've been letting the **type** flow from the **value**. However, this makes recursive variants impossible. Attempting to reference `AnimalNode` in the *definition* for `AnimalNode` causes an error in the time-loop (and `tsc`).

So we've got flip our approach. We're going to make a **type** and *then* create the variant module, the **value**, based on that type.

```typescript
type AnimalTree =
    | Variant<'Leaf', {animal: Animal}>
    | Variant<'Branch', {left?: AnimalTree, right?: AnimalTree, label?: string}>
;

const AnimalTree = typedVariant<AnimalTree>({
    Leaf: pass,
    Branch: pass,
});

const tree = AnimalTree.Branch({
    label: 'Animal Kingdom',
    left: AnimalTree.Leaf({animal: Animal.snake({name: 'Steve'})),
    right: AnimalTree.Branch({
        label: 'Mammals',
        left: AnimalTree.Leaf({animal: Animal.dog({name: 'Cerberus'})}),
        right: AnimalTree.Leaf({animal: Animal.cat({name: 'Sikandar'})}),
    })
})
```

In this example we created a recursive type, a binary tree of `Animal`s. We then created the implementation of that type as a variant module by calling `typedVariant<T>()`. 

### `pass`

`pass` achieves the most common use case—create a variant that accepts an object of a given type and returns that object plus the `type: ...` property. The user is welcome to write the implementation themselves, but most often `pass` is sufficient.

### custom implementation

`typedVariant<T>()` uses the type `T` to restrict the object you offer as the implementation, meaning you can safely destructure the variant's input in its own implementation.

```typescript
const AnimalTree = typedVariant<AnimalTree>({
    Leaf: ({animal}) => {
        console.log('creating leaf node with animal', animal);
        return {animal};
    },
    Branch: pass,
});

```

## Generic Variants

We can use generics to create a more flexible binary tree

```typescript
type Tree<T> =
    | Variant<'Leaf', {payload: T}>
    | Variant<'Branch', {left: Tree<T>, right: Tree<T>}>
;

const Tree = genericVariant(({T}) => ({
    Branch: fields<{left: Tree<typeof T>, right: Tree<typeof T>}>(),
    Leaf: payload(T),
}));

const leaf = Tree.Leaf(5);

const numTree = Tree.Branch({
    left: Tree.Leaf(4),
    right: Tree.Leaf(66),
});

const strTree = Tree.Branch({
    left: Tree.Leaf('hello'),
    right: Tree.Branch({
        left: Tree.Leaf('world'),
        right: Tree.Leaf('people'),
    }),
})
```

To use the `genericVariant()`, pass in a function that returns a variant module. `genericVariant` will provide *your* function with a set of sigils that you can use as **placeholder** types. These will be replaced by true generics in the resulting type! In the above example, I use T, but this is actually an object that is being destructured and that object contains the full alphabet `{A: _, B: _, C: _, ..., Z: _}`. Use whichever letter best fits your use case.

## Scoped Variants

:::note Preview Content
🔮 denotes preview content. These are features that are available, but not well-documented and may be modified in the near future as they see better integration.
:::

As of TypeScript 4.1 it is possible to create template literal types, enabling type-safe *scoped* variants. This feature will be available in `variant@2.1`, and may be tried now through `npm i variant@test`.

We may eventually run into name conflicts with our `type` properties, for example when multiple collections of actions are combined into one large `Action` type. We can address this by using `scopedVariant` to prefix our types with some distinguishing name.

```ts
export const ScopedAnimal = scopedVariant('animal', {
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, furnitureDamaged: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
    bird: {},
});
```

Now the `type` of `ScopedAnimal.dog()` is `animal/dog` instead of just `dog`. Unfortunately, this makes matching a little bit more tedious:

```ts
const getRating = (a: ScopedAnimal) => match(a, {
    "animal/dog": constant(10),
    default: constant(6),
});
```

But that is quickly resolved through the use of `descope()`

```ts
return match(descope(a), {
    bird: constant(6),
    cat: constant(8),
    dog: constant(10),
    snake: constant(5),
})
```
