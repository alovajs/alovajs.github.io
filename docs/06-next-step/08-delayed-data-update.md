---
title: Delay data update
sidebar_position: 80
---

You may have the following requirements: ** When creating a todo item, set it to silent submission, and immediately call `updateState` to update the todo list, so that although the newly added todo item can be seen on the interface immediately, but there is no id, Therefore this todo item cannot be edited or deleted without re-requesting the full data. **

Deferred data update is used to solve this problem, it allows you to mark the id field with a placeholder format, replace the placeholder with a `default` value or `undefined` before the response, and then automatically put it after the response. The actual data replaces placeholder markers.

## A simple example

```javascript
const newTodo = {
  title: '...',
  time: '10:00'
};
const { onSuccess } = useRequest(/*...*/); // silently submit
onSuccess(() => {
  updateState(/*...*/, todoList => {
    // The key in the delayed update expression starts with `+` and the value is set to the getter function
    // It will be called after the response and replace the return value on the id property, the res parameter is the response data
    const newTodoWithPlaceholder = {
      '+id': res => res.id,
    };

    return [
      ...todoList,
      newTodoWithPlaceholder,
    ];
  });
});
```

The above `newTodoWithPlaceholder` data will be compiled into the following value before responding, and the todo list page can immediately display the new todo item.

```javascript
{
  id: undefined,
  title: '...',
  time: '10:00',
};
```

After the response, the id will be replaced by the return value of the getter function. At this time, the new todo item also supports operations such as editing and deleting.

```javascript
// Assume the response data is { id: 10 }
{
  id: 10,
  title: '...',
  time: '10:00',
};
```

:::info
For a more complete practical example, please move to [example-safer optimistic update](../example/safer-ptimistic-update)
:::

## Delayed update placeholder format syntax

In fact, in the above example code, the key starting with **+** is a shorthand format, which only applies to objects. In fact, it has 3 syntax formats, provides richer functions, and allows us to use it in an array or even a single value, let's take a look.

### Short form

The key starts with a **+** sign and is only suitable for use in objects.

```javascript
{
  '+id': res => res.id
}
```

### Array format

Specify a default value while setting the getter function. The default value will be used as a temporary value before the data response. The key starts with **+** and is only suitable for use in objects.

```javascript
{
  '+id': [res => res.id, 0]
}
```

**Full format:**
Represents the placeholder format as an object, which can be used anywhere

```javascript
{
  // The value of action is a fixed spelling
  action: 'responsed',

  // getter function for delayed update
  // It will be called after the response and replace the return value on the id property, the res parameter is the response data
  value: res => res.id,

  // Default value before data update, optional, undefined if not set
  default: 0,
}
```

Next, let's take a look at how the placeholder format for delayed update is used in different data structures.

## use in arrays

```javascript
[1, 2, { action: 'responsed', value: res => res.id }][
  // data before response
  (1, 2, undefined)
][
  // => response data
  // Assume the response data is { id: 10 }
  (1, 2, 10)
];
```

## use in objects

```javascript
{
  a: { action: 'responsed', value: res => res.id },
  b: { action: 'responsed', value: res => res.id, default: 1 },
}
// When placeholders are set to object properties, they can be abbreviated as follows
// key starts with "+"
{
  '+a': res => res.id, // only set the getter function
  '+b': [res => res.id, 1], // set the getter function and default value
}

// data before response
{
  a: undefined,
  b: 1,
}

// => response data
// Assume the response data is { id: 10 }
{
  a: 10,
  b: 10,
}
```

## on non-arrays and objects

```javascript
// directly represented as a placeholder
{
  action: 'responsed',
  value: res => res.data,
  default: { name: '', age: 0 }
}

// data before response
{ name: '', age: 0 }

// => response data
// Assume the response data is { data: { name: 'Tom', age: 18 } }
{ name: 'Tom', age: 18 }
```

## used in combination of arrays and objects

```javascript
[
  1,
  {action: 'responsed', value: res => res.id, default: 12},
  res => res.id,
  4,
  {
    a: 1,
    b: 2,
    '+c': res => res.id,
    d: {action: 'responsed', value: res => res.id, default: 24},
    e: [
      {action: 'responsed', value: res => res.id, default: 36},
      3,
      6
    ]
  }
]

// data before response
[
  1,
  12,
  res => res.id, // shorthand can only be used in objects with + prefixed key, so does not compile
  4,
  {
    a: 1,
    b: 2,
    c: undefined,
    d: 24,
    e: [
      36,
      3,
      6
    ]
  }
]

// => response data
// Assume the response data is { id: 10 }
[
  1,
  10,
  res => res.id, // shorthand can only be used in objects with + prefixed key, so does not compile
  4,
  {
    a: 1,
    b: 2,
    c: 10
    d: 10,
    e: [
      10,
      3,
      6
    ]
  }
]
```

:::danger limit 1
Delayed data update is only valid in silent mode, and the `updateState` function is called synchronously in the `onSuccess` callback function, otherwise it may cause data confusion or error.
:::

:::danger limit 2
If there is a circular reference in the updated value of `updateState`, the delayed data update will not take effect
:::
