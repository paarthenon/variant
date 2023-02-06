import {variantCosmos} from '../cosmos';

export const {
    descope,
    flags,
    inferTypes,
    isOfVariant,
    isType,
    match,
    matcher,
    ofLiteral,
    onLiteral,
    otherwise,
    partial,
    prematch,
    remote,
    scoped,
    sequence,
    lookup,
    typed,
    types,
    variant,
    variantList,
    variantModule,
    variation,
    withFallback,
} = variantCosmos({key: 'type'});
