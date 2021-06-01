---
title: 'Todo'
---
### Using a custom discriminant

Add a section on how to use a custom discriminant instead of "type"

Include a brief stop at `variantCosmos`, explain that this violates tree shaking so if you need the functions to be tree-shakable then call their individual implementations like `matchImpl` from `variant/lib/match`. Maybe I should drop the `lib` so that people can import them more easily.

### DOCUMENTATION.

Highlight the fact that JSDoc-style documentation on the members of a variant actually translate to the final object!

### A discussion on polymorphic variants.

Note: this is NOT IMPORTANT.

but it is interesting. Discuss the difference between polymorphic and regular variants and compare the nature of discriminated unions to the two options. They are clearly closer to polymorphic variants.


### Tree-shaking

Claim (and test) that the library is tree-shakable

### Tests

Show the extensive test suite. Explain that the test suite can be used as a set of examples for what the library can actually do. 

### Create a stackblitz (several)

Create some stackblitz projects showing how variants can really alter the flow.

 - A react app 

I'm not going to show you a todo app. The beauty of variants is that they turn rather more complex tasks into trivial exercises.

### Generating new variants (Procedural Generation).

Show that it is possible to enumerate the possible constructors and generate a variant by matching on the type of the function!


### Flags and Matrix

Demonstrate the utility of flags and matrix. Talk about the possibilities when you can treat something like an object (cache it) *or* as a list (enumerate it). There are typically problems with iterating through disparate entities, but variants are the ideal solution to that problem.

### Used in production

Highlight that there are multiple companies that use variant in production. 

### Use some or all

Variant is built on standard language features. This means that you can use as much or as little of the library as you wish. It is entirely possible to use variant for the advanced creation utilities and then return to a traditional switch statement to process these items or good old `if (animal.type === 'cat') {` which will narrow correctly.

It is also entirely possible to ignore the creation utilities entirely. I know of at least a couple users who use graphQL codegen to create their discriminated unions but use variant's matching utilities to process them.