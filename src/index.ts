export {
    Nominal,
    Anonymous,
} from './nominal';

export {
    augment,
    AugmentVariant,
    cast,
    constrainedVariant,
    isOfVariant,
    keymap,
    KeyMap,
    keys,
    KeysOf,
    flags,
    Flags,
    Matrix,
    narrow,
    outputTypes,
    TypeExt,
    TypeNames,
    variant,
    VariantCreator,
    variantList,
    variantFactory,
    variantModule,
    VariantModule,
    Variant,
    VariantOf,
    VariantsOfUnion,
    WithProperty,
} from './variant';

export {
    fields,
    data,
    isType,
    payload,
    property,
    exhaust,
    constant
} from './tools';

export {
    ExtractOfUnion,
    strEnum,
} from './util';

export * from './match';
export * from './matcher';
export * from './lookup';
export * from './loose';
export * from './generic';

import {default as variantDefault} from './variant';
export default variantDefault;
