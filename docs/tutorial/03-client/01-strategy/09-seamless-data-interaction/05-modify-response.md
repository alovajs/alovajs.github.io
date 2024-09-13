---
title: Step 2 - Adjust Response Handling
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the conservative request example in the previous section, we called `fetch` to re-fetch the refreshed page after creating, editing, and deleting requests for Todo items. In order to display the results immediately after the operation, we need to make the following adjustments:

1. Set the behavior mode of create, edit and delete requests to `silent`, they will trigger the success callback immediately when the request is made;
2. Manually update the list, instead of pulling data, use virtual data to occupy the response data of the server;
3. Save operation records for data compensation when refreshing the page;

## Set behavior mode

Set by configuring the parameter `behavior`, the optional parameters are `queue`, `silent`, `static`, or a function that returns behavior data to dynamically set the behavior mode, the default is `queue`.

The following sets the behavior parameters statically.

```javascript
useSQRequest(createOrEditTodo, {
  // highlight-start
  behavior: 'silent',
  // highlight-end
  immediate: false
});
```

The following is to dynamically set the behavior parameter.

```javascript
const { send } = useSQRequest(createOrEditTodo, {
  // highlight-start
  // The arg parameter can be passed in through the send function
  behavior: arg => {
    if (arg === 0) return 'silent';
    return 'queue';
  },
  // highlight-end
  immediate: false
});
```

> When behavior is set as a function, it will be called every time a request is initiated to determine which behavior to process this request.

## Silent queue description

After setting the behavior parameter to `queue` or `silent`, the request will enter the silent queue and wait for the request to be initiated. By default, they will enter the queue named `default`. You can also specify other queues to save silentMethod instances. without interfering with each other.

```javascript
useSQRequest(createOrEditTodo, {
  // highlight-start
  // The specified request information enters the queue named queue-2
  queue: 'queue-2',
  // highlight-end
  behavior: 'silent',
  immediate: false
});
```

## Manually update the list in the callback

### Update the list after adding/editing

<Tabs>
<TabItem value="1" label="Page is not destroyed">

When the list page is not destroyed, such as using the modal box operation on the current page, or using `<keep-alive>` (Vue) to keep the page components, the data will still exist. At this time, we use **updateStateEffect** to Update the list data. Compared with the **updateState** exported by alova, it has the function of tracking virtual data. When the response data is obtained, it will automatically track the virtual data in the list data and replace it with the actual data.

```javascript
import { useSQRequest, updateStateEffect } from 'alova/client';
import { createOrEditTodo, todoList } from './api.js';

const { onSuccess } = useSQRequest(createOrEditTodo, {
  behavior: 'silent',
  immediate: false,

  // highlight-start
  // Before processing list updates, it is necessary to construct virtual response data of the same structure according to the structure of the response data
  // For example, when creating a Todo item, the id of this piece of data will be returned.
  silentDefaultResponse: () => {
    return {
      id: '--'
    };
  }
  // highlight-end
});

// highlight-start
onSuccess(({ data, silentMethod }) => {
  // Construct list data items
  const editingItem = {
    ...detail,

    // When editing, use the original id, otherwise use the id in the response data
    // When submitting silently, data.id is virtual data, and when in static behavior mode, data.id is the actual id value
    id: id || data.id
  };

  // use updateStateEffect instead of updateState
  updateStateEffect(todoList(), todoListRaw => {
    if (id) {
      todoListRaw = todoListRaw.map(item => (item.id === id ? editingItem : item));
    } else {
      todoListRaw.unshift(editingItem);
    }
    return todoListRaw;
  });
});
// highlight-end
```

> updateStateEffect is used in the same way as [updateState](/tutorial/client/in-depth/update-across-components)

</TabItem>
<TabItem value="2" label="Page has been destroyed">

When the list page has been destroyed and the data has been released, such as jumping to a new page, use **setCache** to update the cache data. When the list page is returned, the request will be re-initiated and the updated cache will be hit.

```javascript
import { useSQRequest, setCache, equals } from 'alova/client';
import { createOrEditTodo, todoList } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') || '';
const { onSuccess } = useSQRequest(createOrEditTodo, {
   behavior: 'silent',
   immediate: false,

   // highlight-start
   // Before processing list updates, it is necessary to construct virtual response data of the same structure according to the structure of the response data
   // For example, when creating a Todo item, the id of this piece of data will be returned.
   silentDefaultResponse: () => {
     return {
       id: '--'
     };
   }
   // highlight-end
});
// highlight-start
onSuccess(({ data, silentMethod }) => {
   // Construct list data items
   const editingItem = {
     ...detail,

     // When editing, use the original id, otherwise use the id in the response data
     // When submitting silently, data.id is virtual data, and when in static behavior mode, data.id is the actual id value
     id: id || data.id
   };

   const method TodoList = todoList();
   setCache(methodTodoList, todoListRaw => {
     if (id) {
       todoListRaw = todoListRaw.map(item => (equals(item.id, id) ? editingItem : item));
     } else {
       todoListRaw.unshift(editingItem);
     }
     return todoListRaw;
   });
   // Call setUpdateState to set response data tracking, so as to achieve the same delayed update effect as updateStateEffect
   if (silentMethod) {
     silentMethod.setUpdateState(methodTodoList);
     silentMethod.save();
   }
});
// highlight-end
```

</TabItem>
</Tabs>

### Update list after removal

```javascript
import { useSQRequest, updateStateEffect } from 'alova/client';
import { deleteTodo, todoList } from './api.js';

const { loading, data, send, onSuccess } = useSQRequest(deleteTodo, {
  immediate: false,
  // highlight-start
  behavior: 'silent'
  // highlight-end
});

onSuccess(({ args: [deletingId] }) => {
  updateStateEffect(todoList(), todoListRaw =>
    todoListRaw.filter(item => item.id !== deletingId)
  );
});

// Event callback triggers delete request
const handleDelete = deletingId => {
  send(deletingId);
};
```

## Save the operation record

It is not enough to just update the list manually. We also need to consider that when the network is restored and there are still waiting requests in the request queue, the list data loaded at this time does not include the part of the unsubmitted request, which will cause certain problems for the user. Puzzled:

> "I have clearly added multiple pieces of data, why is it not in the list?"

Therefore, we need to record the operation and related data in the success callback, so that when the list data is loaded again, the uncommitted data will be manually compensated to the list, so that the list data will always be kept up-to-date.

Saving operation records is also very simple, you only need to mount the relevant data to the silentMethod instance, and it will be persisted along with the instance.

### create/edit success callback

```javascript
//...
onSuccess(({ silentMethod }) => {
  // Construct list data items
  const editingItem = {
    ...detail,
    id: id || data.id
  };
  //...
  // highlight-start
  if (silentMethod) {
    // Set the name for subsequent queries
    // If editingItem.id is virtual data will be automatically converted to its id
    silentMethod.entity.setName('edit' + editingItem.id);
    silentMethod.reviewData = {
      operate: id ? 'edit' : 'add',
      data: editingItem
    };
    silentMethod.save();
  }
  // highlight-end
});
```

### delete success callback

```javascript
//...
onSuccess(({ args: [deletingId], silentMethod }) => {
  //...
  // highlight-start
  if (silentMethod) {
    silentMethod.reviewData = {
      operate: 'delete',
      data: {
        id: deletingId
      }
    };
    silentMethod.save();
  }
  // highlight-end
});
```

### Precautions

1. In the onSuccess callback function, silentMethod has a value only in the `queue` and `silent` behavior modes;
2. Generally speaking, you can use `silentMethod.a = ...` or `silentMethod.b = ...` to save operation records, but it will report an error in typescript, so _reviewData_ is specially provided as a silent Submit the save attribute of the operation record;
3. After modifying the silentMethod data, you need to save the modification through `silentMethod.save()`;

The next step is to set retry parameters on silent submit requests.
