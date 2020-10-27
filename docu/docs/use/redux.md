---
title: React + Redux ⚛️
---

**Variant** works seamlessly with [react](https://reactjs.org/) and [redux](https://redux.js.org/). Create your actions as a variant just like you would anything else. It should Just Work™ as an action type for your reducers. You can create async task creators by simply using an async function in your [`variant`](api.md#variant) definition.

:::note Other libraries
Sometimes users familiar with action creators will ask about **`redux-toolkit`** and which library they should use. I'll take a moment here to go over the differences, but *you do not need to pick one*. These libraries can work together. I recommend you keep using `redux-toolkit` for it's configuration features like `configureStore()`, middleware, etc, but you complete ignore `createAction()` and use `variant()` instead for your actions. Consider also using it to express your domain models. As you'll soon see, Variant and React are a *match* made in heaven 🤣.

Redux-toolkit is meant to be opinionated and is specifically scoped to redux. Variant, in contrast, does not care what stack you use and is dedicated to expressing complex domains without getting in your way. Even if that includes **async**, **generic**, or **recursive** variants. Action creators are only a starting point, this library is also great for creating messages and branching options. Variant's full cast of supporting functions makes it possible to more easily construct and process these models.
:::

## The Money 🏆

I'm going to jump straight to the beautiful part. By expressing an element of your state as a variant, you gain the ability to `match` on that state information for type-safe and exhaustive conditional rendering with a *pretty* slick syntax.

Here's an example from a media manager I'm writing.
```typescript
/**
 * Render a series of file attributes (size, resolution, etc.)
 */
export const AttributeList: React.FC<{attributes: Attribute[]}> = ({attributes}) => {
  return (
    <div>
      {attributes.map(attr => (
        <Badge key={attr.type}>
          {match(attr, {
            Filename: ({payload}) => `filename: ${payload}`,
            Resolution: ({width, height}) => `resolution: ${width} x ${height}`,
            CreatedDate: ({payload}) => <>
              <Icon icon='calendar' />
              created: {renderDate(payload)}
            </>,
          })}
        </Badge>
      ))}
    </div>
  )
}
```

Note the degrees of flexibility shown here:

 - the component rendered fundamentally different kinds of data (strings, numbers, dates).
 - each case has independent control over its rendering.
    - an icon is only added for *some* of the options.
 - refactor with ease. Adding a new attribute type will add warnings to update this component as well.

Edge cases are typically difficult to express and process. Variants make them trivial. Simply add a new possibility to the variant module (`Attribute`). The compiler will inform you of every class or component that then needs updating. These edge cases can have completely different types of data than every case before them. 

Even if there were two attribute types with the same structure, they could be handled differently. For example, the handler branch for `Filesize` could run `renderSize(size: number): string` on the payload to show something like `3.51 MB` while the handler branch for `AccessCount` knows not to bother.

## Grouping

The lesson on grouping will come into play here. As your application becomes more complex you may want to separate your actions into subsets. Variant will allow you to capture those with simple types and combine them. Since we build on core TypeScript features we can perform unions and intersections on these types as you'd expect.


### `Action`

My overall `Action` type is usually a composite of all my other action variants.

```typescript
export const Action = {
  ...GameAction,
  ...DebugAction,
};
export type Action<T extends TypeNames<typeof Action> = undefined> = VariantOf<typeof Action, T>;
```
This pattern allows me to create reducers that target specifically the subvariants `GameAction`, `DebugAction`.

### isOfVariant

In these more complex cases it will be useful to judge if an object is one of your `Action` types — either the main set or one of your subsets. In such a scenario [`isOfVariant`](api.md#isOfVariant) can play a significant role. This function will help narrow your action to a more specific type.

```typescript
export const rootReducer = (state = initState, action: GameAction | DebugAction) => {
    return isOfVariant(action, DebugActions) ? debugReducer(state, action)
        : isOfVariant(action, GameAction) ? gameReducer(state, action)
        : state
    ;
}
```

## Hooks

I often use a variant to capture view or app *modes*. Let's say I've got a View type that could be set to either `Home` or a user's `Profile` page. Home is the same no matter what, but viewing someone's profile means I need a user ID to reference.

```typescript
type View = {
  type: 'Home';
} | {
  type: 'Profile';
  id: number 
}
```

### `useState`

In a simple application, this view might just be switching between tabs and the state for that would be stored in the component.
```typescript
const [view, setView] = useState<View>(View.Home());

...

setView(View.Profile(42));
```

Thanks to the variant's payload when it is time to render a profile, we'll know which ID to include in the API call.

## Redux Official Example


So here is [the official redux example](https://redux.js.org/basics/example) in vanilla javascript.

```typescript
// Before (not using variant)
let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
```

```typescript
// After
let nextTodoId = 0;
export const Action = variantModule({
    addTodo: (text: string) => ({
        id: nextTodoId++,
        text,
    }),
    toggleTodo: fields<{id: number}>(),
    setVisibilityFilter: payload<VisibilityFilters>(), 
});
export type Action<T extends TypeNames<typeof Action> = undefined> = VariantOf<typeof Action, T>;

export const VisibilityFilters = strEnum([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
});
export type VisibilityFilters = keyof typeof VisibilityFilters;
```

The second sample gives more type information and an easy way to access the type of an action (`Action<'addTodo'>`) while also being shorter. The reducer is where things get interesting. Here's [the official redux example reducer](https://redux.js.org/basics/example/#reducerstodosjs).

```typescript
// Before (not using variant)
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

export default todos
```


```typescript
// After
const initialState: Todo[] = [];
const todos = (state = initialState, action: Action) => match(action, {
    addTodo: ({id, text}) => [
        ...state,
        { id, text, completed: false }
    ],
    toggleTodo: ({id}) => state.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    ),
    setVisibilityFilter: () => state,
});
```
It's very nice to having exhaustiveness checking by default and the ability to easily destructure properties.

For example, let's say you want to render the event history of your application and are writing a component to render a single `Action`. This becomes very clean with [`match()`](api.md#match).

```tsx
export const ActionView: React.FC<{action: Action}> = ({action}) => {
    return (
        <div>
            {match(action, {
                addTodo: ({id, text}) => <>Add new todo [{id}]: "{text}".</>,
                toggleTodo: ({id}) => <>Toggle todo with id [{id}].</>,
                setVisibilityFilter: ({payload}) => <>
                  Set the current visibility filter to {payload}.
                </>,
            })}
        </div>
    )
}

```