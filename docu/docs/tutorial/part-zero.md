---
title: Introducing "Kind of Super"
---

:::danger
I am dealing with a wrist injury and have limited typing. This tutorial is still coming, but will be posted in stages. This page is a placeholder for some of the content that is to come. For now, please [continue on to the book](../book/creation). 
:::

For this next section, we're going to demonstrate how a typically complex task can be simplified through variant by building a text-based browser game.

The game **Kind of Super** will be a text-based game that has the player create a hero of their choosing and attempt to survive a
variety of threats to their city. We will explore

 - domain modeling of a complex space (powers, heroes, and the types to make it all flow)
 - conditional rendering of UI and form elements based on domain model
 - procedural generation of heroes and enemies. How do you create a random power when each power has different parameters?

Throughout this project we'll also discuss the design decisions that went into doing something one way. 

### Philosophy on Dependencies

To keep the code as clear as possible, **I will not use any frameworks or UI libraries** like chakra-ui, blueprintjs,
or TailwindCSS. The *only* dependencies will be `variant`, and `react-redux`. Vue or Angular would work just as well—in
fact variant has some delightful composability with angular's heavy use of rxjs. React was chosen because TSX files are simple, and its ability to incorporate expressions into components synergizes remarkably well with pattern matching. The project has been created with 
[CRA](https://github.com/facebook/create-react-app). I will also not be demonstrating persistence, error boundaries,
or logging techniques in this tutorial, though all of these are excellent elements to consider in your real applications.
We're going to build a game in the most intuitive way and a lot of this book-keeping can be very confusing for new developers.

- No component frameworks, use simple `<input>`s, `<select>`s, and `<button>`s
- No icon packages or svgs, use emoji ❤️
- No loggers or middleware
- No redux-toolkit
    - This project is meant to demonstrate that with proper language primitives, a lot of structures become unnecessary.
    Variant gives you the ability to organize by subdomain rather than by slice.
    - The `variant()` function and its supporting tools are superior to `createAction()`
    - `matcher()` provides more utility than the redux-toolkit match builder.
- No complex popovers or css tooltips. Just the `title` attribute.


## Upcoming content

The tutorial will arrive in several parts in order to be digestable.

### Part 1 - Defining a Hero

Here, we will create the variants that represent the powers a hero can have, and use `flags()` along with some fun with generic types in order to describe heroes with any combination of powers.

We will

- define the hero data model
- write the character creation form
- create a display component to conditionally render our current hero's state and powers


### Part 2 - Shaping a World

Part 2 will describe the data model for the city the heroes are defending, and some other elements in the world.

### Part 3 - Identifying Threats

Part 3 will create scenarios that will require your set of chosen heroes to leverage their powers.

### Part 4 - Making Enemies

Finally we'll add supervillians to the mix - enemies who share your power set and may even have access to powers that heroes consider immoral like mind control.