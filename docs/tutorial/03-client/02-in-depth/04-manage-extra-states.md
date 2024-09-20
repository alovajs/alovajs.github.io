---
title: Manage Extra states
---

:::info Scope of usage

Client useHook

:::

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

In the previous [Update responsive state across pages/modules](/tutorial/client/in-depth/update-across-components) chapter, we introduced how to update responsive states across pages or modules through `updateState`, but it can only update states created by useHooks. What should we do if we need to update custom states across components? Let's continue!

## Update a single state

You can manage additional states through `managedStates` when using useHooks, and automatically specify the state name to update it when calling `updateState` in other modules/pages.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

<Tabs className="file-tabs">
<TabItem value="1" label="PageA.vue">

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

</TabItem>
<TabItem value="2" label="PageB.vue">

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

</TabItem>
</Tabs>

</TabItem>

<TabItem value="2" label="react">

<Tabs className="file-tabs">
<TabItem value="1" label="PageA.jsx">

```javascript
const PageA = () => {
  const todoList = page =>
    alova.Get('/todo');

  const [allTodo, setAllTodo] = allTodoState = useState([]);
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
}
```

</TabItem>
<TabItem value="2" label="PageB.jsx">

```javascript
const PageB = () => {
  // ...
  const handleSuccess = () => {
    // highlight-start
    // Pass in an object and specify the state name to look up
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
}
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="3" label="svelte">

<Tabs className="file-tabs">
<TabItem value="1" label="PageA.svelte">

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

</TabItem>
<TabItem value="2" label="PageB.svelte">

```javascript
const handleSuccess = () => {
  // highlight-start
  // Pass in an object and specify the state name to search
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

</TabItem>
</Tabs>

</TabItem>
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
