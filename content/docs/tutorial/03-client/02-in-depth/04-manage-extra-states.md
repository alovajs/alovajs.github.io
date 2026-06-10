---
title: Manage Extra states
---

<Callout type="info">
Scope of usage

Client useHook

</Callout>

In the previous [Update responsive state across pages/modules](/tutorial/client/in-depth/update-across-components) chapter, we introduced how to update responsive states across pages or modules through `updateState`, but it can only update states created by useHooks. What should we do if we need to update custom states across components? Let's continue!

## Update a single state

You can manage additional states through `managedStates` when using useHooks, and automatically specify the state name to update it when calling `updateState` in other modules/pages.

<Tabs items={["vue","react","svelte","solid"]}>

<Tab value="vue">

<Tabs className="file-tabs">
<Tab value="PageA.vue">

```javascript
const todoList = () => alova.Get('/todo');
const allTodo = ref([]);
useRequest(todoList, {
  // ...

  // highlight-start
  // Manage allTodo as an additional state
  managedStates: {
    allTodo
  }
  // highlight-end
});
```

</Tab>
<Tab value="PageB.vue">

```javascript
const handleSuccess = () => {
  // highlight-start
  // Pass in an object and specify the state name to find
  updateState(alova.Get('/todo'), {
    allTodo: allTodoData => {
      // Add a new todo item
      allTodoData.push({
        title: 'new todo',
        time: '10:00'
      });
      return allTodoData;
    }
  });
  // highlight-end
};
```

</Tab>

</Tabs>

</Tab>

<Tab value="react">

<Tabs items={["PageA.jsx","PageB.jsx"]}>

<Tab value="PageA.jsx">

```javascript
const PageA = () => {
  const todoList = () => alova.Get('/todo');
  const allTodoState = useState([]);
  const [allTodo, setAllTodo] = allTodoState;
  useRequest(todoList, {
    // ...

    // highlight-start
    // Manage allTodo as an additional state
    managedStates: {
      allTodo: allTodoState
    }
    // highlight-end
  });

  return (
    // ...
  );
};
```

</Tab>
<Tab value="PageB.jsx">

```javascript
const PageB = () => {
  // ...
  const handleSuccess = () => {
    // highlight-start
    // Pass in an object and specify the state name to find
    updateState(alova.Get('/todo'), {
      allTodo: allTodoData => {
        // Add a new todo item
        allTodoData.push({
          title: 'new todo',
          time: '10:00'
        });
        return allTodoData;
      }
    });
    // highlight-end
  };

  return (
    // ...
  );
};
```

</Tab>
</Tabs>

</Tab>

<Tab value="svelte">

<Tabs items={["PageA.svelte","PageB.svelte"]}>

<Tab value="PageA.svelte">

```javascript
// a.svelte
const todoList = () => alova.Get('/todo');
const allTodo = writable([]);
useRequest(todoList, {
  // ...

  // highlight-start
  // Manage allTodo as an additional state
  managedStates: {
    allTodo
  }
  // highlight-end
});
```

</Tab>
<Tab value="PageB.svelte">

```javascript
const handleSuccess = () => {
  // highlight-start
  // Pass in an object and specify the state name to find
  updateState(alova.Get('/todo'), {
    allTodo: allTodoData => {
      // Add a new todo item
      allTodoData.push({
        title: 'new todo',
        time: '10:00'
      });
      return allTodoData;
    }
  });
  // highlight-end
};
```

</Tab>

</Tabs>

</Tab>

<Tab value="solid">

<Tabs items={["PageA.jsx","PageB.jsx"]}>

<Tab value="PageA.jsx">

```javascript
const PageA = () => {
  const todoList = () => alova.Get('/todo');
  const allTodoState = createSignal([]);
  const [allTodo, setAllTodo] = allTodoState;
  useRequest(todoList, {
    // ...

    // highlight-start
    // Manage allTodo as an additional state
    managedStates: {
      allTodo: allTodoState
    }
    // highlight-end
  });

  return (
    // ...
  );
};
```

</Tab>

<Tab value="PageB.jsx">

```javascript
const PageB = () => {
  // ...
  const handleSuccess = () => {
    // highlight-start
    // Pass in an object and specify the state name to find
    updateState(alova.Get('/todo'), {
      allTodo: allTodoData => {
        // Add a new todo item
        allTodoData.push({
          title: 'new todo',
          time: '10:00'
        });
        return allTodoData;
      }
    });
    // highlight-end
  };

  return (
    // ...
  );
};
```

</Tab>

</Tabs>

</Tab>
</Tabs>

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
