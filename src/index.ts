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
    match,
    partialMatch,
    lookup,
    partialLookup,
    Handler,
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
    matchLiteral,
    cast,
    narrow,
    Flags,
    flags,
    Matrix,
    keynum,
    matchElse,
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

import {default as variantDefault} from './variant';
export default variantDefault;
