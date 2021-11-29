---
title: Recursive Variants
---

:::warning
The `pass()` function is somewhat broken with `fields()`
:::

Recursive variants are a wonderful pattern for expressing and evaluating tree and list-like data. The traditional example involves a binary tree and we'll implement a proper one in the next section on [generic variants](generic). In the meantime, let's do a binary tree of `Animal`s. An animal tree may not have many real world applications but please _bear_ with me. 

Recursive variants are a bit of a deviation from the norm. Wheras up to this point we've defined the variant using a template and inferred the type from there, recursive variants must define their type first and then implement the variant based on that contract. This is a limitation of TypeScript—types may be recursive while values typically cannot.

> ⏲️ coming soon.

<!-- ```ts twoslash
import {variant, fields, VariantOf} from 'variant';

export const Animal = variant({
    cat: fields<{name: string, furnitureDamaged: number}>(),
    dog: fields<{name: string, favoriteBall?: string}>(),
    snake: (name: string, pattern: string = 'striped') => ({name, pattern}),
    // - eov
});
// - variantOnly
import {TypeNames} from 'variant';
export type Animal<T extends TypeNames<typeof Animal> = undefined> = VariantOf<typeof Animal, T>;
// --cut---
import {typed, pass} from 'variant';

type AnimalTree =
    | {type: 'Leaf', animal: Animal}
    | {type: 'Branch', left?: AnimalTree, right?: AnimalTree, label?: string}
;

const AnimalTree = variant(typed<AnimalTree>({
    Leaf: (...args: any[]) => args[0],
    Branch: (...args: any[]) => args[0],
}));

const tree = AnimalTree.Branch({
    label: 'Animal Kingdom',
    left: AnimalTree.Leaf({animal: Animal.snake({name: 'Steve'})),
});
//     right: AnimalTree.Branch({
//         label: 'Mammals',
//         left: AnimalTree.Leaf({animal: Animal.dog({name: 'Cerberus'})}),
//         right: AnimalTree.Leaf({animal: Animal.cat({name: 'Sikandar'})}),
//     })
// })
``` -->