---
id: variant
title: Variant
---
Calling `variant` with a given type name returns a [*tag constructor*](https://en.wikipedia.org/wiki/Algebraic_data_type#Explanation) (a.k.a. *action creator*) for that type. 

```typescript
import variant from 'variant';
const toggleTodo = variant('TOGGLE_TODO');

const action = toggleTodo(); 

// typeof action: { type: 'TOGGLE_TODO' }
```

But if we're toggling a todo we probably need to identify which one. To start doing something interesting we essentially provide `variant` with what the constructor function should take in and do. We do this like any old function, `variant` wraps our function and takes care of the housekeeping of merging in the `{ type: 'TOGGLE_TODO }'` property to whatever we return.

```typescript
import variant from 'variant';

const toggleTodo = variant('TOGGLE_TODO', (id: number) => ({id}));
const action = toggleTodo(4); 

// typeof action: { type: 'TOGGLE_TODO', id: number }
console.log(action); // { type: 'TOGGLE_TODO', id: 4 }
```

Once we add a few fields our parameters will start to lose meaning. Passing in an object is more or less how javascript handles named parameters. To easily describe such constructors, use the `fields<T>()` helper function. 

```typescript
import variant, {fields} from 'variant';

const toggleTodo = variant('TOGGLE_TODO', fields<{id: number}>());
const action = toggleTodo({id: 4}); 

// typeof action: { type: 'TOGGLE_TODO', id: number }
console.log(action); // { type: 'TOGGLE_TODO', id: 4 }
```

When only one property is required or FSA compliance is desired, the `payload<T>()` helper function is available.

```typescript
import variant, {payload} from 'variant';

const toggleTodo = variant('TOGGLE_TODO', payload<number>());
const action = toggleTodo(4); 

// typeof action: { type: 'TOGGLE_TODO', payload: number }
console.log(action); // { type: 'TOGGLE_TODO', payload: 4 }
```

When deciding on `payload` vs. `fields` consider whether the name of the tag is so self descriptive its obvious what the intended payload would be.


[See more test examples](src/variant.spec.ts).