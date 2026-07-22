:::info Usage scope

Client useHook

:::



In the previous [Update responsive state across pages/modules](/tutorial/client/in-depth/update-across-components) chapter, we introduced how to update responsive states across pages or modules through `updateState`, but it can only update states created by useHooks. What should we do if we need to update custom states across components? Let's continue!

## Update a single state

You can manage additional states through `managedStates` when using useHooks, and automatically specify the state name to update it when calling `updateState` in other modules/pages.

**vue:**



## Update multiple states

In the above example, we implemented the update of a single `allTodo` state across pages. In fact, any multiple states can be updated at the same time through the object description method of `updateState`.

```javascript
updateState('todoList', {
  state1: state1Data => {
    // ...
  },
  state2: state2Data => {
    // ...
  },
  state3: state3Data => {
    // ...
  }
  // ...
});
```

It should be noted that the above 3 additional states need to be managed through the `managedStates` property before updating.

## Abbreviation for data state update

When only updating the data state, you can directly pass in the callback function without specifying it as an object.

```javascript
updateState('todoList', {
  data: dataRaw => {
    // ...
  }
});

// The following is an abbreviation
updateState('todoList', dataRaw => {
  // ...
});
```
