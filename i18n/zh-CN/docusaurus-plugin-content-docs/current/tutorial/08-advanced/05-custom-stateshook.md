---
title: 自定义States Hook
sidebar_position: 50
---

还记得如何创建一个 Alova 实例吗？

```javascript
const alovaInstance = createAlova({
  // ...
  statesHook: ReactHook
});
```

`statesHook`将决定在请求时返回哪个 MVVM 库的状态，alova 目前提供了**VueHook、ReactHook、svelteHook**。

在大部分情况下你应该用不到这个功能，但如果你需要适配更多 alova 不支持的 MVVM 库，就需要自定义编写`statesHook`了。

`statesHook`是一个包含特定函数的普通对象，不过这些还是基本不涉及算法，我们来看看 **VueHook** 是怎么编写的吧。

## statesHook 结构

statesHook 使用一个对象进行表示，以下为**VueHook**的示例。

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
  effectRequest({ handler, removeStates, saveStates, immediate, frontStates, watchingStates }) {
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
  }
};
```

## 自定义 statesHook 函数说明

> 以下 5 个函数均必须指定。

**create**

响应式状态创建函数，`loading`、`error`、`data`、`downloading`、`uploading`等都是调用此函数创建的，如 vue3 项目下将创建为 ref 值；

**export**

状态导出函数，此函数接收 create 函数创建的响应式状态，并导出最终给开发者使用的状态，这里`VueHook`导出的状态是原状态；

**dehydrate**

脱水函数，意思是将响应式状态转换为普通数据，与 create 是相反的操作，在`updateState`中；

**update**

响应式状态更新函数，`alova`内部维护的状态更新都是通过此函数完成。此函数接收两个参数，第一个参数是新的数据对象，第二个参数是原响应式状态的 map 集合，这里你可以固定写一个循环更新`states`；

**effectRequest**

请求发送控制函数，它会在`useRequest`、`useWatcher`、`useFetcher`被调用时立即执行此函数，我们要在这个函数内要完成三件事：

1. 当前组件卸载时，调用 removeStates 函数移除当前组件涉及到的响应式状态，避免内存溢出;
2. 当调用 useWatcher 时，绑定状态监听，状态改变时调用 sendRequest 函数，你可以用`states`是否为数组判断是否为`useWatcher`被调用，同时，`immediate`参数用于判断`useWatcher`调用时是否需要立即发送请求；
3. 当调用`useRequest`和`useFetcher`时，调用 sendRequest 发出一次请求，此时`states`为`undefined`；

:::caution 注意

如果 statesHook 涉及的库是像`react`，每次重新渲染都会调用`alova`的 use hook 的，那么在`effectRequest`中还需要在每次重新渲染时触发`saveStates`函数，这是因为`react`每次重新渲染都会刷新它的状态引用，因此我们需要再次重新保存它们。

:::

[ReactHook 源码点此查看](https://github.com/alovajs/alova/blob/main/src/predefine/ReactHook.ts)

## statesHook 类型

如果你在自定义 statesHook 时，也希望它可以支持 typescript，可以 [点此查看](../advanced/typescript)
