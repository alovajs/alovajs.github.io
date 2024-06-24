---
title: Auto Manage States
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Strategy type

use hook

:::

useRequest indicates the sending of a request. By default, a request will be sent when it is called. In enterprise-level projects, it is very important to display the data transmission status in the view. When the page obtains initial data or submits data, useRequest is one of the most commonly used use hooks.

## Usage

Its basic usage has been introduced in detail in [Basic - Combining UI Framework](/next/tutorial/getting-started/basic/combine-framework).

### Set initial data

`data` defaults to `undefined` before the request is successful, but sometimes we need data to have an initial value before the request is successful. For example, when requesting a list, it usually needs to be initialized to `[]`, otherwise it will cause an error when rendering the view because it cannot be looped.

```javascript
const { data } = useRequest(todoListGetter, {
  // highlight-start
  // Initial value of data before request response
  initialData: []
  // highlight-end
});
```

You can also set `initialData` to a function to dynamically set the initial value. For example, if you don't want the Loading icon to be displayed every time the app is entered and want to use old data instead, you can return the old data as the initial value, which provides a better experience than Loading.

```js
const { data, loading, error } = useRequest(todoListGetter, {
  initialData() {
    // Set the last response data
    const storedData = localStorage.getItem('placeholder-data');
    return JSON.parse(storedData || '{}');

    // Also use alova's level2 storage adapter
    // return alovaInst.l2cache.get('placeholder-data');
  }
}).onSuccess(({ data, method }) => {
  // Save response data
  localStorage.setItem('placeholder-data', JSON.stringify(data));

  // Also use alova's level2 storage adapter
  // alovaInst.l2cache.set('placeholder-data', data);
});
```

### Do not send request immediately

Set `immediate` to `false` to avoid immediate request.

```javascript
const { data } = useRequest(todoListGetter, {
  // highlight-start
  immediate: false
  // highlight-end
});
```

### Force request

Force request refers to a mechanism that bypasses cache check to trigger request sending, which is useful when you need to get the latest data under certain conditions.

```javascript
useRequest(todoListGetter, {
  // highlight-start
  force: true
  // highlight-end
});
```

It can also be set to a function. When the function return value is `true`, the request is forced.

```javascript
useRequest(todoListGetter, {
  // highlight-start
  force: ({ method, sendArgs }) => {
    return !!sendArgs[0];
  }
  // highlight-end
});
```

### Send request manually

Set the first parameter of `useRequest` to a function.

```javascript
const {
  // ...
  // Function for manual sender request, call to send request
  // Parameters of send function will be received here
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // When immediate is false, it is not sent by default
  immediate: false
});

send({
  /* todo data */
});
```

The `send` function allows you to freely repeat the request.

> In react, the send function is wrapped with `useCallback`, and it is not restricted by closure traps. You can use it directly in events without worrying about performance issues.

In `useRequest` and `useWatcher`, we can call the `send` function to manually trigger requests. When the send function triggers a request, you can pass in any number of parameters, which can actually be received in the following 3 locations.

Calling `send` supports passing in any number of parameters, which can be received in the following 3 locations.

#### Received in method handler

When their first parameter is set to a callback function, it can be received, which is usually useful when deleting list items, as follows:

```javascript
const { send } = useRequest(id =>
  // id will receive 1
  removeTodoPoster(id)
);
send(1);
```

#### Received in event callback function

Received in the event callback function through `event.sendArgs`, which is an array containing all the parameters of the send function.

```javascript
const { send, onSuccess, onError, onComplete } = useRequest(newTodo =>
  alovaInstance.Post('/todo', newTodo)
);
onSuccess(event => {
  // sendArgs value is [1]
  console.log(event.sendArgs);
});
onError(event => {
  // sendArgs value is [1]
  console.log(event.sendArgs);
});
onComplete(event => {
  // sendArgs value is [1]
  console.log(event.sendArgs);
});

// Send request
send(1);
```

#### Received in force function

force is used to specify whether to penetrate the response cache. The content about response cache will be explained in the [cache mode](/next/tutorial/cache/mode) later.

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: event => {
    return event.sendArgs[0];
  }
});
send(1);
```

### Download and upload progress

Download and upload progress information can be obtained through `downloading` and `uploading`, and you can display the progress information directly in the view.

```javascript
const { downloading } = useRequest(alovaInstance.Get('/todo/downloadfile'));
const { uploading } = useRequest(alovaInstance.Get('/todo/uploadingfile'));
```

The data format of `downloading` and `uploading` is as follows:

```ts
export type Progress = {
  total: number;
  loaded: number;
};
```

### Abort request

Use useHook to receive `abort` for manual abort request.

```javascript
const {
  // ...
  // highlight-start
  // abort function is used to interrupt the request
  abort
  // highlight-end
} = useRequest(todoListGetter);

abort();
```

### Additional managed states

Set additional managed states, which can be updated across components. For details, please refer to [Additional managed states](/next/tutorial/client/in-depth/manage-extra-states).

### Middleware

The `useRequest` middleware can control almost all behaviors of a request, for example, you can use it to block requests.

```js
let allowRequest = false;
useRequest(todoListGetter, {
  middleware(ctx, next) {
    if (!allowRequest) {
      return;
    }
    return next();
  }
});
```

For details, please refer to [In-depth Client-Middleware](/next/tutorial/client/in-depth/middleware).

## API

Please refer to [API-useRequest](/next/api/core-hooks#userequest).
