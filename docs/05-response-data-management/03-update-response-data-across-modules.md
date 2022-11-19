---
title: Update response data across pages/modules
sidebar_position: 30
---

In the example in the previous section [Active Invalidate Response Cache] (../response-data-management/invalidate-response-cache ), when the user clicks on an item in the todo list, enter the todo details page and execute it At this time, we hope that the todo list data in the previous page will also be updated to the edited content. Using the methods of `useFetcher` and `invalidateCache` will re-initiate the request. Is there any method that does not require re-request?

Of course there is!

## General usage

```javascript
import { updateState } from 'alova';

// the todo item being edited
const editingTodo = {
  id: 1,
  title: 'todo1',
  time: '09:00'
};

const { send, onSuccess } = useRequest(createTodoPoster, { immediate: false });

// After the submission is successful, the todo data cache of the first page is fixed to be invalidated
onSuccess(() => {
  // highlight-start
  // After the submission is successful, the todo data data of the first page is fixedly modified
  // The first parameter is the Method instance, and the second is the callback function containing the original cached data, which needs to return the modified data
  updateState(getTodoList(1), todoList => {
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

:::caution note

1. When updating the state through `updateState`, if the cache (memory cache and persistent cache) is detected, it will also update the cache with new data.
2. Alova manages the status returned by the hook only when a request is initiated using useRequest and useWatcher. The reason is that the response status is generated and saved through a Method instance, but when no request is initiated, the url, Parameters such as params, query, headers, etc. are still uncertain.
   :::

## Advanced usage

Many times we have such a requirement. We hope that when the todo item is created silently, `updateState` is called immediately to update the data to display the new todo item immediately, and at the same time, we also hope to update the `id` again after the todo item is created. , at this point you can use [delayed data update](../next-step/delayed-data-update)
