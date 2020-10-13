---
title: API Reference
sidebar_label: ☕ API
---
The full list of options.

## Functions

tools to help describe the domain.

### flags

TODO

### isOfVariant

Checks if an object was created from one of a set of variants. This function is a [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) so TypeScript will narrow the type of `object` correctly. 

 - `object: {} | null | undefined` an object.
 - `variantModule: VariantModule` the module to compare to. This can be a previously constructed object or stitched together on the fly through literals or `variantList`
 - `typeKey?: K`: The key used as the discriminant.

**returns** `object is variantModule`
```typescript
declare var animal: {};

if (isOfVariant(animal, Animal)) {
    ... // animal is now of type Animal
}

if (isOfVariant(animal, variantList([Animal.cat, Animal.dog]))) {
    ... // animal is now of type Animal<'cat'> | Animal<'dog'>
}
```

### lookup

Process an unknown variant by comparing it to a provided lookup table and returning the proper result.

 - `object: T extends TypeExt<K, string>`: Some item to be handled. The type of this item should be a union of possible cases.
 - `lookup: L extends Lookup<VariantsOfUnion<T, K>>`
    - assume `T` is `A | B | C`
    - `L` will be `{ A: any, B: any, C: any }`
 - `typeKey?: K extends string = 'type'`: the discriminant to use.

```typescript
const cuteName = lookup(animal, {
    cat: 'kitty',
    dog: 'pupper',
    snake: 'snek',
});
```

### match
Process an unknown variant by providing a handler object that will react to the various possible cases.

 - `object: T extends TypeExt<K, string>`: Some item to be handled. The type of this object should be a union of possible cases.
 - `handler: H extends Handler<VariantsOfUnion<T, K>>`: The type seems more complex than it is. 
    - Assume `object` is `A | B | C`.
    - `H` will be `{ [A.type]: (_:A) => any, [B.type]: (_: B) => any, [C.type]: (_: C) => any }`
 - `typeKey?: K extends string = 'type'` the key to look at as the discriminant.

It's simpler to use than it is to describe.

```typescript
const describeAnimal = (animal: Animal) => match(animal, {
    cat: ({name}) => `${name} is sleeping on a sunlit window sill.`,
    dog: ({name, favoriteBall}) => [
        `${name} is on the rug`,
        favoriteBall ? `nuzzling a ${favoriteBall} ball.` : '.' 
    ].join(' '),
    snake: s => `Hi ${s.name}, your ${s.pattern} skin looks nice today.`,
});
```

It's not necessary to destructure the objects into their properties, or even to use any of the state of a given case.

```typescript
const rating = (animal: Animal) => match(animal, {
    dog: _ => 1,
    cat: _ => 2,
    snake: _ => 3,
});
```
though in this case, it would be simpler to use [`lookup()`](#lookup).

### matchElse
TODO

### matchLiteral
TODO

### partialLookup
TODO

### partialMatch
TODO

### payload

TODO

### variant

```typescript
const dog = variant('dog', fields<{name: string, favoriteBall?: string}>()),
```

TODO

#### fields
TODO

#### payload
TODO

### variantList

```typescript
const dog = variant('dog', fields<{name: string, favoriteBall?: string}>()),
```
TODO

### variantFactory

By default, [`variant()`](#variant) generates tag constructors that use the `type` property for the discriminant.

```typescript
const niceVariant = variantFactory('kind');
const fish = niceVariant('fish', (name: string) => ({name}));

const steph = fish('stephanie');
```
The value of `steph` is shown below. Note that the object is marked as a fish, but uses the `kind` property instead of `type`.
```typescript
{
    kind: 'fish',
    name: 'stephanie',
}
```

in fact the `variant` function you know and love is defined as

```typescript
export const variant = variantFactory('type');
```
so know the freaky factories you make from this will be just as valid as the official one.



### cast
TODO

### narrow
TODO

### outputTypes

Get a well-typed array of the literals any given `VariantModule` uses for tags.

 - `vm: {[name: string]: {key: string, type: string}`: Note that every `VariantModule` meets this contract.

**returns** `string[]`: A list of types
``` typescript
import {Animal} from '...';

const types = outputTypes(Animal);

console.log(types); // ['cat', 'dog', 'snake'];
```

## Types
The supporting cast of types that helps keep this concise and relevant.

### Flags<T\>
TODO

### Handler<T\>
TODO

### KeysOf<T\>
TODO

### Lookup<T, U?>

A simple mapped type 

### Matrix<T\>
TODO

### TypeNames<T\>

A Helper type so consumers can restrict their generics more easily.

### VariantCreator<T, F, K?\>

Calling [`variant()`](#variant) results in a function with some extra properties, described as a `VariantCreator`.

 - `T extends string` (**Tag**) the string literal populating the `type` field.
 - `F extends (...args: any[]) => {}` (**Function**) the constructor function returning some object.
 - `K extends string = 'type'` (**Key**) The key

In use, a VariantCreator acts like it's parameter `F`, as a function, but also has `key: K` and `type: T` properties to inform a user of the kinds of objects it generates. 

### VariantModule<K\>

A grouping of variants into an object literal.

 - `K extends string = 'type'` (**Key**) The [discriminant](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) of the discriminated union. 

This can be written directly or using [`variantList`](#variantlist).

### VariantOf<T\>
TODO

### TypeExt<K, T>

Describe a simple object literal with a single property.

 - `K extends string` (**Key**) the property key
 - `T` (**Value**) the property value 


`TypeExt<K, T>` is equivalent to `{ [K]: T }`.

### WithProperty<K, T>

Alias of [**TypeExt**ension](#typeextk-t).