---
title: Documentation
---

Variant makes efforts to preserve documentation and user comments as it transforms
the template to the final variant. Please document your models to create the experience
*you* would desire as a developer. 


```ts twoslash
import {variant, fields} from 'variant';

/**
 * Some sort of pet.
 **/
const Animal = variant({
    /**
     * A personal companion that comes in a variety of shapes and sizes
     **/
    dog: fields<{
        /**
         * What to call them.
         **/
        name: string;
        /**
         * The color of the dog's favorite ball
         **/
        favoriteBall?: string;
    }>(),
    /**
     * A friend and pet that has taken the internet by storm.
     **/
    cat: {},
})

// hover-text of `Animal.dog` is
// "A personal companion that comes in a variety of shapes and sizes"
const dog = Animal.dog({ 
    name: 'Cerberus',
});
// hover-text of dog.favoriteBall is
// "The color of the dog's favorite ball"
console.log(dog.favoriteBall); 

//hover-text: Animal
// "Some sort of pet."
console.log(Animal);
```
These doc-comments are valid on:

- The overall variant (`Animal`)
- Variant creators (`Animal.dog()`)
- Parameter types (`dog.favoriteBall`, `Animal.dog({name: 'Cerberus', favoriteBall: 'red'})`)

### How does it work?

TypeScript has special handling for documentation passthrough [iff](../glossary#iff) there's a `P in keyof T` index type. The variant types have been written to preserve this structure when possible, allowing the documentation to flow.
