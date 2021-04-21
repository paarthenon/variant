import {Func, Outputs, RawVariant, VariantCreator} from './precepts';
import {Identity, identityFunc, isPromise} from './util';

/**
 * A variant as an object.
 */
type VariantRecord<T extends RawVariant, K extends string> = {
    [P in keyof T]: VariantCreator<(P & string), T[P] extends Func ? T[P] : () => {}, K>
}

type ValidListType = string | VariantCreator<string, Func, string>;
type CreatorFromListType<T extends ValidListType, K extends string> = T extends VariantCreator<string, Func, string> ? T : T extends string ? VariantCreator<T, () => {}, K> : never;
type ListTypeString<T extends ValidListType> = T extends VariantCreator<infer VCType, Func, string> ? VCType : T;

type VMFromList<T extends ValidListType, K extends string> = {
    [P in CreatorFromListType<T, K>['type']]: CreatorFromListType<T, K>
}

type VMFromVC<T extends VariantCreator<string, Func, string>> = {
    [P in T['type']]: Extract<T, Record<'type', P>>;
}

// type VMFVC<T extends ValidListType> = {
//     [P in ListTypeString<T>]: P extends ListTypeString<T> ? VariantCreator
// }
export interface VariantFuncs<K extends string> {
    /**
     * From list.
     * @param template 
     */
    variantList<T extends ValidListType>(template: T[]): Identity<VMFromVC<CreatorFromListType<T, K>>>;
    /**
     * Yeah.
     * @param template 
     */
    variantModule<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>>,

    /**
     * A single case of a variant.
     * @param type 
     * @param creator 
     */
    variation<
        T extends string,
        F extends Func = () => {}
    >(type: T, creator?: F): VariantCreator<T, F, K>;
}

export function variantImpl<K extends string>(key: K): VariantFuncs<K> {

    // function variation<T extends string>(type: T): VariantCreator<T, () => {}, K>;
    // function variation<T extends string, F extends Func>(type: T, creator: F): VariantCreator<T, F, K>;
    function variation<T extends string, F extends Func = () => {}>(type: T, creator?: F) {
        let maker = (...args: Parameters<F>) => {
            const returned = (creator ?? identityFunc)(...args);
            if (isPromise(returned)) {
                return returned.then(result => ({
                    [key]: type,
                    ...result,
                }))
            } else {
                return {
                    [key]: type,
                    ...returned,
                }
            }
        };
        Object.defineProperty(maker, 'name', {value: type, writable: false});
        const outputs: Outputs<K, T> = {key, type};
        return Object.assign(maker, outputs, {toString: function(this: Outputs<K, T>){return this.type}});
    }

    /**
     * Scoped variantModule
     * @param template 
     */
    function variantModule<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>> {
        return Object.entries(template).reduce((result, [vmKey, vmVal]) => {
            return {
                ...result,
                [vmKey]: variation(vmKey, typeof vmVal === 'function' ? vmVal as Func : identityFunc),
            }
        }, {} as Identity<VariantRecord<VM, K>>);
    }

    function variantList<T extends ValidListType>(template: T[]): Identity<VMFromVC<CreatorFromListType<T, K>>> {
        return template.map((t) => {
            if (typeof t === 'string') {
                return variation(t);
            } else if (typeof t === 'function') {
                return t;
            }
            return t;
        }).reduce((result, t) => {
            let creator = ((typeof t === 'string') ? variation(t) : t) as VariantCreator<string, Func, K>;
            return {
                ...result,
                [creator.type]: creator,
            }
        }, {} as Identity<VMFromVC<CreatorFromListType<T, K>>>)
    }

    return {variantList, variantModule, variation};
}