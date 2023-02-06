import {isTypeImpl} from './isType';
import {MatchFuncs, matchImpl} from './match';
import {Func, TypesOf, VariantCreator, VariantModule, VariantOf} from './precepts';
import {variantImpl, VMFromVC} from './variant';


type IsFunctions<T extends VariantModule<K>, K extends string = 'type'> = {
    [P in keyof T]: <O extends Record<K, string>>(object: O | {} | null | undefined) => object is VariantOf<T, P>;
}


/**
 * A wrapper around a variant to allow more aesthetically pleasing interfaces
 * and variant-specific functionality.
 */
export interface Remote<T extends VariantModule<K>, K extends string = 'type'> {
    /**
     * The key of the discriminant (`type`, `tag`, `kind`, `__typename`).
     */
    readonly key: K;
    /**
     * A collection of user-defined type guards to enable syntax like `Animal.is.dog(_)`.
     */
    readonly is: IsFunctions<T, K>;
    /**
     * The variant definition, a collection of tag constructors.
     */
    readonly new: T;
    /**
     * The match function.
     */
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

export type CreatorFromSeqInput<T extends CreativeSequenceInput<K>, K extends string> =
    T extends VariantCreator<string, Func, string>
        ? T
        : T extends string
            ? VariantCreator<T, () => {}, K>
            : never
;

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
            ? T['output']['type']
            : T extends Record<K, string>
                ? T[K]
                : never
;

/**
 * Give a variant an order or **sequence**, like a numerical enum.
 */
export interface Sequence<
    T extends VariantModule<K>,
    O extends SequenceInput<K, TypesOf<T>>,
    K extends string,
    RT extends Pick<T, SequenceInputType<O, K>> = Pick<T, SequenceInputType<O, K>>,
> extends Remote<RT, K> {
    /**
     * Compare two elements to discover whether `a` is greater, equal,
     * or lesser than `b`.
     */
    compare: (
        a: SequenceInput<K, TypesOf<RT>>, 
        b: SequenceInput<K, TypesOf<RT>>,
    ) => CompareResult;
    /**
     * Get the index of some type in the sequence.
     */
    index: (a: SequenceInput<K, TypesOf<RT>>) => number;
    /**
     * Get some element by index.
     * @returns a tag constructor.
     */
    get: (index: number) => T[keyof T];
    /**
     * The number of elements.
     */
    readonly length: number;
    /**
     * A list of types ordered as the sequence.
     */
    readonly types: TypesOf<T>[];
}

export interface RemoteFuncs<K extends string> {
    /**
     * Create a "remote control" for a variant.
     * @param variant 
     */
    remote<T extends VariantModule<K>>(variant: T): Remote<T, K>;
    /**
     * Create a sequence based on a variant.
     * @param module the variant definition.
     * @param order the list of string literal types or variation creators.
     */
    sequence<
        T extends VariantModule<K>,
        O extends SequenceInput<K>,
    > (module: T, order: O[]): Sequence<Pick<T, SequenceInputType<O, K>>, O, K>;
    /**
     * Create a sequenced variant.
     * @param order the list of literal types or variation creators. Also the variant definition a la `variantList`.
     */
    sequence<
        O extends CreativeSequenceInput<K>,
    > (order: O[]): Sequence<VMFromVC<CreatorFromSeqInput<O, K>>, O, K>;
}

export function remoteImpl<K extends string>(key: K): RemoteFuncs<K> {
    const {isType} = isTypeImpl(key);
    const {match} = matchImpl(key);
    const {variantList} = variantImpl(key);

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
            return (input as VariantCreator<string, Func, K>).output.type as U;
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
