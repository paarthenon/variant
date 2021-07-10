---
title: Documentation
---

Variant makes every effort to preserve documentation and user comments as it transforms
the template to the final variant. Please document your models to create the experience
*you* would desire as a developer. 


```ts twoslash
const Animal = {
    /**
     * A four-legged furry animal that ranges in size and activity level.
     **/
    dog: {},
}

const things: Record<string, boolean> = {
    yes: true,
    no: false,
}

const thing2 = things;
```

****

### TODO

 - show how it renders in intellisense on action creators and on fields.