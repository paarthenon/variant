import {Handler, Limited, match} from './match';
import {ExtractOfUnion, Func, Identity} from './util';
import {KeysOf, TypeExt, Variant, VariantCreator, VariantsOfUnion} from './variant';

export type Matcher<
    T extends TypeExt<'type', string>,
    H extends Partial<Handler<VariantsOfUnion<T>>>,
    K extends string = 'type',
> = {
    readonly handler?: H;
    readonly target: T;
    when<HPrime extends SplayPartial<Exclude<T, TypeExt<'type', keyof H>>>>(hp: HPrime): Matcher<T, H & HPrime, K>;
    when<KPrime extends (Exclude<T['type'], keyof H>|VariantCreator<Exclude<T['type'], keyof H>, Func>), HFunc extends (x: ExtractOfUnion<T, GetKey<KPrime>>) => any>(keys: KPrime[], handler: HFunc): Matcher<T, H & Record<GetKey<KPrime>, HFunc>, K>;
    execute(): Exclude<T['type'], keyof H> extends never ? ReturnType<EnsureFunc<H[keyof H]>> : (ReturnType<EnsureFunc<H[keyof H]>> | undefined);
    else<F extends (variant: Exclude<T, TypeExt<'type', keyof H>>) => any>(f: F): ReturnType<EnsureFunc<H[keyof H]> | F>;

} & (Exclude<T['type'], keyof H> extends never ? {complete: () => ReturnType<EnsureFunc<H[keyof H]>>} : {});


type GetKey<T extends (string | VariantCreator<string, Func>)> = T extends string ? T : T extends VariantCreator<infer TT, Func> ? TT : never;


type Coalesce<T, U> = T extends undefined ? U : T;
type EnsureFunc<T> = T extends Func ? T : never;

/**
 * *Extremely* beta, do not use unless you've spoken to me.
 * @param target 
 * @param handler 
 * @param _typeKey 
 */
export function matcher<
    T extends TypeExt<'type', string>,
    H extends {},
    K extends string = 'type',
>(target: T, handler = {} as H, _typeKey = 'type' as K): Matcher<T, {}, K> {
    return {
        target,
        handler,
        when: function<HPrime extends SplayPartial<Exclude<T, TypeExt<'type', keyof H>>>>(
            this: Matcher<T, H, K>, 
            hp: HPrime | Array<T['type'] | VariantCreator<T['type']>>,
            hfunc?: Func
        ) {
            if (Array.isArray(hp)) {
                const keys = hp.map(keyOrVC => {
                    if (typeof keyOrVC === 'string') {
                        return keyOrVC;
                    } else {
                        return keyOrVC.type;
                    }
                });
                if (hfunc) {
                    const obj = keys.reduce((acc, key) => {
                        return {...acc, [key]: hfunc};
                    }, {});
                    return {
                        ...this,
                        handler: {
                            ...this.handler,
                            ...obj,
                        }
                    }
                } else {
                    // ERROR
                    return this;
                }
            } else {
                return {
                    ...this,
                    handler: {
                        ...this.handler,
                        ...hp,
                    } as H & HPrime,
                }
            }

        } as Func,
        execute: function(this: Matcher<T, H, K>) {
            console.log(this.handler);
            const result: (x: T) => unknown = (this.handler as any)[target.type]
            return result(target);
        } as Func,
        complete: function(this: Matcher<T, H, K>) {
            return this.execute();
        } as Func,
        else: function(this: Matcher<T, H, K>, func: (x: T) => unknown) {
            if (this.target.type in (this.handler ?? {})) {
                return this.execute();
            } else {
                return func(this.target);
            }
        }
    } as any;
}



type SplayPartial<T extends TypeExt<'type', string>> =
    Identity<SplayCase<T, T['type']>[T['type']]>;

type SplayCase<T extends TypeExt<'type', Types>, Types extends string> = {
    [P in T['type']]: KeyCase<T, T['type'], P, (x: ExtractOfUnion<T, P, 'type'>) => any>;
}

/**
 * 
 */
type KeyCase<T extends TypeExt<'type', Types>, Types extends string, Type extends Types, F extends (...args: any[]) => any> 
    = Partial<Handler<VariantsOfUnion<T>>> & TypeExt<Type, F>;

