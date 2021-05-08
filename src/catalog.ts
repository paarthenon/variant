
/**
 * Yes, this is necessary. Otherwise, boolean becomes rewritten as `true | false` and my distribution fails.
 */
type LiteralCatalog =
    | Record<string, string>
    | Record<string, number>
    | Record<string, boolean>
;
/**
 * See `LiteralCatalog`
 */
type LiteralFactory<T extends string = string> =
    | ((element: T, index: number) => number)
    | ((element: T, index: number) => string)
    | ((element: T, index: number) => boolean)
;

/**
 * Possible literal types.
 */
type LiteralBase = string | number | boolean;

/**
 * Predicate - is `T` a kind of literal? `true`/`false`.
 */
export type IsLiteral<T extends LiteralBase> = LiteralBase extends T ? true : false;

/**
 * Create a catalog object from a set of strings.
 * @param strings (`string[]`) - list of string literals.
 * 
 * @tutorial
 * ```ts
 * const Suit = catalog(['Spades', 'Hearts', 'Clubs', 'Diamonds']);
 * type Suit = keyof typeof Suit;
 * ```
 * `Suit` is now available as both value (`return Suit.Spades`) and type (`function(cardSuit: Suit) { ... }`)
 */
export function catalog<T extends string>(strings: T[]): {[P in T]: P};
/**
 * Create a catalog object based on some calculation
 * @param strings list of string literals.
 * @param factory function to generate value.
 * 
 * @tutorial
 * ```ts
 * const logLevels = catalog(
 *     ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
 *     (_, index) => index * 100, // 100 as buffer.
 * );
 * ```
 * 
 * This generates a catalog object:
 * 
 * const logLevels = {
 *     trace: 0,
 *     debug: 100,
 *     info: 200,
 *     ...,
 * };
 * 
 * Something like `logLevels` is commonly used as the internal representation for a logger.
 * The minimum log level (or threshold) is a simple number that we can use for comparison
 * against this table. The `100` is purely a convention to allow future items to slide in-
 * between existing values.
 */
export function catalog<T extends string, F extends LiteralFactory<T>>(strings: T[], factory: F): {[P in T]: ReturnType<F>};
/**
 * Define the catalog object manually. 
 * 
 * Use to enforce a consistent type for all values.
 * @param catalog an object literal where each value is the same type of literal.
 * 
 * @tutorial
 * 
 * ```ts
 * const settingKey = catalog({
 *     one: 'SETTING_ONE',
 *     two: 'SETTING_TWO',
 * } as const);
 * ```
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