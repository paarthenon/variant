export {
    Nominal,
    Anonymous,
} from './nominal';

export {
    augment,
    AugmentVariant,
    cast,
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
export * from './lookup';
export * from './loose';

import {default as variantDefault} from './variant';
export default variantDefault;
