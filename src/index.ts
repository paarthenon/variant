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
} from './variant';

export {
    fields,
    data,
    payload,
    property,
    exhaust,
    outputTypes,
} from './tools';

export {
    ExtractOfUnion,
} from './util';

import {default as variantDefault} from './variant';
export default variantDefault;