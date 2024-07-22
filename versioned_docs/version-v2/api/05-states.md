---
title: Response states operation
---

## updateState

Manually update existing response data or additional status under any module/page.

**⚠️ Please make sure the component is not destroyed**

By default, `updateState` will look for the response state created by alova's useHooks when sending a request, but to prevent memory overflow, the destruction of a component will also recycle all the states created internally, so please make sure you use `updateState` It is hoped that the container component corresponding to the updated response status has not been destroyed, otherwise the corresponding response status will not be found and the update will fail.

This problem often occurs when updating status across pages, because what we tend to overlook when the page jumps is that the previous page has been destroyed by default. Therefore, if you want to update status across pages, here are two suggestions :

1. Persist the page components to ensure that the updated status can still be found;
2. Use [setCache](/v2/tutorial/cache/set-and-query) instead of `updateState`. The principle is that when the request for the previous page exists in the cache, update its cache to ensure that when the page is created again, the The request can hit the updated cache to achieve the same effect.

> Go to [Cross-page/module update response states](/v2/tutorial/advanced/update-across-components) for details.

> To use updateState to manage extra states, please refer to [Extra State Management](/v2/tutorial/advanced/manage-extra-states).

- **type**

```ts
type MethodFilter =
  | string
  | RegExp
  | {
      name?: string | RegExp;
      filter?: MethodFilterHandler;
      alova?: Alova<any, any, any, any, any>;
    };
function updateState(
  matcher: Method | MethodFilter,
  handleUpdate: UpdateStateCollection<Response>['data'] | UpdateStateCollection<Response>,
  options?: UpdateOptions
): boolean;
```

- **Parameters**

- `matcher`: The value is method instance, method name string, method name regular expression, it can also be set to [method instance matcher](/v2/tutorial/advanced/method-matcher), if it matches the qualified method, `handleUpdate` will be called.
- `handleUpdate`: update function or update function collection. If it is a function collection, the corresponding update function on the collection will be called and the return value will be used as the update result.
- `options`: optional options.

| Parameter name | Type     | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| onMatch        | Function | After matching method, the function will be called |

- **return**

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

Use `updateState` in page or component B to update the response state.

```ts
import { updateState } from 'alova';

// Match by method instance
updateState(alova.Get('/api/user'), oldData => {
   return [
    ...oldData,
     {
       id: 10000,
       name: 'Alova',
     },
   ]
});

// Match by method name
updateState('user', oldData => {
   return [
   ...oldData,
     {
       id: 10000,
       name: 'Alova',
     },
   ];
}

// Regular matching through method name
updateState(/^us/, oldData => {
   return [
   ...oldData,
     {
       id: 10000,
       name: 'Alova',
     },
   ];
})

// Match through method instance matcher
updateState({
   name: 'user',
   filter(method, i, methods) {
     return methods.length === i + 1;
   }
}, oldData => {
   return [
  ...oldData,
     {
       id: 10000,
       name: 'Alova',
     },
   ];
});
```
