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
    Specific,
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
} from './util';

export default variantDefault;
