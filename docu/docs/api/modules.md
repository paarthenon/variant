---
id: "modules"
title: "variant"
sidebar_label: "☕ API"
sidebar_position: 0.5
custom_edit_url: null
---

## Type aliases

### Flags

Ƭ **Flags**<`T`\>: `Partial`<[`Matrix`](modules#matrix)<`T`\>\>

Turn a sum type (a variant) into a partial product type.

**`see`** [Matrix](modules#matrix)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |

#### Defined in

[flags.ts:15](https://github.com/paarthenon/variant/blob/1e64379/src/flags.ts#L15)

___

### GVariantOf

Ƭ **GVariantOf**<`VM`, `TType`, `Map`\>: `TType` extends keyof `VM` ? `Generify`<`GenericVariantTypeSpread`<`VM`\>[`TType`], `Map`\> : `Generify`<`GenericVariantTypeSpread`<`VM`\>[keyof `VM`], `Map`\>

Generic Variant Of.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VM` | extends `GenericVariantRecord`<`Object`, `string`\> |
| `TType` | extends [`TypeNames`](modules#typenames)<`VM`\> |
| `Map` | extends `Object` |

#### Defined in

[generic.ts:70](https://github.com/paarthenon/variant/blob/1e64379/src/generic.ts#L70)

___

### Matrix

Ƭ **Matrix**<`T`\>: { [P in TypesOf<T\>]: CreatorOutput<T[GetTypeLabel<T, P\>]\> }

Transform a sum type (a variant) into a product type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |

#### Defined in

[flags.ts:6](https://github.com/paarthenon/variant/blob/1e64379/src/flags.ts#L6)

___

### TypeCatalog

Ƭ **TypeCatalog**<`T`\>: { [P in TypesOf<T\>]: P }

A catalog object listing the types inherent to some `VariantModule`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |

#### Defined in

[typeCatalog.ts:7](https://github.com/paarthenon/variant/blob/1e64379/src/typeCatalog.ts#L7)

___

### TypeMap

Ƭ **TypeMap**<`T`\>: { [P in keyof T]: T[P]["type"] }

A mapping of friendly names to the underlying type literals.

**`remarks`**
Most `VariantModule`s will have labels (Animal.dog) that match the
underlying type of the object the function will create. Some will not.
This type creates a mapping from the name/label to the type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |

#### Defined in

[precepts.ts:105](https://github.com/paarthenon/variant/blob/1e64379/src/precepts.ts#L105)

___

### TypeNames

Ƭ **TypeNames**<`T`\>: [`TypesOf`](modules#typesof)<`T`\> \| `undefined`

Get the literal union for a variant type's names, plus `undefined`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |

#### Defined in

[precepts.ts:137](https://github.com/paarthenon/variant/blob/1e64379/src/precepts.ts#L137)

___

### TypesOf

Ƭ **TypesOf**<`T`\>: [`TypeMap`](modules#typemap)<`T`\>[keyof `T`]

Get the literal union for a variant's type property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |

#### Defined in

[precepts.ts:132](https://github.com/paarthenon/variant/blob/1e64379/src/precepts.ts#L132)

___

### Variant

Ƭ **Variant**<`Type`, `Fields`, `Key`\>: `Record`<`Key`, `Type`\> & `Fields`

Used in writing cases of a type-first variant.

`Variant<'One', {a: number, b: string}>>` generates
 - `{type: 'One', a: number, b: string}`

You may write the literals directly, using this is recommended
if you'd like to update the literal as this library updates.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Type` | extends `string` |
| `Fields` | extends `Object`{} |
| `Key` | extends `string```"type"`` |

#### Defined in

[precepts.ts:12](https://github.com/paarthenon/variant/blob/1e64379/src/precepts.ts#L12)

___

### VariantModule

Ƭ **VariantModule**<`K`\>: `Object`

A variant module definition. Literally an object serving as
a collection of variant constructors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

#### Index signature

▪ [name: `string`]: `VariantCreator`<`string`, `Func`, `K`\>

#### Defined in

[precepts.ts:93](https://github.com/paarthenon/variant/blob/1e64379/src/precepts.ts#L93)

___

### VariantOf

Ƭ **VariantOf**<`T`, `TType`\>: `TType` extends `undefined` ? `SumType`<`T`\> : `TType` extends [`TypesOf`](modules#typesof)<`T`\> ? `Extract`<`SumType`<`T`\>, `Record`<`T`[keyof `T`][``"key"``], `TType`\>\> : `SumType`<`T`\>

**Create a variant type**.

**`example`**
```ts
// full form
export type SomeVariant<T extends TypeNames<typeof SomeVariant> = undefined>
    = VariantOf<typeof SomeVariant, T>;
// short form (no Animal<'cat'>)
export type SomeVariant = VariantOf<typeof SomeVariant>;
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> |
| `TType` | `undefined` |

#### Defined in

[precepts.ts:164](https://github.com/paarthenon/variant/blob/1e64379/src/precepts.ts#L164)

## Functions

### HOI

▸ `Const` **HOI**<`Constraint`\>(): <T\>(`definition`: `T`) => `T`

**H**igher-**O**rder **I**dentity.

A higher order factory for this very useful wrapper function.

```ts
// Enforce the type constraint *and* narrow the return type.
function defineThing<T extends Template>(definition: T): T {
    return definition;
}
```

The above `defineThing` can now be generated through

```ts
const defineThing = HOI<Template>();
```

Or in more advanced to define something like a catalog:

```ts
const defineThings = HOI<Record<string, Template>>();
```

#### Type parameters

| Name |
| :------ |
| `Constraint` |

#### Returns

`fn`

▸ <`T`\>(`definition`): `T`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `definition` | `T` |

##### Returns

`T`

#### Defined in

[util.ts:56](https://github.com/paarthenon/variant/blob/1e64379/src/util.ts#L56)

___

### augment

▸ **augment**<`T`, `F`\>(`variantDefinition`, `f`): `AugmentedRawVariant`<`T`, `F`\>

Augment an existing variant model with new or overridden fields.

**`tutorial`**
Use in conjunction with `variant` (or `variantModule`).

```typescript
// Add a timestamp to every action.
export const Action = variant(augment(
    {
        AddTodo: fields<{text: string, due?: number}>(),
        UpdateTodo: fields<{todoId: number, text?: string, due?: number, complete?: boolean}>(),
    },
    () => ({timestamp: Date.now()}), 
));
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RawVariant` |
| `F` | extends (`x`: `Identity`<`VariantTypeSpread`<`VariantRecord`<`T`, `string`\>\>[keyof `T`]\>) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variantDefinition` | `T` | a template for the variant, extends `RawVariant`, may be an existing variant. |
| `f` | `F` | the augment function. This receives the object that is is augmenting, enabling calculated properties. |

#### Returns

`AugmentedRawVariant`<`T`, `F`\>

#### Defined in

[augment.ts:25](https://github.com/paarthenon/variant/blob/1e64379/src/augment.ts#L25)

___

### catalog

▸ **catalog**<`T`\>(`strings`): { [P in T]: P }

Create a catalog object from a set of strings.

**`tutorial`**
```ts
const Suit = catalog(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
type Suit = keyof typeof Suit;
```
`Suit` is now available as both value (`return Suit.Spades`) and type (`function(cardSuit: Suit) { ... }`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `strings` | `T`[] | (`string[]`) - list of string literals |

#### Returns

{ [P in T]: P }

a string enum

#### Defined in

[catalog.ts:40](https://github.com/paarthenon/variant/blob/1e64379/src/catalog.ts#L40)

▸ **catalog**<`T`, `F`\>(`strings`, `factory`): { [P in T]: ReturnType<F\> }

Create a catalog object based on some calculation

**`tutorial`**
```ts
const logLevels = catalog(
    ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
    (_, index) => index * 100, // 100 as buffer.
);
```

This generates a catalog object:

const logLevels = {
    trace: 0,
    debug: 100,
    info: 200,
    ...,
};

Something like `logLevels` is commonly used as the internal representation for a logger.
The minimum log level (or threshold) is a simple number that we can use for comparison
against this table. The `100` is purely a convention to allow future items to slide in-
between existing values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |
| `F` | extends `LiteralFactory`<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `strings` | `T`[] | list of string literals. |
| `factory` | `F` | function to generate value. |

#### Returns

{ [P in T]: ReturnType<F\> }

an enum or constant mapping where the values are based on the factory function.

#### Defined in

[catalog.ts:69](https://github.com/paarthenon/variant/blob/1e64379/src/catalog.ts#L69)

▸ **catalog**<`T`\>(`catalog`): `T`

Define the catalog object manually.

Use to enforce a consistent type for all values.

**`tutorial`**

```ts
const settingKey = catalog({
    one: 'SETTING_ONE',
    two: 'SETTING_TWO',
} as const);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `LiteralCatalog` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `catalog` | `T` | an object literal where each value is the same type of literal. |

#### Returns

`T`

#### Defined in

[catalog.ts:85](https://github.com/paarthenon/variant/blob/1e64379/src/catalog.ts#L85)

___

### constant

▸ **constant**<`T`\>(`x`): () => `T`

Create a function that returns a value after being called.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `T` | the value to be returned |

#### Returns

`fn`

▸ (): `T`

##### Returns

`T`

#### Defined in

[match.tools.ts:6](https://github.com/paarthenon/variant/blob/1e64379/src/match.tools.ts#L6)

___

### constrained

▸ **constrained**<`T`, `F`\>(`_constraint_`, `v`): `PatchedTemplate`<`T`, `F`\>

Constrained variant. A variant where each form abides by a given constraint - handles these
inputs and provides these outputs.

This can be used to ensure optional properties exist on the union type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ConstrainedTemplate`<`F`\> |
| `F` | extends `Func` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_constraint_` | `F` |
| `v` | `T` |

#### Returns

`PatchedTemplate`<`T`, `F`\>

#### Defined in

[constrained.ts:25](https://github.com/paarthenon/variant/blob/1e64379/src/constrained.ts#L25)

___

### construct

▸ **construct**<`T`\>(`cls`): `ConstructableToFactory`<`T`\>

Create a variant based on a class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Constructable` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cls` | `T` | class definition / constructor |

#### Returns

`ConstructableToFactory`<`T`\>

a variant creator that wraps the class constructor into a factory function.

#### Defined in

[construct.ts:14](https://github.com/paarthenon/variant/blob/1e64379/src/construct.ts#L14)

___

### descope

▸ **descope**<`T`\>(`target`): `T` extends `Record`<``"type"``, \`${string}/${TType}\`\> ? `Identity`<`Omit`<`T`, ``"type"``\> & `Record`<``"type"``, `TType`\>\> : `T`

Strip the scope prefix from an object passed into `match`

**`tutorial`**
```ts
match(descope(target), {
    ...,
})
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<``"type"``, \`${string}/${string}\`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | object used as the match target. |

#### Returns

`T` extends `Record`<``"type"``, \`${string}/${TType}\`\> ? `Identity`<`Omit`<`T`, ``"type"``\> & `Record`<``"type"``, `TType`\>\> : `T`

#### Defined in

[variant.ts:77](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L77)

___

### fields

▸ **fields**<`T`\>(`defaults?`): (...`args`: {} extends `T` ? [] \| [input: T] : [input: T]) => `T`

Describe the fields of the variation.

When used creates a function of type `(input: T) => T & {type: 'literal'}`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaults` | `Partial`<`T`\> | set some default values for the object. Note this does *not* adjust the return type. |

#### Returns

`fn`

▸ (...`args`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | {} extends `T` ? [] \| [input: T] : [input: T] |

##### Returns

`T`

#### Defined in

[variant.tools.ts:8](https://github.com/paarthenon/variant/blob/1e64379/src/variant.tools.ts#L8)

___

### flags

▸ **flags**<`T`\>(`flags`): { [P in string]: Extract<T, Record<"type", P\>\> }

Turn a list of sum type instances (variants) into a product type.

In other words, perform a unique groupBy on the list, grouping on the type property.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> | The discriminated union |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `flags` | `T`[] | An array of variant instances. |

#### Returns

{ [P in string]: Extract<T, Record<"type", P\>\> }

An object where each property's key is a type string and its value is the instance of that type.

#### Defined in

[flags.ts:26](https://github.com/paarthenon/variant/blob/1e64379/src/flags.ts#L26)

___

### inferTypes

▸ **inferTypes**<`T`\>(`instance`): { [P in string]: P }

Create a type catalog from an *instance* of a variant.

Note this leverages proxies and is based on the perceived
type union for `instance`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> | target discriminated union |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |

#### Returns

{ [P in string]: P }

a proxy TypeCatalog

#### Defined in

[types.ts:28](https://github.com/paarthenon/variant/blob/1e64379/src/types.ts#L28)

___

### isOfVariant

▸ **isOfVariant**<`T`\>(`instance`, `variant`): instance is Identity<VariantTypeSpread<T\>[keyof T]\>

Checks if an object was created from one of a set of variants. This function is a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
so TypeScript will narrow the type of `object` correctly.

**`remarks`**
The variant module may be a pre-existing module or one constructed on the fly.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<``"type"``\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | `undefined` \| ``null`` \| {} | an instance of a variant. |
| `variant` | `T` | the variant module. |

#### Returns

instance is Identity<VariantTypeSpread<T\>[keyof T]\>

instance is variant

#### Defined in

[isOfVariant.ts:18](https://github.com/paarthenon/variant/blob/1e64379/src/isOfVariant.ts#L18)

▸ **isOfVariant**<`T`\>(`variant`): (`instance`: `undefined` \| ``null`` \| {}) => instance is Identity<VariantTypeSpread<T\>[keyof T]\>

Checks if an object was created from one of a set of variants. This function is a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
so TypeScript will narrow the type of `object` correctly.

**`remarks`**
The variant module may be a pre-existing module or one constructed on the fly.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<``"type"``\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variant` | `T` | the variant model. |

#### Returns

`fn`

user-defined type guard.

▸ (`instance`): instance is Identity<VariantTypeSpread<T\>[keyof T]\>

Checks if an object was created from one of a set of variants. This function is a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
so TypeScript will narrow the type of `object` correctly.

**`remarks`**
The variant module may be a pre-existing module or one constructed on the fly.

##### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `undefined` \| ``null`` \| {} |

##### Returns

instance is Identity<VariantTypeSpread<T\>[keyof T]\>

user-defined type guard.

#### Defined in

[isOfVariant.ts:30](https://github.com/paarthenon/variant/blob/1e64379/src/isOfVariant.ts#L30)

___

### isType

▸ **isType**<`T`\>(`type`): <O\>(`object`: `O`) => object is Extract<O, Record<"type", TypeStr<T, "type"\>\>\>

Check if an object is a variant of some type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `VariantCreator`<`string`, `Func`, ``"type"``\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | any type string or variant creator |

#### Returns

`fn`

A user-defined type guard indicating if the instance is of a given type.

▸ <`O`\>(`object`): object is Extract<O, Record<"type", TypeStr<T, "type"\>\>\>

Check if an object is a variant of some type.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `Record`<``"type"``, `string`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `O` |

##### Returns

object is Extract<O, Record<"type", TypeStr<T, "type"\>\>\>

A user-defined type guard indicating if the instance is of a given type.

#### Defined in

[isType.ts:10](https://github.com/paarthenon/variant/blob/1e64379/src/isType.ts#L10)

▸ **isType**<`O`, `T`\>(`object`, `type`): object is Extract<O, Record<"type", TypeStr<T, "type"\>\>\>

Check if an object is a variant of some type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `Record`<``"type"``, `string`\> |
| `T` | extends `string` \| `VariantCreator`<`O`[``"type"``], `Func`, ``"type"``\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `undefined` \| ``null`` \| `O` | an instance of an object |
| `type` | `T` | any type string or variant creator |

#### Returns

object is Extract<O, Record<"type", TypeStr<T, "type"\>\>\>

A user-defined type guard indicating if the instance is of a given type.

#### Defined in

[isType.ts:17](https://github.com/paarthenon/variant/blob/1e64379/src/isType.ts#L17)

___

### just

▸ `Const` **just**<`T`\>(`x`): () => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `T` |

#### Returns

`fn`

▸ (): `T`

##### Returns

`T`

#### Defined in

[match.tools.ts:9](https://github.com/paarthenon/variant/blob/1e64379/src/match.tools.ts#L9)

___

### literalist

▸ `Const` **literalist**<`T`\>(`strings`): { [P in T]: P }

Alias for compatibility

**`deprecated`** - use `catalog`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strings` | `T`[] |

#### Returns

{ [P in T]: P }

#### Defined in

[catalog.ts:103](https://github.com/paarthenon/variant/blob/1e64379/src/catalog.ts#L103)

▸ `Const` **literalist**<`T`, `F`\>(`strings`, `factory`): { [P in T]: ReturnType<F\> }

Alias for compatibility

**`deprecated`** - use `catalog`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |
| `F` | extends `LiteralFactory`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strings` | `T`[] |
| `factory` | `F` |

#### Returns

{ [P in T]: ReturnType<F\> }

#### Defined in

[catalog.ts:103](https://github.com/paarthenon/variant/blob/1e64379/src/catalog.ts#L103)

▸ `Const` **literalist**<`T`\>(`catalog`): `T`

Alias for compatibility

**`deprecated`** - use `catalog`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `LiteralCatalog` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `catalog` | `T` |

#### Returns

`T`

#### Defined in

[catalog.ts:103](https://github.com/paarthenon/variant/blob/1e64379/src/catalog.ts#L103)

___

### lookup

▸ **lookup**<`H`, `T`\>(`handler`): (`instance`: `T`) => `LookupTableToHandler`<`H`\>

Resolve the match with a lookup table.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `H` | extends `Record`<`T`[``"type"``], `any`\> |
| `T` | extends `Record`<``"type"``, `string`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `H` |

#### Returns

`fn`

▸ (`instance`): `LookupTableToHandler`<`H`\>

Resolve the match with a lookup table.

##### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |

##### Returns

`LookupTableToHandler`<`H`\>

#### Defined in

[match.ts:76](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L76)

___

### match

▸ **match**<`T`, `H`, `TType`\>(`handler`): (`instance`: `T` \| `TType`) => `ReturnType`<`H`[keyof `H`]\>

**(inline)** Match an instance of a variant or literal union against its possible cases.

**`remarks`**
This point-free overload is intended for inline use, not pre-matching.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<``"type"``, `TType`\> | instance of a variant |
| `H` | extends `Handler`<`T`, ``"type"``\> | handler object |
| `TType` | extends `string` | - |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | `EnforceHandler`<`H`\> \| (`t`: `T`) => `H` | a handler object. This type will be properly constrained when used inline. |

#### Returns

`fn`

▸ (`instance`): `ReturnType`<`H`[keyof `H`]\>

**(inline)** Match an instance of a variant or literal union against its possible cases.

**`remarks`**
This point-free overload is intended for inline use, not pre-matching.

##### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` \| `TType` |

##### Returns

`ReturnType`<`H`[keyof `H`]\>

#### Defined in

[match.ts:104](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L104)

▸ **match**<`T`, `H`, `TType`\>(`target`, `handler`): `ReturnType`<`H`[`T`[``"type"``]]\>

Match an instance of a variant or literal union against its possible cases.

**`remarks`**
Supports exhaustiveness checking, partial matching, and literals.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<``"type"``, `TType`\> |
| `H` | extends `Handler`<`T`, ``"type"``\> |
| `TType` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` \| `TType` | the target instance |
| `handler` | `H` \| (`t`: `T`) => `H` | an object with a function corresponding to each case |

#### Returns

`ReturnType`<`H`[`T`[``"type"``]]\>

The result of the appropriate branch based on the instance type

#### Defined in

[match.ts:119](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L119)

___

### matcher

▸ **matcher**<`T`, `TType`\>(`target`): `Matcher`<`T`, ``"type"``, `Object`\>

Create a matcher on some target variant instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> |
| `TType` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` \| `TType` |

#### Returns

`Matcher`<`T`, ``"type"``, `Object`\>

#### Defined in

[matcher.ts:297](https://github.com/paarthenon/variant/blob/1e64379/src/matcher.ts#L297)

___

### nil

▸ `Const` **nil**(): `Object`

Create an empty variation (`{type: 'literal'}`).

#### Returns

`Object`

#### Defined in

[variant.tools.ts:29](https://github.com/paarthenon/variant/blob/1e64379/src/variant.tools.ts#L29)

___

### ofLiteral

▸ **ofLiteral**<`T`\>(`instance`): `LiteralToUnion`<`T`, ``"type"``\>

Create a variant from a catalog or enum. In other words,
elevate a literal `A | B | C` to a type union `{type: A} | {type: B} | {type: C}`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |

#### Returns

`LiteralToUnion`<`T`, ``"type"``\>

#### Defined in

[match.ts:44](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L44)

___

### onLiteral

▸ **onLiteral**<`T`\>(`instance`): `LiteralToUnion`<`T`, ``"type"``\>

Elevate a literal `A | B | C` to a type union `{type: A} | {type: B} | {type: C}`

**`deprecated`** use `ofLiteral`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `T` |

#### Returns

`LiteralToUnion`<`T`, ``"type"``\>

#### Defined in

[match.ts:51](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L51)

___

### onTerms

▸ **onTerms**<`T`\>(`func`): `GenericTemplate`<`T`\>

Define a generic variant

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RawVariant` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | (`alpha`: `Alpha`) => `T` | a template factory. Receives 26 generic placeholders (A-Z) in an object, returns a variant template |

#### Returns

`GenericTemplate`<`T`\>

A variant with generic creators

#### Defined in

[generic.ts:20](https://github.com/paarthenon/variant/blob/1e64379/src/generic.ts#L20)

___

### otherwise

▸ **otherwise**<`P`, `T`, `Else`\>(`branches`, `elseFunc`): (`input`: `T`) => `HandlerFromPartial`<`P` & { `default`: `Else`  }, `T`[``"type"``]\>

Handle some cases, deal with the rest in a  well-typed function. If the discriminated union
is `A | B | C` and `A` has been handled, then the else function will understand it will receive
only `B | C`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Partial`<`Handler`<`T`, ``"type"``\>\> |
| `T` | extends `Record`<``"type"``, `string`\> |
| `Else` | extends (`remainder`: `Exclude`<`T`, `Record`<``"type"``, keyof `P`\>\>) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `branches` | `P` |
| `elseFunc` | `Else` |

#### Returns

`fn`

▸ (`input`): `HandlerFromPartial`<`P` & { `default`: `Else`  }, `T`[``"type"``]\>

Handle some cases, deal with the rest in a  well-typed function. If the discriminated union
is `A | B | C` and `A` has been handled, then the else function will understand it will receive
only `B | C`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` |

##### Returns

`HandlerFromPartial`<`P` & { `default`: `Else`  }, `T`[``"type"``]\>

#### Defined in

[match.ts:60](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L60)

___

### partial

▸ **partial**<`H`, `T`\>(`handler`): (`input`: `T`) => `H`

Handle some cases, use **`default:`** to handle the remainder.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `H` | extends `AdvertiseDefault`<`Handler`<`T`, ``"type"``\>\> |
| `T` | extends `Record`<``"type"``, `string`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `H` \| (`t`: `T`) => `H` |

#### Returns

`fn`

▸ (`input`): `H`

Handle some cases, use **`default:`** to handle the remainder.

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` |

##### Returns

`H`

#### Defined in

[match.ts:87](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L87)

▸ **partial**<`H`, `T`\>(`handler`): (`input`: `T`) => `HandlerFromPartial`<`H`, `T`[``"type"``]\>

Handle some cases, use **`default:`** to handle the remainder (Active).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `H` | extends `WithDefault`<`Handler`<`T`, ``"type"``\>, `T`\> |
| `T` | extends `Record`<``"type"``, `string`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `H` \| (`t`: `T`) => `H` |

#### Returns

`fn`

▸ (`input`): `HandlerFromPartial`<`H`, `T`[``"type"``]\>

Handle some cases, use **`default:`** to handle the remainder (Active).

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `T` |

##### Returns

`HandlerFromPartial`<`H`, `T`[``"type"``]\>

#### Defined in

[match.ts:91](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L91)

___

### pass

▸ `Const` **pass**<`T`\>(`x`): `T`

A helper function for variantModule.

This is the identity function by a better name.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `T` |

#### Returns

`T`

#### Defined in

[typed.ts:25](https://github.com/paarthenon/variant/blob/1e64379/src/typed.ts#L25)

___

### patterned

▸ **patterned**<`T`, `F`\>(`_constraint_`, `v`): `PatchedTemplate`<`T`, `F`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `PatternedTemplate`<`F`\> |
| `F` | extends `Func` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_constraint_` | `F` |
| `v` | `T` |

#### Returns

`PatchedTemplate`<`T`, `F`\>

#### Defined in

[patterned.ts:15](https://github.com/paarthenon/variant/blob/1e64379/src/patterned.ts#L15)

___

### payload

▸ **payload**<`T`\>(`_example?`): (`payload`: `T`) => { `payload`: `T`  }

Take a single variable of type T and store as 'payload'

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_example?` | `T` |

#### Returns

`fn`

▸ (`payload`): `Object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `T` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `T` |

#### Defined in

[variant.tools.ts:21](https://github.com/paarthenon/variant/blob/1e64379/src/variant.tools.ts#L21)

___

### prematch

▸ **prematch**<`T`\>(`variant`): `TypedCurriedMatchFunc`<`Identity`<`VariantTypeSpread`<`T`\>[keyof `T`]\>, ``"type"``\>

Match against a variant model

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<``"type"``\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variant` | `T` | an object containing variant creators. |

#### Returns

`TypedCurriedMatchFunc`<`Identity`<`VariantTypeSpread`<`T`\>[keyof `T`]\>, ``"type"``\>

a function to handle an instance of that type.

#### Defined in

[match.ts:139](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L139)

▸ **prematch**<`T`\>(): `TypedCurriedMatchFunc`<`T`, ``"type"``\>

Match against a variant by type

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> | a discriminated union |

#### Returns

`TypedCurriedMatchFunc`<`T`, ``"type"``\>

a function to handle an instance of that type.

#### Defined in

[match.ts:146](https://github.com/paarthenon/variant/blob/1e64379/src/match.ts#L146)

___

### remote

▸ **remote**<`T`\>(`variant`): `Remote`<`T`, ``"type"``\>

Create a "remote control" for a variant.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<``"type"``\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `variant` | `T` |

#### Returns

`Remote`<`T`, ``"type"``\>

#### Defined in

[remote.ts:116](https://github.com/paarthenon/variant/blob/1e64379/src/remote.ts#L116)

___

### scoped

▸ **scoped**<`T`, `Scope`\>(`scope`, `v`): `ScopedVariant`<`T`, `Scope`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RawVariant` |
| `Scope` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Scope` |
| `v` | `T` |

#### Returns

`ScopedVariant`<`T`, `Scope`\>

#### Defined in

[variant.ts:85](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L85)

___

### sequence

▸ **sequence**<`T`, `O`\>(`module`, `order`): `Sequence`<`Pick`<`T`, `SequenceInputType`<`O`, ``"type"``\>\>, `O`, ``"type"``, `Pick`<`Pick`<`T`, `SequenceInputType`<`O`, ``"type"``\>\>, `SequenceInputType`<`O`, ``"type"``\>\>\>

Create a sequence based on a variant.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<``"type"``\> |
| `O` | extends `SequenceInput`<``"type"``, `string`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `module` | `T` | the variant definition. |
| `order` | `O`[] | the list of string literal types or variation creators. |

#### Returns

`Sequence`<`Pick`<`T`, `SequenceInputType`<`O`, ``"type"``\>\>, `O`, ``"type"``, `Pick`<`Pick`<`T`, `SequenceInputType`<`O`, ``"type"``\>\>, `SequenceInputType`<`O`, ``"type"``\>\>\>

#### Defined in

[remote.ts:122](https://github.com/paarthenon/variant/blob/1e64379/src/remote.ts#L122)

▸ **sequence**<`O`\>(`order`): `Sequence`<`VMFromVC`<`CreatorFromSeqInput`<`O`, ``"type"``\>\>, `O`, ``"type"``, `Pick`<`VMFromVC`<`CreatorFromSeqInput`<`O`, ``"type"``\>\>, `SequenceInputType`<`O`, ``"type"``\>\>\>

Create a sequenced variant.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `CreativeSequenceInput`<``"type"``, `string`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `order` | `O`[] | the list of literal types or variation creators. Also the variant definition a la `variantList`. |

#### Returns

`Sequence`<`VMFromVC`<`CreatorFromSeqInput`<`O`, ``"type"``\>\>, `O`, ``"type"``, `Pick`<`VMFromVC`<`CreatorFromSeqInput`<`O`, ``"type"``\>\>, `SequenceInputType`<`O`, ``"type"``\>\>\>

#### Defined in

[remote.ts:130](https://github.com/paarthenon/variant/blob/1e64379/src/remote.ts#L130)

___

### typeCatalog

▸ **typeCatalog**<`T`\>(`variant`): `Identity`<[`TypeCatalog`](modules#typecatalog)<`T`\>\>

Create an a string enum-like object containing the type literals of a variant.

**`tutorial`**
```ts
const Animal = variant({...}); // cat, dog, snake

const animalType = typeCatalog(Animal); 
// animalType: {cat: 'cat', dog: 'dog', snake: 'snake'};
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> | the variant template, an object containing variant creators. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variant` | `T` | the definition of the variant in question. |

#### Returns

`Identity`<[`TypeCatalog`](modules#typecatalog)<`T`\>\>

an object `{[T: string]: T}`

#### Defined in

[typeCatalog.ts:24](https://github.com/paarthenon/variant/blob/1e64379/src/typeCatalog.ts#L24)

___

### typeMap

▸ **typeMap**<`T`\>(`variant`): `Identity`<[`TypeMap`](modules#typemap)<`T`\>\>

Create a mapping object containing the friendly names of a variant's forms
and the type literals they correspond to.

**`tutorial`**

In the trivial case where each property label of a variant is exactly the
type it generates, this is equivalent to `typeCatalog`
```ts
const Animal = variant({...}); // cat, dog, snake

const animalType = typeMap(Animal); 
// animalType: {cat: 'cat', dog: 'dog', snake: 'snake'};
```
However, `typeMap` shines when differences come into play.
```ts
const Animal = scopedVariant('@animal', {...}); // cat, dog, snake
const animalType = typeMap(Animal);
// animalType: {cat: '@animal/cat', dog: '@animal/dog', snake: '@animal/snake'};
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<`string`\> | the variant template, an object containing variant creators. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variant` | `T` | the definition of the variant in question. |

#### Returns

`Identity`<[`TypeMap`](modules#typemap)<`T`\>\>

#### Defined in

[typeCatalog.ts:55](https://github.com/paarthenon/variant/blob/1e64379/src/typeCatalog.ts#L55)

___

### typed

▸ **typed**<`T`\>(`variant`): `VoidEmpty`<`ExactDefinition`<`T`, ``"type"``\>\>

Enforce a variant following a pre-defined type.

**`example`**
```
type Option =
    | Variant<'Some', {payload: any}>
    | Variant<'None'>
;
const Option = variant(typed<Option>({
    Some: pass,
    None: pass,
}))
// `pass` is just the identity function. Any function `(input: T) => T` is valid.
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `variant` | `ExactDefinition`<`T`, ``"type"``\> | implementation of the underlying functions. |

#### Returns

`VoidEmpty`<`ExactDefinition`<`T`, ``"type"``\>\>

the implementation passed in.

#### Defined in

[typed.ts:47](https://github.com/paarthenon/variant/blob/1e64379/src/typed.ts#L47)

▸ **typed**<`T`\>(`factory`): `VoidEmpty`<`ExactDefinition`<`T`, ``"type"``\>\>

Enforce a variant following a pre-defined type.

Receive the `pass` function as a parameter.

**`example`**
```
type Option =
    | Variant<'Some', {payload: any}>
    | Variant<'None'>
;
const Option = variant(typed<Option>(_ => ({
    Some: _,
    None: _,
})));
// `_` is just the identity function. Any function `(input: T) => T` is valid.
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | (`_`: <T\>(`x`: `T`) => `T`) => `ExactDefinition`<`T`, ``"type"``\> | factory function implementation of the underlying functions. Receives `pass` as the only parameter. |

#### Returns

`VoidEmpty`<`ExactDefinition`<`T`, ``"type"``\>\>

the implementation passed in.

#### Defined in

[typed.ts:70](https://github.com/paarthenon/variant/blob/1e64379/src/typed.ts#L70)

___

### types

▸ **types**<`T`\>(`content`): `Identity`<[`TypesOf`](modules#typesof)<`T`\>\>[]

Get the list of types from a variant.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`VariantModule`](modules#variantmodule)<``"type"``\> | target discriminated union |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `T` | some variant definition. |

#### Returns

`Identity`<[`TypesOf`](modules#typesof)<`T`\>\>[]

list of string literal types.

#### Defined in

[types.ts:10](https://github.com/paarthenon/variant/blob/1e64379/src/types.ts#L10)

▸ **types**<`T`\>(`content`): `T`[``"type"``][]

Get the list of types from the instances of a variant.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `Record`<``"type"``, `string`\> | target discriminated union |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `T`[] | list of instances. |

#### Returns

`T`[``"type"``][]

list of string literal types.

#### Defined in

[types.ts:17](https://github.com/paarthenon/variant/blob/1e64379/src/types.ts#L17)

___

### unpack

▸ `Const` **unpack**<`T`\>(`x`): `T`

Extract the payload element from the object and return it.

**`example`**
```
match(object, {
    ...
    case: unpack,
    ...
})
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `Object` |
| `x.payload` | `T` |

#### Returns

`T`

#### Defined in

[match.tools.ts:22](https://github.com/paarthenon/variant/blob/1e64379/src/match.tools.ts#L22)

___

### variant

▸ **variant**<`VM`\>(`template`): `Identity`<`GenericVariantRecord`<`VM`, ``"type"``\>\>

Create a *generic* **variant** from some template. Use with `onTerms()`.

**`tutorial`**

To create the classic `Option<T>` type (a.k.a. `Maybe<T>`)
```ts
const Option = variant(onTerms(({T}) => ({
    Some: payload(T),
    None: {},
})));
type Option<T, TType extends TypeNames<typeof Option> = undefined>
    = GVariantOf<typeof Option, TType, {T: T}>;
```
Note the use of `GVariantOf` instead of `VariantOf`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VM` | extends `RawVariant` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `GenericTemplate`<`VM`\> | a call to `onTerms` with some element. |

#### Returns

`Identity`<`GenericVariantRecord`<`VM`, ``"type"``\>\>

#### Defined in

[variant.ts:165](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L165)

▸ **variant**<`VM`\>(`template`): `Identity`<`VariantRecord`<`VM`, ``"type"``\>\>

Create a **variant** from some template.

**`example`**
```ts
const Action = variant({
    AddTodo: fields<{message: string}>(),
    Reload: {},
});

// Pair with `variation` to override the type returned by the creator function
// while still using a friendly name. For example,

const Action = variant({
    AddTodo: variation('TODO:AddTodo', fields<{message: string}>()),
    Reload: variation('TODO:Reload'),
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VM` | extends `RawVariant` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `VM` | an object where each property represents a possible variation. The **key** is the string literal used as the type and the **value** is a function that handles the creation logic for that type. |

#### Returns

`Identity`<`VariantRecord`<`VM`, ``"type"``\>\>

a variant module.

#### Defined in

[variant.ts:189](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L189)

▸ **variant**<`T`\>(`template`): `Identity`<`VMFromVC`<`CreatorFromListType`<`T`, ``"type"``\>\>\>

Create a **variant** from a list of elements. Each element may be a `string`
or a `VariantCreator`.

**`tutorial`**

The simplest use involves purely strings.

```ts
const Suit = variant(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
```

It is possible to use `VariantCreator`s as well. Generate through `variation()`.

```ts
const Shape = variant([
    variation('circle', fields<{center: [number, number], radius: number}>()),
    variation('rectangle', fields<{center: [number, number], length: number, width: number}>()),
]);
```
Feel free to mix the approaches as necessary.
```ts
const DebugAction = variant([
    variation('LoadState', payload<RootState>()),
    'ResetState',
    'ToggleDebugMode',
]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ValidListType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `T`[] | A list of string literals or calls to `variation()` |

#### Returns

`Identity`<`VMFromVC`<`CreatorFromListType`<`T`, ``"type"``\>\>\>

a variant module.

#### Defined in

[variant.ts:222](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L222)

___

### variantCosmos

▸ **variantCosmos**<`K`\>(`config`): `VariantCosmos`<`K`\>

Generate a series of functions to work off a given key.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `K` | extends `string` | discriminant as string literal. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `VariantCosmosConfig`<`K`\> | the key to use. |

#### Returns

`VariantCosmos`<`K`\>

`VariantCosmos<K>`

#### Defined in

[cosmos.ts:43](https://github.com/paarthenon/variant/blob/1e64379/src/cosmos.ts#L43)

___

### variantList

▸ **variantList**<`T`\>(`template`): `Identity`<`VMFromVC`<`CreatorFromListType`<`T`, ``"type"``\>\>\>

Create a **variant** from a list of elements. Each element may be a `string`
or a `VariantCreator`.

**`tutorial`**

The simplest use involves purely strings.

```ts
const Suit = variant(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
```

It is possible to use `VariantCreator`s as well. Generate through `variation()`.

```ts
const Shape = variant([
    variation('circle', fields<{center: [number, number], radius: number}>()),
    variation('rectangle', fields<{center: [number, number], length: number, width: number}>()),
]);
```
Feel free to mix the approaches as necessary.
```ts
const DebugAction = variant([
    variation('LoadState', payload<RootState>()),
    'ResetState',
    'ToggleDebugMode',
]);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ValidListType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `T`[] | A list of string literals or calls to `variation()` |

#### Returns

`Identity`<`VMFromVC`<`CreatorFromListType`<`T`, ``"type"``\>\>\>

a variant module.

#### Defined in

[variant.ts:121](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L121)

___

### variantModule

▸ **variantModule**<`VM`\>(`template`): `Identity`<`VariantRecord`<`VM`, ``"type"``\>\>

Create a **variant** from some template.

**`example`**
```ts
const Action = variant({
    AddTodo: fields<{message: string}>(),
    Reload: {},
});

// Pair with `variation` to override the type returned by the creator function
// while still using a friendly name. For example,

const Action = variant({
    AddTodo: variation('TODO:AddTodo', fields<{message: string}>()),
    Reload: variation('TODO:Reload'),
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `VM` | extends `RawVariant` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `template` | `VM` | an object where each property represents a possible variation. The **key** is the string literal used as the type and the **value** is a function that handles the creation logic for that shape. This may be `{}` or `nil` for an empty-bodied variant (`{type: 'someType'}`). |

#### Returns

`Identity`<`VariantRecord`<`VM`, ``"type"``\>\>

a variant module.

#### Defined in

[variant.ts:146](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L146)

___

### variation

▸ **variation**<`T`, `F`\>(`type`, `creator?`): `VariantCreator`<`T`, `F` extends `VariantCreator`<`string`, `VF`, ``"type"``\> ? `VF` : `F`, ``"type"``\>

Specify a variation of a variant. One variant will have many variations.

**`tutorial`**
Use directly, use as an element of a list for a variant, *or* use to provide
a more specific underlying type.
1. Use directly
    ```ts
    const snake = variation('snake', (name: string, pattern = 'string') => ({name, pattern}));
    ```
1. In `variant` list
    ```ts
    const Animal = variant([
        ...
        variation('snake', (name: string, pattern = 'striped') => ({name, pattern}));
    ]);
    ```
1. In `variant` object
    ```ts
    const Animal = variant({
        ...,
        snake: variation('ANIMAL_SNAKE', (name: string, pattern = 'striped') => ({name, pattern})),
    });
    ```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |
| `F` | extends `Func`() => {} |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | the string literal used as the distinguishing type. |
| `creator?` | `F` | a function that acts as the body of the constructor. |

#### Returns

`VariantCreator`<`T`, `F` extends `VariantCreator`<`string`, `VF`, ``"type"``\> ? `VF` : `F`, ``"type"``\>

a variation creator a.k.a. a tag construtor.

#### Defined in

[variant.ts:252](https://github.com/paarthenon/variant/blob/1e64379/src/variant.ts#L252)
