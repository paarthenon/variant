---
id: grouping
title: Grouping

---

A variant's possible cases are most useful *in context*. The variant for `Diamonds` could mean any number of things, but the intended meaning becomes clear when `Diamonds ♦` is placed next to `Spades ♠`, `Hearts ♥`, and `Clubs ♣`. In general we call this collection of tag constructors the **Variant Module**. This module can be constructed in several ways and every method is compatible with the others. Feel free to mix and match styles as the situation dictates.

### The Direct Approach

The final result will be a simple JavaScript object. The keys of this object will be the names of the variant's types (its tags), and the values will be the tag constructors. You can make this object yourself.

```typescript
export const Animal = {
    dog: variant('dog', fields<{name: string, favoriteBall?: string}>()),
    cat: variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    snake: variant('snake', (name: string, pattern = 'striped') => ({name, pattern})),
};
```

But as you'll see, you'll often use `variantModule` or `variantList` instead, two functions that save a little time and headache.

### `variantModule()`

The `variantModule()` function resolves two minor issues with what we just saw, and is the **recommended** way to create such modules.

 1. The names of each type are no longer duplicated.
 1. There aren't any more tedious `variant(...)` calls.

```typescript {1}
export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, daysSinceDamage: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
});
```

:::note
To create a type with no body, include the property name but set it to `undefined` or `nil`.
```typescript
    ...
    bird: nil,
    snail: undefined,
});
```
:::

### `variantList()`

The `variantList()` function allows the user to use an *array* of variants instead of an object. The elements of this array may be calls to the `variant()` function *or* a string. Providing the string `'Diamonds'` is equivalent to calling `variant('Diamonds')` This function offers two main advantages:

 1. composition of existing variants
    
    ```typescript
    export const WingedAnimal = variantList([
        Animal.bird,
        Animal.pegasus,
    ]);
    ```
 2. the ability to use strings to quickly initialize enum-like variants.

    ```typescript
    const Suit = variantList(['Spades', 'Hearts', 'Clubs', 'Diamonds']),
    ```

### So why use the direct approach?

If `variantModule()` and `variantList()` are so convenient, why make the object literal yourself?

Well, two reasons.

1. **You're mixing styles.** `variantList()` is better suited for scooping up specific forms and passing them on, so we might use this to save ourselves effort while building the `Mammal` module by pulling from the `Animal` module we created earlier.

    ```typescript
    const Mammals = {
        squirrel: variant('squirrel', fields<{numAcorns: number}>()),
        ...variantList([
            Animal.dog,
            Animal.cat,
        ]);
    }
    ```
2. **Your property names and type names are different.** In these examples my type names are pretty simple and are also valid property names. Depending on the conventions of your codebase this may not be possible. 
    
    Legacy support may be needed to achieve continuity with data from the time java programmers would toss around `ALL_CAPS_MESSAGE_CONSTANTS` with no regard to the fact that may become unfashionable someday. *The nerve*.

    In some react projects, actions or other variant types are *scoped*, or *namespaced*, resulting in type names like `@action/ADD_ANIMAL`. This is not a valid property name and so it may be desirable to use a more friendly name as the key.. 

    ```typescript
    const Action = {
        addAnimal: variant('@action/ADD_ANIMAL', payload<Animal>()),
        callAnimal: variant('@action/CALL_ANIMAL_BY_NAME', fields<{name: string}>()),
        ...
    }
    ```

    It's much easier to call `Action.addAnimal(...)` than `Action['@action/ADD_ANIMAL'](...)`. Rest assured the variant library functions have all been designed to work with the *actual* type of the generated object, even when that made the type signatures of those functions really frustrating to write.

## Subsets and Combinations

Getting to the "Algebra" of algebraic data types, variants can be mixed and matched in a number of ways.

 > 🧙 If you have a functional programming background, *`variant()` is a factory function to generate tag constructors of [polymorphic variants](https://www.cs.cornell.edu/courses/cs3110/2019sp/textbook/data/polymorphic_variants.html).* If you don't have a functional programming background, ignore that sentence.

Let's begin with an expanded version of the `Animal` variant we've been using:

```typescript
export const Animal = variantModule({
    dog: fields<{name: string, favoriteBall?: string}>(),
    cat: fields<{name: string, daysSinceDamage: number}>(),
    snake: (name: string, pattern = 'striped') => ({name, pattern}),
    pegasus: fields<{color: string, magicType: 'Arcane' | 'Divine'}>(),
    bird: nil,
}
...
```

### Subsets

Note the new `pegasus` and `bird` cases. These neatly fit into a new subcategory, `WingedAnimal`.

```typescript
export const WingedAnimal = variantList([
    Animal.bird,
    Animal.pegasus,
]);
...
```

Our privileged pegasus can also claim membership to the group of animals with four legs.

```typescript
export const FourLeggedAnimal = variantList([
    Animal.cat,
    Animal.dog,
    Animal.pegasus,
]);
...
```

By maintaining a subset like `WingedAnimal` as its own type you gain the ability to write functions that are scoped to `WingedAnimal`. Any changes to `WingedAnimal` are centralized, and will cause the compiler to inform you of any handlers that don't process the new cases.

### Combinations

We could also have constructed this in the other direction—creating the subsets first and then combining them into the final `Animal` object. The pegasus being both winged and four legged makes our current set of animals difficult to work with. For this example we'll use a different setup.

```typescript
export const LandAnimal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
]);
export type LandAnimal<T extends TypeNames<typeof LandAnimal> = undefined> = VariantOf<typeof LandAnimal, T>;

export const WaterAnimal = variantList([
    variant('goldfish', fields<{memoryInSeconds: number}>()),
]);
export type WaterAnimal<T extends TypeNames<typeof WaterAnimal> = undefined> = VariantOf<typeof WaterAnimal, T>;
```

From this point it's easy to create the combined set of `Animal`.

```typescript
export const Animal = {
    ...LandAnimal,
    ...WaterAnimal,
};
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

A new list (perhaps `SkyAnimal`) could be added in the future and it would simply be another entry next to `LandAnimal` and `WaterAnimal`. We could complicate this yet further with a new genre-bending list of animals, `AmphibiousAnimals`.

```typescript
export const AmphibiousAnimal = variantList([
    variant('frog', fields<{color: string}>()),
]);
export type AmphibiousAnimal<T extends TypeNames<typeof AmphibiousAnimal> = undefined> = VariantOf<typeof AmphibiousAnimal, T>;
```

Amphibious animals may be encountered in both *water* and on *land*. How should this be expressed? It may be tempting to merge `AmphibiousAnimal` into the lists of `LandAnimal` and `WaterAnimal`, but that would be a step backward because we then lose the ability to identify *land only* or *water only* animals. 

The better approach would be to use our friend the union type. Remember that variants are designed to work *with* vanilla typescript and will work seamlessly with [union and intersection types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html).

### Variants in a union type

Assume there is a function that was meant to handle animals encountered on land. It took a parameter `animal: LandAnimal`. To expand its scope, change the type of the parameter from `LandAnimal` to `LandAnimal | AmphibiousAnimal`. TypeScript will understand that `frog` is now a valid case your your `match` or `switch` statements will have to handle.


```typescript
// I'm sorry
function runoverAnimal(roadKill: LandAnimal | AmphibiousAnimal) {
    return match(roadKill, {
        dog: ({name}) => `Don't make me go there :(.`,
        cat: ({name}) => `Poor ${name}...`,
        frog: _ => 'Was that a frog?',
    })
}
```

### Q & A

 - **Should I use singular or plural names for modules?**
    - Do you want to write `Animal.dog(...)` or `Animals.dog(...)`? Personally I like singular because it makes type annotations read more clearly. I like `x: Animal` over `x: Animals`, since that value is singular. Nothing breaks if you go plural.
