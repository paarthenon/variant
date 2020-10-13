---
title: Redux
---

**Variant** works seamlessly with [react](https://reactjs.org/) and [redux](https://redux.js.org/). Create your actions as a variant just like you would anything else. It should Just Work™ as an action type for your reducers. You can create async task creators by simply using an async function in your [`variant`](api.md#variant) definition.

### Grouping

The lesson on grouping will come into play here. As your application becomes more complex you may want to separate your actions into subsets. Variant will allow you to capture those with simple types and combine them. Since we build on core TypeScript features we can perform unions and intersections on these types as you'd expect.

### isOfVariant

For more complex cases it will be useful to judge if an object is one of your `Action` types — either the main set or one of your subsets. In such a scenario [`isOfVariant`](api.md#isOfVariant) can play a significant role. This function will help narrow your action to a more specific type.

```typescript
export const rootReducer = (state = initState, action: GameAction | DebugAction) => {
    return isOfVariant(action, DebugActions) ? debugReducer(state, action)
        : isOfVariant(action, GameAction) ? gameReducer(state, action)
        : state
    ;
}
```

## Hooks through example

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

### `useSelector`

In a more complex example, 
```typescript
// before
const pageId = useSelector((state: RootState) => state.view.type === 'Profile' ? state.view.id : undefined);

// after
const pageId = useSelector((state: RootState) => narrow(state.view, 'Profile')?.id)
```
**result:** `typeof pageId: number | undefined`

In deeper nested structures this little syntactic sugar can save a lot of time.

## Converted Official Example


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
export const Action = variantList([
    variant('addTodo', (text: string) => ({
        id: nextTodoId++,
        text,
    })),
    variant('toggleTodo', fields<{id: number}>()),
    variant('setVisibilityFilter', payload<VisibilityFilters>()), 
]);
export type Action<T extends TypeNames<typeof Action> = undefined> = VariantOf<typeof Action, T>;

export const VisibilityFilters = strEnum([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE',
]);
export type VisibilityFilters = keyof typeof VisibilityFilters;
```

These are nearly the same, but the second sample gives more type information and an easy way to access the type of an action (`Action<'addTodo'>`). The reducer is where things get interesting. Here's [the official redux example reducer](https://redux.js.org/basics/example/#reducerstodosjs).

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
        {
            id,
            text,
            completed: false,
        }
    ],
    toggleTodo: ({id}) => state.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    ),
    setVisibilityFilter: () => state,
});
```
It's very nice to having exhaustiveness checking by default and the ability to easily destructure properties.

As expressions these functions compose well with code written in a functional style. For example, let's say you want to render the event history of your application and are writing a component to render a single `Action`. This becomes very clean with [match](api.md#match)!

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