---
title: API Reference
sidebar_label: ☕ API
---
## Functions

Tools to help describe and process domains.

### cast
Set a variable's type to a new case of the same variant.

 - **obj** `O extends TypeExt<K, string>` object of concern.
 - **type** `T extends O[K]`*(string)* new type tag. Restricted to possible types of the variant.
 - **typeKey** `K extends string` discriminant key.
```typescript
const snake = cast(animal, 'snake'); // typeof snake === Animal<'snake'>;
```

### isOfVariant

Checks if an object was created from one of a set of variants. This function is a 
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) 
so TypeScript will narrow the type of `object` correctly.

The variant module may be a pre-existing module or one constructed on the fly.

 - **instance** `{} | null | undefined` an instance of a variant.
 - **variant** `T extends VariantModule<K>` the variant module.
 - **typeKey** `K extends string` the key used as the discriminant.
 
**returns** `instance is variant` *(boolean)*

```typescript
declare var animal: {};

if (isOfVariant(animal, Animal)) {
    ... // animal is now of type Animal
}

if (isOfVariant(animal, variantList([Animal.cat, Animal.dog]))) {
    ... // animal is now of type Animal<'cat'> | Animal<'dog'>
}
```

### keys

Retrieve an object cache (`{[P]: P}`) of a variant's  keys.

```typescript
console.log(keys(Animal));
```
prints
```typescript
{
    cat: 'cat',
    dog: 'dog',
    snake: 'snake',
}
```

### keymap

Retrieve an mapping object from a variant module's convenient keys
(property names) and literal keys (valid elements of the `type: ` property)

```typescript
console.log(keymap({
    ...Animal,
    bird: variant('@flying/bird'),
}));
```
prints

```typescript
{
    bird: '@flying/bird',
    cat: 'cat',
    dog: 'dog',
    snake: 'snake',
}
```

### lookup

Process an unknown variant by comparing it to a provided lookup table and returning the proper result.

 - **object** `T extends TypeExt<K, string>`: some object that extends `{[K]: string}`. The type of this item should be a union of possible cases.
 - **lookup** `L extends Lookup<VariantsOfUnion<T, K>>`
    - assume `T` is `A | B | C`
    - `L` will be `{ A: any, B: any, C: any }`
 - **typeKey?** `K extends string = 'type'`: the discriminant to use.

```typescript
const cuteName = lookup(animal, {
    cat: 'kitty',
    dog: 'pupper',
    snake: 'snek',
});
```

### match
Process an unknown variant by providing a handler object that will react to the various possible cases.

 - **object** `T extends TypeExt<K, string>`: Some item to be handled. The type of this object should be a union of possible cases.
 - **handler** `H extends Handler<VariantsOfUnion<T, K>>`: The type seems more complex than it is. 
    - Assume `object` is `A | B | C`.
    - `H` will be `{ [A.type]: (_:A) => any, [B.type]: (_: B) => any, [C.type]: (_: C) => any }`
 - **typeKey?** `K extends string = 'type'` the key to look at as the discriminant.

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
A hybrid between match() and partialMatch().

```typescript
const attributeToString = (attr: Attribute) => matchElse(attr, {
    Filename: ({payload}) => `Filename: ${payload}`,
    Resolution: ({width, height}) => `Resolution: ${width} x ${height}`,
}, rest => `Unknown Attribute: ${rest.type}`);
```

### narrow
Attempt to narrow a variable to a specific case of the same variant
 - **obj** `O extends TypeExt<K, string>` object of concern.
 - **type** `T extends O[K]`*(string)* new type tag. Restricted to possible types of the variant.
 - **typeKey** `K extends string` discriminant key.
```typescript
const snake = narrow(animal, 'snake'); // typeof snake === (Animal<'snake'> | undefined);

console.log(snake?.pattern ?? 'unknown');
```


### outputTypes

Get a well-typed array of the literals any given `VariantModule` uses for tags.

 - `vm: {[name: string]: {key: string, type: string}`: Note that every `VariantModule` meets this contract.

**returns** `string[]`: A list of types
``` typescript
import {Animal} from '...';

const types = outputTypes(Animal);

console.log(types); // ['cat', 'dog', 'snake'];
```

### partialLookup

Process an unknown variant by comparing it to a provided lookup table and returning the proper result. 
If the handler does not account for the case, returns undefined
 - **obj** `T extends TypeExt<K, string>` some object that extends `{[K]: string}`.
 - **lookup** `L extends Lookup<VariantsOfUnion<T, K>>` a partial lookup table going from some keys of `obj`'s type to any.
 - **typeKey** `K extends string = 'type'` the key used as the discriminant.

### partialMatch
Process an unknown variant by providing a handler object that will react to some of the various possible cases.

 - **object** `T extends TypeExt<K, string>`: Some item to be handled. The type of this object should be a union of possible cases.
 - **handler** `H extends Handler<VariantsOfUnion<T, K>>`: The type seems more complex than it is. 
    - Assume `object` is `A | B | C`.
    - `H` will be `{ [A.type]: (_:A) => any, [B.type]: (_: B) => any, [C.type]: (_: C) => any }`
 - **typeKey?** `K extends string = 'type'` the key to look at as the discriminant.


## Variant Creation

### variant

Define a case of a variant type, optionally with a constructor function to help define the body.

```typescript
const addAnimal1 = variant('AddAnimal');
const addAnimal2 = variant('AddAnimal', (animal: Animal) => ({animal}));
```

### fields
Take a single variable of type T and express that as the body of the variant.

```typescript
const addAnimal = variant('AddAnimal', fields<{animal: Animal}>());
const command = addAnimal({animal: Animal.dog({name: 'Cerberus'})});
```

### payload
Take a single variable of type T and store as 'payload'

```typescript
const addAnimal = variant('AddAnimal', payload<Animal>());
const command = addAnimal(Animal.dog({name: 'Cerberus'}));
```

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

### variantList

Create a variant module based on a list of variants.

```typescript
const WingedAnimal = variantList([
    Animal.bird,
    Animal.pegasus,
]);
```

```typescript
const Suit = variantList(['Spades', 'Hearts', 'Clubs', 'Diamonds']),
```

### variantModule
Create a variant module from an object describing the variant's structure.
Each key of the object is a case of the variant. Each value of the object 
is the constructor function associated with that key. 
```typescript
export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, daysSinceDamage: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});
```


## Types
The supporting cast of types that helps keep this concise and relevant.

### Flags<T\>

```typescript
exp\ort type Flags<T extends VariantModule> = Partial<Matrix<T>>;
```

### Handler<T\>
```typescript
/**
 * Built to describe an object with the same keys as a variant but instead of constructors
 * for those objects has functions that handle objects of that type.
 */
export type Handler<T, U = any> = {
    [P in keyof T]: (variant: T[P]) => U
}
```
### KeysOf<T\>

Extract the key literals of a variant.

### Lookup<T, U?>
An object that has the same keys as a variant but has arbitrary values for the data a.k.a. a lookup table.

```typescript
const names: Lookup<Animal, string> = {
    cat: 'Steven',
    dog: 'Cubone',
    snake: 'Slither',
}
```

### Matrix<T\>

A `VariantModule` is a collection of variant constructors. A `Matrix`, in contrast, is a collection of *instances* of these variants.

```typescript
const exampleAnimals: Matrix<Animal> = {
    dog: Animal.dog({name: 'Cerberus'}),
    cat: Animal.cat({name: 'Batman'}),
    snake: Animal.snake('Naga'),
}
```

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

Some of the magic of this library. May be referenced in two ways

#### `VariantOf<T>`

`VariantOf<typeof Animal>` resolves to the type union:

```typescript
{
    type: "dog";
    name: string;
    favoriteBall?: string | undefined;
} | {
    type: "cat";
    name: string;
    daysSinceDamage: number;
} | {
    type: "snake";
    name: string;
    pattern: string;
}
```

#### `VariantOf<T, string | undefined>`

`VariantOf<typeof Animal, 'dog'>` resolves to the more specific type

```typescript
{
    type: "dog";
    name: string;
    favoriteBall?: string | undefined;
}
```
If using `undefined` or some invalid string, this falls back to the full union type.

### TypeExt<K, T>

Describe a simple object literal with a single property.

 - `K extends string` (**Key**) the property key
 - `T` (**Value**) the property value 


`TypeExt<K, T>` is equivalent to `{ [K]: T }`.

### WithProperty<K, T>

Alias of [**TypeExt**ension](#typeextk-t).