import {KeysOf, VariantModule} from './precepts';


/**
 * A pun. Key enum. Keynum. A simple object literal with string constants.
 */
export type Keynum<T extends VariantModule<string>> = {
    [P in KeysOf<T>]: P;
}

/**
 * Retrieve an object where each property is one of the keys of the module.
 * The value and the key for each property are the same.
 * @param variant 
 */
export function keynum<T extends VariantModule<string>>(variant: T) {
    return Object.values(variant).reduce((result, vc) => {
        return {
            ...result,
            [vc.type]: vc.type,
        }
    }, {} as Keynum<T>)
}

/**
 * An object that maps the 
 */
export type KeyMap<T extends VariantModule<string>> = {
    [P in keyof T]: T[P]['type'];
}

/**
 * Retrieve an object where each property is one of the keys of the module.
 * The value and the key for each property are the same.
 * @param variant 
 */
export function keymap<T extends VariantModule<string>>(variant: T): KeyMap<T> {
    return Object.keys(variant).reduce((result, key) => {
        return {
            ...result,
            [key]: variant[key].type,
        }
    }, {} as KeyMap<T>)
}