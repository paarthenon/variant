---
title: Cheat Sheet
---

Assume `Animal` is defined as in the [Introduction](intro)

```typescript
// import 
import {Animal} from '...';

// create
const steve = Animal.snake('steve');

// snake type
type SnakeType = Animal<'snake'>;

// union of all animals
type AllAnimalsType = Animal;
```