---
title: usePagination
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 安装

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/hooks --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/hooks
```

</TabItem>
</Tabs>

:::info
在使用扩展hooks前，确保你已熟悉了alova的基本使用。
:::

为分页场景下设计的hook，你可以在下拉加载和页码翻页两种分页场景下使用它，**此hook提供了丰富的特性，助你的应用打造性能更好，使用更便捷的分页功能**。

## 特性
- ✨丰富全面的分页状态；
- ✨丰富全面的分页事件；
- ✨更改page、pageSize自动获取指定分页数据；
- ✨数据缓存，无需重复请求相同参数的列表数据；
- ✨前后页预加载，翻页不再等待；
- ✨搜索条件监听自动重新获取页数；
- ✨支持列表数据的新增、编辑、删除；
- ✨支持刷新指定页的数据，无需重置；
- ✨请求级搜索防抖，无需自行维护；

## 示例

[页码列表](../../example/paginated-list)

[下拉加载更多](../../example/load-more)

## 引入
<Tabs>
<TabItem value="1" label="vue">

```javascript
import { usePagination } from '@alova/hooks/vue';
```

</TabItem>
<TabItem value="2" label="react">

```javascript
import { usePagination } from '@alova/hooks/react';
```

</TabItem>
<TabItem value="3" label="svelte">

```javascript
import { usePagination } from '@alova/hooks/svelte';
```

</TabItem>
</Tabs>

## 用法
展示和操作学生列表，以vue为例。
```javascript
import { ref, watchEffect } from 'vue';
import { queryStudents, removeStudent, editStudent } from './api.js';
import { usePagination } from '@alova/hooks/vue';
import { useRequest } from 'alova';

// 搜索条件状态
const studentName = ref('');
const clsName = ref('');

const {
  // 加载状态
  loading,

  // 列表数据
  data,

  // 是否为最后一页
  // 下拉加载时可通过此参数判断是否还需要加载
  isLastPage,

  // 当前页码，改变此页码将自动触发请求
  page,

  // 每页数据条数
  pageSize,

  // 列表项移除函数
  remove,

  // 列表项插入函数
  insert,

  // 刷新函数,你可以指定刷新某一页数据
  refresh,

  // 重置函数，调用后将清空数据并重新加载第一页
  reload
} = usePagination(
  // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
  (page, pageSize) => queryStudents(page, pageSize, studentName.value, clsName.value),
  {
    watchingStates: [studentName, clsName], // 外部监听的状态，如搜索条件
    initialData: [], // 请求前的初始数据，
    debounce: 300, // 防抖参数，单位为毫秒数
    // append: true, // 是否启用追加模式，在下拉加载时需设置为true
  }
);


// 下一页
const handleNextPage = () => {
  page.value++;
};

// 通过静默提交移除列表项
const {
  send: removeSend,
  onSuccess: onRemoveSuccess
} = useRequest(id => removeStudent(id), {
  immediate: false,
  silent: true,
});
onRemoveSuccess((_, removeId) => {
  // 传入移除的索引项移除制定项
  remove(students.value.findIndex((s) => s.id === removeId));
});


// 新增或编辑列表项
const detail = ref({
  name: '',
  cls: '',
});
const {
  loading: submiting,
  send: sendStudentEdit,
  onSuccess,
} = useRequest(
  selectedId => editStudent(detail.value.name, detail.value.cls, selectedId),
  {
    immediate: false,
    silent: true,
  }
);
onSuccess((_, selectedId) => {
  if (selectedId) {
    // 编辑时，刷新更新的列表项所在页，无需重置列表
    const refreshPage = Math.floor(students.value.findIndex(({ id }) => id === selectedId) / pageSize.value) + 1;
    refresh(refreshPage);
  } else {
    // 添加时，重置列表
    reload();
  }
});

// 提交学生信息回调，selectedId有值表示编辑，否则为新增
const handleSubmit = selectedId => {
  sendStudentEdit(selectedId);
};
```

## 列表操作函数说明

usePagination提供了功能完善的列表操作函数，它可以在不重新请求列表的情况下，做到与重新请求列表一致的效果，大大提高了页面的交互体验，具体的函数说明继续往下看吧！

### insert

列表项插入函数，它将会在插入列表项后去掉末尾的一项，来保证和重新请求当前页数据一致的效果。

在**非append模式**下（页码翻页场景），它将会以当前页的列表数据为索引参考进行插入，如果需要插入到第一页，你可以在`onBefore`回调中先设置page为1，这样就可以插入到第一页了。
```javascript
insert({ /** ... */}, {
  onBefore: () => {
    // 在此将page设置为1，可插入到第一页
  },
  onAfter: () => {},
});
```

在**append模式**下（下拉加载场景），因为分页数据是追加到原列表末尾的，所以它会以多页数据为索引参考进行插入，如果你想要在插入后滚动到最顶部，可以在`onAfter`中执行滚动操作。
```javascript
insert({ /** ... */}, {
  onBefore: () => {},
  onAfter: () => {
    window.scrollTo(0, {});
  },
});
```

:::caution 注意
onBefore、插入操作、onAfter都是串行异步执行，因此在`onBefore`中更改了状态，视图将会刷新再执行插入操作。
:::
:::caution 注意
为了让数据正确，insert函数调用会清除全部缓存。
:::

### remove

列表项移除函数，在下一页有缓存的情况下，它将会在移除一项后使用下一页的缓存补充到列表项尾部，来保证和重新请求当前页数据一致的效果，在**append模式**和**非append模式**下表现相同。

但在以下两种情况下，它将重新发起请求刷新对应页的数据：
1. 下一页没有缓存
2. 同步连续调用了超过下一页缓存列表项的数据，缓存数据已经不够补充到当前页列表了。

:::caution 注意
为了让数据正确，remove函数调用会清除全部缓存。
:::

### refresh

当你在数据操作后不希望本地更新列表项，而是重新请求服务端的数据，你可以用refresh刷新任意页的数据，而不需要重置列表数据让用户又从第一页开始浏览。

### reload

重置列表，它将清空全部缓存，并重新加载第一页。

### replace
敬请期待...

## 类型

<Tabs>
<TabItem value="1" label="vue">

```typescript
interface UsePaginationReturnType<LD extends any[], R> {
	loading: Ref<boolean>;
	error: Ref<Error | undefined>;
	downloading: Ref<Progress>;
	uploading: Ref<Progress>;
	page: Ref<number>;
	pageSize: Ref<number>;
	data: Ref<LD>;
	pageCount: ComputedRef<number | undefined>;
	total: ComputedRef<number | undefined>;
	isLastPage: ComputedRef<boolean>;

	abort: () => void;
	send: (...args: any[]) => Promise<R>;
	onSuccess: (handler: SuccessHandler<R>) => void;
	onError: (handler: ErrorHandler) => void;
	onComplete: (handler: CompleteHandler) => void;

	fetching: Ref<boolean>;
	onFetchSuccess: (handler: SuccessHandler<R>) => void;
	onFetchError: (handler: ErrorHandler) => void;
	onFetchComplete: (handler: CompleteHandler) => void;

	/**
	 * 刷新指定页码数据，此函数将忽略缓存强制发送请求
	 * @param refreshPage 刷新的页码
	 */
	refresh: (refreshPage: number) => void;

	/**
	 * 插入一条数据
	 * onBefore、插入操作、onAfter三个都需要分别顺序异步执行，因为需要等待视图更新再执行
	 * @param item 插入项
	 * @param config 插入配置
	 */
	insert: (item: LD[number], config?: InsertConfig) => void;

	/**
	 * 移除一条数据
	 * @param index 移除的索引
	 */
	remove: (index: any) => void;

	/**
	 * 从第一页开始重新加载列表，并清空缓存
	 */
	reload: () => void;
}

/**
 * 基于alova.js的vue分页hook
 * 分页相关状态自动管理、前后一页预加载、自动维护数据的新增/编辑/移除
 *
 * @param handler method创建函数
 * @param config pagination hook配置
 * @returns {UsePaginationReturnType}
 */
export declare function usePagination<S extends Ref, E extends Ref, R, T, RC, RE, RH, LD extends any[], WS extends WatchSource[]>(
	handler: (page: number, pageSize: number) => Method<S, E, R, T, RC, RE, RH>,
	config: PaginationConfig<R, LD, WS>
): UsePaginationReturnType<LD, R>;
```

</TabItem>
<TabItem value="2" label="react">

```typescript
type ReactState<S> = [S, Dispatch<SetStateAction<S>>];
interface UsePaginationReturnType<LD extends any[], R> {
	loading: boolean;
	error: Error | undefined;
	downloading: Progress;
	uploading: Progress;
	page: ReactState<number>;
	pageSize: ReactState<number>;
	data: LD;
	pageCount: number | undefined;
	total: number | undefined;
	isLastPage: boolean;

	abort: () => void;
	send: (...args: any[]) => Promise<R>;
	onSuccess: (handler: SuccessHandler<R>) => void;
	onError: (handler: ErrorHandler) => void;
	onComplete: (handler: CompleteHandler) => void;

	fetching: boolean;
	onFetchSuccess: (handler: SuccessHandler<R>) => void;
	onFetchError: (handler: ErrorHandler) => void;
	onFetchComplete: (handler: CompleteHandler) => void;

	/**
	 * 刷新指定页码数据，此函数将忽略缓存强制发送请求
	 * @param refreshPage 刷新的页码
	 */
	refresh: (refreshPage: number) => void;

	/**
	 * 插入一条数据
	 * onBefore、插入操作、onAfter三个都需要分别顺序异步执行，因为需要等待视图更新再执行
	 * @param item 插入项
	 * @param config 插入配置
	 */
	insert: (item: LD[number], config?: InsertConfig) => void;

	/**
	 * 移除一条数据
	 * @param index 移除的索引
	 */
	remove: (index: any) => void;

	/**
	 * 从第一页开始重新加载列表，并清空缓存
	 */
	reload: () => void;
}

/**
 * 基于alova.js的react分页hook
 * 分页相关状态自动管理、前后一页预加载、自动维护数据的新增/编辑/移除
 *
 * @param handler method创建函数
 * @param config pagination hook配置
 * @returns {UsePaginationReturnType}
 */
export declare function usePagination<S, E, R, T, RC, RE, RH, LD extends any[], WS extends DependencyList>(
	handler: (page: number, pageSize: number) => Method<S, E, R, T, RC, RE, RH>,
	config: PaginationConfig<R, LD, WS>
): UsePaginationReturnType<LD, R>;

```

</TabItem>
<TabItem value="3" label="svelte">

```typescript
interface UsePaginationReturnType<LD extends any[], R> {
	loading: Writable<boolean>;
	error: Writable<Error | undefined>;
	downloading: Writable<Progress>;
	uploading: Writable<Progress>;
	page: Writable<number>;
	pageSize: Writable<number>;
	data: Writable<LD>;
	pageCount: Readable<number | undefined>;
	total: Readable<number | undefined>;
	isLastPage: Readonly<Readable<boolean>>;

	abort: () => void;
	send: (...args: any[]) => Promise<R>;
	onSuccess: (handler: SuccessHandler<R>) => void;
	onError: (handler: ErrorHandler) => void;
	onComplete: (handler: CompleteHandler) => void;

	fetching: Writable<boolean>;
	onFetchSuccess: (handler: SuccessHandler<R>) => void;
	onFetchError: (handler: ErrorHandler) => void;
	onFetchComplete: (handler: CompleteHandler) => void;

	/**
	 * 刷新指定页码数据，此函数将忽略缓存强制发送请求
	 * @param refreshPage 刷新的页码
	 */
	refresh: (refreshPage: number) => void;

	/**
	 * 插入一条数据
	 * onBefore、插入操作、onAfter三个都需要分别顺序异步执行，因为需要等待视图更新再执行
	 * @param item 插入项
	 * @param config 插入配置
	 */
	insert: (item: LD[number], config?: InsertConfig) => void;

	/**
	 * 移除一条数据
	 * @param index 移除的索引
	 */
	remove: (index: any) => void;

	/**
	 * 从第一页开始重新加载列表，并清空缓存
	 */
	reload: () => void;
}

/**
 * 基于alova.js的svelte分页hook
 * 分页相关状态自动管理、前后一页预加载、自动维护数据的新增/编辑/移除
 *
 * @param handler method创建函数
 * @param config pagination hook配置
 * @returns {UsePaginationReturnType}
 */
export declare function usePagination<S extends Writable<any>, E extends Writable<any>, R, T, RC, RE, RH, LD extends any[], WS extends Readable<any>[]>(
	handler: (page: number, pageSize: number) => Method<S, E, R, T, RC, RE, RH>,
	config: PaginationConfig<R, LD, WS>
): UsePaginationReturnType<LD, R>;
```

</TabItem>
</Tabs>


## 限制

1. 列表请求支持缓存功能，它极大地提高了列表性能，当你对列表进行操作时，其内部都会自行维护它所产生的缓存，目前是通过修改每个Method实例的**name**属性实现追踪的，因此传入usePagination的Method实例暂不支持自定义name，这可能会影响到你对Method的管理，后续的版本中我们也将对它进行优化。
2. `insert`函数限制，因为usePagination所返回的data并不是useWatcher返回的data，目前暂无法使用[延迟数据更新](../../06-next-step/08-delayed-data-update.md)功能，如果你的新增列表项依赖服务端数据，建议使用`refresh`或`reload`重新请求数据，同时我们将在后续的版本中陆续支持。