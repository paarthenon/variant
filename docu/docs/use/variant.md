---
id: variant
title: Variant
---

A **variant** is a single object that can take many forms. Each of those forms has a *type*, sometimes called a *tag*, and optionally a *body* that tells us what kind of data we have available if in that form. In the introduction we saw how several types of animals could be grouped into the *module* `Animal`.

At this point we can express the data, but I'd like the ability to interact with our virtual menagerie. Let's create our first *action* or command, `AddAnimal`.

### `variant()`

Calling `variant()` with the name of a type returns a [*tag constructor*](https://en.wikipedia.org/wiki/Algebraic_data_type#Explanation) (a.k.a. [*action creator*](https://redux.js.org/basics/actions)) for that type.


```typescript {3}
import variant from 'variant';

const addAnimal = variant('AddAnimal');

const action = addAnimal(); 
```
**result:** `typeof action: { type: 'AddAnimal' }`

To add additional properties, provide a function as a second parameter. The arguments of this function will become the arguments of the tag constructor, and the properties in the returned object will become the properties of that form of the variant. The `type: ...` property will be merged in for you. 

```typescript {4}
import variant from 'variant';
import {Animal} from '...';

const addAnimal = variant('AddAnimal', (animal: Animal) => ({animal}));

const action = addAnimal(Animal.dog({name: 'Cerberus'})); 
console.log(action); 
```
**result:** `typeof action: { type: 'AddAnimal', animal: Animal }`

**prints:** `{ type: 'AddAnimal', animal: { type: 'dog', name: 'Cerberus' }}`

### `payload()`

Taking a single variable and storing it as data like this is a *very* common pattern. The `payload()` helper function is here to make that even simpler.

```typescript
const addAnimal = variant('AddAnimal', payload<Animal>());
```

The downside of `payload()` is that it only takes one element, and it will always be called `'payload'`. In the case of `addAnimal` this is fine. It's clear from context that the payload of the 'AddAnimal' command is the animal to be added. However, if we need to use a name for the field or use multiple fields then it's time for the next helper function. 

### `fields()`

We saw `fields` already in our quick start example. Here's that again for reference. 

> ```typescript {2-3}
> export const Animal = variantModule({
>     dog: fields<{name: string, favoriteBall?: string}>(),
>     cat: fields<{name: string, daysSinceDamage: number}>(),
>     snake: (name: string, pattern = 'striped') => ({name, pattern}),
> });
> ```

`fields()` is expecting an object type as its generic parameter. That object type describes the body of the variant, minus the 'type' property which the library will fill in. 

```typescript {3}
import variant, {fields} from 'variant';

const addAnimal = variant('AddAnimal', fields<{animal: Animal}>());

const action = addAnimal({animal: Animal.dog({name: 'Lily'})}); 
console.log(action);
```
**result:** `typeof action: { type: 'AddAnimal', animal: Animal }`

**prints:** `{ type: 'AddAnimal', animal: { type: 'dog', name: 'Lily' }}`

****

### Conclusion

When choosing between the approaches to defining a variant, I recommend this process:

 1. If there is only one item to pass, and its purpose is clear from context, consider using `payload()`.
 1. If there are multiple fields or a named property is preferred, use `fields()`.
 1. If more control is desired (default elements or logging, for example) use a function.

