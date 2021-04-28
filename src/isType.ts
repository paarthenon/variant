import {VariantCreator, Func} from './precepts';
import {TypeStr} from './util';

export interface IsTypeFunc<K extends string> {
    /**
     * Interface one.
     * @param type `
     */
     isType<T extends (string | VariantCreator<string, Func, K>)>(type: T): <O extends Record<K, T>> (object: O, type: T) => object is Extract<O, Record<K, TypeStr<T, K>>>,
     /**
      * Interface two.
      * @param object 
      * @param type 
      */
     isType<O extends Record<K, string>, T extends (O[K] | VariantCreator<O[K], Func, K>)>(object: O, type: T): object is Extract<O, Record<K, TypeStr<T, K>>>,
     /**
      * The underlying key to use
      * 
      * By default this is `type` but it can also commonly be `tag`, `kind`, or `__typeName`.
      */
}

export function isTypeImpl<K extends string>(key: K): IsTypeFunc<K> {
    /**
     * Overload 1
     * @param type 
     */
    function isType<T extends (string | VariantCreator<string, Func, K>)>(type: T): <O extends Record<K, T>> (object: O) => object is Extract<O, Record<K, TypeStr<T, K>>>;
    /**
     * Overload 2
     * @param object 
     * @param type 
     */
    function isType<O extends Record<K, T>, T extends (string | VariantCreator<string, Func, K>)>(object: O | null | undefined, type: T): object is Extract<O, Record<K, TypeStr<T, K>>>;
    function isType<
        T extends (O[K] | VariantCreator<O[K], Func, K>),
        O extends Record<K, string>,
    >(
        instanceOrType: O | {} | null | undefined | T,
        type?: T,
    ) {
        if (instanceOrType != undefined) {
            if (typeof instanceOrType === 'function' || typeof instanceOrType === 'string') {
                const typeArg = instanceOrType as T;
                const typeStr = typeof typeArg === 'string' ? typeArg : (typeArg as VariantCreator<string, any, K>).type;
                return <O extends Record<K, string>>(o: O): o is Extract<O, Record<K, TypeStr<T, K>>> => isType(o, typeStr);
            } else {
                const instance = instanceOrType as O;

                const typeStr = typeof type === 'string' ? type : (type as VariantCreator<string, any, K>).type;
                return instance != undefined && (instance as Record<K, string>)[key ?? 'type'] === typeStr;
            }
        } else {
            return false;
        }
    }

    return {isType};
}