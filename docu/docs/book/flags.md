---
title: Flags and Matrix
---

Flags and Matrix enable the creation of typed property bags. Inspired by flag(s) enums, this surprisingly useful pattern allows some object to express that it possesses one or more distinct qualities captured by the forms of some variant. Filter sets, configuration records, and data flags are particulaly well suited to this approach.

Flags can replace some typically tightly-coupled functionality. In a todo app, for example, a single task will have a variety of possible attributes. A task may have a __due date__. It may be marked with a __priority level__. It may have a __reminder notification__ set.

Let's see what this would look like. We're going to represent each attribute as one form of the variant `Attribute`. Typically we might put these elements directly on the `Task` model, but there are sincere advantages to this approach. I'll highlight some of them as we go. 

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

The `attr` property has type `{ [type: string]?: Attribute<type> }`. In plain English, it is an object where property is optional and corresponds to an instance of one type of Attribute. The overall type is as follows:

```ts
{
    dueDate?: {
        type: "dueDate";
        timestamp: number;
    };
    priority?: {
        type: "priority";
        level: PriorityLevel;
    };
    reminder?: {
        type: "reminder";
        message?: string;
        timestamp: number;
    };
}
```

Given these properties, it is simple to answer questions like "which tasks are overdue?"

```ts
const overdueTasks = tasks.filter(t => t.attr.dueDate && t.attr.dueDate.timestamp < Date.now());
```

However there's more. An `Attribute` is now it's own type of entity and can be processed or rendered directly. Rendering
an attribute would use our friendly match statement.

```ts
const renderAttribute = (attr: Attribute) => match(attr, {
    dueDate: ({timestamp}) => `due: ${renderDate(timestamp)}`,
    priority: ({level}) => `priority: ${PriorityLevel[level]}`,
    reminder: ({message, timestamp}) => `reminder: 
        ${message != undefined ? `"${message}" on` : ''}
        ${renderDate(timestamp)}
    `,
})
```

This would typically be a react (or other view library) component, but I'll save that for the react integration section.

*Any* attribute can now be rendered to a short summary.

### Projects

Let's say we want to expand our scope with a new type of entity, **projects** to go alongside the pre-existing **tasks**.

Projects can also have *due dates*, *priorities*, and *reminders.* Project will get its own `attr: Flags<typeof Attribute>` property.

Rendering a project will involve displaying its overarching properties but then delegating attribute rendering to the same old function that handles attributes for tasks. This ensures consistency between the two. 



****

### TODO

 - point out that each of these have now become fully-realized value objects. These grant a sense of nominality to the whole affair.

 - If you had it as the task model, then when you add some new attribute you will have to update that task model and all associated functions / components and you'll just have to remember which ones those are. However, using flags when you add a new attribute you will, thanks to exhaustiveness checking, receive compiler messages guiding your path. Once your code compiles, it will be valid again.

 - When you add a new type of model called "epic" or "project", you realize it would benefit from many of the same attributes. All of them, in fact. So we simply give projects an attribute bag as well.
    - later on when we need to add a new field for the epic called "coordinator" then we can split these elements.

 - Some of you may be familiar with the classic flags enums that have been in use in the programming world for decades. This is exactly where the term **flags** comes from. However, with the expressivity of TS a simple set of flags can be typed as `Record<Animal['type']>`. Flags would be much more useful if each property corresponded to an instance of a variant. That way sub-variants and other complex types could express themselves as well.