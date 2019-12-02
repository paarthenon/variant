import {Func} from "./util";

const name: unique symbol = Symbol('name');
/**
 * Grants nominal typing in a structural space by describing a
 * (false) unique symbolic property. 
 */
export type Nominal<T, Name> = T & {[name]: Name};

type AnonymousObject<T> = {
    [P in keyof T]: Anonymous<T[P]>
}

type AnonymousTuple<T extends ReadonlyArray<any>> = {
    [P in keyof T]: T[P] extends Nominal<infer TValue, any> ? Anonymous<TValue> : T[P]
};

type AnonymousFunction<T> = T extends (...args: infer TArgs) => infer TR ? (...anonArgs: AnonymousTuple<TArgs>) => Anonymous<TR> : T;

type primitive = number | string | symbol | boolean;

/**
 * Anonymize a nominal type. Take an object that requires it's specific ids
 * and return one that doesn't. Great for taking in inputs. Most action creators
 * could go from Anonymous<T> => T
 */
export type Anonymous<T> =
    T extends Nominal<infer TValue, any>
        ? (
            TValue extends ReadonlyArray<any> ? AnonymousTuple<TValue> :
            TValue extends Func ? AnonymousFunction<TValue> :
            TValue extends primitive ? TValue :
            TValue extends object ? AnonymousObject<TValue> :
            T
        )
    :
    T extends ReadonlyArray<any>
        ? AnonymousTuple<T>
    :
    T extends (...args: any[]) => any // needs to be before object, will technically count as one. in this else-if chain.
        ? AnonymousFunction<T>
    :
    T extends primitive
        ? T
    :
    T extends object
        ? AnonymousObject<T>
    :
    never
;
