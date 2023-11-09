---
title: 管理额外的状态
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在之前的[跨页面/模块更新响应状态](/tutorial/learning/update-response-data-across-modules)章节中，介绍了如何跨页面或模块更新响应状态，但在此章节中我们只介绍了通过`updateState`更新在`useRequest`和`useWatcher`中返回的`data`状态，data 的值总是和响应数据一致，但在很多情况下我们会使用额外的状态来展示（如状态 A）数据，并在请求成功后将 data 数据附加到额外的状态 A 中，如下拉加载的分页方案。在这种情况下，我们就需要将额外的状态 A 进行管理，便于实现跨页面/模块更新它。

## 更新单个状态

可以在 use hook 调用时通过`managedStates`管理额外的状态，并在其他模块/页面中调用`updateState`时，自动指定状态名称来更新它。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
// a.vue
const todoList = page =>
  alova.Get('/todo', {
    name: 'todoList'
  });

const allTodo = ref([]);
useRequest(todoList, {
  // ...

  // highlight-start
  // 将allTodo作为额外的状态进行管理
  managedStates: {
    allTodo
  }
  // highlight-end
});

// b.vue
// ...
const handleSuccess = () => {
  // highlight-start
  // 传入一个对象并指定状态名来查找
  updateState('todoList', {
    allTodo: allTodoData => {
      // 新增一条todo项
      allTodoData.push({
        title: 'new todo',
        time: '10:00'
      });
      return allTodoData;
    }
  });
  // highlight-end
};
```

</TabItem>

<TabItem value="2" label="react">

```javascript
// a.jsx
const PageA = () => {
  const todoList = page =>
    alova.Get('/todo', {
      name: 'todoList'
    });

  const [allTodo, setAllTodo] = allTodoState = useState([]);
  useRequest(todoList, {
    // ...

    // highlight-start
    // 将allTodo作为额外的状态进行管理
    managedStates: {
      allTodo: allTodoState
    }
    // highlight-end
  });

  return (
    // ...
  );
}

// b.jsx
const PageB = () => {
  // ...
  const handleSuccess = () => {
    // highlight-start
    // 传入一个对象并指定状态名来查找
    updateState('todoList', {
      allTodo: allTodoData => {
        // 新增一条todo项
        allTodoData.push({
          title: 'new todo',
          time: '10:00'
        });
        return allTodoData;
      }
    });
    // highlight-end
  };

  return (
    // ...
  );
}
```

</TabItem>

<TabItem value="3" label="svelte">

```javascript
// a.svelte
const todoList = page =>
  alova.Get('/todo', {
    name: 'todoList'
  });

const allTodo = ref([]);
useRequest(todoList, {
  // ...

  // highlight-start
  // 将allTodo作为额外的状态进行管理
  managedStates: {
    allTodo
  }
  // highlight-end
});

// b.svelte
// ...
const handleSuccess = () => {
  // highlight-start
  // 传入一个对象并指定状态名来查找
  updateState('todoList', {
    allTodo: allTodoData => {
      // 新增一条todo项
      allTodoData.push({
        title: 'new todo',
        time: '10:00'
      });
      return allTodoData;
    }
  });
  // highlight-end
};
```

</TabItem>
<TabItem value="4" label="vue options">

:::info 说明

不支持管理额外状态。

:::

</TabItem>
</Tabs>

## 更新多个状态

在上面的例子中我们实现了跨页面对单个`allTodo`状态进行更新，实际上，通过`updateState`的对象描述方式可以同时更新任意多个状态。

```javascript
updateState('todoList', {
  state1: state1Data => {
    // ...
  },
  state2: state2Data => {
    // ...
  },
  state3: state3Data => {
    // ...
  }
  // ...
});
```

需要注意的是，以上 3 个额外的状态在更新前，需要通过`managedStates`属性来管理起来。

## data 状态更新的简写

当只更新 data 状态时，可以直接传入回调函数即可，而不需要指定为对象。

```javascript
updateState('todoList', {
  data: dataRaw => {
    // ...
  }
});

// 以下为简写
updateState('todoList', dataRaw => {
  // ...
});
```
