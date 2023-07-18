---
title: Update response status across pages/modules
sidebar_position: 100
---

In the example of the previous section [Active Invalidation Response Cache](/learning/invalidate-response-cache), when the user clicks on an item in the todo list, enters the todo details page and executes Editing is done. At this time, we hope that the todo list data on the previous page will also be updated to the edited content. Using `useFetcher` and `invalidateCache` will re-initiate the request. Is there a method that does not need to re-request?

Of course there is! alova provides `updateState` to manually update the existing responsive state under any module/page. It is worth noting that the different response states are stored with the method instance that sent the request as the key, so the method instance will also be used to find the corresponding response state when updating the state.

## ⚠️ Please make sure the component is not destroyed

`updateState` will look for the response state created by alova's use hooks by default, and the destruction of a component will also recycle all the state created inside it at the same time, so when using `updateState`, please make sure you want to update the response The container component corresponding to the status has not been destroyed, otherwise the corresponding response status will not be found and the update will fail.

This problem often occurs when the state is updated across pages, because what we tend to overlook when the page jumps is that the previous page has been destroyed by default. Therefore, if you want to update the state across pages, here are two suggestions :

1. Persist the page components to ensure that the updated state can still be found.
2. Use [manually update the cache(setCache)](/learning/cache-set-and-query) instead of `updateState`, the principle is that when the request for the previous page exists in the cache, update its cache to ensure that it is created again page, the triggered request can hit the updated cache to achieve the same effect.

[Here is a demo about `updateState`](/example/update-state)

## Use the method instance to find the response status

When determining the method instance corresponding to the updated response state, you can pass this method instance in `updateState`, it will check whether there is a corresponding response state under this instance, and provide it to you for modification in the callback function, and finally Just return the modified data.

```javascript
import { updateState } from 'alova';

// the todo item being edited
const editingTodo = {
   id: 1,
   title: 'todo1',
   time: '09:00'
};

const { send, onSuccess } = useRequest(createTodoPoster, { immediate: false });
onSuccess(() => {
   // highlight-start
   // Fixedly modify the todo data on the first page
   // updateState will return whether the update is successful
   const updated = updateState(getTodoList(1), todoList => {
     return todoList. map(item => {
       if (item.id === editingTodo.id) {
         return {
           ...item,
           ...editing Todo
         };
       }
       return item;
     });
   });
   // highlight-end
});
```

:::caution Caution

1. When updating the state through `updateState`, if the cache (memory cache and persistent cache) is detected, it will also update the new data update cache.
2. Alova will manage the status returned by the hook only when using useRequest and useWatcher to initiate a request. The reason is that the response status is generated and saved through a Method instance, but when no request is initiated, the url in the Method instance, Parameters such as params, query, and headers are still uncertain.

:::

## Dynamically update the response status

Sometimes you may not be sure that you need to update the response status under the method, but you know how to find the cached data that needs to be invalidated. We can use [Method instance matcher](/next-step/method-instance-matcher) to dynamically find the corresponding method instance. The following example shows adding a piece of data to the list corresponding to the method instance named todoList.

```javascript
updateState('todoList', todoListRaw => {
  todoListRaw.push({
    title: 'new todo',
    time: '10:00'
  });
  return todoListRaw;
});
```

## Listen for matching events

When dynamically updating the response state, sometimes you may want to do some processing when the method instance is matched, or you want to get the matching method instance, `updateState` can also pass in a third parameter to set the matching event to achieve these purposes .

```javascript
updateState(
  'todoList',
  todoListRaw => {
    //...
  },
  {
    // Called when a method instance is matched, the parameter is the matched method instance
    onMatch: method => {
      //...
    }
  }
);
```

## Precautions

1. In actual use, whether you use `useRequest` or `useWatcher` to send a request, you can call the `send` function to specify different parameters to send the request repeatedly, and the response status returned by these use hooks will be used by multiple method instances Reference, so you can choose any method instance to match the same response status value;
2. When the dynamic search updates the response status, the method instance matcher finds multiple method instances, and the first instance will prevail;
