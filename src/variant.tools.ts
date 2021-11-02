
/**
 * Describe the fields of the variation.
 * 
 * When used creates a function of type `(input: T) => T & {type: 'literal'}`
 * @param defaults set some default values for the object. Note this does *not* adjust the return type.
 */
export function fields<T extends {}>(defaults: Partial<T> = {}) {
    return (...args: {} extends T ? ([input: T] | []) : [input: T]) => {
        const [arg] = args;
        return {
            ...defaults,
            ...arg,
        } as T;
    }
}

/**
 * Take a single variable of type T and store as 'payload'
 */
export function payload<T>(_example?: T) {
    return (payload: T) => ({payload})
}


/**
 * Create an empty variation (`{type: 'literal'}`).
 */
export const nil = () => ({});
