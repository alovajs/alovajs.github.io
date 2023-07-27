---
title: 状态变化请求
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在一些需要随数据变化而重新请求的场景下，如分页、数据筛选、模糊搜索，可以使用`useWatcher` 来监听指定的状态变化时立即发送请求。

## 关键字搜索

接下来我们以搜索 todo 项为例。
<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <!-- keyword随着输入内容变化而变化 -->
  <input v-model="keyword" />

  <!-- 渲染筛选后的todo列表 -->
  <div v-if="loading">Loading...</div>
  <template v-else>
    <div v-for="todo in data">
      <div class="todo-title">{{ todo.title }}</div>
      <div class="todo-time">{{ todo.time }}</div>
    </div>
  </template>
</template>

<script setup>
  // 创建method实例
  const filterTodoList = keyword => {
    return alovaInstance.Get('/todo/list/search', {
      params: {
        keyword
      }
    });
  };
  const keyword = ref('');
  const {
    loading,
    data,
    error

    // 第一个参数必须为返回method实例的函数
  } = useWatcher(
    () => filterTodoList(keyword.value),

    // 被监听的状态数组，这些状态变化将会触发一次请求
    [keyword],
    {
      // 设置500ms防抖，如果keyword频繁变化，只有在停止变化后500ms才发送请求
      debounce: 500
    }
  );
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
// 创建method实例
const filterTodoList = keyword => {
  return alovaInstance.Get('/todo/list/search', {
    params: {
      keyword
    }
  });
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const {
    loading,
    data,
    error
    // 第一个参数必须为返回method实例的函数
  } = useWatcher(
    () => filterTodoList(keyword),

    // 被监听的状态数组，这些状态变化将会触发一次请求
    [keyword],
    {
      // 设置500ms防抖，如果keyword频繁变化，只有在停止变化后500ms才发送请求
      debounce: 500
    }
  );

  return (
    <>
      {/* keyword随着输入内容变化而变化 */}
      <input
        value={keyword}
        onInput={e => setKeyword(e.target.value)}
      />

      {/* 渲染筛选后的todo列表 */}
      {loading ? <div>Loading...</div> : null}
      {!loading ? (
        <>
          {data.map(todo => (
            <div>
              <div class="todo-title">{todo.title}</div>
              <div class="todo-time">{todo.time}</div>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';

  // 创建method实例
  const filterTodoList = text => {
    return alovaInstance.Get('/todo/list/search', {
      params: {
        keyword: text
      }
    });
  };
  const keyword = writable('');

  const {
    loading,
    data,
    error

    // 第一个参数必须为返回method实例的函数
  } = useWatcher(
    () => filterTodoList($keyword),

    // 被监听的状态数组，这些状态变化将会触发一次请求
    [keyword],
    {
      // 设置500ms防抖，如果keyword频繁变化，只有在停止变化后500ms才发送请求
      debounce: 500
    }
  );

  const updateKeyword = e => {
    $keyword = e.target.value;
  };
</script>
<!-- keyword随着输入内容变化而变化 -->
<input
  value="{$keyword}"
  on:input="{updateKeyword}" />

<!-- 渲染筛选后的todo列表 -->
{#if $loading}
<div>Loading...</div>
{:else} {#each $data as todo}
<div>
  <div class="todo-title">{ todo.title }</div>
  <div class="todo-time">{ todo.time }</div>
</div>
{/each} {/if}
```

</TabItem>
</Tabs>

## 分页

以 todo 列表分页请求为例，你可以这样做。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <!-- ... -->
</template>

<script setup>
  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const currentPage = ref(1);
  const {
    loading,
    data,
    error

    // 第一个参数为返回method实例的函数，而非method实例本身
  } = useWatcher(
    () => getTodoList(currentPage.value),
    // 被监听的状态数组，这些状态变化将会触发一次请求
    [currentPage],
    {
      // ⚠️调用useWatcher默认不触发，注意和useRequest的区别
      // 手动设置immediate为true可以初始获取第1页数据
      immediate: true
    }
  );
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';

// method实例创建函数
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    data,
    error

    // 第一个参数为返回method实例的函数，而非method实例本身
  } = useWatcher(
    () => getTodoList(currentPage),
    // 被监听的状态数组，这些状态变化将会触发一次请求
    [currentPage],
    {
      // ⚠️调用useWatcher默认不触发，注意和useRequest的区别
      // 手动设置immediate为true可以初始获取第1页数据
      immediate: true
    }
  );

  return {
    /* ... */
  };
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';

  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const currentPage = writable(1);
  const {
    loading,
    data,
    error

    // 第一个参数为返回method实例的函数，而非method实例本身
  } = useWatcher(
    () => getTodoList($currentPage),
    // 被监听的状态数组，这些状态变化将会触发一次请求
    [currentPage],
    {
      // ⚠️调用useWatcher默认不触发，注意和useRequest的区别
      // 手动设置immediate为true可以初始获取第1页数据
      immediate: true
    }
  );
</script>

<!-- ... -->
```

</TabItem>
</Tabs>

## 手动发送请求

有时候你希望在监听状态未变化时重新发送请求（如服务端数据已更新），你也可以通过`send`函数手动触发请求，用法和`useRequest`相同。

```javascript
const {
  // ...
  // highlight-start
  send
  // highlight-end
} = useWatcher(
  () => getTodoList($currentPage),
  // 被监听的状态数组，这些状态变化将会触发一次请求
  [currentPage],
  {
    immediate: true
  }
);

// highlight-start
send();
// highlight-end
```

> `[2.9.0+]`在 react 中，send 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

## 强制发送请求

缓存数据可以很好地提升应用流畅性和减小服务端压力，但同时也存在着数据过期的问题，当你希望穿透缓存获取最新数据时，在 use hooks 的配置中设置`force`属性可以帮助你。

### 设置静态值

force 默认为 false，设置为 true 时将每次穿透缓存，并发送请求

```javascript
useWatcher(
  () => alovaInstance.Get('/todo'),
  [
    /* watchingStates */
  ],
  {
    force: true
  }
);
```

### 动态设置 force 值

实际情况中，我们经常需要根据不同情况来设置是否需要强制发送请求，此时可以将 force 设置为一个函数，此函数可通过 send 函数传入。

```javascript
const { send } = useWatcher(
  alovaInstance.Get('/todo'),
  [
    /* watchingStates */
  ],
  {
    force: id => {
      return !!id;
    }
  }
);
send(1);
```

## send 函数参数传递规则

在上面的示例中，调用 send 函数手动触发请求，它可以接受任意多个参数，这些参数将分别被以下 4 个函数接收：

### useWatcher 回调函数

useWatcher 的回调函数可接收到，具体如下：

```javascript
const { send } = useWatcher(currentPage => getTodoList(currentPage));
send(1); // 上面回调函数中的currentPage将接收到1
```

### 在 onSuccess、onError、onComplete 回调函数中接收

onSuccess、onError、onComplete 回调函数中的`event.sendArgs`以数组形式接收

```javascript
const { send, onSuccess, onError, onComplete } = useWatcher(currentPage => getTodoList(currentPage));
onSuccess(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
onError(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
onComplete(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
send(1);
```

### 在 force 函数中接收

```javascript
const { send } = useWatcher(
  alovaInstance.Get('/todo'),
  [
    /* watchingStates */
  ],
  {
    force: id => {
      return !!id;
    }
  }
);
send(1);
```

## 设置初始响应数据

一个页面在获取到初始数据前，不可避免地需要等待服务端响应，在响应前一般需要先将状态初始化为一个空数组或空对象，以免造成页面报错，我们可以在`useWatcher`中的第二个参数实现初始数据的设置。

```javascript
// 在useWatcher中同样可以设置data的初始值
const {
  // 响应前data的初始值为[]，而不是undefined
  data
} = useWatcher(
  () => getTodoList(/* 参数 */),
  [
    /* 监听状态 */
  ],
  {
    initialData: []
  }
);
```

## 请求防抖

通常我们都会在频繁触发的事件层面编写防抖代码，这次我们在请求层面实现了防抖功能，这意味着你再也不用在模糊搜索功能中自己实现防抖了，用法也非常简单。
:::info Tips：什么是函数防抖
函数防抖（debounce），就是指触发事件后，在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间（在这里和函数节流区分一下，函数节流是在触发完事件之后的一段时间之内不能再次触发事件）
:::

### 设置所有监听状态的防抖时间

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // 设置debounce为数字时表示为所有监听状态的防抖时间，单位为毫秒
  // 如这边表示当状态keyword、date的一个或多个变化时，将在500ms后才发送请求
  debounce: 500
  // highlight-end
});
```

### 为单个监听状态设置防抖时间

很多场景下，我们只需要对某几个频繁变化的监听状态进行防抖，如文本框的`onInput`触发的状态变化，可以这样做：

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // 以监听状态的数组顺序分别设置防抖时间，0或不传表示不防抖
  // 这边监听状态的顺序是[keyword, date]，防抖数组设置的是[500, 0]，表示只对keyword单独设置防抖
  debounce: [500, 0]
  // 也可以这么按如下设置:
  // debounce: [500],
  // highlight-end
});
```

## 手动修改状态值

在 alova 中，通过`useWatcher`返回的`data`、`loading`、`error`等各项状态是允许自定义修改的，这在一些情况下将变得很方便。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
const watchingState = ref('');
const { data, loading, error } = useWatcher(todoListGetter, [watchingState]);

// ...
// 直接修改data值
data.value = {};
```

</TabItem>

<TabItem value="2" label="react">

在 react 中，返回的状态是直接可使用的数据，因此需通过`update`函数来修改。

```javascript
const [watchingState, setWatchingState] = useState('');
const { data, loading, error, update } = useWatcher(todoListGetter, [watchingState]);

// ...
// 通过update修改data值
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

在 svelte 中，`useWatcher`返回的状态为`writable`类型。

```javascript
const watchingState = writable('');
const { data, loading, error } = useWatcher(todoListGetter, [watchingState]);

// ...
// 直接修改data值
$data = {};
// 或data.update(d => ({}));
```

</TabItem>
</Tabs>

:::caution 注意事项

1. 自定义修改的值将会被`useWatcher`内部的状态管理机制覆盖，如当你修改了`data`值，再次请求后`data`值将被赋值为最新的响应数据；
2. 通过直接修改的状态值不会同步修改缓存数据，如需要同步修改缓存数据，建议使用[updateState](../learning/update-response-data-across-modules)

:::

## 手动中断请求

未设置`timeout`参数时请求是永不超时的，如果需要手动中断请求，可以在`useWatcher`函数被调用时接收`abort`方法。

```javascript
const {
  // ...
  // highlight-start
  // abort函数用于中断请求
  abort
  // highlight-end
} = useWatcher(() => filterTodoList(keyword), [keyword]);

// highlight-start
// 调用abort即可中断请求
const handleCancel = () => {
  abort();
};
// highlight-end
```

> `[2.9.0+]`在 react 中，abort 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

`[2.6.2+]`另外，这个`abort`函数也会同时绑定到当前的 method 实例上，因此你还可以在`beforeRequest`中调用`abort`中断请求。

```javascript
const alovaInst = createAlova({
  // ...
  beforeRequest(method) {
    if (someCondition) {
      method.abort();
    }
  }
});
```

## API

### Hook 配置

| 名称          | 描述                                                                       | 类型                                                                                                                                                                                  | 默认值   | 版本 |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- | --- |
| immediate     | 是否立即发起请求                                                           | boolean                                                                                                                                                                               | true     | -    |
| initialData   | 初始的 data 值，在首次响应前 data 值为初始值，未设置时为`undefined`        | any                                                                                                                                                                                   | -        | -    |
| force         | 是否强制请求，可设置为函数动态返回 boolean 值                              | boolean &#124; (...args: any[]) => boolean                                                                                                                                            | false    | -    |
| managedStates | 额外的监管状态，可通过 updateState 更新                                    | Record&lt;string &#124; number &#124; symbol, any&gt;                                                                                                                                 | -        | -    |
| debounce      | 请求防抖时间（毫秒），传入数组时可按 watchingStates 的顺序单独设置防抖时间 | number                                                                                                                                                                                | number[] | -    | -   |
| middleware    | 中间件函数，[了解 alova 中间件](../advanced/middleware)                    | (context: [AlovaFrontMiddlewareContext](../learning/use-request/#alovafrontmiddlewarecontext), next: [AlovaGuardNext](../learning/use-request/#alovaguardnext)) => Promise&lt;any&gt; | -        | -    |

### 响应式数据

| 名称        | 描述         | 类型                   | 版本 |
| ----------- | ------------ | ---------------------- | ---- |
| loading     | 请求加载状态 | boolean                | -    |
| data        | 响应数据     | any                    | -    |
| error       | 请求错误信息 | Error &#124; undefined | -    |
| downloading | 下载进度信息 | Object                 | -    |
| uploading   | 上传进度信息 | Object                 | -    |

### 操作函数

| 名称   | 描述                                                | 函数参数                                                                        | 返回值  | 版本 |
| ------ | --------------------------------------------------- | ------------------------------------------------------------------------------- | ------- | ---- |
| send   | 发送请求函数                                        | ...args: any[]                                                                  | Promise | -    |
| abort  | 中断函数                                            | -                                                                               | -       | -    |
| update | 更新当前 use hook 前端状态的函数，在 react 中较有用 | newFrontStates: [FrontRequestState](../learning/use-request/#frontrequeststate) | -       |

### 事件

| 名称       | 描述             | 回调参数                                                                 | 版本 |
| ---------- | ---------------- | ------------------------------------------------------------------------ | ---- |
| onSuccess  | 请求成功事件绑定 | event: [AlovaSuccessEvent](../learning/use-request/#alovasuccessevent)   | -    |
| onError    | 请求错误事件绑定 | event: [AlovaErrorEvent](../learning/use-request/#alovaerrorevent)       | -    |
| onComplete | 请求完成事件绑定 | event: [AlovaCompleteEvent](../learning/use-request/#alovacompleteevent) | -    |
