import {WithProperty} from './variant';

/**
 * Useful in generating friendly types. Intersections are rendered as the type of the intersection, not as A & B.
 */
export type Identity<T> = {} & {
    [P in keyof T]: T[P]
};

export const identityFunc = <T>(x?: T) => (x || {}) as T extends unknown ? {} : T ;

export type Func = (...args: any[]) => any;

export type Functions<T> = {
    [P in keyof T]: T[P] extends Func ? T[P] : never;
}

export interface FuncObject {
    [key: string]: Func
}

export type ReturnTypes<T extends FuncObject> = {
    [P in keyof T]: ReturnType<T[P]>
}

export type ExtractOfUnion<T, TType extends string, K extends string = 'type'> = T extends WithProperty<K, TType> ? T : never;
