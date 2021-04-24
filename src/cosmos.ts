import {IsTypeFunc, isTypeImpl} from './isType';
import {MatchFuncs, matchImpl} from './match';
import {VariantFuncs, variantImpl} from './variant';
import {TypesFunc, typesImpl} from './types';
import {FlagsFunc, flagsImpl} from './flags';
import {IsOfVariantFunc, isOfVariantImpl} from './isOfVariant';
import {RemoteFuncs, remoteImpl} from './remote';

/**
 * All the `type`-centric functions in the library.
 */
export interface VariantCosmos<
    K extends string,
> extends
    IsOfVariantFunc<K>,
    IsTypeFunc<K>,
    FlagsFunc<K>,
    MatchFuncs<K>,
    RemoteFuncs<K>,
    TypesFunc<K>,
    VariantFuncs<K>
{
    key: K;
}

export interface VariantCosmosConfig<K extends string> {
    /**
     * The discriminant to be used by these functions.
     */
    key: K
}

/**
 * Generate a series of functions to work off a given key.
 * @param config the key to use.
 * @returns `VariantCosmos<K>`
 */
export function variantCosmos<
    K extends string,
>({key}: VariantCosmosConfig<K>): VariantCosmos<K> {
    const {isType} = isTypeImpl(key);
    const {flags} = flagsImpl(key);
    const {match, onLiteral} = matchImpl(key);

    return {
        key,
        isType,
        flags,
        match,
        onLiteral,
        ...isOfVariantImpl(key),
        ...remoteImpl(key),
        ...typesImpl(key),
        ...variantImpl(key),
    }
}
