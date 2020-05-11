---
title: 'API'
---
The full list of options.

## Functions

tools to help describe the domain.

### fields

### 

### variant

```typescript
const dog = variant('dog', fields<{name: string, favoriteBall?: string}>()),
```

### variantList

```typescript
const dog = variant('dog', fields<{name: string, favoriteBall?: string}>()),
```

### variantFactory

By default, [`variant()`](#variant) generates tag constructors that use the `type` property for the discriminant.

### flags

### cast

### narrow

### outputTypes

## Types

### Flags<T\>

### Matrix<T\>