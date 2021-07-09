# Tutorial (part 1) - definitions.

For this next section, we're going to demonstrate how a typically complex task can be simplified through variant.

Over the course of this tutorial we will develop the logic for a small game. Our hero will have one or more superpowers that will enable them to complete different tasks. These powers may be things like **flight**, **elemental magic**, or **teleportation**. As you might imagine, these powers have very different features and constraints. Teleportation, for example, may have a maximum distance that the user can travel, along with a cooldown to limit the ability's use. The data model for elemental magic would of course need the specific element the user can control.


```ts
export const Superpower = variant({
    // Avatar-like powers
    ElementalMagic: fields<{
        element: 'fire' | 'air' | 'water' | 'earth',
    }>(),
    Flight: fields<{
        speed: number; // in m/s

        /**
         * @unit seconds.
         **/
        stamina: number;
    }>(),
    Invisibility: fields<{
        method: 'psychic' | 'light manipulation';
    }>(),
    /**
     * The ability to pass through solid matter.
     */
    Phasing: {},
    /**
     * Jump from one place to another instantly.
     */
    Teleportation: fields<{
        /**
         * Range in meters.
         */
        range: number;
    }>(),
})
export type Superpower<T extends TypeNames<typeof Superpower> = undefined>
 = VariantOf<typeof Superpower, T>
```
