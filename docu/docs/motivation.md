---
id: motivation
title: Motivation
---

> ⚠ This page explains why variant matters. If you just want to know how to use the library, [move on](use/variant) and come back to this page.

TypeScript has an inherent problem. Interfaces and inferred types only exist at compile time, but inspecting a type can only be done at runtime. That makes it difficult to simultaneously benefit from types and make decisions based on those types. Classes are one solution to provide compile time type checking and runtime behavior together but they don't *serialize*, so we can't send them over the network or shove them in a redux store. Enter variant types, and this library.

## Discriminated Unions

This library is all about variant types a.k.a. discriminated unions. I recommend this link if they are new to you:

[**Variant Types** (*ReasonML Hub*)](http://reasonmlhub.com/exploring-reasonml/ch_variants.html)
> ### Note:  
> Technically speaking, this implementation most resembles [**polymorphic variants**](http://reasonmlhub.com/exploring-reasonml/ch_polymorphic-variants.html). The implications of this will become clearer in the [grouping](use/grouping) section. Users familiar with functional programming may be stroking neckbeards in consideration at this point.

**The short version is this:** A variant type is like an enum but each case can hold some extra data. Enums already help us express ideas in the domain as a set of symbols. Variants allow those symbols to include more specific information depending on each case. 

 - Typically it's difficult to analyze code blocks. By holding to a pattern of matching against a variant (a.k.a. *a set number of options*) the compiler can help check your code flow for completeness, or *exhaustiveness*.
 - An underappreciated benefit is their ability to withstand refactoring. As an application grows in complexity a variant can simply add a new tag when branching functionality is needed. As a workflow needs more context the tag representing it can evolve from a simple symbol to a more complex type with its own constructor logic or async processing.
 - This approach is a natural fit for describing a protocol where each message is a tag and the overall lexicon forms the variant type. A *message handler* is a single [`match()`](api.md#match) statement. 
    - [👋 Hey there, redux](use/redux) .

### Discriminated Unions *in TypeScript*


TypeScript can certainly handle discriminated unions without this library, but it's not a good solution. This is what it looks like at its best, and most people don't do it this way. They create the interface for the type and the function separately, resulting in even more duplication. Compare this vanilla TypeScript code to the animal example with variant. *(Click the tabs to flip between the implementations).*

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    groupId="motivation-code-sample"
    defaultValue="vanilla"
    values={[
        {value: 'vanilla', label: 'Vanilla TS'},
        {value: 'variant', label: 'Variant'},
    ]}
>
<TabItem value="vanilla">

```typescript
const DOG_TYPE = 'dog';
const CAT_TYPE = 'cat';
const SNAKE_TYPE = 'snake';

function dog(name: string, favoriteBall?: string) {
    return {
        type: DOG_TYPE as typeof DOG_TYPE,
        name,
        favoriteBall,
    }
}
const cat = (name: string, furnitureDamaged: number) => ({
    type: CAT_TYPE as typeof CAT_TYPE,
    name,
    furnitureDamaged,
})
const snake = (name: string, patternName?: string) => ({
    type: SNAKE_TYPE as typeof SNAKE_TYPE,
    name,
    pattern: patternName ?? 'striped',
})

type Animal = 
    | ReturnType<typeof dog>
    | ReturnType<typeof cat>
    | ReturnType<typeof snake>;
;
```

</TabItem>
<TabItem value="variant">

```typescript
export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, furnitureDamaged: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});
export type Animal<T extends TypeNames<typeof Animal> = undefined>
    = VariantOf<typeof Animal, T>;
```

</TabItem>
</Tabs>

****

**Both methods result in the following union type:**

```typescript
type Animal = {
    type: "dog";
    name: string;
    favoriteBall?: string | undefined;
} | {
    type: "cat";
    name: string;
    furnitureDamaged: number;
} | {
    type: "snake";
    name: string;
    pattern: string;
}
```

But the variant approach is shorter, has better types, *automatically updates* as new animals are added, and requires **no manual casting**.
