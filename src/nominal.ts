const name: unique symbol = Symbol('name');
export type Nominal<T, Name> = T & {[name]: Name};
export type Anonymous<T> = Nominal<T, any>;

type AnonymousObject<T> = {
    [P in keyof T]: Anonymize<T[P]>
}

type AnonymousTuple<T extends ReadonlyArray<any>> = {
    [P in keyof T]: T[P] extends Nominal<infer TValue, any> ? Anonymize<TValue> : T[P]
};

type AnonymousFunction<T> = T extends (...args: infer TArgs) => infer TR ? (...anonArgs: AnonymousTuple<TArgs>) => Anonymize<TR> : T;

export type Anonymize<T> =
    T extends Nominal<infer TValue, any>
        ? TValue
    :
    T extends ReadonlyArray<any>
        ? AnonymousTuple<T>
    :
    T extends (...args: any[]) => any // needs to be before object, will technically count as one. in this else-if chain.
        ? AnonymousFunction<T>
    :
    T extends (number | string | symbol | boolean)
        ? T
    :
    T extends object
        ? AnonymousObject<T>
    :
    never
;

export const anonymous = <T>(t: T) => t as Anonymous<T>;
export const anon = anonymous;
