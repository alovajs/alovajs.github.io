---
title: Step 5 - Edit Data
sidebar_position: 80
---

> What should I do when the user needs to edit data when the network is disconnected?

At this point, two situations need to be explained:

1. The list data can meet the data echo of the edit page. At this time, the list data can be passed to the edit page without requesting. At this time, all list data supports editing in the silent submission mode;
2. The echo data on the edit page needs to be obtained through the api, and only the locally cached list items can echo the data normally, for example:
   1. For the list items that have been accessed before the network is disconnected, the request can hit the cache again;
   2. Created through the silent submission mode, but the list item has not been successfully submitted, and the submitted data still exists in the silentMethod instance;

And here we will focus on the case of **2-2**.

## Edit silent submit items

In the previous chapters, we know that when the newly created data item has not been successfully submitted, the virtual data will be used as the placeholder for the id. Usually, we also get the data item through the id. At this time, we are in `useSQRequeset` Virtual data interception is implemented on the above, if a request is accompanied by virtual data information, it will be intercepted before sending and the data can be specified to replace the response data, and the request will be abandoned.

Remember the **silentMethod.reviewData** saved in [Step 2 - Adjust Response Handling](../../strategy/sensorless-data-interaction/modify-response)?

```javascript
onSuccess(({ silentMethod }) => {
  // Construct list data items
  const editingItem = {
    ...detail,
    id: id || data.id
  };
  //...
  if (silentMethod) {
    // highlight-start
    // Setting the name is to find the corresponding silentMethod instance when intercepting
    silentMethod.entity.setName('edit' + editingItem.id);
    silentMethod.reviewData = {
      operate: id ? 'edit' : 'add',
      data: editingItem
    };
    // Don't forget to call save
    silentMethod.save();
    // highlight-end
  }
});
```

It can be used not only for data compensation, but also for echoing data in edit pages.

```javascript
const { loading, data } = useSQRequest(id => todoDetail(id), {
  initialData: {
    title: '',
    time: new Date()
  },
  immediate: false,

  // highlight-start
  // Set the interception function, the function will be called when there is virtual data in this request
  // If reviewData is returned, it will replace the response data and give up this request, otherwise the request will still be initiated
  vDataCaptured: () => {
    const targetSM = filterSilentMethods('edit' + todoId).pop();
    if (targetSM?.reviewData) {
      return { ...targetSM.reviewData.data };
    }
  }
  // highlight-end
});
```

:::caution Caution

You can save enough data in **silentMethod.reviewData** to satisfy both list data compensation and edit page data echo.

:::

So far, data items created through silent submit mode also support editing! What's the problem, um... and one last one.

## When the data item being edited is submitted successfully

When the user is editing a data item that has not been successfully submitted, it suddenly submits successfully! At this time, we need to replace the virtual data used in the edit page with actual data, for example, replace the virtual id with the actual id, and use the actual id to submit in the next edit. This is also very simple, we only need to monitor This is done by silently submitting the success event, which will receive a data collection consisting of virtual data and real data.

```javascript
import { onSilentSubmitSuccess, stringifyVData } from '@alova/scene-*';

//...
// id is virtual data during initialization
let id = /* todo virtual id */;

// highlight-start
// Binding listener silently submits the successful event to update the id, and returns the unbind function, don't forget to call the unbind function when the component is destroyed
const unbindEvent = onSilentSubmitSuccess(event => {
   const vDataId = stringifyVData(id);
   if (event. vDataResponse[vDataId]) {
     id = event.vDataResponse[vDataId];

     // The following is to change the virtual id in the url to the actual id
     history.replaceState(null, '', '?id=' + currentId);
   }
});
// highlight-end
```

Here, the `event.vDataResponse` value is a collection of virtual data id and actual data, and its format is as follows:

```javascript
{
   '[vd:aaaaaa]': { id: 1 },
   '[vd:bbbbbb]': 1
}
```

So far, we have completed all the content of a simple list of non-inductive interaction, but in other application scenarios such as editing applications, complex list management, etc., we may encounter more different needs. What else does alova have at this time? What are the features we can use? Please read the next chapter!
