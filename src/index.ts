export {
    Nominal,
    Anonymous,
} from './nominal';

export {
    variant,
    variantList,
    variantFactory,
    WithProperty,
    VariantsOfUnion,
    AugmentVariant,
    augment,
    outputTypes,
    isOfVariant,
    VariantModule,
    KeysOf,
    TypeNames,
    Variant,
    VariantOf,
    cast,
    narrow,
    Flags,
    flags,
    Matrix,
    keymap,
    keys,
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
