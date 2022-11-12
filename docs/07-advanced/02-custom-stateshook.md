---
title: 自定义States Hook
sidebar_position: 20
---

还记得你在调用`createAlova`时传入的`statesHook`吗？它将决定你在请求时返回哪个MVVM库的状态，如在vue项目中使用`VueHook`，在react项目中使用`ReactHook`，在svelte项目中使用`SvelteHook`，目前只支持这三个库。在大部分情况下你应该用不到这个功能，但如果你需要适配更多我们还不支持的MVVM库，就需要自定义编写`statesHook`了。

`statesHook`是一个包含特定函数的普通对象，不过这些还是基本不涉及算法，我们来看看 **VueHook** 是怎么编写的吧。

## statesHook结构
```javascript
import { ref, watch, onUnmounted } from 'vue';

const VueHook = {
  // 状态创建函数
  create: rawData => ref(data),

  // 状态导出函数
  export: state => state,

  // 脱水函数
  dehydrate: state => state.value,

  // 响应式状态更新函数
  update: (newVal, states) => {
    Object.keys(newVal).forEach(key => {
      states[key].value = newVal[key];
    });
  },

  // 请求发送控制函数
  effectRequest({
    handler,
    removeStates,
    saveStates,
    immediate,
    frontStates,
    watchingStates
  }) {
    // 组件卸载时移除对应状态
    onUnmounted(removeStates);

    // 调用useRequest和useFetcher时，watchingStates为undefined
    if (!watchingStates) {
      handler();
      return;
    }

    // 调用useWatcher时，watchingStates为需要监听的状态数组
    // immediate为true时，表示需要立即发送请求
    watch(watchingStates, handler, { immediate });
  },
};
```

## 自定义statesHook函数说明
> 以下5个函数均必须指定。

- **create**：响应式状态创建函数，`loading`、`error`、`data`、`downloading`、`uploading`等都是调用此函数创建的，如vue3项目下将创建为ref值；
- **export**：状态导出函数，此函数接收create函数创建的响应式状态，并导出最终给开发者使用的状态，这里`VueHook`导出的状态是原状态；
- **dehydrate**：脱水函数，意思是将响应式状态转换为普通数据，与create是相反的操作，在`updateState`中；
- **update**：响应式状态更新函数，`alova`内部维护的状态更新都是通过此函数完成。此函数接收两个参数，第一个参数是新的数据对象，第二个参数是原响应式状态的map集合，这里你可以固定写一个循环更新`states`；
- **effectRequest**：请求发送控制函数，它会在`useRequest`、`useWatcher`、`useFetcher`被调用时立即执行此函数，我们要在这个函数内要完成三件事：
    1. 当前组件卸载时，调用removeStates函数移除当前组件涉及到的响应式状态，避免内存溢出;
    2. 当调用useWatcher时，绑定状态监听，状态改变时调用sendRequest函数，你可以用`states`是否为数组判断是否为`useWatcher`被调用，同时，`immediate`参数用于判断`useWatcher`调用时是否需要立即发送请求；
    3. 当调用`useRequest`和`useFetcher`时，调用sendRequest发出一次请求，此时`states`为`undefined`；

:::caution 注意
如果statesHook涉及的库是像`react`，每次重新渲染都会调用`alova`的use hook的，那么在`effectRequest`中还需要在每次重新渲染时触发`saveStates`函数，这是因为`react`每次重新渲染都会刷新它的状态引用，因此我们需要再次重新保存它们。
:::

[ReactHook源码点此查看](https://github.com/alovajs/alova/blob/main/src/predefine/ReactHook.ts)

如果你在自定义statesHook时，也希望它可以支持typescript，可以 [点此查看](./typescript#请求适配器类型)