import {Func} from './precepts';
import {Identity} from './util';

/**
 * Template that follows a particular pattern.
 */
export type PatternedTemplate<F extends Func> = {[type: string]: F};

/**
 * Patched Template helper.
 */
type PatchedTemplate<T extends PatternedTemplate<F>, F extends Func> = {
    [P in keyof T]: (...args: Parameters<T[P]>) => Identity<ReturnType<T[P]> & ReturnType<F>>;
}
export function patterned<
    T extends PatternedTemplate<F>,
    F extends Func,
>(_constraint_: F, v: T) {
    return v as PatchedTemplate<T, F>;
}
