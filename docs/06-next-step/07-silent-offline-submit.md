---
title: Silent/Offline submit
sidebar_position: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Suppose you want to further improve the experience of creating todo items, and let the user click the **Create** button to take effect immediately, without feeling the process of submitting to the server, you can consider using the silent submission method.

You might be thinking, can the server render the results to the user without a response? Yes, alova has a reliable mechanism for background requests. In the network connection environment, the request is repeated every 2 seconds until the request is successfully completed. This is very effective when the service is unstable. Of course, you still need to remind you that unstable In this case, if your data is displayed on multiple ends, it may be a little out of sync.

Let's show the code that silently creates todo items.

```javascript
const createTodoPoster = newTodo => alovaInstance.Post('/todo/create', newTodo);

const { send, onSuccess } = useRequest(createTodoPoster, {
  // Enable silent submit on request
  silent: true
});
onSuccess(() => {
  // After silent submission, onSuccess will be called immediately, and the first parameter of the callback function is undefined
  // and onError will never be called
  // Immediately add the new todo item to the list
  updateState(todoListGetter, todoList => [...todoList, newTodo]);
});

// Click the create button to trigger this function
const handleSubmit = () => {
  send({
    title: 'test todo',
    time: '12:00'
  });
};
```

There is a problem with the above silent submission, that is, the new todo item does not have an id, and the id generally needs to wait for the submission to return. At this time, we can use delayed data update.

```javascript
// omit other code...
onSuccess(() => {
  updateState(todoListGetter, todoList => [
    ...todoList,
    {
      // id is set as a placeholder, which will be automatically replaced with actual data after waiting for the response
      '+id': ({ id }) => id,
      ...newTodo
    }
  ]);
});
```

> Learn more about [Delayed Data Update](./delayed-data-update)

## Offline submission

If you are developing an online document writer, each input of the user needs to be automatically synchronized to the server, and the user can continue to write even in the offline state. In this scenario, we can use the offline submission mechanism of `alova` , in fact, this function and the silent submission function are integrated, both benefit from the reliable mechanism of `alova` background request.

Its processing method is that when silent submission is enabled, submitting data in offline state will directly cache the request data locally, and when the network is restored, the cached request data will be automatically resubmitted to the server, which ensures that Silent submits while offline are also reliable.

Next, we take the online document writer as an example to show the code submitted offline.

<Tabs>
<TabItem label="vue" value="1">

```html
<template>
  <div v-if="loading">Submitting...</div>
  <textarea v-model="editingText"></textarea>
</template>

<script setup>
  import { ref } from 'vue';
  import { useWatcher } from 'alova';

  const editingText = ref('');
  const saveDoc = () =>
    alovaInstance.Post('/doc/save', {
      text: editingText.value
    });
  const { loading } = useWatcher(saveDoc, [editingText], {
    // enable silent submit
    silent: true,

    // Set 500ms anti-shake to reduce server pressure
    debounce: 500
  });
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
import { useState } from 'react';
import { useWatcher } from 'alova';

const saveDoc = text => alovaInstance.Post('/doc/save', { text });
const App = () => {
  const [editingText, useEditingText] = useState('');

  const { loading } = useWatcher(() => saveDoc(editingText), [editingText], {
    // enable silent submit
    silent: true,

    // Set 500ms anti-shake to reduce server pressure
    debounce: 500
  });

  return (
    <>
      {loading ? <div>Submitting...</div> : null}
      <textarea
        value={editingText}
        onInput={e => setEditingText(e.target.value)}></textarea>
    </>
  );
};
```

</TabItem>
<TabItem label="svelte" value="3">

```html
<script>
  import { writable } from 'svelte/store';
  import { useWatcher } from 'alova';

  const editingText = writable('');
  const saveDoc = () =>
    alovaInstance.Post('/doc/save', {
      text: $editingText
    });
  const { loading } = useWatcher(saveDoc, [editingText], {
    // enable silent submit
    silent: true,

    // Set 500ms anti-shake to reduce server pressure
    debounce: 500
  });
</script>
{#if loading}
<div>Submitting...</div>
{/if}
<textarea bind:value="{editingText}"></textarea>
```

</TabItem>
</Tabs>

This completes the simple online document writer. Of course, offline submission is also applicable in the example of silent submission to create todo items, that is, the smooth creation of todo items can be guaranteed even in the offline state.
