
/**
 * Describe the shape of the variant.
 * @param defaults set some default values for the object. Note this does not adjust the return type.
 */
export function fields<T extends {}>(defaults: Partial<T> = {}) {
    return (input: {} extends T ? void : T) => ({
        ...defaults,
        ...input,
    }) as T;
}

/**
 * Take a single variable of type T and store as 'payload'
 */
export function payload<T>(_example?: T) {
    return (payload: T) => ({payload})
}


/**
 * Used in conjunction with variantModule to have empty tags.
 */
export const nil = () => ({});
