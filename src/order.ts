

/**
 * What should a progression do?
 * 
 *  - Be able to create a variant
 *      - maybe this isn't necessary.
 *  - do a .compare(a: T, b: T) and get back a number;
 */

import {remote, Remote} from './remote';
import {Func} from './util';
import {Creators, KeysOf, Property, VariantCreator, VariantModule, VariantOf} from './variant';

export enum CompareResult {
    Lesser = -1,
    Equal,
    Greater
}

/**
 * A valid entry for `variantList`
 */
type validListType = VariantCreator<any, Func, any> | string;

/**
 * Convert entries for a `variantList` to the same type.
 */
type Variantify<T extends validListType> = T extends string ? VariantCreator<T> : T;

interface Order<T extends VariantModule<K>, K extends string = 'type'> extends Remote<T, K> {
    compare: (
        a: VariantOf<T, undefined, K> | Creators<T, K>[keyof T] | KeysOf<T, K>, 
        b: VariantOf<T, undefined, K> | Creators<T, K>[keyof T] | KeysOf<T, K>,
    ) => CompareResult;
    index: (a: VariantOf<T, undefined, K> | Creators<T, K>[keyof T] | KeysOf<T, K>) => number;
}

export function order<
    T extends VariantModule<K>,
    L extends readonly (KeysOf<T, K> | Property<K, KeysOf<T, K>>)[],
    K extends string = 'type'
>(vmod: T, order: L): Order<T, K> {
    let rawStringOrder = order.map(i => typeof i === 'string' ? i : i.type);
    const keyType = Object.values(vmod)[0].key;
    return {
        ...remote(vmod, keyType),
        compare: (a, b) => {
            const ai = rawStringOrder.findIndex(i => i === getType(a, keyType));
            const bi = rawStringOrder.findIndex(i => i === getType(b, keyType));
            const diff = ai - bi;
            return diff === 0 ? diff : (diff / Math.abs(diff)) as CompareResult;
        },
        index: a => rawStringOrder.findIndex(i => i === getType(a)),
    }
}

function getType<
    T extends VariantModule<K>,
    O extends VariantOf<T, undefined, K>,
    C extends Creators<T, K>,
    S extends KeysOf<T, K>,
    K extends string = 'type',
>(object: O | C | S, typeKey?: K): string {
    const key = typeKey ?? 'type' as K;
    if (typeof object === 'string') {
        return object;
    } else {
        if (typeof object === 'function') {
            return (object as VariantCreator<string, Func, K>).type;
        } else {
            return (object as Property<K, string>)[key];
        }
    }
}