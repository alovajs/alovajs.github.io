---
title: States Hook
---

还记得如何创建一个 Alova 实例吗？

```javascript
const alovaInstance = createAlova({
  // ...
  statesHook: ReactHook
});
```

`statesHook`将决定在请求时返回哪个 UI 库的状态。在大部分情况下你不需要自定义`statesHook`，但如果你需要适配更多 alova 不支持的 MVVM 库，就需要自定义编写`statesHook`了。

`statesHook`是一个包含特定函数的普通对象，我们来看看 **VueHook** 是怎么编写的吧。

## statesHook 结构

statesHook 是一个对象，以下是它的类型定义。

```ts
interface StatesHook<State, Computed, Watched = State | Computed, Export = State> {
  /**
   * 创建状态
   * @param initialValue 初始数据
   * @returns 状态值
   */
  create: (initialValue: any, referingObject: ReferingObject) => State;

  /**
   * 创建计算状态
   * @param initialValue 初始数据
   * @param referingObject 引用对象
   */
  computed: (getter: () => any, deps: Export[], referingObject: ReferingObject) => Computed;

  /**
   * 导出给开发者使用的值
   * @param state 状态值
   * @param referingObject refering object
   * @returns 导出的值
   */
  export?: (state: State, referingObject: ReferingObject) => Export;

  /** 将状态转换为普通数据 */
  dehydrate: (state: State, key: string, referingObject: ReferingObject) => any;

  /**
   * 更新状态值
   * @param newVal 新的数据集合
   * @param state 原状态值
   * @param @param referingObject refering object
   */
  update: (newVal: any, state: State, key: string, referingObject: ReferingObject) => void;

  /**
   * 控制执行请求的函数，此函数将在useRequest、useWatcher被调用时执行一次
   * 在useFetcher中的fetch函数中执行一次
   * 当watchingStates为空数组时，执行一次handleRequest函数
   * 当watchingStates为非空数组时，当状态变化时调用，immediate为true时，需立即调用一次
   * hook是use hook的实例，每次use hook调用时都将生成一个hook实例
   * 在vue中直接执行即可，而在react中需要在useEffect中执行
   * removeStates函数为清除当前状态的函数，应该在组件卸载时调用
   */
  effectRequest: (
    effectParams: EffectRequestParams<any>,
    referingObject: ReferingObject
  ) => void;

  /**
   * 包装send、abort等use hooks操作函数
   * 这主要用于优化在react中，每次渲染都会生成新函数的问题，优化性能
   * @param fn use hook操作函数
   * @returns 包装后的操作函数
   */
  memorize?: <Callback extends (...args: any[]) => any>(fn: Callback) => Callback;

  /**
   * 创建引用对象
   * @param initialValue 初始值
   * @returns 包含初始值的引用对象
   */
  ref?: <D>(initialValue: D) => { current: D };

  /**
   * 状态监听
   * @param source 监听的状态
   * @param callback 状态改变回调函数
   * @param referingObject refering object
   */
  watch: (source: Watched[], callback: () => void, referingObject: ReferingObject) => void;

  /**
   * 组件挂载钩子
   * @param callback 回调函数
   * @param referingObject refering object
   */
  onMounted: (callback: () => void, referingObject: ReferingObject) => void;

  /**
   * 组件卸载钩子
   * @param callback 回调函数
   * @param referingObject refering object
   */
  onUnmounted: (callback: () => void, referingObject: ReferingObject) => void;
}
```

:::warning 注意

如果 statesHook 涉及与`react`相似，当每次重新渲染都会调用`alova`的 use hook 时，需要在`effectRequest`中每次重新渲染时触发`saveStates`函数，这是因为`react`每次重新渲染都会刷新它的状态引用，因此我们需要再次重新保存它们。

:::

以下是留下 UI 框架的 statesHook 源码。

- [react hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/react.ts)
- [vue hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/vue.ts)
- [svelte hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/svelte.ts)
- [vue options hook](https://github.com/alovajs/alova/blob/main/packages/vue-options/src/stateHook.ts)
