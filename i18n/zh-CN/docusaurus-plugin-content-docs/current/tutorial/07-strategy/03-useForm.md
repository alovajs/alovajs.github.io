---
title: 表单提交策略
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

为表单提交而设计的 hook，通过此 hook 你可以很方便地实现表单草稿、多页面（多步骤）表单，除此以外还提供了表单重置等常用功能。

## 示例

[表单提交 Demo](../example/form-hook)

## 特性

- ✨ 表单草稿；
- ✨ 多页面（多步骤）表单；
- ✨ 表单提交自动重置数据；
- ✨ 手动重置表单数据；

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```bash
# npm
npm install @alova/scene-vue --save
# yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
# yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
# yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## 使用

### 基本用法

展示表单 hook 的基本使用。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <input v-model="form.name" />
  <select v-model="form.cls">
    <option value="1">class 1</option>
    <option value="2">class 2</option>
    <option value="3">class 3</option>
  </select>
  <button
    @click="handleSubmit"
    :loading="submiting">
    提交
  </button>
</template>

<script setup>
  import { formSubmit } from './api.js';
  import { useForm } from '@alova/scene-vue';

  const {
    // 提交状态
    loading: submiting,

    // 响应式的表单数据，内容由initialForm决定
    form,

    // 提交数据函数
    send: submit,

    // 提交成功回调绑定
    onSuccess,

    // 提交失败回调绑定
    onError,

    // 提交完成回调绑定
    onComplete
  } = useForm(
    formData => {
      // 可以在此转换表单数据并提交
      return submitData(formData);
    },
    {
      // 初始化表单数据
      initialForm: {
        name: '',
        cls: '1'
      }
    }
  );

  // 提交表单数据
  const handleSubmit = () => {
    // 验证表单数据...
    submit();
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { formSubmit } from './api.js';
import { useForm } from '@alova/scene-react';

const App = () => {
  const {
    // 提交状态
    loading: submiting,

    // 响应式的表单数据，内容由initialForm决定
    form,

    // 提交数据函数
    send: submit,

    // 更新表单项
    updateForm,

    // 提交成功回调绑定
    onSuccess,

    // 提交失败回调绑定
    onError,

    // 提交完成回调绑定
    onComplete
  } = useForm(
    formData => {
      // 可以在此转换表单数据并提交
      return submitData(formData);
    },
    {
      // 初始化表单数据
      initialForm: {
        name: '',
        cls: '1'
      }
    }
  );

  // 提交表单数据
  const handleSubmit = () => {
    // 验证表单数据...
    submit();
  };

  return (
    <div>
      <input
        value={form.name}
        onChange={({ target }) => updateForm({ name: target.value })}
      />
      <select
        value={form.cls}
        onChange={({ target }) => updateForm({ cls: target.value })}>
        <option value="1">class 1</option>
        <option value="2">class 2</option>
        <option value="3">class 3</option>
      </select>
      <button
        onClick={handleSubmit}
        loading={submiting}>
        提交
      </button>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { formSubmit } from './api.js';
  import { useForm } from '@alova/scene-svelte';

  const {
    // 提交状态
    loading: submiting,

    // 响应式的表单数据，内容由initialForm决定
    form,

    // 提交数据函数
    send: submit,

    // 提交成功回调绑定
    onSuccess,

    // 提交失败回调绑定
    onError,

    // 提交完成回调绑定
    onComplete
  } = useForm(
    formData => {
      // 可以在此转换表单数据并提交
      return submitData(formData);
    },
    {
      // 初始化表单数据
      initialForm: {
        name: '',
        cls: '1'
      }
    }
  );

  // 提交表单数据
  const handleSubmit = () => {
    // 验证表单数据...
    submit();
  };
</script>

<input bind:value="{$form.name}" />
<select bind:value="{$form.cls}">
  <option value="1">class 1</option>
  <option value="2">class 2</option>
  <option value="3">class 3</option>
</select>
<button
  on:click="{handleSubmit}"
  loading="{$submiting}">
  提交
</button>
```

</TabItem>
</Tabs>

`useForm`默认不会请求，在调用`send`后才会发出请求，同时在`useForm`的回调函数将传入最新的 form 数据，如果需要在提交前转换数据，可在此进行转换，也可以在`formSubmit`函数中转换。

:::caution 注意

1. `initialForm`是设置初始表单数据，`initialData`是设置初始响应数据，注意区分；
2. `updateForm`是更新表单数据，`update`是更新响应数据，注意区分；

:::

以上示例只展示了简单的表单提交功能，普通的表单提交没有差别，但`useForm`还实现了更多的实用功能，让我们继续往下看。

### 提交自动重置表单

很多时候，我们都需要在表单提交后重置表单数据，在自行实现时我们总是需要手动一个一个重新赋值，而`useForm`可以帮我们自动完成。

```javascript
useForm(submitData, {
  // ...
  // highlight-start
  // 设置这个参数为true即可在提交完成后自动重置表单数据
  resetAfterSubmiting: true
  // highlight-end
});
```

如果你需要手动重置表单数据，也可以通过调用`reset`函数做到。

```javascript
const {
  // highlight-start
  // 表单重置函数
  reset
  // highlight-end
} = useForm(submitData, {
  // ...
});

// highlight-start
const handleReset = () => {
  reset();
};
// highlight-end
```

### 表单草稿

`useForm`还提供了表单草稿功能，在数据重置前即使刷新页面也可以恢复表单数据，其原理是使用 alova 实例上的存储适配器，将表单数据进行持久化。使用时只需要将`store`设置为 true 即可。

```javascript
useForm(submitData, {
  // ...
  // highlight-start
  // 开启持久化保存数据，设置为true后将实时持久化未提交的数据
  store: true
  // highlight-end
});
```

数据持久化前将会调用`JSON.stringify`转换为 JSON 字符串，在默认情况下，表单数据在持久化保存时将会进行数据序列化，`useForm`内置了`Date`和`RegExp`实例的序列化，这在使用时间选择器时将很有用。

在表单数据只涉及到`Date`和`RegExp`实例时你无需进行更多操作，但如果有其他非 JSON 数据时，例如`moment`实例，我们需要自定义序列化器，不过别担心，自定义序列化器很简单，以下将展示设置一个`moment`序列化器。

```javascript
import moment from 'moment';
const momentSerializer = {
  // forward在序列化时被调用
  // 需要判断是否为moment实例，如果不是目标值则返回undefined，表示不处理它
  forward: data => moment.isMoment(data) ? data.valueOf() : undefined,

  // backward在反序列化时被调用，data为forward中返回的值
  backward: timestamp => moment(timestamp);
};

useForm(
  submitData,
  {
    store: {
      enable: true,
      serializers: {
        moment: momentSerializer
      }
    }
  }
);
```

### 多页面/多步骤表单

很多时候我们会遇到表单项分为了多个页面，或多个步骤进行填写，并在最后统一提交的情况，例如多步骤的用户注册、填写问卷等，以及多个步骤的表单可能有相互依赖关系，如果自行实现将会带来一定麻烦。而`useForm`实现了表单数据共享，你可以在不同的页面或组件中获取到同一份表单数据，解决了多步骤表单数据依赖的问题，也不需要在提交时汇总表单数据，可直接提交。

使用时，你需要通过`useForm`设置 id，通过相同的 id 你可以在不同页面间共享同一份表单数据。例如我们有一个表单需要经过 3 个步骤填写表单，它们分别会经过组件 A、组件 B、组件 C。

```
组件A -> 组件B -> 组件C
```

此时，我们可以在组件 A 内初始化表单数据：

```javascript title=组件A
const returnStates = useForm(submitData, {
  initialForm: {
    step1Input: '',
    step2Input: '',
    step3Input: ''
  },
  // highlight-start
  id: 'testForm'
  // highlight-end
});
const { form, send } = returnStates;
```

在组件 B、组件 C 中可直接在第一个参数中传入 id，获取组件 A 内的共享数据。

```javascript title=组件B、组件C
const returnStates = useForm('testForm');
const { form, send } = returnStates;
```

组件 B、C 内通过 id 返回的 `returnStates` 与组件 A 内的 `returnStates` 是相同的引用，你可以使用同一个 `form`，也可以在任意一个组件内调用 `send` 统一提交表单数据。

**额外的**

在组件 B、C 中直接指定 id 的方式获取共享数据时，这个 id 必须先初始化表单数据，就像在组件 A 中那样，否则将会抛出`the form data of id {1} is not initial`错误。如果你的多步骤表单并不是按一定顺序，而是根据一定条件随机顺序的，例如：

```bash
# 可能的顺序1
组件B -> 组件A -> 组件C

# 可能的顺序2
组件A -> 组件C -> 组件B

# 可能的顺序3
组件C -> 组件A -> 组件B

# ...
```

在这种情况下，你可以在组件 B、C 中像组件 A 一样使用`useForm`。

```javascript title=组件B、组件C
const returnStates = useForm(submitData, {
  initialForm: {
    step1Input: '',
    step2Input: '',
    step3Input: ''
  },
  id: 'testForm'
});
```

这样无论先渲染哪个组件都可以对 id 为 testForm 的表单初始化，后面的组件在遇到 id 为 testForm 时将优先使用已初始化的表单数据，而不会再次初始化。这样你就可以在任意组件内初始化表单数据。

> 更详细的多步骤表单也可以在[表单提交 Demo](../example/form-hook)中体验和查看。

### 条件筛选

`useForm`还可以用于对数据筛选场景所用到的筛选表单，例如你希望通过城市名搜索城市信息，你可以设置`immedidate=true`，它将会在初始化时就开始查询数据，在之后的操作中再调用`send`重复查询数据。

```javascript
const { send: searchData } = useForm(queryCity, {
  initialForm: {
    cityName: ''
  },
  immediate: true
});
```

:::caution 条件限制

在条件筛选场景下，`useForm`更适用于非分页的列表条件查询，如果你需要在分页列表中进行条件查询，建议使用 [分页请求策略(usePagination)](../strategy/usePagination)。

:::

## API

### Hook 配置

继承[**useRequest**](../learning/use-request#api)所有配置。

| 名称                | 描述                                                                                                     | 类型                                                  | 默认值 | 版本 |
| ------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------ | ---- |
| initialForm         | 初始表单数据                                                                                             | any                                                   | -      | -    |
| id                  | form id，相同 id 的 data 数据是同一份引用，可以用于在多页表单时共用同一份表单数据。单页表单不需要指定 id | string&#124;number                                    | -      | -    |
| store               | 是否持久化保存数据，设置为 true 后将实时持久化未提交的数据                                               | boolean&#124; [StoreDetailConfig](#storedetailconfig) | false  | -    |
| resetAfterSubmiting | 提交后重置数据                                                                                           | boolean                                               | false  | -    |

### 响应式数据

继承[**useRequest**](../learning/use-request#api)所有响应式数据。

| 名称 | 描述                          | 类型 | 版本 |
| ---- | ----------------------------- | ---- | ---- |
| form | 表单数据，由 initialForm 决定 | any  | -    |

#### StoreDetailConfig

| 名称        | 描述                                                                                                                                                            | 类型                                                          | 默认值   | 版本 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------- | ---- |
| enable      | 是否启用持久化数据                                                                                                                                              | boolean                                                       | required | -    |
| serializers | 自定义序列化器的集合，内置的序列化器：<br/>1. date 序列化器用于转换日期<br/>2. regexp 序列化器用于转化正则表达式<br/>可以通过设置同名序列化器来覆盖内置序列化器 | Record<string&#124;number, [DataSerializer](#dataserializer)> | -        | -    |

#### DataSerializer

| 名称     | 描述                                                                                                  | 类型                                        | 默认值   | 版本 |
| -------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------- | ---- |
| forward  | 序列化函数，forward 中序列化时需判断是否为指定的数据，并返回转换后的数据，否则返回 undefined 或不返回 | (data: any) => any&#124;undefined&#124;void | required | -    |
| backward | 反序列化函数，直接反序列化数据                                                                        | (data: any) => any&#124;undefined&#124;void | required | -    |

### 操作函数

继承[**useRequest**](../learning/use-request#api)所有操作函数。

| 名称       | 描述                                       | 函数参数                                                                       | 返回值 | 版本 |
| ---------- | ------------------------------------------ | ------------------------------------------------------------------------------ | ------ | ---- |
| updateForm | 更新一项或多项表单数据                     | newForm: Partial&lt;F&gt; &#124; (oldForm: F) => F)<br/> F 为`initialForm`类型 | -      | -    |
| reset      | 重置为初始化数据，如果有持久化数据也会清空 | -                                                                              | -      | -    |

### 事件

继承[**useRequest**](../learning/use-request#api)所有事件。

| 名称      | 描述                 | 回调参数 | 版本 |
| --------- | -------------------- | -------- | ---- |
| onRestore | 持久化数据恢复后触发 | -        | -    |
