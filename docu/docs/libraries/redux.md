---
title: Redux (+ React)
---

**Redux** is a genre-defining state management library, most often paired with React. The library is built around three core concepts, each of which can benefit from Variant. They are:

- Actions
- Store
- Reducers

Action definitons created through `variant()` are more flexible than the `createSlice()` function because they can be used anywhere. They aren't tied to redux thunk middleware, and the instances they create can be serializable.

The store type definition can be greatly enhanced through discriminated unions. I love to use variants to express user config or loading states. I even use them as part of my store to represent the current view.

The match function was designed to be the ideal reducer. It enables expressive syntax that clearly captures the intent of the programmer.

## Real-life example

I've pulled some code from an app I'm building to demonstrate how Variant fits in at each stage of the process.

## Actions
My actions are defined as a variant.

```ts
export const SettingsAction = variant({
    SetColorMode: payload<ColorMode>(),
    SetUIGravity: payload<UIGravity>(),
})
export type SettingsAction<T extends TypeNames<typeof SettingsAction> = undefined> = VariantOf<typeof SettingsAction, T>;
```

The `ColorMode` and `Gravity` types are defined as below—

```ts
export const ColorMode = catalog([
    'light',
    'dark',
    'system',
]);
export type ColorMode = keyof typeof ColorMode;

export type UIGravity = 'top' | 'bottom';
```

## Store
I create an interface `WebAppSettings` comprised of my catalog type. This may store variants as well — `ColorMode` could have been a variant with two options, `system` and `selected (light/dark)`.

```ts
export interface WebAppSettings {
    /**
     * App color mode (light or dark mode)
     */
    colorMode: ColorMode;
    /**
     * Whether the UI chrome should be above or below the content.
     */
    gravity: UIGravity;
}

export interface RootState {
    // ...
    settings: WebAppSettings;
} 
```

## Reducer
The `match()` function steps in to assist with action processing.

```ts
export const settingsReducer = (state = initState, action: SettingsAction) => {
    return produce(state, s => { // Immer 
        match(action, {
            SetColorMode({payload}) {
                s.settings.colorMode = payload;
            },
            SetUIGravity({payload}) {
                s.settings.gravity = payload;
            },
        })
    })
}
```