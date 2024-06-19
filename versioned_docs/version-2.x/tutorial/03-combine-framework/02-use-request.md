---
title: Auto Manage States
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import EmbedSandpack from "@site/src/components/EmbedSandpack";

import useRequestVue from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/vueComposition-useRequest.zh.vue';
import useRequestReact from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/react-useRequest.zh.jsx';
import useRequestSvelte from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/svelte-useRequest.zh.svelte';
import useRequestVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/vueOptions-useRequest.zh.vue';

In enterprise-level projects, it is very important to display the transfer status of data in the view, which can let users clearly know what they want now. When the page obtains initial data or submits data, you can usually use useRequest to automatically manage the status of the request.

:::info reminder

Before using useRequest, make sure you have [set statesHook](/tutorial/combine-framework).

:::

## Get initialization data

useRequest represents the sending of a request. When called, a request will be sent by default.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={useRequestVue} editorHeight={400} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={useRequestReact} editorHeight={400} />

</TabItem>
<TabItem value="3" label="svelte">

<CodeBlock language="html">{useRequestSvelte}</CodeBlock>

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" style="options" mainFile={useRequestVueOptions} editorHeight={400} />

</TabItem>
</Tabs>

### Modify responsive data

You can also modify the reactive data created by `useRequest`.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// Directly modify the data value
data.value = {};

// Or modify it through the update function
update({
  data: {}
});
```

</TabItem>

<TabItem value="2" label="react">

In react, the returned status is directly usable data, so it needs to be modified through the `update` function.

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// Modify the data value through update
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

In svelte, the status returned by `useRequest` is of `writable` type.

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// Directly modify the data value
$data = {};
// or data.update(d => ({}));

// Or modify it through the update function
update({
  data: {}
});
```

</TabItem>
<TabItem value="4" label="vue options">

```javascript
export default {
  mixins: mapAlovaHook(function () {
    todo: useRequest(todoListGetter);
  }),
  methods: {
    handleModifyTodo() {
      // Directly modify the data value
      this.todo.data = {};

      // Or modify it through the update function
      this.todo.update({
        data: {}
      });
    }
  }
};
```

</TabItem>
</Tabs>

[When to use useRequest and when to send requests via `await alovaInstance.Get`](/tutorial/best-practice/skills).

### UseHook usage specifications

Please note that `useRequest` can only be used to send requests within the component. Outside the component, you can send requests directly through the method instance, and the use of `useRequest` needs to comply with the use hook usage rules, that is, it can only be called in the outermost layer of the function. .

**❌❌❌ It is not recommended to call** in a loop, conditional judgment or sub-function. For example, the following usage example in the click callback. When used in the callback function, although the request can be initiated normally, the response returned by use hook Formula data cannot be used in views, nor can it be used in loops and conditional judgments.

```javascript
// ❌ bad
const handleClick = () => {
  const { loading, data } = useRequest(getter);
};

// -------
// ✅ good
const { loading, data, send } = useRequest(getter, {
  immediate: false
});
const handleClick = () => {
  send();
};
```

## Manually send request

When you need to create a new todo item, you can first turn off the default send request, switch to manually triggering the request, and receive the `send` function in useRequest to send the request manually. The `send` function will return a Promise with response data instance, it will change to resolve state after request response.

At this time, in order to receive the parameters passed by the `send` function, you can set the first parameter of `useRequest` to a function. We call this function **method handler**.

```javascript
const {
  // ...
  // Manual sender request function, send the request after calling
  send: addTodo

  //The parameters of the send function will be received here
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // When immediate is false, it will not be emitted by default.
  immediate: false
});

// Manually send request
const handleAddTodo = () => {
  const newTodo = {
    title: 'New todo item',
    time: new Date().toLocaleString()
  };
  // The send function returns a Promise object that can receive response data
  addTodo(newTodo)
    .then(result => {
      console.log('The new todo item was added successfully, the response data is:', result);
    })
    .catch(error => {
      console.log('Failed to add todo item, error message is:', error);
    });
};
```

The `send` function allows you to freely make repeated requests.

> **[2.9.0+]** In react, the send function is wrapped using `useCallback`, and it is not restricted by closure traps. You can use it directly in events without worrying about causing performance problems.

## API

For complete API documentation, see [core useHooks](/api/core-hooks#userequest).
