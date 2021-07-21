---
title: Advanced Creation
---

*"Advanced Creation"*, huh? I feel like I'm teaching a seminar for small gods. Well, this is an article on the skullduggery you can pull off with an open mind and understanding of functional programming, so I suppose in some ways that is what it is. On with the dark magic 🧙🏽. 

## Differing key labels and names

In many cases, the label used when referring to a variant is exactly what is used in the underlying `type` field. However, this is not always desirable.

 - Sometimes coding conventions will dictate camelCase or PascalCase names while database/network conventions will demand ALL_CAPS.
 - The `UPPER_SNAKE_CASE` format has historically been the most common naming scheme for constant values. Perhaps you'll need to support them to support existing code or data models.
 - In larger codebases, it may be necessary to start introducing scopes to avoid name collisions. These might look something like `@player/update` or `AUDIT::END_RECORDING`. These strings contain special characters and so are not valid property names, but may be required by your code.

Using `variation()` resolves these concerns. 

```ts
const Action = variant({
    DoSomething: variation('DO_SOMETHING'),
    LoadThing: variation('LOAD_THING', fields<{thingId: number}>()),
    RefreshPage: variation('REFRESH_PAGE'),
})
```

There are some minor consequences to breaking this assumption. 

```ts
const doAction = Action.DoSomething();
console.log()
```

## Variants are templates

The `variant()` function accepts a template as an object. In this object each value is a function (ignore `{}` for now). Well... variants count. It is possible to clone `Animal`

```ts
const OtherAnimal = variant(Animal);
```

> ⏲️ coming soon.

## Constraining Subtypes

Use `patterned()` and `constrained()` to enforce that every member of a variant meet certain criteria. 

> ⏲️ coming soon.


