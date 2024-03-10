---
title: 自动管理请求状态
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import EmbedSandpack from "@site/src/components/EmbedSandpack";

import useRequestVue from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/vueComposition-useRequest.zh.vue';
import useRequestReact from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/react-useRequest.zh.jsx';
import useRequestSvelte from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/svelte-useRequest.zh.svelte';
import useRequestVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/03-combine-framework/vueOptions-useRequest.zh.vue';

在企业级项目中，在视图中展示数据的传输状态非常重要，这可以让用户清晰地知道他们想要的内容现在怎么样了。在页面获取初始数据或提交数据时，通常可以使用**useRequest**来自动管理请求的状态。

:::info 提醒

在使用 useRequest 前，请确保已[设置 statesHook](/tutorial/combine-framework)。

:::

## 获取初始化数据

useRequest 表示一次请求的发送，调用时默认将发送一次请求。

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

### 修改响应式数据

你也可以修改`useRequest`创建的响应式数据。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 直接修改data值
data.value = {};

// 或者通过update函数修改
update({
  data: {}
});
```

</TabItem>

<TabItem value="2" label="react">

在 react 中，返回的状态是直接可使用的数据，因此需通过`update`函数来修改。

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 通过update修改data值
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

在 svelte 中，`useRequest`返回的状态为`writable`类型。

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 直接修改data值
$data = {};
// 或data.update(d => ({}));

// 或者通过update函数修改
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
      // 直接修改data值
      this.todo.data = {};

      // 或者通过update函数修改
      this.todo.update({
        data: {}
      });
    }
  }
};
```

</TabItem>
</Tabs>

[何时使用 useRequest ，何时通过`await alovaInstance.Get` 发送请求](/tutorial/best-practice/skills)。

### useHook 的使用规范

请注意，`useRequest`只能用于组件内发送请求，在组件外，你可以通过 method 实例直接发送请求，并且 `useRequest` 的使用需要符合 use hook 使用规则，即只能在函数最外层调用。

**❌❌❌ 不推荐在在循环、条件判断或者子函数中调用**，例如以下在 click 回调中的使用示例，在回调函数中使用时，虽然可以正常发起请求，但 use hook 返回的响应式数据无法在视图中使用，循环和条件判断中使用也是如此。

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

## 手动发送请求

当你需要创建一条新的 todo 项时，可以先关闭默认发送请求，转为手动触发请求，并在 useRequest 中接收`send`函数用于手动发送请求，`send`函数将返回带响应数据的 Promise 实例，它将在请求响应后改为 resolve 状态。

此时为了接收`send`函数传入参数，可以将`useRequest`的第一个参数设置为函数。

```javascript
const {
  // ...
  // 手动发送器请求的函数，调用后发送请求
  send: addTodo

  // 在这边将会接收到 send 函数的参数
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // 当immediate为false时，默认不发出
  immediate: false
});

// 手动发送请求
const handleAddTodo = () => {
  const newTodo = {
    title: '新的todo项',
    time: new Date().toLocaleString()
  };
  // send函数返回一个Promise对象，可接收响应数据
  addTodo(newTodo)
    .then(result => {
      console.log('新增todo项成功，响应数据为:', result);
    })
    .catch(error => {
      console.log('新增todo项失败，错误信息为:', error);
    });
};
```

`send`函数可以让你自由地重复发起请求。

> **[2.9.0+]** 在 react 中，send 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

## API

完整的 API 文档请查看[核心 useHooks](/api/core-hooks#userequest)。
