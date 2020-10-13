---
id: variant
title: Variant
---
Calling `variant` with the name of a type returns a [*tag constructor*](https://en.wikipedia.org/wiki/Algebraic_data_type#Explanation) (a.k.a. *action creator*) for that type. 

```typescript {3}
import variant from 'variant';

const toggleTodo = variant('TOGGLE_TODO');

const action = toggleTodo(); 
```
**result:** `typeof action: {type: 'TOGGLE_TODO'}`

In this case we need to communicate *which* todo needs toggling. Our resulting object needs an `id` property, which the person making the object will need to pass in. We'll set this up by providing `variant()` with a function that takes the id required and creates the object. `variant` takes care of the housekeeping of merging the `type: 'TOGGLE_TODO'` property to whatever the function returns.

```typescript {3}
import variant from 'variant';

const toggleTodo = variant('TOGGLE_TODO', (id: number) => ({id}));

const action = toggleTodo(4); 
console.log(action); 
```
**result:** `typeof action: { type: 'TOGGLE_TODO', id: number }`

**prints:** `{ type: 'TOGGLE_TODO', id: 4 }`


Once there are more than one or two parameters they will start to lose meaning since they don't have names. Accept parameters as the properties of an object to achieve named parameters. Use the `fields<T>()` helper function to easily describe such constructors, . 

```typescript {3}
import variant, {fields} from 'variant';

const toggleTodo = variant('TOGGLE_TODO', fields<{id: number, togglerName: string}>());

const action = toggleTodo({id: 4, togglerName: 'Zeke'}); 
console.log(action);
```
**result:** `typeof action: { type: 'TOGGLE_TODO', id: number, togglerName: string }`

**prints:** `{ type: 'TOGGLE_TODO', id: 4, togglerName: 'Zeke' }`

If only a single data field is needed and the name doesn't matter, the `payload()` helper function is available.

```typescript {3}
import variant, {payload} from 'variant';

const toggleTodo = variant('TOGGLE_TODO', payload<number>());
const action = toggleTodo(4); 


console.log(action);
```

**result:** `typeof action: { type: 'TOGGLE_TODO', payload: number }`

**prints:** `{ type: 'TOGGLE_TODO', payload: 4 }`

### payload vs. fields

In deciding on the use of payload vs. fields consider if the intended purpose of the data is obvious from the name of the tag. The action `ADD_MESSAGE` accepting a payload `<string>` can be assumed to refer to the message, but a `DOG` accepting payload`<string>` would be much harder to make sense of. Is that the name of the dog, the breed, or something else entirely?

