---
title: 数据拉取
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

当你有以下需求时：

1. 预加载后续流程中将会使用到的数据并存放在缓存中，让用户不再等待数据加载的过程；
2. 便捷地实现跨页面更新数据（类似全局状态），例如修改 todo 列表的某一项后重新拉取最新数据，响应后将刷新界面。

`useFetcher`就是用于实现以上场景的 hook，通过它获取的响应数据不能直接接收到，但通过它拉取的数据除了会更新缓存外还会更新对应的状态，从而重新渲染视图。

你可以用它预拉取数据并保存到缓存中，或优雅地跨组件更新状态，例如修改 todo 列表的某一项后重新拉取最新数据，响应后将会刷新界面

## 跨模块/组件更新视图

下面我们来实现修改某个 todo 数据，并重新拉取最新的 todo 列表数据，让视图更新。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- 渲染统一的拉取状态。 -->
  <div v-if="fetching">{{ 正在后台拉取数据... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">修改todo项</button>
</template>

<script setup>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
      // 详见后续的《Method实例匹配器》章节
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
    fetch
  } = useFetcher();

  // 在事件中触发数据拉取
  const handleSubmit = () => {
    // todo项修改...

    // 开始拉取更新后的数据
    // 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
    fetch(getTodoList(1));

    // 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // 返回true来指定需要拉取的Method实例
        return index === ary.length - 1;
      }
    });
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const getTodoList = currentPage => {
	return alovaInstance.Get('/todo/list', {
		// 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
		// 详见后续的《Method实例匹配器》章节
		name: 'todoList',
		params: {
			currentPage,
			pageSize: 10
		}
	});
};

const App = () => {
	const {
		// fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
		fetching,
		error,
		onSuccess,
		onError,
		onComplete,

		// 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
		fetch
	} = useFetcher();

	// 在事件中触发数据拉取
	const handleSubmit = () => {
		// 假设已完成todo项的修改...

		// 开始拉取更新后的数据
		// 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
		fetch(getTodoList(1));

		// 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
		fetch({
			name: 'todoList',
			filter: (method, index, ary) => {
				// 返回true来指定需要拉取的Method实例
				return index === ary.length - 1;
			}
		});
	};

	return (
		{/* 渲染统一的拉取状态 */}
		{ fetching ? <div>{{ 正在后台拉取数据... }}</div> : null }
		{/* ... */}
		<button onClick={handleSubmit}>修改todo项</button>
	);
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
      // 详见后续的《Method实例匹配器》章节
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
    fetch
  } = useFetcher();

  // 在事件中触发数据拉取
  const handleSubmit = () => {
    // 假设已完成todo项的修改...

    // 开始拉取更新后的数据
    // 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
    fetch(getTodoList(1));

    // 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // 返回true来指定需要拉取的Method实例
        return index === ary.length - 1;
      }
    });
  };
</script>

<!-- 渲染统一的拉取状态 -->
{#if $fetching}
<div>{{ 正在后台拉取数据... }}</div>
{/if}
<!-- ... -->
<button on:click="{handleSubmit}">修改todo项</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <!-- 渲染统一的拉取状态。 -->
  <div v-if="fetcher.fetching">{{ 正在后台拉取数据... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">修改todo项</button>
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher } from 'alova';

  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
      // 详见后续的《Method实例匹配器》章节
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function () {
      const {
        // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
        fetching,
        error,
        onSuccess,
        onError,
        onComplete,

        // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
        fetch
      } = (fetcherStates = useFetcher());
      return {
        fetcher: fetcherStates
      };
    }),
    methods: {
      // 在事件中触发数据拉取
      handleSubmit() {
        // 开始拉取更新后的数据
        // 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
        this.fetcher$fetch(getTodoList(1));

        // 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
        this.fetcher$fetch({
          name: 'todoList',
          filter: (method, index, ary) => {
            // 返回true来指定需要拉取的Method实例
            return index === ary.length - 1;
          }
        });
      }
    }
  };
</script>
```

</TabItem>
</Tabs>

> 更多`Method`实例匹配器的使用方法见 [Method 实例匹配器](/tutorial/next-step/method-instance-matcher)

## 预加载数据

以下实现 todo 列表分页场景下，下一页数据的预加载功能。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

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

  const { fetch } = useFetcher();

  const currentPage = ref(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage.value), [currentPage], {
    immediate: true
  });

  // 当前页请求成功时预拉取下一页的数据
  // 实现当翻页到下一页时不需要等待请求
  onSuccess(() => {
    fetch(getTodoList(currentPage.value + 1));
  });
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
  const { fetch } = useFetcher();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage), [currentPage], {
    immediate: true
  });

  // 当前页请求成功时预拉取下一页的数据
  // 实现当翻页到下一页时不需要等待请求
  onSuccess(() => {
    fetch(getTodoList(currentPage + 1));
  });

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

  const { fetch } = useFetcher();
  const currentPage = writable(1);
  const { data, onSuccess } = useWatcher(() => getTodoList($currentPage), [currentPage], {
    immediate: true
  });

  // 当前页请求成功时预拉取下一页的数据
  // 实现当翻页到下一页时不需要等待请求
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

<!-- views... -->
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <!-- ... -->
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher, useWatcher } from 'alova';

  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function () {
      return {
        fetcher: useFetcher(),
        paging: useWatcher(() => getTodoList(this.currentPage), ['currentPage'], {
          immediate: true
        })
      };
    }),
    data() {
      return {
        currentPage: 1
      };
    },
    mounted() {
      // 当前页请求成功时预拉取下一页的数据
      // 实现当翻页到下一页时不需要等待请求
      this.paging$onSuccess(() => {
        this.fetcher$fetch(getTodoList(this.currentPage + 1));
      });
    }
  };
</script>
```

</TabItem>
</Tabs>

:::warning 注意事项

useFetcher 请求完成后只更新缓存，且如果发现该`Method`实例下还有`data`状态，也会同步更新它，从而保证页面数据一致，这是`useFetcher`用于跨模块/组件更新视图的保证。

:::

## 强制发送请求

和`useRequest`和`useWatcher`相同，你可以在`useFetcher`中指定`force`参数来设置是否发送请求。

### 设置静态值

force 默认为 false，设置为 true 时将每次穿透缓存，并发送请求

```javascript
useFetcher({ force: true });
```

### 动态设置 force 值

实际情况中，我们经常需要根据不同情况来设置是否需要强制发送请求，此时可以将 force 设置为一个函数，此函数可通过 fetch 函数传入。

```javascript
useFetcher({
  force: isForce => {
    return isForce;
  }
});
```

## fetch 函数参数传递规则

在上面的示例中，调用 fetch 函数触发数据拉取，fetch 函数还可以从第二个参数开始传入自定义的参数，这些参数将分别被以下 4 个函数接收：

### 在 onSuccess、onError、onComplete 回调函数中接收

onSuccess、onError、onComplete 回调函数中的`event.sendArgs`以数组形式接收

```javascript
const { fetch, onSuccess, onError, onComplete } = useFetcher();
onSuccess(event => {
  // sendArgs的值为['a', 'b']
  console.log(event.sendArgs);
});
onError(event => {
  // sendArgs的值为['a', 'b']
  console.log(event.sendArgs);
});
onComplete(event => {
  // sendArgs的值为['a', 'b']
  console.log(event.sendArgs);
});

// 拉取数据
fetch(getTodoList(10), 'a', 'b');
```

### 在 force 函数中接收

```javascript
const { fetch } = useFetcher({
  force: isForce => {
    // isForce的值为true
    return isForce;
  }
});
fetch(getTodoList(10), true);
```

## 与 useRequest 和 useFetcher 的差异对比

1. useFetcher 不返回`data`字段，预拉取的数据将保存在缓存中，以及更新对应位置的状态数据;
2. 将`loading`改名为了`fetching`;
3. 没有`send`函数，但多了一个`fetch`函数，可以重复利用 fetch 函数拉取不同接口的数据，此时你可以使用 `fetching` 和 `error` 状态统一渲染视图，从而达到统一处理的目的;

## API

### Hook 配置

| 名称       | 描述                                                           | 类型                                                                                                                                                                 | 默认值                               | 版本 |
| ---------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---- |
| force      | 是否强制请求，可设置为函数动态返回 boolean 值                  | boolean                                                                                                                                                              | (...args: any[]) => boolean \| false | -    |
| middleware | 中间件函数，[了解 alova 中间件](/tutorial/advanced/middleware) | (context: [AlovaFetcherMiddlewareContext](#alovafetchermiddlewarecontext), next: [AlovaGuardNext](/tutorial/learning/use-request/#alovaguardnext)) => Promise\<any\> | -                                    | -    |

#### AlovaFetcherMiddlewareContext

| 名称             | 描述                                                                                                     | 类型                                                                                                                                                                                                                                                                       | 版本    |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| method           | 当前请求的 method 对象                                                                                   | Method                                                                                                                                                                                                                                                                     | -       |
| cachedResponse   | 命中的缓存数据                                                                                           | any                                                                                                                                                                                                                                                                        | -       |
| config           | 当前的 use hook 配置                                                                                     | Record\<string, any\>                                                                                                                                                                                                                                                      | -       |
| fetchArgs        | 响应处理回调的参数，该参数由 useFetcher 的 fetch 传入                                                    | any[]                                                                                                                                                                                                                                                                      | -       |
| fetchStates      | use hook 预加载状态集合，如 fetching、error 等                                                           | [FetchRequestState](#fetchrequeststate)                                                                                                                                                                                                                                    | -       |
| fetch            | 数据预加载函数                                                                                           | (method: Method, ...args: any[]) => void                                                                                                                                                                                                                                   | Promise |
| abort            | 中断函数                                                                                                 | () => void                                                                                                                                                                                                                                                                 | -       |
| decorateSuccess  | 装饰成功回调函数                                                                                         | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovasuccessevent), <br/>index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | 装饰失败回调函数                                                                                         | (decorator: (<br/>handler: (event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovaerrorevent)) => void, <br/>event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovaerrorevent), <br/>index: number, <br/>length: number<br/>) => void) => void             | -       |
| decorateComplete | 装饰完成回调函数                                                                                         | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent), <br/>index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | 更新当前 use hook 预加载状态的函数，在 react 中较有用                                                    | (newFrontStates: [FetchRequestState](#fetchrequeststate)) => void;                                                                                                                                                                                                         | -       |
| controlFetching  | 调用后将自定义控制 fetching 的状态，内部不再触发 fetching 状态的变更，传入 control 为 false 时将取消控制 | (control?: boolean) => void                                                                                                                                                                                                                                                | -       |

#### FetchRequestState

以下属性值将会根据`statesHook`自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为`Ref`类型，在 react 中为普通值，在 svelte 中为`Writable`类型

| 名称        | 描述           | 类型               | 版本 |
| ----------- | -------------- | ------------------ | ---- |
| fetching    | 预加载请求状态 | boolean            | -    |
| error       | 请求错误信息   | Error \| undefined | -    |
| downloading | 下载进度信息   | Object             | -    |
| uploading   | 上传进度信息   | Object             | -    |

### 响应式数据

| 名称        | 描述           | 类型               | 版本 |
| ----------- | -------------- | ------------------ | ---- |
| fetching    | 预加载请求状态 | boolean            | -    |
| error       | 请求错误信息   | Error \| undefined | -    |
| downloading | 下载进度信息   | Object             | -    |
| uploading   | 上传进度信息   | Object             | -    |

### 操作函数

| 名称   | 描述                                                | 函数参数                                                | 返回值  | 版本 |
| ------ | --------------------------------------------------- | ------------------------------------------------------- | ------- | ---- |
| fetch  | 数据预加载函数                                      | 1. method: 预加载的 Method 实例<br/>2. ...args: any[]   | Promise | -    |
| abort  | 中断函数                                            | -                                                       | -       | -    |
| update | 更新当前 use hook 前端状态的函数，在 react 中较有用 | newFrontStates: [FrontRequestState](#frontrequeststate) | -       |

### 事件

| 名称       | 描述             | 回调参数                                                                                                                                                                       | 版本 |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| onSuccess  | 请求成功事件绑定 | event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovasuccessevent)   | -    |
| onError    | 请求错误事件绑定 | event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovaerrorevent)       | -    |
| onComplete | 请求完成事件绑定 | event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent) | -    |
