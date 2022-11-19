---
title: Custom States Hook
sidebar_position: 20
---

Remember the `statesHook` you passed in when calling `createAlova`? It will decide which MVVM library status you return when you request, such as `VueHook` in vue project, `ReactHook` in react project, `SvelteHook` in svelte project, currently only these three libraries are supported. In most cases you should not use this feature, but if you need to adapt to more MVVM libraries that we don't support yet, you need to custom write `statesHook`.

`statesHook` is an ordinary object containing certain functions, but these are still basically no algorithms, let's see how **VueHook** is written.

## statesHook structure

```javascript
import { ref, watch, onUnmounted } from 'vue';

const VueHook = {
  // state creation function
  create: rawData => ref(data),

  // state export function
  export: state => state,

  // dehydration function
  dehydrate: state => state.value,

  // responsive state update function
  update: (newVal, states) => {
    Object.keys(newVal).forEach(key => {
      states[key].value = newVal[key];
    });
  },

  // request to send control function
  effectRequest({ handler, removeStates, saveStates, immediate, frontStates, watchingStates }) {
    // Remove the corresponding state when the component is unloaded
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

> The following 5 functions must be specified.

- **create**: Responsive state creation function, `loading`, `error`, `data`, `downloading`, `uploading`, etc. are all created by calling this function, for example, it will be created as a ref value under the vue3 project ;
- **export**: state export function, this function receives the responsive state created by the create function, and exports the state that is finally used by developers, where the state exported by `VueHook` is the original state;
- **dehydrate**: Dehydration function, which means to convert the responsive state into normal data, which is the opposite of create, in `updateState`;
- **update**: Responsive state update function, the state update maintained by `alova` is completed through this function. This function receives two parameters, the first parameter is the new data object, the second parameter is the map collection of the original reactive state, here you can write a fixed loop to update `states`;
- **effectRequest**: request sending control function, it will execute this function immediately when `useRequest`, `useWatcher`, `useFetcher` are called, we need to do three things in this function:
  1. When the current component is uninstalled, call the removeStates function to remove the responsive state involved in the current component to avoid memory overflow;
  2. When calling useWatcher, bind the state monitor, and call the sendRequest function when the state changes. You can use whether `states` is an array to judge whether `useWatcher` is called, and at the same time, the `immediate` parameter is used to judge the `useWatcher` call whether the request needs to be sent immediately;
  3. When calling `useRequest` and `useFetcher`, call sendRequest to send a request, at this time `states` is `undefined`;

:::caution note
If the library involved in statesHook is like `react`, the use hook of `alova` will be called each time it is re-rendered, then in `effectRequest` it is also necessary to trigger the `saveStates` function every time it re-renders, this is because `react` `Every re-render refreshes its state references, so we need to re-save them again.
:::

[Click here to view the ReactHook source code](https://github.com/alovajs/alova/blob/main/src/predefine/ReactHook.ts)

If you want to support typescript when you customize statesHook, you can [click here](./typescript#request adapter type)
