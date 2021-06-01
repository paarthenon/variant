---
title: Flags and Matrix
---

Flags and Matrix enable the creation of typed property sets and subsets. This surprisingly useful pattern allows some object to express that it possesses one or more distinct qualities. Filter sets, configuration records, and data flags are particulaly well suited to this approach.

Flags can replace some typically tightly-coupled functionality. In a todo app, for example, a single task will have a variety of possible attributes. A task may have a __due date__. It may be marked with a __priority level__. It may have a __reminder notification__ set.

Let's see what this would look like. We're going to represent each attribute as one form of the variant `Attribute`. We could put these elements directly on the `Task` model, but there are limitations with that approach. I'll highlight some of them as we go. 

```ts
export const Attribute = variant({
    dueDate: fields<{timestamp: number}>(),
    priority: fields<{level: PriorityLevel}>(),
    reminder: fields<{message?: string, timestamp: number}>(),
});
//= Attribute type definition.
```
The type `PriorityLevel` is a simple enum of three states, `Low`, `Medium`, and `High`. Adding attributes to our task model involves adding one line.

```ts
interface Task {
    ...
    attr: Flags<typeof Attribute>;
}
```

The `attr` property has type `{ [attributeType: string]?: Attribute<attributeType> }`. In plain English, it is an object with 0 or more properties. Each property corresponds to an instance of one type of Attribute.

```ts
const overdueTasks = tasks.filter(t => t.dueDate && t.dueDate.timestamp < Date.now());
```


****

### TODO

 - point out that each of these have now become fully-realized value objects. These grant a sense of nominality to the whole affair.

 - If you had it as the task model, then when you add some new attribute you will have to update that task model and all associated functions / components and you'll just have to remember which ones those are. However, using flags when you add a new attribute you will, thanks to exhaustiveness checking, receive compiler messages guiding your path. Once your code compiles, it will be valid again.

 - When you add a new type of model called "epic" or "project", you realize it would benefit from many of the same attributes. All of them, in fact. So we simply give projects an attribute bag as well.
    - later on when we need to add a new field for the epic called "coordinator" then we can split these elements. 