import {Outputs, WithProperty} from "./variant";
import {Identity} from "./util";

/**
 * Enforce exhaustion of a union type by using this in the default case.
 * @param x 
 * @param options 
 */
export function exhaust(x: never, options = {key: 'type', throw: false}) {
    // Should never be called. If it ever *does* happen to be called it'll dump the type string.
    // I find this to be a reasonable balance between avoiding data in the logs and providing
    // useful debugging info.

    const msg = `Switch does not handle all cases. Failed case:${(x as any)[options.key]}`;
    if (options.throw) {
        throw new Error(msg);
    }
}

function _set<T, X, Y>(func: (x: X) => Y, data: T) {
    // remove T from inputs, add T to outputs
    return (input: Identity<Omit<X, keyof T>>) => {
        const combined = Object.assign({}, data, input) as T & X;
        return func(combined) as Y;
    }
}

type MarkOptional<T, O> = {
    [P in keyof T]: P extends keyof O ? (T[P] | undefined) : T[P]
}

function _default<T, X, Y>(func: (x: X) => Y, data: T) {
    return (input: MarkOptional<X, T>) => {
        const combined = Object.assign({}, data, input) as T & X;
        return func(combined) as Y;
    }
}

/**
 * Handles boilerplate with the most common function definiton.
 * Also provides a clean way of describing things in a record-like
 * way.
 * 
 * const ItemOne = variant('ITEM_ONE', fields<{
 *     id: number;
 *     name: string;
 * }>());
 * 
 * You can also use .set() to assign some elements of an interface. For example:
 * 
 * interface Audited<T> extends T {
 *     createdDate: number; // millis
 * }
 * 
 * @param defaults set some default values for the object. Note this does not remove
 */
export function fields<T>(defaults: Partial<T> = {}) {
    return Object.assign(
        (input: T) => ({
            ...defaults,
            ...input,
        }) as T,
        {
            set<D>(this: (x: T) => T, data: D) {
                return _set(this, data);
            },
            default<D>(this: (x: T) => T, data: D) {
                return _default(this, data);
            },
        },
    );
}

/**
 * FSA compliance.
 */
export function payload<T>() {
    return (payload: T) => ({payload})
}

export function property<K extends string = 'payload'>(key: K) {
    return <T> () => (payload: T) => ({[key]: payload}) as K extends keyof infer KLiteral ? WithProperty<keyof KLiteral & string, T> : never;
}

export function data<T>(x: T) {
    return (override?: T) => ({...x, ...(override != undefined && override)});
}

