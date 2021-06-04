---
title: Naming Conventions
---

First and foremost, Variant does not care how you refer to your variables. Use whatever naming scheme you and your team find readable and aesthetically pleasing. 

Variants most resemble enums and rationally can be treated as such in terms of style. That is to say use `PascalCase` for *both* variant names (`Attribute`) and members (`SizeOnDisk`).

Regarding plurality I recommend variant names be singular while the plural form be used for collections such as arrays or property bags.

```ts
const Attribute = ...;
type Attribute = ...;
type Attributes = Flags<typeof Attribute>;
```

### Functional users

Some users prefer tag constructors to exist as top-level elements. They don't want to call `Animal.dog(...)`, they want to call `dog(...)`. In this paradigm, PascalCase may conflict with pre-existing rules that enforce lowercase function names. I have found these users will tend to prioritize maintaining function name consistency and so will use `camelCase` for their tag creators. This is fine. 

For those who prefer to stick to `PascalCase`, this is the pattern in OCaml, so there is precedent for both practices.