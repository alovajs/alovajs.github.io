---
title: Manage Extra states
---

:::info Scope of usage

Client useHook

:::

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

In the previous [Update responsive state across pages/modules](/next/tutorial/client/in-depth/update-across-components) chapter, we introduced how to update responsive states across pages or modules through `updateState`, but it can only update states created by useHooks. What should we do if we need to update custom states across components? Let's continue!

## Update a single state

You can manage additional states through `managedStates` when using useHooks, and automatically specify the state name to update it when calling `updateState` in other modules/pages.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript title="A.vue"
const todoList = page =>
  alova.Get('/todo', {
    name: 'todoList'
  });

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

```javascript title="B.vue"
const handleSuccess = () => {
  // highlight-start
  // Pass in an object and specify the state name to find
  updateState('todoList', {
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

<TabItem value="2" label="react">

```javascript title="A.jsx"
const PageA = () => {
  const todoList = page =>
    alova.Get('/todo', {
    name: 'todoList'
  });

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

```javascript title="B.jsx"
const PageB = () => {
  // ...
  const handleSuccess = () => {
    // highlight-start
    // Pass in an object and specify the state name to look up
    updateState('todoList', {
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

<TabItem value="3" label="svelte">

```javascript title="A.svelte"
// a.svelte
const todoList = page =>
  alova.Get('/todo', {
    name: 'todoList'
  });

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

```javascript title="B.svelte"
const handleSuccess = () => {
  // highlight-start
  // Pass in an object and specify the state name to search
  updateState('todoList', {
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
