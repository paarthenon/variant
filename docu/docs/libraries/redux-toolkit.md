---
title: redux-toolkit
---

Redux Toolkit is an opinionated library of batteries-included components and tools intended to assist react users by providing sane defaults. I have been asked to compare Variant to redux-toolkit on a number of occasions. It makes sense that readers would connect the two - `createAction` is almost identical to our `variation()`.


Redux Toolkit attempts to resolve the confusion around redux by providing a set of tools that improve and streamline the developer experience. They have a strong focus on inferred typing to do this. In their efforts, they present an action creator, configuration tools, a tool to create reducers by writing look tables of action types. These are fantastic tools, in fact you'll find analogues to each of them here. I would argue the problem isn't a lack of clarity in _redux_, specifically. The problem is a lack of strong tooling around this _in the language itself_.

What if you could use createReducer on anything? What if you could model your entire domain, instead of just your actions, in unions and other types. 

## `createAction`

The full details of createAction are available at [their documentation](https://redux-toolkit.js.org/api/createAction). Much like `variation()`, the first parameter is the relevant type.

The simplest use appears the same.

```ts
const actionOne = createAction('test');
const actionTwo = variation('test');
```

There is another 

 - createAction focuses on a singular action creator that may or may not get grouped into a larger set of Action types. 

There are several key differences between our projects, but the two may work in harmony and (spoiler alert) I recommend that redux-toolkit users continue working with their preferred stack but integrate Variant in select places for its superior creation utilities and more general-purpose matching. 

The first being I'm not here to sell you on redux. Don't get me wrong, I use and enjoy redux, but I have no affiliation with the project and Variant has tremendous utility with or without it. This tie to redux also influences their decision to provide utilities like `createSlice`. 

The second is that Variant is unopinionated. Use as much or as little of the library as you wish and do so in whichever ways you find beneficial. I will demonstrate some useful patterns, but they are by no means mandated.


mapDispatchToProps 
 
bindActionCreators, same as augment. 

****

TODO:

 - Exhaustiveness. 