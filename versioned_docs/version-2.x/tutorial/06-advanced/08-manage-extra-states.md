---
title: Manage extra states
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the previous [Cross Page/Module Update Response States](/tutorial/advanced/update-across-components) chapter, we introduced how to update the response status across pages or modules, but in this chapter we It only introduces updating the `data` state returned by `useRequest` and `useWatcher` through `updateState`, the value of data is always consistent with the response data, but in many cases we will use additional states(such as state A) to display data, and After the request is successful, the data data is appended to the additional state A, such as the pagination scheme of pull-down loading. In this case, we need to manage the additional state A so that it can be updated across pages/modules.

## Update a single state

Additional states can be managed via `managedStates` when called by the use hook, and automatically assigned the state name to update it when `updateState` is called in other modules/pages.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript title="A.vue"
const todoList = page =>
  alova.Get('/todo', {
    name: 'todoList'
  });

const allTodo = ref([]);
useRequest(todoList, {
  //...

  // highlight-start
  // manage allTodo as additional state
  managedStates: {
    allTodo
  }
  // highlight-end
});
```

```javascript title="B.vue"
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
     //...

     // highlight-start
     // manage allTodo as additional state
     managedStates: {
       allTodo: allTodoState
     }
     // highlight-end
   });

   return (
     //...
   );
}
```

```javascript title="B.jsx"
const PageB = () => {
   //...
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
     //...
   );
}
```

</TabItem>

<TabItem value="3" label="svelte">

```javascript title="A.svelte"
const todoList = page =>
  alova.Get('/todo', {
    name: 'todoList'
  });

const allTodo = ref([]);
useRequest(todoList, {
  //...

  // highlight-start
  // manage allTodo as additional state
  managedStates: {
    allTodo
  }
  // highlight-end
});
```

```javascript title="B.svelte"
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
```

</TabItem>
<TabItem value="4" label="vue options">

:::info Note

Not support to manage additional states.

:::

</TabItem>
</Tabs>

## Update multiple states

In the above example, we implemented the update of a single `allTodo` state across pages. In fact, any number of states can be updated at the same time through the object description method of `updateState`.

```javascript
updateState('todoList', {
  state1: state1Data => {
    //...
  },
  state2: state2Data => {
    //...
  },
  state3: state3Data => {
    //...
  }
  //...
});
```

It should be noted that the above 3 additional states need to be managed through the `managedStates` property before updating.

## shorthand for data status update

When only updating the data state, you can directly pass in the callback function instead of specifying it as an object.

```javascript
updateState('todoList', {
  data: dataRaw => {
    //...
  }
});

// The following are shorthand
updateState('todoList', dataRaw => {
  //...
});
```
