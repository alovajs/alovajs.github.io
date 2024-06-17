---
title: Cross components to trigger request
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info strategy type

middleware

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

In the past, if you want to trigger a request in another component in one component, you need to save the data in the Store and complete it by dispatching Action. Now, you can use this middleware to **remove the limitation of component hierarchy**, and quickly trigger any request action function in any component.

For example, after updating the menu data in a component, you can re-trigger the re-request of the side menu bar to refresh the data. When the list data is manipulated, the list update is triggered.

## Example

[Cross-component trigger request Demo](/tutorial/example/action-delegation-middleware)

## Features

- Delegate the action function of any use hook in alova;
- Trigger the delegated action function anywhere;

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```bash
# npm
npm install @alova/scene-vue --save
#yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
#yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
#yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## use

### Basic usage

> Take vue3 as an example, the usage is the same in react and svelte.

Use `actionDelegationMiddleware` in component A to delegate the action function of `useRequest`.

```javascript title=Component A
import { actionDelegationMiddleware } from '@alova/scene-vue';

useRequest(queryTodo, {
  //...
  middleware: actionDelegationMiddleware('actionName')
});
```

In any component (such as component B), pass in the specified delegate name through `accessAction` to trigger the action function of `useRequest` in component A.

```javascript title=Component B
import { accessAction } from '@alova/scene-vue';

accessAction('actionName', delegatedActions => {
  // Call the send function in component A
  delegatedActions.send();

  // Call the abort function in component A
  delegatedActions.abort();
});
```

:::info note

1. All use hooks in alova support action function delegation, but the functions delegated by different use hooks are different.
2. When using `actionDelegationMiddleware`, the delegate name can be passed in strings, numbers, and symbol values.

:::

### Batch trigger action function

In the above example, we use `accessAction` to trigger the action function of a use hook, but in fact, delegates with the same name will not override each other, but will be stored in a group, and we can use this name to trigger them at the same time The delegated function.

```javascript title=Component C
import { actionDelegationMiddleware } from '@alova/scene-vue';

useRequest(queryTodo, {
  //...
  middleware: actionDelegationMiddleware('actionName1')
});
```

```javascript title=Component D
import { actionDelegationMiddleware } from '@alova/scene-vue';

useRequest(queryTodo, {
  //...
  middleware: actionDelegationMiddleware('actionName1')
});
```

```javascript title=Component E
import { accessAction } from '@alova/scene-vue';

// Because the delegate hooks of component C and component D will be matched, the callback function will be executed twice
accessAction('actionName1', delegatedActions => {
  // Call the send function in component C and component D
  delegatedActions.send();

  // Call the abort function in component C and component D
  delegatedActions.abort();
});
```

At the same time, regular expressions can also be used in `accessAction` to trigger batches of action functions whose delegate names meet the conditions

```javascript title=Component F
import { actionDelegationMiddleware } from '@alova/scene-vue';

useRequest(queryTodo, {
  //...
  middleware: actionDelegationMiddleware('prefix_name1')
});
```

```javascript title=Component G
import { actionDelegationMiddleware } from '@alova/scene-vue';

useRequest(queryTodo, {
  //...
  middleware: actionDelegationMiddleware('prefix_name2')
});
```

```javascript title=Component H
import { accessAction } from '@alova/scene-vue';

// Because the delegate hooks of component F and component G will be matched, the callback function will be executed twice
accessAction(/^prefix_/, delegatedActions => {
  // Call the send function in component F and component G
  delegatedActions.send();

  // Call the abort function in component F and component G
  delegatedActions.abort();
});
```

## Action function delegation list

Although the action functions delegated by most hooks are the same as the action functions themselves, this is not absolute. The following is the action function delegation list of each hook.

### useRequest

| name   | description                                             | function parameters | return value | version |
| ------ | ------------------------------------------------------- | ------------------- | ------------ | ------- |
| send   | Same as [useRequset](/api/core-hooks#userequest).send   |                     |              | -       |
| abort  | Same as [useRequset](/api/core-hooks#userequest).abort  |                     |              | -       |
| update | Same as [useRequset](/api/core-hooks#userequest).update |                     |              | -       |

### useWatcher

Same as [useRequest delegate list](#userequest).

### useFetcher

| name   | description                                             | function parameters | return value | version |
| ------ | ------------------------------------------------------- | ------------------- | ------------ | ------- |
| fetch  | Same as [useFetcher](/api/core-hooks#usefetcher).fetch  |                     |              | -       |
| abort  | Same as [useFetcher](/api/core-hooks#usefetcher).abort  |                     |              | -       |
| update | Same as [useFetcher](/api/core-hooks#usefetcher).update |                     |              | -       |

### usePagination

| name     | description                                                                            | function parameters                                                                | return value                               | version |
| -------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| refresh  | For details, see [usePagination action function](/tutorial/strategy/usePagination#api) |                                                                                    |                                            | -       |
| insert   | For details, see [usePagination action function](/tutorial/strategy/usePagination#api) |                                                                                    |                                            | -       |
| remove   | For details, see [usePagination action function](/tutorial/strategy/usePagination#api) |                                                                                    |                                            | -       |
| replace  | For details, see [usePagination action function](/tutorial/strategy/usePagination#api) |                                                                                    |                                            | -       |
| reload   | For details, see [usePagination action function](/tutorial/strategy/usePagination#api) |                                                                                    |                                            | -       |
| update   | For details, see [usePagination action function](/tutorial/strategy/usePagination#api) |                                                                                    |                                            | -       |
| getState | Get paging related data by name                                                        | stateKey: 'page' \| 'pageSize' \| 'data' \| 'pageCount' \| 'total' \| 'isLastPage' | Corresponding to the value of the statekey | -       |

### useSQRequest

Same as [useRequest delegate list](#userequest).

### useForm

| name       | description                                                                | function parameters | return value | version |
| ---------- | -------------------------------------------------------------------------- | ------------------- | ------------ | ------- |
| updateForm | For details, see [useForm action function](/tutorial/strategy/useForm#api) |                     |              | -       |
| reset      | For details, see [useForm action function](/tutorial/strategy/useForm#api) |                     |              | -       |
| send       | Same as [useRequset](/api/core-hooks#userequest).send                      |                     |              | -       |
| abort      | Same as [useRequset](/api/core-hooks#userequest).abort                     |                     |              | -       |
| update     | Same as [useRequset](/api/core-hooks#userequest).update                    |                     |              | -       |

### useCaptcha

Same as [useRequest delegate list](#userequest).

### useRetriableRequest

| name   | description                                                                                       | function parameters | return value | version |
| ------ | ------------------------------------------------------------------------------------------------- | ------------------- | ------------ | ------- |
| stop   | See [useRetriableRequest action function](/tutorial/strategy/useRetriableRequest#api) for details |                     |              | -       |
| send   | Same as [useRequset](/api/core-hooks#userequest).send                                             |                     |              | -       |
| abort  | Same as [useRequset](/api/core-hooks#userequest).abort                                            |                     |              | -       |
| update | Same as [useRequset](/api/core-hooks#userequest).update                                           |                     |              | -       |

### useSerialRequest

Same as [useRequest delegate list](#userequest).

### useSerialWatcher

Same as [useRequest delegate list](#userequest).
