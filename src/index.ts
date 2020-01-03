export {
    Nominal,
    Anonymous,
} from './nominal';

export {
    variant,
    variantList,
    variantFactory,
    VariantsOf,
    Oneof,
    WithProperty,
    match,
    Handler,
    VariantsOfUnion,
    AugmentVariant,
    augment,
} from './variant';

export {
    fields,
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