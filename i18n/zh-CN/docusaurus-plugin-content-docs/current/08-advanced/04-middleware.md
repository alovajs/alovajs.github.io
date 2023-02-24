---
title: 请求中间件
sidebar_position: 40
---

请求中间件是一个异步函数，虽然只是一个函数，但它提供了强大的，几乎能控制一个请求的所有行为的能力。如果你只是使用 alova，那你应该很可能不需要使用请求中间件，因为它主要用于完成自定义的请求策略，无论简单还是复杂的请求策略，可能你都会用上它，接下来我们看下它到底有什么神通。

## 中间件函数

你可以在`useRequest`、`useWatcher`、`useFetcher`中使用请求中间件。以下是一个简单的请求中间件，它在请求前和请求后分别打印了一些信息，没有改变任何请求行为。

```javascript
useRequest(todoList, {
  async middleware(_, next) {
    console.log('before request');
    await next();
    console.log('after requeste');
  }
});
```

这里有几点你需要知道的，有关`next`函数调用的问题，这个函数也是一个异步函数，调用它可以继续发送请求，此时将会把 _loading_ 状态设置为 true，然后发送请求。next 的返回值是带有响应数据的 Promise 实例，你可以在中间件函数中操纵返回值。

## 控制响应数据

中间件函数的返回值将作为本次请求的响应数据参与后续的处理，如果中间件没有返回任何数据但调用了 `next`，则会将本次请求的响应数据参与后续处理。

```javascript
// 将会以修改后的result作为响应数据
useRequest(todoList, {
  async middleware(_, next) {
    const result = await next();
    result.code = 500;
    return result;
  }
});

// 将会以本次请求的响应数据参与后续处理
useRequest(todoList, {
  async middleware(_, next) {
    await next();
  }
});

// 将会以字符串abc作为响应数据
useRequest(todoList, {
  async middleware(_, next) {
    await next();
    return 'abc';
  }
});
```

这里还有一个特例，当既没有调用 `next`，又没有返回值时，将不再执行后续的处理，这表示*onSuccess*、_onError_、*onComplete*响应事件不会被触发。

```javascript
useRequest(todoList, {
  async middleware() {}
});
```

## 更改请求

有时候你想要更改请求，此时可以在 `next` 中指定另一个 method 实例，在发送请求时就会将这个 method 中的信息进行请求，同时你还可以通过 `next` 设置是否强制请求来穿透缓存，这也很简单。

```javascript
useRequest(todoList, {
  async middleware(_, next) {
    await next({
      // 更改请求的method实例
      method: newMethodInstance,

      // 本次是否强制请求
      force: true
    });
  }
});
```

## 控制错误

### 捕获错误

在中间件中，可以捕获 `next` 中产生的请求错误，捕获后，全局的`onError`钩子不再触发。

```javascript
useRequest(todoList, {
  async middleware(_, next) {
    try {
      await next();
    } catch (e) {
      console.error('捕获到错误', e);
    }
  }
});
```

### 抛出错误

当然，也可以在中间件中抛出一个自定义错误，即使请求正常也将会触发全局的`onError`钩子。

```javascript
// 在请求前抛出错误时，不会发送请求
useRequest(todoList, {
  async middleware(_, next) {
    throw new Error('error on before request');
    await next();
  }
});

// 在请求后抛出错误时，请求将被发送
useRequest(todoList, {
  async middleware(_, next) {
    await next();
    throw new Error('error on after request');
  }
});
```

## 控制响应延迟

在中间件中我们可以延迟响应，也可以提前响应，在提前的情况下，虽然获取不到响应数据，但可以返回一些其他的数据作为响应数据参与后续的处理。

```javascript
// 延迟1秒响应
useRequest(todoList, {
  async middleware(_, next) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    return next();
  }
});

// 立即响应，并使用字符串abc作为响应数据
useRequest(todoList, {
  async middleware(_, next) {
    return 'abc';
  }
});
```

## 不止于此

**至此，我们所提及的都是中间件的第二个参数 `next` 的使用，那第一个参数是做什么的呢？**

中间件第一个参数中包含了本次请求的一些信息，以及对`loading`、`data`和`onSuccess`等 useHook 中返回的状态和事件的控制函数。我们接着往下看！

## 包含的请求信息

```javascript
useRequest(todoList, {
  async middleware(context, next) {
    // 本次请求的method实例
    context.method;

    // send函数发送的参数数组，默认为[]
    context.sendArgs;

    // 本次请求命中的缓存数据
    context.cachedResponse;

    // useHook的配置集合
    context.config;

    // useHook返回的各项状态，包含以下属性
    // loading、data、error、downloading、uploading，以及通过managedStates管理的额外状态
    context.frontStates;
    // ...
  }
});
```

接下来，我们再来看看有哪些控制能力。

## 控制状态

`context.update`可以用于改变`context.frontStates`中的状态。

```javascript
useRequest(todoList, {
  async middleware(context, next) {
    context.update({
      // 提前修改loading状态为true
      loading: true,

      // 修改data值，如设置自定义的初始化数据
      data: {
        /* ... */
      }
    });

    // ...
  }
});
```

## 装饰事件

你还可以在中间件中装饰*onSuccess*、_onError_、*onComplete*回调函数，让它们变得更丰富，例如改变回调函数的参数，又或者接收回调函数的返回值，实现更多的功能。

你可以使用`decorateSuccess`、`decorateError`、`decorateComplete`函数来装饰回调函数。下面将成功回调作为示例，它装饰了 3 处地方：

1. 为 event 对象新增了`custom`属性；
2. 为成功回调函数新增了第二个参数，值为`extra data`；
3. 接收第二个成功回调函数的值，并打印它；

```javascript
const { onSuccess } = useRequest(todoList, {
  // ...
  async middleware(context, next) {
    // 装饰成功回调函数，以下函数参数解释：
    // handler: 绑定的回调函数
    // event: 回调函数对应的事件对象
    // index: 回调函数下标，表示当前正在执行第几个回调函数
    // length: 回调函数绑定个数
    context.decorateSuccess((handler, event, index, length) => {
      event.custom = 1;
      const received = handler(event, 'extra data');
      if (index === 1) {
        console.log(`接收到第${index + 1}个回调函数的返回值：`, received);
        // [打印信息] 接收到第2个回调函数的返回值：I'm second handler
      }
    });
    // ...
  }
});
onSuccess((event, extra) => {
  console.log(event.custom); // 1
  console.log(extra); // extra data
});
onSuccess((event, extra) => {
  return "I'm second handler";
});
```

`decorateError`、`decorateComplete`的用法与`decorateSuccess`相同。
