---
title: Update response states across pages/modules
sidebar_position: 20
---

There is a scenario where when the user clicks on an item in the todo list, enters the todo details page and edits it, at this time we hope that the todo list data on the previous page will also be updated with the edited content, use ` The useFetcher` and `invalidateCache` methods will re-initiate the request.

At this time, you can use `updateState` to update the existing response status under any module/page. In this case, the request will not be reinitiated.

## ⚠️ Please make sure the component is not destroyed

By default, `updateState` will look for the response state created by alova's useHooks when sending a request, but to prevent memory overflow, the destruction of a component will also recycle all the states created internally, so please make sure you use `updateState` It is hoped that the container component corresponding to the updated response status has not been destroyed, otherwise the corresponding response status will not be found and the update will fail.

This problem often occurs when updating status across pages, because what we tend to overlook when the page jumps is that the previous page has been destroyed by default. Therefore, if you want to update status across pages, here are two suggestions :

1. Persist the page components to ensure that the updated status can still be found;
2. Use [setCache](/tutorial/cache/set-and-query) instead of `updateState`. The principle is that when the request for the previous page exists in the cache, its cache is updated to ensure that when the page is created again, The triggered request can hit the updated cache to achieve the same effect.

[Here is an example of `updateState`](/tutorial/example/update-state)

## Use method instance to find response status

When determining the method instance corresponding to the updated response state, you can pass in this method instance in `updateState`. It will find whether there is a corresponding response state under this instance and provide it to you for modification in the callback function. Finally Just return the modified data.

```javascript
import { updateState } from 'alova';

//Todo item being edited
const editingTodo = {
  id: 1,
  title: 'todo1',
  time: '09:00'
};

const { send, onSuccess } = useRequest(createTodoPoster, { immediate: false });
onSuccess(() => {
  // highlight-start
  // Fixed modification of todo data on the first page
  // updateState will return whether the update is successful
  const updated = updateState(getTodoList(1), todoList => {
    return todoList.map(item => {
      if (item.id === editingTodo.id) {
        return {
          ...item,
          ...editingTodo
        };
      }
      return item;
    });
  });
  // highlight-end
});
```

:::warning note

1. When updating the state through `updateState`, if the cache (memory cache and persistent cache) is detected, the new data update cache will also be updated.
2. Only when a request has been initiated using useRequest or useWatcher, alova will manage the status returned by the hook. The reason is that the response status is generated and saved through a Method instance, but when no request is initiated, the url and URL in the Method instance are Parameters such as params, query, and headers are still uncertain.

:::

## Dynamically update response status

Maybe sometimes you are not sure that you need to update the response status under the method, but you know how to find the cached data that needs to be invalidated. We can use [Method instance matcher](/tutorial/advanced/method-matcher) to dynamically Find the corresponding method instance. The following example shows adding a piece of data to the list corresponding to the method instance named todoList.

```javascript
updateState('todoList', todoListRaw => {
  todoListRaw.push({
    title: 'new todo',
    time: '10:00'
  });
  return todoListRaw;
});
```

The [Method instance matcher](/tutorial/advanced/method-matcher) will be introduced in detail in later chapter.

## Matching event

When dynamically updating the response state, sometimes you may want to do some processing when a method instance is matched, or you may want to obtain the matching method instance. `updateState` can also pass in a third parameter to set a matching event to achieve these purposes. .

```javascript
updateState(
  'todoList',
  todoListRaw => {
    // ...
  },
  {
    // Called when a method instance is matched, and the parameter is the matched method instance.
    onMatch: method => {
      // ...
    }
  }
);
```

## Notice

1. In actual use, whether you use `useRequest` or `useWatcher` to send a request, you can call the `send` function to specify different parameters to send the request repeatedly. The response status returned by these use hooks will be used by multiple method instances. Reference, so you can choose any method instance to match the same response status value;
2. When dynamically searching and updating the response status, the method instance matcher finds multiple method instances, and the first instance will prevail;
