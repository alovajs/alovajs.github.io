---
title: Step 1 - Implement features with conservative requests
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Take Todo management as an example to realize the creation, editing, deletion and other functions of Todo in the non-sense interaction mode, and the key code related to the request will be provided in the following chapters.

> The [simple list page example](/example/silent-submit-simple-list) here contains the complete code, you can enter the experience.

In the `@alova/scene-*` js package, **useSQRequest** will be used to replace **useRequest** provided by alova, and then the most common conservative request mode will be implemented first, and then the process will be done step by step Interactive mode compatibility.

## Create an alova instance and related methods

```javascript title="api.js"
import { createAlova } from 'alova';

export const alovaInst = createAlova({
  /*...*/
});

/** Load todo list */
const todoList = () => alovaInst.Get('/todo');

/** Load todo details */
const todoDetail = id =>
  alovaInst.Get('/todo', {
    params: { id }
  });

/** Create and edit todo items */
const createOrEditTodo = (data, id) =>
  alovaInst.Post('/todo', {
    data,
    id
  });

/** Delete the todo item */
const deleteTodo = id => alovaInst.Delete('/todo', { id });
```

This part is the same as the [started chapter](/get-started/quick-start), and will not be repeated.

## Start the silent factory

```javascript title="main.js"
import { bootSilentFactory } from '@alova/scene-*';
import { alovaInst } from './api.js';

bootSilentFactory({
  alova: alovaInst
});
```

## Load the Todo list

Load and display page data in the simplest way

```javascript
import { useSQRequest } from '@alova/scene-vue';
import { todoList } from './api.js';
const { data, loading, error } = useSQRequest(todoList, {
  initialData: []
});
```

## Enter the Todo creation/editing page

When creating a todo item, the id is empty, and no request for obtaining details is sent. When editing a todo item, if the id has a value, the detailed data will be obtained.

```javascript
import { useSQRequest } from '@alova/scene-*';
import { todoDetail } from './api.js';

const id = /* todo id */;
const { loading, data } = useSQRequest(() => todoDetail(id), {
   initialData: {
     title: '',
     time: new Date()
   },
   immediate: !!id
});
```

## Create/Edit Todo Items

By submitting an event trigger request, after the submission is successful, call fetch to re-fetch the latest list data, and the interface will automatically display the latest data.

```javascript
import { useFetcher } from 'alova';
import { useSQRequest } from '@alova/scene-*';
import { createOrEditTodo, todoList } from './api.js';

const id = /* todo id */;
const { loading, data, send, onSuccess } = useSQRequest(createOrEditTodo, {
   immediate: false,
});

const { fetch } = useFetcher();
onSuccess(() => {
   // Re-fetch list data
   fetch(todoList);
})

// submit event callback function
const handleSubmit = newData => {
   send(newData, id);
};

```

## Delete Todo item

Delete the corresponding todo item by id

```javascript
import { useSQRequest } from '@alova/scene-*';
import { deleteTodo, todoList } from './api.js';

const { loading, data, send, onSuccess } = useSQRequest(deleteTodo, {
  immediate: false
});

const { fetch } = useFetcher();
onSuccess(() => {
  // Re-fetch list data
  fetch(todoList);
});

// Event callback triggers delete request
const handleDelete = deletingId => {
  send(deletingId);
};
```

So far, a simple Todo list management related request function has been completed, and then we will start to transform it to be compatible with the non-sense interaction mode.
