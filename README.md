# **Variant** [![Build Status](https://img.shields.io/travis/com/paarthenon/variant/master?style=flat-square)](https://travis-ci.com/paarthenon/variant) ![npm](https://img.shields.io/npm/v/variant?style=flat-square) ![NPM](https://img.shields.io/npm/l/variant?style=flat-square)

> [A variant type](https://reasonml.github.io/docs/en/variant) is like an enum but each case can hold some extra data.

```bash
npm i -S variant
```

Variant aims to bring the experience of [variant types](https://dev.realworldocaml.org/variants.html) to TypeScript. Variant types, a.k.a. [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world, are an excellent tool for describing and handling flexible domain models and tiny DSLs. However, because [*"TypeScript instead builds on JavaScript patterns as they exist today"*](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) using them as-is can result in tedious and fragile code. This project addresses that by providing well-typed, fluent, and expressive tools to safely do away with the boilerplate.

# [**Documentation**](https://paarthenon.github.io/variant/)

*everything below this line is project documentation for developers. Please use the website linked just above.*
****
Initial setup
```bash
npm install
```

build

```bash
npm run build
```
test

```bash
npm test
```

****

Questions, comments, and contributions are welcome. Open an issue.