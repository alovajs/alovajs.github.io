---
title: Response Status Operation
---

## updateState

Manually update the existing response data or additional status under any module/page.

**⚠️ Make sure the component is not destroyed**

`updateState` will search for the response status created by alova's useHooks when sending a request by default, but to prevent memory overflow, the destruction of a component will also recycle all the status created inside it. Therefore, when using `updateState`, make sure that the container component corresponding to the response status you want to update is not destroyed, otherwise the corresponding response status will not be found and the update will fail.

This problem often occurs when updating state across pages, because when the page jumps, we tend to overlook that the previous page has been destroyed by default. Therefore, if you want to update the state across pages, here are two suggestions:

1. Persist the page components to ensure that the updated state can still be found;

2. Use [setCache](/tutorial/cache/set-and-query) instead of `updateState`. The principle is that when the request of the previous page is cached, update its cache to ensure that when the page is created again, the triggered request can hit the updated cache and achieve the same effect.

> Go to [Update response status across pages/modules](/tutorial/client/in-depth/update-across-components) for details.

> For managing additional states using updateState, please refer to [Extra state management](/tutorial/client/in-depth/manage-extra-states).

- **Type**

```ts
function updateState(
  matcher: Method,
  handleUpdate: UpdateStateCollection<Response>['data'] | UpdateStateCollection<Response>,
  options?: UpdateOptions
): boolean;
```

- **Parameter**

- `matcher`: The value is a method instance.

- `handleUpdate`: Update function or update function collection. If it is a function collection, the corresponding update function on the collection will be called and the return value will be used as the update result.

- **Return**

Whether the update is successful.

- **Example**

Use `useRequest` in page or component A to send a request and get the response data.

```ts
const { data } = useRequest(
  alova.Get('/api/user', {
    name: 'user'
  })
);
```

Use `updateState` in page or component B to update the response status.

```javascript
import { updateState } from 'alova';

// match by method instance
updateState(alova.Get('/api/user'), oldData => {
  return [
   ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ]
});

// match by method name
const methodSnapshot = alova.snapshots.match('user', true);
updateState(methodSnapshot, oldData => {
  return [
  ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ];
}

// match by regexp of method name
const methodSnapshot = alova.snapshots.match(/^us/, true);
updateState(methodSnapshot, oldData => {
  return [
  ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ];
})

// match by method matcher and filter
const methodSnapshot = alova.snapshots.match({
  name: 'user',
  filter(method, i, methods) {
    return methods.length === i + 1;
  }
}, true);
updateState(methodSnapshot, oldData => {
  return [
 ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ];
});
```
