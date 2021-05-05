import {GenericTemplate, GenericVariantRecord} from './generic';
import {Func, Outputs, RawVariant, Variant, VariantCreator} from './precepts';
import {Identity, identityFunc, isPromise} from './util';

/**
 * A variant as an object.
 */
export type VariantRecord<T extends RawVariant, K extends string> = {
    [P in keyof T]: T[P] extends VariantCreator<string, Func, string> 
        ? T[P]
        : VariantCreator<(P & string), T[P] extends Func ? T[P] : () => {}, K>
}

export type ValidListType = string | VariantCreator<string, Func, string>;
type CreatorFromListType<T extends ValidListType, K extends string> = T extends VariantCreator<string, Func, string> ? T : T extends string ? VariantCreator<T, () => {}, K> : never;
type ListTypeString<T extends ValidListType> = T extends VariantCreator<infer VCType, Func, string> ? VCType : T;

type VMFromList<T extends ValidListType, K extends string> = {
    [P in CreatorFromListType<T, K>['type']]: CreatorFromListType<T, K>
}

export type VMFromVC<T extends VariantCreator<string, Func, string>> = {
    [P in T['type']]: Extract<T, Record<'type', P>>;
}

type CleanResult<T, U> = T extends undefined ? U : T extends Func ? T : T extends object ? U : T;

type ScopedVariant<T extends RawVariant, Scope extends string> = {
    [P in (keyof T & string)]: VariantCreator<ScopedType<Scope, P>, CleanResult<T[P], () => {}>>;
}

type ScopedType<Scope extends string, Type extends string = ''> = `${Scope}/${Type}`;
export const scopeType = <Scope extends string, Type extends string>(scope: Scope, type: Type) => `${scope}/${type}` as ScopedType<Scope, Type>


export type ScopedObject<Scope extends string, T extends {}> = {[P in (keyof T & string) as ScopedType<Scope, P>]: T[P]};

function atScope<S extends string, T extends {}>(s: S, obj: T) {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        return {
            ...acc,
            [scopeType(s, key)]: val,
        }
    }, {}) as ScopedObject<S, T>;
}

function descopeType<S extends string, T extends string>(s: ScopedType<S, T>): T {
    return (s.split('/')[1] ?? s) as T;
}

const VARIANT_CREATOR_BRAND = Symbol('Variant Creator');

export interface CreatorBranded {
    [VARIANT_CREATOR_BRAND]: typeof VARIANT_CREATOR_BRAND;
}

export function isVariantCreator(func: Function): func is VariantCreator<string> {
    return VARIANT_CREATOR_BRAND in func;
}
/**
 * The functions involved in variant creation.
 */
export interface VariantFuncs<K extends string> {
    /**
     * Match helper, remove prefix.
     * @param obj 
     */
    descope<
        T extends Record<K, ScopedType<string, string>>,
    >(obj: T): T extends Record<K, ScopedType<string, infer TType>> ? Identity<Omit<T, K> & Record<K, TType>> : T;
    /**
     * 
     * @param scope 
     * @param v 
     */
    scopedVariant<
        T extends RawVariant,
        Scope extends string,
    >(scope: Scope, v: T): Identity<ScopedVariant<T, Scope>>;
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
     * `variantModule`-like call (GENERIC).
     * @param template 
     */
    variant<VM extends RawVariant>(template: GenericTemplate<VM>): Identity<GenericVariantRecord<VM, K>>,
    /**
     * `variantModule`-like call.
     * @param template 
     */
    variant<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>>,
    /**
     * `variantList`-like call.
     * @param template 
     */
    variant<T extends ValidListType>(template: T[]): Identity<VMFromVC<CreatorFromListType<T, K>>>;

    /**
     * A single case of a variant.
     * @param type 
     * @param creator 
     */
    variation<
        T extends string,
        F extends Func = () => {}
    >(type: T, creator?: F): VariantCreator<T, F extends VariantCreator<string, infer VF> ? VF : F, K>;
}

export function variantImpl<K extends string>(key: K): VariantFuncs<K> {

    function scopedVariant<
        T extends RawVariant,
        Scope extends string,
    >(scope: Scope, v: T): Identity<ScopedVariant<T, Scope>> {
        return Object.keys(v).reduce((acc, key) => {
            return {
                ...acc,
                [key]: variation(`${scope}/${key}`, typeof v[key] === 'function' ? v[key] as any : identityFunc),
            };
        }, {} as Identity<ScopedVariant<T, Scope>>)
    }

    /**
     * Remove the scope from an instance of a variant so that its easier to match against it.
     * @param obj 
     * @param key 
     */
    function descope<
        T extends Record<K, ScopedType<string, string>>,
    >(obj: T): T extends Record<K, ScopedType<string, infer TType>> ? Identity<Omit<T, K> & Record<K, TType>> : T {
        return {
            ...obj,
            [key]: descopeType(obj[key] as ScopedType<string, string>),
        } as any
    }

    /**
     * 
     * @param type 
     * @param creator 
     * @returns 
     */
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
        return Object.assign(
            maker,
            outputs,
            {
                [VARIANT_CREATOR_BRAND]: VARIANT_CREATOR_BRAND,
                toString: function(this: Outputs<K, T>){return this.type}
            }
        ) as VariantCreator<T, F extends VariantCreator<string, infer VF> ? VF : F, K>;
    }

    /**
     * 
     * @param template 
     * @returns 
     */
    function variantModule<VM extends RawVariant>(template: VM): Identity<VariantRecord<VM, K>> {
        return Object.entries(template).reduce((result, [vmKey, vmVal]) => {
            // whether to use the existing value (pass-through variations), or create a new variation.
            const creator = typeof vmVal === 'function'
                ? isVariantCreator(vmVal)
                    ? vmVal
                    : variation(vmKey, vmVal as Func)
                : variation(vmKey, identityFunc)
            ;
            return {
                ...result,
                [vmKey]: creator,
            }
        }, {} as Identity<VariantRecord<VM, K>>);
    }

    /**
     * 
     * @param template 
     * @returns 
     */
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

    /**
     * Impl
     * @param template 
     * @returns 
     */
    function variant(template: {} | []) {
        if (Array.isArray(template)) {
            return variantList(template);
        } else {
            return variantModule(template);
        }
    }

    return {descope, scopedVariant, variant, variantList, variantModule, variation};
}