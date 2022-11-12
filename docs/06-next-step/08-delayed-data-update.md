---
title: 延迟数据更新
sidebar_position: 80
---

你可能会有这样的需求：**创建一个todo项时设为静默提交，并立即调用`updateState`更新todo列表，这样虽然可以立即在界面上看到新增的todo项，但还没有id，因此这个todo项无法被编辑和删除，除非重新请求完整数据。**

延迟数据更新就是用来解决这个问题的，它支持你用一种占位格式来标记id字段，在响应前会将占位符替换为`default`值或`undefined`，然后在响应后自动把实际数据替换占位标记。


## 一个简单示例
```javascript
const newTodo = {
  title: '...',
  time: '10:00'
};
const { onSuccess } = useRequest(/*...*/);  // 静默提交
onSuccess(() => {
  updateState(/*...*/, todoList => {
    // 延迟更新的表达式中的key以`+`开头，并且值设为getter函数
    // 它将在响应后调用并将返回值替换到id属性上，res参数是响应数据
    const newTodoWithPlaceholder = {
      '+id': res => res.id,
    };

    return [
      ...todoList,
      newTodoWithPlaceholder,
    ];
  });
});
```

以上`newTodoWithPlaceholder`数据在响应前将会被编译成如下的值，此时todo列表页可以立即展示新的todo项。
```javascript
{
  id: undefined,
  title: '...',
  time: '10:00',
};
```

响应后id将被getter函数的返回值替换，此时新的todo项也支持编辑和删除等操作了。

```javascript
// 假设响应数据为  { id: 10 }
{
  id: 10,
  title: '...',
  time: '10:00',
};
```

:::info
更完整的实际示例请移步 [示例-更安全的乐观更新](../example/safer-ptimistic-update)
:::

## 延迟更新的占位格式语法
实际上，上面的示例代码中，key以 **+** 号开头的形式是一种简写格式，它只适用于对象中。其实它有3种语法格式，提供了更丰富的功能，同时允许我们在数组中、甚至单个值中使用，我们来看一下。

### 简易格式
key以 **+** 号开头，只适合在对象中使用。
```javascript
{
  '+id': res => res.id
}
```

### 数组格式
在设置getter函数的同时指定默认值，默认值将在数据响应前作为临时的值，key以 **+** 号开头，也只适合在对象中使用。
```javascript
{
  '+id': [res => res.id, 0]
}
```

**完整格式：**
以一个object的形式表示占位格式，它适合在任意位置中使用
```javascript
{
  // action的值是固定写法
  action: 'responsed',

  // 延迟更新的getter函数
  // 它将在响应后调用并将返回值替换到id属性上，res参数是响应数据
  value: res => res.id,

  // 数据更新前的默认值，可选项，不设时为undefined
  default: 0,
}
```

接下来再来看看，延迟更新的占位格式在不同数据结构中的使用方法。

## 在数组中使用
```javascript
[1, 2, {  action: 'responsed', value: res => res.id }]

// 响应前的数据
[1, 2, undefined]

// => 响应后的数据
// 假设响应数据为  { id: 10 }
[1, 2, 10]
```

## 在对象中使用
```javascript
{
  a: {  action: 'responsed', value: res => res.id },
  b: {  action: 'responsed', value: res => res.id, default: 1 },
}
// 占位符设置到对象属性上时，可如下简写
// key以“+”开头
{
  '+a': res => res.id,  // 只设置了getter函数
  '+b': [res => res.id, 1],   // 设置了getter函数和默认值
}

// 响应前的数据
{
  a: undefined,
  b: 1,
}

// => 响应后的数据
// 假设响应数据为  { id: 10 }
{
  a: 10,
  b: 10,
}
```

## 在非数组和对象上
```javascript
// 直接以占位符表示
{
  action: 'responsed',
  value: res => res.data,
  default: { name: '', age: 0 }
}

// 响应前的数据
{ name: '', age: 0 }

// => 响应后的数据
// 假设响应数据为  { data: { name: 'Tom', age: 18 } }
{ name: 'Tom', age: 18 }
```

## 在数组和对象的组合中使用
```javascript
[
  1,
  {action: 'responsed', value: res => res.id, default: 12},
  res => res.id,
  4,
  {
    a: 1,
    b: 2,
    '+c': res => res.id,
    d: {action: 'responsed', value: res => res.id, default: 24},
    e: [
      {action: 'responsed', value: res => res.id, default: 36},
      3,
      6
    ]
  }
]

// 响应前的数据
[
  1,
  12,
  res => res.id,  // 简写只能在+为前缀key的对象中使用，因此不编译
  4,
  {
    a: 1,
    b: 2,
    c: undefined,
    d: 24,
    e: [
      36,
      3,
      6
    ]
  }
]

// => 响应后的数据
// 假设响应数据为  { id: 10 }
[
  1,
  10,
  res => res.id,  // 简写只能在+为前缀key的对象中使用，因此不编译
  4,
  {
    a: 1,
    b: 2,
    c: 10
    d: 10,
    e: [
      10,
      3,
      6
    ]
  }
]
```
:::danger 限制1 
延迟数据更新只有在静默模式下，且在`onSuccess`回调函数中同步调用`updateState`函数有效，否则可能会造成数据错乱或报错。
:::

:::danger 限制2
如果`updateState`更新后的值中有循环引用的，延迟数据更新将不会生效
:::