---
id: grouping
title: Grouping

---

A variant's possible cases are most useful *in context*. Logically, it's difficult to understand the purpose of a variant without its alternatives. The variant for `Diamonds` is harder to make sense of when it isn't connected to `Spades`, `Clubs`, and `Hearts`. Programmatically, if we understand all of the forms a piece of data can take then we have enough information for the compiler to help us remember to handle every case.

To make that as easy as possible, try `variantList([ ... ])`.

```typescript
export const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
]);
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

Or as mentioned earlier, create the object literal manually.

```typescript
const Animal = {
    dog: variant('dog', ...),
    cat: variant('cat', ...),
    snake: variant('snake', ...),
}
```
There's no magic behind `variantList`. The above code results in the same object. By creating the object manually you can choose a different name for the *type property* and the *tag constructor*, meaning calling `Animal.cat(...)` could return an object with the type literal `'@animal/cat'` instead of `'cat'`. This may help organize things in more complex applications or ambiguous situations. If there's no need to differentiate the two, `variantList` saves some duplication and typing. It comes into play more when manipulating arrays of variants.

## Subsets and Combinations

Getting to the "Algebra" of algebraic data types, variants can be mixed and matched in a number of ways.

 > 🧙 If you have a functional programming background, *`variant()` is a factory function to generate tag constructors of [polymorphic variants](https://www.cs.cornell.edu/courses/cs3110/2019sp/textbook/data/polymorphic_variants.html).* If you don't have a functional programming background, ignore that sentence.

Let's start with an expanded version of the `Animal` variant we've been using:

```typescript
export const Animal = variantList([
    variant('dog', fields<{name: string, favoriteBall?: string}>()),
    variant('cat', fields<{name: string, daysSinceDamage: number}>()),
    variant('snake', (name: string, patternName?: string) => ({
        name,
        pattern: patternName ?? 'striped',
    })),
    variant('pegasus', fields<{color: string, magicType: 'Arcane' | 'Divine'}>()),
    variant('bird'),
]);
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
```

### Subsets

Note the new `pegasus` and `bird` cases. These neatly fit into a new category, `AnimalWithWings`.

```typescript
export const AnimalWithWings = variantList([
    Animal.bird,
    Animal.pegasus,
]);
export type AnimalWithWings<T extends TypeNames<typeof AnimalWithWings> = undefined> = VariantOf<typeof AnimalWithWings, T>;
```

Our privileged pegasus can also claim membership to the group of animals with four legs.

```typescript
export const AnimalWithFourLegs = variantList([
    Animal.cat,
    Animal.dog,
    Animal.pegasus,
]);
export type AnimalWithFourLegs<T extends TypeNames<typeof AnimalWithFourLegs> = undefined> = VariantOf<typeof AnimalWithFourLegs, T>;
```

Any functions involving flight now have an accessible type they are constrained by. As the cast of flying animals expands, the compiler will prompt coders to handle each new cases everywhere it needs to be handled.

### Combinations

It's worth mentioning that we could also have constructed this in the other direction—creating the subsets first and then combining them into the final `Animal` object. In this example, pegasus being both winged and four legged makes that slightly messier. For the constructive example we'll use a different setup.

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

A new list (perhaps `SkyAnimal`) could be added in the future and it would simply be another entry in the `Animal` object literal. We could complicate this yet further with a new genre-bending list of animals, `AmphibiousAnimals`.

```typescript
export const AmphibiousAnimal = variantList([
    variant('frog', fields<{color: string}>()),
]);
export type AmphibiousAnimal<T extends TypeNames<typeof AmphibiousAnimal> = undefined> = VariantOf<typeof AmphibiousAnimal, T>;
```

Amphibious animals are complicated because they may be encountered in both *water* and on *land*. How should this be expressed? It may be tempting to merge `AmphibiousAnimal` into the lists of `LandAnimal` and `WaterAnimal`, but that would be a step back because we then lose the ability to identify *land only* or *water only* animals. Instead, we use the same old TypeScript feature we're accustomed to in this situation. Type union.


### Variant Union

Assume there is a function that was meant to handle animals encountered on land. It took a parameter `animal: LandAnimal`. To expand its scope, change the type of the parameter from `LandAnimal` to `LandAnimal | AmphibiousAnimal`. TypeScript will understand that `frog` is now a case your code (and all its match/switch statements) will have to handle.


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
