---
title: Step 4 - Data Compensation
sidebar_position: 70
---

The user may perform some data operations in a disconnected environment. At this time, the silent queue will be full of unsubmitted requests. When the network is restored, due to the limitation of the timing mechanism, it will take a little time to complete these requests. The list loaded at this time The data does not include unsubmitted requests, which can cause some confusion for users:

> "I have clearly added multiple pieces of data, why is it not in the list?"

Therefore, we need to manually compensate the unsubmitted data to the list, so that the list data is always kept up-to-date. In this step, the saved operation records will be used to compensate the list data. It is actually very simple. We It is only necessary to traverse the silentMethod instance of the relevant queue after the list request is successful, and update the operation records recorded in the previous step to the list data.

```javascript
import { useSQRequest, filterSilentMethods, equals } from 'alova/client';
import { todoList } from './api.js';
const { data, loading, onSuccess } = useSQRequest(todoList, {
  initialData: []
});

onSuccess(() => {
  // Get all silentMethod instances under the default queue
  const silentMethods = filterSilentMethods();
  silentMethods.forEach(({ reviewData }) => {
    if (!reviewData) {
      return;
    }
    const { operate, data } = reviewData;
    const index = todoListData.findIndex(({ id }) => equals(id, data.id));
    if ((operate === 'edit' || operate === 'remove') && index >= 0) {
      operate === 'edit' ? todoListData.splice(index, 1, data) : todoListData.splice(index, 1);
    } else if (operate === 'add' && index < 0) {
      // There will be added uncommitted items when re-requesting and hitting the cache, these need to be filtered
      todoListData.unshift(data);
    }
  });
});
```

## Explanation of related functions

### filterSilentMethods

Filter out the specified silentMethod instance by method name or regular expression, which is defined as follows:

```typescript
function filterSilentMethods(
  methodNameMatcher?: string | number | RegExp,
  queueName?: string,
  filterActive?: boolean
): SilentMethod[];
```

**methodNameMatcher: **method name matcher, if it is a number or string, it will filter out the results that completely match the name, if it is a regular expression, it will filter out the matching results, if it is not passed, it will filter out all the results;

**queueName**: Specify the queue to search for, if not uploaded, the _default_ queue will be searched by default;

**filterActive**: whether to filter out the active state instance
