---
id: motivation
title: Motivation
---


## **Motivation**

TypeScript has an inherent problem. Interfaces and inferred types only exist at compile time, but inspecting a type can only be done at runtime. Classes are one option to provide compile time type checking and runtime behavior together but they don't serialize, so we can't send them over the network or shove them in a redux store. Enter this library.

You could certainly do this with raw discriminated unions, but here's that animal example again. 

```typescript
// vanilla typescript
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
const cat = (name: string, daysSinceDamage: number) => ({
    type: CAT_TYPE as typeof CAT_TYPE,
    name,
    daysSinceDamage,
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

**Both methods result in the following union type:**

![The union type 'Animal'](docs/animal.png)

But one is shorter, *automatically updates* as I add new animals, and requires **no manual casting**.