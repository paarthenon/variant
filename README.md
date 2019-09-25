# Variant [![Build Status](https://travis-ci.com/paarthenon/variant.svg?branch=master)](https://travis-ci.com/paarthenon/variant) ![npm (scoped)](https://img.shields.io/npm/v/@paarth/variant) ![NPM](https://img.shields.io/npm/l/@paarth/variant)
Variant types (a.k.a. Discriminated Unions) in TypeScript.

I wanted simple variant types to:
 * express type hierarchies with much less boilerplate and tedium.
 * do OCaml-style pattern matching and destructuring.
 * introduce some nominal typing into TypeScript where it would add clarity.
 * require no implicit dependencies meaning no string matching or manual casts.

## **B**ottom **L**ine **U**p **F**ront

This is the whole process and it's all type safe.

Let's say you use redux.

actions.ts

```typescript
import action, {Variant} from '@paarth/variant';

export module Action {
    export const Clear = action('CLEAR');
    export type Clear = ReturnType<typeof Clear>; 

    export const AddTodo = action('ADD_TODO', (msg: string, dueDate?: Date) => ({msg, dueDate}));
    export type AddTodo = ReturnType<typeof AddTodo>; // These are optional but convenient. 
    // WOKE NOTE: The const is the type constructor, the type describes the generated object
}
export type Action = Variant<typeof Action>; // also optional but convenient. 
```

reducers.ts

```typescript
import {exhaust} from '@paarth/variant';
import {Action} from './actions';

const initState = {
    todos: [],
};

export function someReducer(state = initState, action: Action) {
    switch (action.type) {
        case 'CLEAR': // This is limited to 'CLEAR' and 'ADD_TODO', the type tags in actions.
            return initState;
        case 'ADD_TODO':
            const {msg, dueDate} = action; // type safe. The compiler sees action as
            // {type: 'ADD_TODO', msg: string, dueDate: Date | undefined}
            return {
                todos: [
                    ...state.todos,
                    {msg, dueDate},
                ],
            }
        default: return exhaust(action); // If we miss a case, this line will error
    }
}
```
### Q & A

### Why pun the names?

I like to pun the names to make them available in the variable and type namespaces. It feels natural to be able to say the result of `Action.Clear()` is assignable to a variable annotated `: Action.Clear` (which you get for free when you import `Action`). 

This also makes subsets of variants easier to describe. i.e. 
```typescript
type SomeActions = Action.Clear | Action.AddTodo;
```
and makes for an easy way to safely construct message literals

```typescript
const addAction: Action.AddTodo = {
    type: 'ADD_TODO', // again, type safe! will cause a compiler error if anything else is used.
    msg: 'feel satisfied about type safe custom literal actions',
    dueDate: new Date(),
}
```

### How does it check we handled all cases?
 
The line in question is 
```typescript
default: return exhaust(action);
```
If we weren't handling all cases and it were possible to fall through to the default case then a type error would be raised because `exhaust(x)` is incompatible with anything besides `never`. If we somehow actually execute this code (say from javascript land) an `Error` will be thrown with the type tag of the variant included in the message.
