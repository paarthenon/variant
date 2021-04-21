import {IsTypeFunc, isTypeImpl} from './isType';
import {MatchFuncs, matchImpl} from './match';
import {Identity, identityFunc, isPromise} from './util';
import {Func, Outputs, RawVariant, Stringable, VariantCreator} from './precepts';
import {VariantFuncs, variantImpl} from './variant';
import {TypesFunc, typesImpl} from './types';
import {FlagsFunc, flagsImpl} from './flags';
import {IsOfVariantFunc, isOfVariantImpl} from './isOfVariant';

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
    VariantFuncs<K>,
    TypesFunc<K>
{
    key: K;
}

export interface VariantCosmosConfig<K extends string> {
    key: K
}

export function variantCosmos<
    K extends string,
>({key}: VariantCosmosConfig<K>): VariantCosmos<K> {
    const {isType} = isTypeImpl(key);
    const {flags} = flagsImpl(key);
    const {match, onLiteral} = matchImpl(key);
    // can do it either way.

    return {
        key,
        isType,
        flags,
        match,
        onLiteral,
        ...isOfVariantImpl(key),
        ...typesImpl(key),
        ...variantImpl(key),
    }
}
