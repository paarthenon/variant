import {Func} from './precepts';
import {Identity} from './util';

/**
 * Constrained template. 
 */
export type ConstrainedTemplate<F extends Func> = {[type: string]: (...args: [...Parameters<F>, ...any[]]) => ReturnType<F>}

/**
 * Patched Template helper.
 */
type PatchedTemplate<T extends ConstrainedTemplate<F>, F extends Func> = {
    [P in keyof T]: (...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & ReturnType<F>>;
}

/**
 * Constrained variant. A variant where each form abides by a given constraint - handles these
 * inputs and provides these outputs. 
 * 
 * This can be used to provide optional values to the union type.
 * @param _constraint_ 
 * @param v 
 * @returns 
 */
export function constrained<
    T extends ConstrainedTemplate<F>,
    F extends Func,
>(_constraint_: F, v: T) {
    return v as PatchedTemplate<T, F>;
}
