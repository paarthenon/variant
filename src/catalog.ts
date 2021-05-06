
/**
 * Yes, this is necessary. Otherwise, boolean becomes rewritten as `true | false` and my distribution fails.
 */
type LiteralCatalog =
    | Record<string, string>
    | Record<string, number>
    | Record<string, boolean>
;
/**
 * See LiteralCatalog
 */
type LiteralFactory<T extends string = string> =
    | ((element: T, index: number) => number)
    | ((element: T, index: number) => string)
    | ((element: T, index: number) => boolean)
;

type LiteralBase = string | number | boolean;
/**
 * Does what it says on the tin.
 */
export type IsLiteral<T extends LiteralBase> = LiteralBase extends T ? true : false;

/**
 * This is equivalent to strEnum.
 * @param strings 
 */
export function catalog<T extends string>(strings: T[]): {[P in T]: P};
/**
 * strEnum with a factory function.
 * @param strings 
 * @param factory 
 */
export function catalog<T extends string, F extends LiteralFactory<T>>(strings: T[], factory: F): {[P in T]: ReturnType<F>};
/**
 * Define the object yourself, but enforce that every value is the same kind of literal.
 * @param catalog 
 */
export function catalog<T extends LiteralCatalog>(catalog: T): T;
export function catalog<T extends string[] | LiteralCatalog, F extends LiteralFactory>(catalog: T, factory?: F) {
    if (Array.isArray(catalog)) {
        return catalog.reduce((result, current: string, index) => {
            return {
                ...result,
                [current]: factory != undefined ? factory(current, index) : current,
            }
        }, {})
    } else {
        return catalog;
    }
}

/**
 * Alias for compatibility
 * @deprecated - use `catalog`
 */
export const literalist = catalog;