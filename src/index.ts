export {
    Nominal,
    Anonymous,
} from './nominal';

export {
    variant,
    variantList,
    variantFactory,
    VariantsOf,
    OneOf,
    WithProperty,
    lookup,
    partialLookup,
    Lookup,
    VariantsOfUnion,
    AugmentVariant,
    augment,
    outputTypes,
    isOfVariant,
    VariantModule,
    KeysOf,
    TypeNames,
    VariantOf,
    cast,
    narrow,
    Flags,
    flags,
    Matrix,
    keynum,
} from './variant';

export {
    fields,
    data,
    payload,
    property,
    exhaust,
} from './tools';

export {
    ExtractOfUnion,
    strEnum,
} from './util';

export * from './match';

import {default as variantDefault} from './variant';
export default variantDefault;
