---
title: Augmented Variants
---

A variant can augment some template or existing variant with extra properties. In the simplest case, we can patch in an extra property that would be tedious to write in real life. For example, let's add a timestamp to the actions we create so each action can report when it was made.

```ts twoslash
// @noErrors
import {variant, augment, fields, VariantOf} from 'variant';

const Action = variant(augment(
    {
        DoSomething: {},
        LoadThing: fields<{thingId: number}>(),
        RefreshPage: {},
    },
    () => ({timestamp: Date.now()}),
));
type Action = VariantOf<typeof Action>;

const loadAction = Action.LoadThing({thingId: 12});
// action instance has timestamp.
console.log(loadAction.t     );
//                      ^|



```
Working with an existing variant is similarly direct.

```ts twoslash {7}
import {variant, augment, fields, VariantOf} from 'variant';
// ---cut---
const Action = variant({
    DoSomething: {},
    LoadThing: fields<{thingId: number}>(),
    RefreshPage: {},
});

const LoggedAction = variant(augment(Action, () => ({timestamp: Date.now()})));
```

This augmentation may not seem very impactful with only three actions, but for my longer variants my carpal tunnel sings its praises. We can also do more than just mixing in data. We can inspect the instance of a variant as it comes to us in the pipeline and make some decisions based on that information. 

## Patching Instances

The augmentation function can accept a parameter, the in-progress variant. For a basic example, let's patch in a `nameLength` property to our `Animal`s from earlier.

```ts
const BetterAnimal = variant(augment(Animal, animal => ({nameLength: animal.name.length})));
const snek = BetterAnimal.snake('steve');

expect(snek.name).toBe('steve');
expect(snek.nameLength).toBe(5);
```

### Matching & Patching

In most instances, it won't be possible to augment a variant using the same logic for all cases. Here come the match functions to the rescue. In this next example we'll assign an [epithet](https://www.merriam-webster.com/dictionary/epithet) to each animal based on one of its properties.

```ts
const BetterAnimal = variant(augment(
    Animal,
    animal => ({
        epithet: match(animal, {
            cat: ({furnitureDamaged}) => furnitureDamaged > 5 ? 'dangerous' : 'safe',
            dog: ({favoriteBall}) => favoriteBall === 'yellow' ? 'bad' : 'good',
            snake: ({pattern}) => pattern,
        })
    }),
));

const snek = BetterAnimal.snake('steve');
const pup = BetterAnimal.dog({name: 'Spot', favoriteBall: 'red'});

expect(snek.name).toBe('steve');
expect(snek.epithet).toBe('striped');
expect(pup.name).toBe('Spot');
expect(pup.epithet).toBe('good');
```


