export * from './slim';

import {variantCosmos} from './cosmos';

export const {
    flags,
    isOfVariant,
    isType,
    match,
    onLiteral,
    types,
    variant,
    variantList,
    variantModule,
    variation,
} = variantCosmos({key: 'type'});
