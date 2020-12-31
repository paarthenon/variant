import {match, Handler} from './match';
import {isType} from './tools';
import {Property, Variant, VariantModule, VariantOf} from './variant';


type IsFunctions<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof T]: <O extends Property<K, string>>(object: O | {} | null | undefined) => object is VariantOf<T, P, K>;
}
function isFunctions<T extends VariantModule<K>, K extends string = 'type'>(vmod: T) {
    const keys = Object.keys(vmod) as Array<string & keyof T>;
    return keys.reduce((acc, key) => {
        return {
            ...acc,
            [key]: isType(key),
        }
    }, {}) as IsFunctions<T, K>;
}

export interface Remote<T extends VariantModule<K>, K extends string = 'type'> {
    key: K;
    is: IsFunctions<T, K>;
    new: T;
    match: <H extends Handler<T>> (obj: VariantOf<T, undefined, K>, handler: H) => ReturnType<H[keyof H]>
}

export function remote<T extends VariantModule<K>, K extends string = 'type'>(vmod: T, keyProp?: K): Remote<T, K> {
    const key = keyProp ?? 'type' as K;
    return {
        key,
        is: isFunctions(vmod),
        new: vmod,
        match,
    }
}