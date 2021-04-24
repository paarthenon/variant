import {variantCosmos} from './cosmos';
import {Handler, MatchFuncs, matchImpl} from './match';
import {Func, KeysOf, VariantCreator, VariantModule, VariantOf} from './precepts';
import {VMFromVC} from './variant';


type IsFunctions<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof T]: <O extends Record<K, string>>(object: O | {} | null | undefined) => object is VariantOf<T, P>;
}


export interface Remote<T extends VariantModule<K>, K extends string = 'type'> {
    readonly key: K;
    readonly is: IsFunctions<T, K>;
    readonly new: T;
    match: MatchFuncs<K>['match'];
}

export enum CompareResult {
    Lesser = -1,
    Equal,
    Greater
}

type CreativeSequenceInput<K extends string, Type extends string = string> =
    | Type
    | VariantCreator<Type, Func, K>
;

export type CreatorFromSeqInput<T extends CreativeSequenceInput<K>, K extends string> = T extends VariantCreator<string, Func, string> ? T : T extends string ? VariantCreator<T, () => {}, K> : never;

/**
 * A valid input to a sequence element.
 */
type SequenceInput<K extends string, Type extends string = string> =
    | CreativeSequenceInput<K, Type>
    | Record<K, Type>
;

/**
 * Extract the underlying type from some given valid `SequenceInput`
 */
type SequenceInputType<T extends SequenceInput<K>, K extends string> =
    T extends string
        ? T
        : T extends VariantCreator<string, Func, K>
            ? T['type']
            : T extends Record<K, string>
                ? T[K]
                : never
;

export interface Sequence<
    T extends VariantModule<K>,
    O extends SequenceInput<K, KeysOf<T>>,
    K extends string,
    RT extends Pick<T, SequenceInputType<O, K>> = Pick<T, SequenceInputType<O, K>>,
> extends Remote<RT, K> {
    compare: (
        a: SequenceInput<K, KeysOf<RT>>, 
        b: SequenceInput<K, KeysOf<RT>>,
    ) => CompareResult;
    /**
     * Get the index of some type in the sequence.
     */
    index: (a: SequenceInput<K, KeysOf<RT>>) => number;
    get: (index: number) => T[keyof T];
    readonly length: number;
    readonly types: KeysOf<T>[];
}

export interface RemoteFuncs<K extends string> {
    remote<T extends VariantModule<K>>(vmod: T): Remote<T, K>;
    sequence<
        T extends VariantModule<K>,
        O extends SequenceInput<K>,
    > (module: T, order: O[]): Sequence<Pick<T, SequenceInputType<O, K>>, O, K>;
    sequence<
        O extends CreativeSequenceInput<K>,
    > (order: O[]): Sequence<VMFromVC<CreatorFromSeqInput<O, K>>, O, K>;
}

export function remoteImpl<K extends string>(key: K): RemoteFuncs<K> {
    const {isType, match, variantList} = variantCosmos({key});

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

    function getType<T extends SequenceInput<K, U>, U extends string>(input: T): U {
        if (typeof input === 'string') {
            return input as U;
        } else if (typeof input === 'function') {
            return (input as VariantCreator<string, Func, K>).type as U;
        } else {
            return (input as Record<K, string>)[key] as U;
        }
    }

    function _sequence<
        T extends VariantModule<K>,
        O extends SequenceInput<K>,
    > (module: T, order: O[]): Sequence<T, O, K> {
        const miniModule: Pick<T, SequenceInputType<O, K>> = module;
        const result = remote(miniModule);
        const keyOrder = order.map(getType);
        return {
            ...result,
            length: order.length,
            compare: (a, b) => {
                const ai = keyOrder.findIndex(i => i === getType(a));
                const bi = keyOrder.findIndex(i => i === getType(b));
                const diff = ai - bi;
                return diff === 0 ? diff : (diff / Math.abs(diff)) as CompareResult;
            },
            get(i: number) {
                const type = this.types[i];
                return (this.new as VariantModule<K>)[type] as any;
            },
            index: a => keyOrder.findIndex(i => i === getType(a)),
            types: keyOrder,
        }
    }
    function _sequenceOfList<
        O extends CreativeSequenceInput<K>,
    > (order: O[]): Sequence<VMFromVC<CreatorFromSeqInput<O, K>>, O, K> {
        const module: VMFromVC<CreatorFromSeqInput<O, K>> = variantList(order);
        return _sequence(module, order);
    }
    function sequence<
        T extends VariantModule<K>,
        O extends SequenceInput<K>,
    >(module: T | CreativeSequenceInput<K>, order?: O[]) {
        if (Array.isArray(module)) {
            return _sequenceOfList(module);
        } else {
            return _sequence(module as T, order!)
        }
    }

    return {remote, sequence};
}