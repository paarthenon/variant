---
id: cast-and-narrow
title: Cast and Narrow
---
Let's say you have an `animal: Animal` and you're sure it's a snake or you only care about it if it's a snake. Here are a couple of shortcuts to help with that.

If you're sure it's a snake, use cast.
```typescript
const snake = cast(animal, 'snake'); // typeof snake === Animal<'snake'>;
```
The second property will only allow valid keys of animal.

> Yes this is equivalent to `const snake = animal as Animal<'snake'>` but is cleaner in a `useSelector` call. Imagine `state.view` is a variant of menu states like `Game`, `Settings`, `About`, `MainMenu`.
> ```typescript
> // settingsPage.tsx
> const graphicsSettings = useSelector((state: RootState) => cast(state.view, 'Settings').graphics);
> ```


If you're not sure it's a snake, try to narrow it.

```typescript
const snake = narrow(animal, 'snake'); // typeof snake === (Animal<'snake'> | undefined);

console.log(snake?.pattern);
```
Like before, the second property can only be a valid key of `Animal`. If `animal` is in fact a snake you get it back. If not, you get undefined. This works very well with the optional chaining operator in TypeScript. Especially when you get a deeper object in the tree. 

> Yes this is equivalent to `const snake = partialMatch(animal, {snake: s => s});` but it's way more readable. It's also clearer in a `useSelector` call.
> ```typescript
> // settingsPage.tsx
> const graphicsSettings = useSelector((state: RootState) => 
>     narrow(state.view, 'Settings')?.graphics ?? DEFAULT_GRAPHICS_SETTINGS);
> ```
