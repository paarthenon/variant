import {variantCosmos} from './cosmos';
import {Handler, MatchFuncs, matchImpl} from './match';
import {VariantModule, VariantOf} from './precepts';


type IsFunctions<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof T]: <O extends Record<K, string>>(object: O | {} | null | undefined) => object is VariantOf<T, P>;
}


export interface Remote<T extends VariantModule<K>, K extends string = 'type'> {
    readonly key: K;
    readonly is: IsFunctions<T, K>;
    readonly new: T;
    match: MatchFuncs<K>['match'];
}

export interface RemoteFunc<K extends string> {
    remote<T extends VariantModule<K>>(vmod: T): Remote<T, K>;
}

export function remoteImpl<K extends string>(key: K) {
    const {isType, match} = variantCosmos({key});

    function isFunctions<T extends VariantModule<K>>(vmod: T) {
        const keys = Object.keys(vmod) as Array<string & keyof T>;
        return keys.reduce((acc, key) => {
            return {
                ...acc,
                [key]: isType(key),
            }
        }, {}) as IsFunctions<T, K>;
    }

    function remote<T extends VariantModule<K>>(vmod: T): Remote<T, K> {
        return {
            key,
            is: isFunctions(vmod),
            new: vmod,
            match,
        }
    };

    return {remote};
}