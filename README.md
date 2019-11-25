# Variant [![Build Status](https://travis-ci.com/paarthenon/variant.svg?branch=master)](https://travis-ci.com/paarthenon/variant) ![npm (scoped)](https://img.shields.io/npm/v/@paarth/variant) ![NPM](https://img.shields.io/npm/l/@paarth/variant)
Variant types (a.k.a. Discriminated Unions) in TypeScript.

I wanted better variants. I want to express type hierarchies that I can **dispatch on at runtime** that still have compile time information that typescript can use to automatically **narrow the types at compile**. I don't want to have to *cast*, write my own user defined type guards, or repeat a string literal without having autocomplete and type safety to guide me. I want **nominal types** to express that this object with the same structure of another are actually different things.

Enter this library.

This is useful for protocol message processing, action creators, domain driven design, and general type fuckery. However, most of you likely use redux so....

## Let's say you use Redux

```typescript
// actions.ts
import action, {Variant} from '@paarth/variant';

export module Action {
    export const Clear = action('CLEAR');
    export type Clear = ReturnType<typeof Clear>; 

    export const AddTodo = action('ADD_TODO', (msg: string, dueDate?: Date) => ({msg, dueDate}));
    export type AddTodo = ReturnType<typeof AddTodo>; // These are optional but convenient. 
    // WOKE NOTE: The const is the type constructor, the type describes the generated object

    export const UpdateTodo = action('UPDATE_TODO', fields<{
        id: number;
        msg: string;
        dueDate?: Date;
    }>());

    export const DeleteTodo = action('DELETE_TODO', fields<{id: number}>({id: -1}))

}
export type Action = Variant<typeof Action>;
```
The `export type Action = Variant<typeof Action>;` line at the bottom takes the place of the whole
```typescript
export type Action =
    | Action.Clear
    | Action.AddTodo
    | Action.UpdateTodo
    | Action.DeleteTodo
;
```
mess. It will also automatically update as you add new entries to the `Action` module.

Note unlike some other libraries viewing Action.UpdateTodo and the module will include the specific type information. 

![Type Signature of a single message](docs/intellisense.png)

As will the module: 

![Type Signature of a module](docs/module_intellisense.png)

Meaning the reducers will work with typescript's native switch statement.


```typescript
// reducers.ts
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

### Nominal

Typescript has a [structural](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) type system. This is useful in many different ways but there are some cases where it falls short. Sometimes you will have two objects that have the same structure but don't mean or do the same thing. [Nominal](https://www.wikiwand.com/en/Nominal_type_system) typing instead uses explicit type relationships to evaluate assignability. Sometimes that's real darn useful. Enter `type UserId = Nominal<number, 'userId'>`. Sometimes teammates would conflate a user's ID with the session used to reference the user in the active users collection. Making these different types resolved this issue.

![Nominal typing in action](docs/nominal.png);

Under the hood this claims a symbol exists on the first type parameter (it does not. This is purely at compile time).

Nominals are purely compile time tagged types. Variants are full blown run time switchable objects. They work together really well. Using variants with nominally typed identity fields is pretty swag. Being able to distinguish a `Guid` from a name at a type level feels great.

### Splitting the actions among files.

The `Variant<>` type helper is producing a union of object literal types. Unions can themselves be put into unions. It is entirely possible to describe a full series of events as:

```typescript
export type ServerEvent =
    | UserEvent
    | ChannelEvent
    | ControlEvent

export module UserEvent { /***/ }
export type UserEvent = Variant<typeof UserEvent>;

export module ChannelEvent { /***/ }
export type ChannelEvent = Variant<typeof ChannelEvent>;

export module ControlEvent { /***/ }
export type ControlEvent = Variant<typeof ControlEvent>;
```

These modules can also be across several files. The main advantage of creating a wrapper module is that you can describe itself and its type in one go. However nothing stops a coder from doing something like this:

```typescript
import * as UserEvent from './events/user';
import * as ChannelEvent from './events/channel';
import * as ControlEvent from './events/control';

export type ServerEvent =
    | Variant<typeof UserEvent>
    | Variant<typeof ChannelEvent>
    | Variant<typeof ControlEvent>

```

The `export type UserEvent = Variant<typeof UserEvent>;` could still be used in this file if desired.

I find this to be very helpful in organizing large quantities of subtypes.

It will also help manage more modular reducers. I can write

```typescript
export function reduceChannel(state = defaultChannel, event: ChannelEvent): ChannelState { /***/ }
```

Note also that these do not need to be internal module definitions. I prefer them this way because of the file organization and constructor/type punning but the `Variant<>` helper type will work on any object-like structure containing functions. 

### Exhaustiveness Checking

OCaml and other functional languages will warn you when there's a potential pattern match you haven't thought of. Typescript can't be quite so advanced, but it can definitely warn you when you've forgotten a case in your switch statement.
 
The line in question is 
```typescript
default: return exhaust(action);
```
If we weren't handling all cases and it were possible to fall through to the default case then a type error would be raised because `exhaust(x)` is incompatible with anything besides `never`. If we somehow actually execute this code (say from javascript land) an `Error` can optionally be thrown with the type tag of the variant included in the message.


### Boilerplate

This is **far** less boilerplate than would normally be necessary but if you're like me and still get irritated about having to write the repetitive type declaration for each message here are a couple of snippets I wrote to ease the process. These are in vs-code's format.


```json
	"Variant": {
		"prefix": [
			"variant-type",
			"vt"
		],
		"body": [
			"export const ${1} = ${3:variant}('${2:TYPE}');",
			"export type $1 = ReturnType<typeof $1>;",
			""
		],
		"description": "A single specific variant's boilerplate."
    },
```

and the module

```json
	"VariantModule": {
		"prefix": "variant-module",
		"body": [
			"export module $1 {$2",
			"}",
			"export type $1 = Variant<typeof $1>;",
			""
		],
		"description": "Initialize a module for variants"
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

