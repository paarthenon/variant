---
id: that-type
title: That type tho...
---

I admit this type I ask you to include is... *a bit much.*

```typescript
export type Animal<T extends TypeNames<typeof Animal> = undefined>
     = VariantOf<typeof Animal, T>;
```

I'll tell you straight: You dont have to use it. But I think you should.
 - It is what enables the `Animal<'cat'>` syntax with auto-completion for the generic property
 - Your consumers *do not experience the complexity of this type definition*. It shares a name with the module, so it will be quietly imported alongside the module bringing all the benefits to the user with none of the cost.
 - The tedium of this boilerplate is stripped by using snippets. [I provide some here.](../cheat.md)

## Breaking it down

Here's what's going on.

`VariantOf<VariantDef, Type>` will generate the discriminated union from the object that is the variant module. The second parameter `Type` will be evaluated as either
 - A valid type of the variant (`Animal`)
    - which returns just the specific type `Animal<'snake'>`
 - `undefined`
    - which returns the union `Animal<'dog'> | Animal<'cat'> | Animal<'snake'>`

If you want to, you can just do this:

```typescript
type Animal = VariantOf<typeof Animal>;
```

But then you can't get or pass the subtypes. So let's make our new type generic.

```typescript
type Animal<T> = VariantOf<typeof Animal, T>;
```

Now we can do `Animal<'snake'>` and `Animal<undefined>` but I can't reference just the type `Animal` anymore, which I quite liked.

```typescript
type Animal<T = undefined> = VariantOf<typeof Animal, T>;
```

So now I can do `Animal<'snake'>` and `Animal`. Great! But I can also do `Animal<'Rose'>` which... doesn't make sense. This will require us to restrict the type parameter of Animal. *I love this because it gives me autocomplete for the tag name when I'm adding the type annotation.*

```typescript
type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

Which is how we end up back here. You can pretty much stop at any point along this chain but you have to accept the caveats of doing so.


### Why is this necessary?

There are two separate **spaces** in TypeScript—the *value* space and the *type* space. If you want to bridge the gap between runtime state and compile-time types then you'll need to exist in both spaces and keep those definitions in sync. Classes do this, which is why you can assign a class to both a constant and a type. Technically they refer to different things (the constructor function vs. the structure of an instance of the class). **Variant works the same way** but I'm not part of the TypeScript team so I can't just make the compiler do the book-keeping.