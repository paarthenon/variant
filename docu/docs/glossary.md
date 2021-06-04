---
slug: glossary
title: 📑 Glossary of Terms
---

## Domain

TODO: Steal this from the intro of the previous version.

## Exhaustive

The term "exhaustive" refers to some control flow statement where every branch is handled. Variant's match functions are exhaustive until instructed otherwise.

## Match
 - [`match()`](api#match) - match a variant as an expression.
 - [`matcher()`](api#matcher) - match a variant in a builder pattern.
 - [`prematch()`](api#prematch) - match against a type of variant ahead-of-time.

An operation resembling a [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement that can be performed on some instance of a [variant](#variant). Matching in general refers to processing an instance of a variant by providing instructions on how to respond to each potential [variation](#variation). There are several match functions available depending on your needs and aesthetic preferences.

## Model

Model is a bit of an overloaded term, but generally speaking refers to the abstract representation of your [domain](#domain) concerns. In code, it generally refers to the interfaces and types you use in your core logic.

## TypeScript

The language we all know and love. TypeScript is a statically typed layer on top of JavaScript, possibly the most widespread cross-platform language and runtime in the world.

Variant 3.0 introduces scoped variants which leverage TypeScript `4.1+`'s template literal features. As such, TypeScript `4.1+` is required. 

## Variant

 - [`variant()`](api#variant) - create a new variant.

A variant is a uniquely powerful datatype. Like the traditional enum, a variant is capable of representing some state in different forms. Unlike the traditional enum, each form of a variant can maintain its own *distinct* properties.

Variants are also known as [algebraic data types](https://www.cs.cornell.edu/courses/cs3110/2019sp/textbook/data/algebraic_data_types.html) in the functional world or [discriminated unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions) in the TypeScript world. Rust programmers may have found the contrast between variants and enums confusing. Rust's "enums" *are* proper variants, but this is not the case in most languages.

## Variation

 - [`variation()`](api#variation) - create a new variant.

One of the potentially many forms of a [variant](#variant). This is sometimes referred to as the *form* or the *shape* of the variant. If **Animal** is a variant, then **cat** is one *variation*.