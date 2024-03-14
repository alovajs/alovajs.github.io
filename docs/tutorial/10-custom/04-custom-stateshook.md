---
title: Custom States Hook
sidebar_position: 50
---

Remember how to create an Alova instance?

```javascript
const alovaInstance = createAlova({
  //...
  statesHook: ReactHook
});
```

`statesHook` will decide which MVVM library state to return when requesting, alova currently provides **VueHook, ReactHook, svelteHook**.

In most cases, you should not use this function, but if you need to adapt to more MVVM libraries that alova does not support, you need to customize `statesHook`.

`statesHook` is an ordinary object that contains specific functions, but these basically do not involve algorithms, let's see how **VueHook** is written.

## statesHook structure

statesHook is represented by an object, the following is an example of **VueHook**.

```javascript
import { ref, watch, onUnmounted } from 'vue';

const VueHook = {
  // state creation function
  create: rawData => ref(data),

  // state export function
  export: state => state,

  // dehydration function
  dehydrate: state => state.value,

  // Reactive state update function
  update: (newVal, states) => {
    Object.keys(newVal).forEach(key => {
      states[key].value = newVal[key];
    });
  },

  // request send control function
  effectRequest({ handler, removeStates, saveStates, immediate, frontStates, watchingStates }) {
    // Remove the corresponding state when the component is uninstalled
    onUnmounted(removeStates);

    // When calling useRequest and useFetcher, watchingStates is undefined
    if (!watchingStates) {
      handler();
      return;
    }

    // When calling useWatcher, watchingStates is an array of states that need to be monitored
    // When immediate is true, it means that the request needs to be sent immediately
    watch(watchingStates, handler, { immediate });
  }
};
```

## Custom statesHook function description

> All of the following 5 functions must be specified.

**create**

Responsive state creation function, `loading`, `error`, `data`, `downloading`, `uploading`, etc. are all created by calling this function, such as the vue3 project will be created as a ref value;

**export**

State export function, this function receives the responsive state created by the create function, and exports the final state for developers to use, where the state exported by `VueHook` is the original state;

**dehydrate**

Dehydration function, which means converting the responsive state into normal data, is the opposite operation to create, in `updateState`;

**update**

Responsive status update function, the status update maintained internally by `alova` is done through this function. This function receives two parameters, the first parameter is the new data object, and the second parameter is the map collection of the original responsive state, here you can write a fixed cycle to update `states`;

**effectRequest**

Request sending control function, it will execute this function immediately when `useRequest`, `useWatcher`, `useFetcher` are called, we need to complete three things in this function:

1. When the current component is uninstalled, call the removeStates function to remove the responsive state involved in the current component to avoid memory overflow;
2. When calling useWatcher, bind the state monitor, and call the sendRequest function when the state changes. You can use whether `states` is an array to judge whether `useWatcher` is called. At the same time, the `immediate` parameter is used to judge whether `useWatcher` is called Whether the request needs to be sent immediately;
3. When calling `useRequest` and `useFetcher`, call sendRequest to send a request, at this time `states` is `undefined`;

:::warning Caution

If the library involved in statesHook is like `react`, the use hook of `alova` will be called every time it is re-rendered, then the `saveStates` function needs to be triggered every time it is re-rendered in `effectRequest`, this is because `react `Every re-render refreshes its state references, so we need to re-save them again.

:::

[ReactHook source code click here to view](https://github.com/alovajs/alova/blob/main/src/predefine/ReactHook.ts)

## statesHook type

If you want it to support typescript when customizing statesHook, you can [click here to view](/tutorial/combine-framework/typescript)
