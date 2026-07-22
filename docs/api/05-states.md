---
title: Response Status Operation
---

## updateState

Manually update existing response data or extra states from any module or page.

**⚠️ Make sure the component is not destroyed**

`updateState` will search for the response status created by alova's useHooks when sending a request by default, but to prevent memory overflow, the destruction of a component will also recycle all the status created inside it. Therefore, when using `updateState`, make sure the container component that holds the response state you want to update is still mounted; otherwise the state cannot be found and the update fails.

This often happens when updating state across pages, because when navigating away, the previous page is usually destroyed without you noticing. If you want to update state across pages, here are two suggestions:

1. Keep the page component mounted so the updated state can still be found;

2. Use [setCache](/tutorial/cache/set-and-query) instead of `updateState`. When the previous page's request is cached, update its cache so that when the page is created again, the request hits the updated cache and produces the same result.

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

- `matcher`: A method instance.

- `handleUpdate`: An update function, or a collection of update functions. For a collection, the matching update function is called and its return value is used as the update result.

- **Return**

Whether the update succeeded (`true`/`false`).

- **Example**

Use `useRequest` in page or component A to send a request and receive the response data.

```ts
const { data } = useRequest(
  alova.Get('/api/user', {
    name: 'user'
  })
);
```

Use `updateState` in page or component B to update the response state.

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
