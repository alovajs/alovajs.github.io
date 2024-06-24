---
title: States Hook
---

Remember how to create an Alova instance?

```javascript
const alovaInstance = createAlova({
  // ...
  statesHook: ReactHook
});
```

`statesHook` will determine which UI library state is returned when requested. In most cases you don't need to customize `statesHook`, but if you need to adapt more MVVM libraries that alova does not support, you need to customize `statesHook`.

`statesHook` is a normal object containing specific functions. Let's take a look at how **VueHook** is written.

## statesHook structure

statesHook is an object. The following is its type definition.

```ts
interface StatesHook<State, Computed, Watched = State | Computed, Export = State> {
  /**
   * Create state
   * @param initialValue Initial data
   * @returns State value
   */
  create: (initialValue: any, referingObject: ReferingObject) => State;

  /**
   * Create computed state
   * @param initialValue Initial data
   * @param referingObject Reference object
   */
  computed: (getter: () => any, deps: Export[], referingObject: ReferingObject) => Computed;

  /**
   * Export value for developers
   * @param state State value
   * @param referingObject refering object
   * @returns Exported value
   */
  export?: (state: State, referingObject: ReferingObject) => Export;

  /** Convert state to normal data */
  dehydrate: (state: State, key: string, referingObject: ReferingObject) => any;

  /**
   * Update state value
   * @param newVal new data set
   * @param state original state value
   * @param @param referingObject refering object
   */
  update: (newVal: any, state: State, key: string, referingObject: ReferingObject) => void;

  /**
   * Control the function of executing the request. This function will be executed once when useRequest and useWatcher are called
   * Executed once in the fetch function in useFetcher
   * When watchingStates is an empty array, execute the handleRequest function once
   * When watchingStates is a non-empty array, call when the state changes. When immediate is true, call it immediately
   * hook is an instance of use hook. Each time use hook is called, a hook instance will be generated
   * It can be executed directly in vue, but it needs to be executed in useEffect in react
   * removeStates function is a function to clear the current state. It should be called when the component is uninstalled
   */
  effectRequest: (
    effectParams: EffectRequestParams<any>,
    referingObject: ReferingObject
  ) => void;

  /**
   * Wrap send, abort and other use hooks operation functions
   * This is mainly used to optimize the problem of generating new functions for each rendering in react and optimize performance
   * @param fn use hook operation function
   * @returns wrapped operation function
   */
  memorize?: <Callback extends (...args: any[]) => any>(fn: Callback) => Callback;

  /**
   * Create a reference object
   * @param initialValue initial value
   * @returns reference object containing initial value
   */
  ref?: <D>(initialValue: D) => { current: D };

  /**
   * Status monitoring
   * @param source monitoring status
   * @param callback status change callback function
   * @param referingObject referring object
   */
  watch: (source: Watched[], callback: () => void, referingObject: ReferingObject) => void;

  /**
   * Component mounting hook
   * @param callback callback function
   * @param referingObject refering object
   */
  onMounted: (callback: () => void, referingObject: ReferingObject) => void;

  /**
   * Component uninstallation hook
   * @param callback callback function
   * @param referingObject refering object
   */
  onUnmounted: (callback: () => void, referingObject: ReferingObject) => void;
}
```

:::warning Note

If statesHook involves something similar to `react`, when `alova`'s use hook is called every time it is re-rendered, the `saveStates` function needs to be triggered every time it is re-rendered in `effectRequest`, because `react` refreshes its state references every time it is re-rendered, so we need to re-save them again.

:::

The following is the statesHook source code that leaves the UI framework.

- [react hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/react.ts)
- [vue hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/vue.ts)
- [svelte hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/svelte.ts)
- [vue options hook](https://github.com/alovajs/alova/blob/main/packages/vue-options/src/stateHook.ts)
