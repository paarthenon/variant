---
id: augment
title: 🔮 Augmenting variants
---

:::warning Preview Content
🔮 denotes preview content. These are features that are available, but not well-documented and may be modified in the near future as they see better integration.
:::

I found myself wanting to add a simple createdDate property to all of my variants in a module and I wanted to avoid unnecessary effort on my part so I wrote `augment()`. It will return a version of the variant module with *wrapped* forms of the original variant creators. These new variant creators will take the same inputs, but their outputs will include the augmented types.


```typescript
const AniCommand = augment(
    variantModule({
        AddAnimal: payload<Animal>(),
        CalloutName: fields<{name: string, volume: 'normal' | 'shouting'}>(),
    }),
    () => ({timestamp: Date.now()})
);

```