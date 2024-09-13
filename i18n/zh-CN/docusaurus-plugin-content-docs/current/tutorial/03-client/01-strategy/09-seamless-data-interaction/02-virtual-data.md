---
title: 虚拟数据
---

实际上，虚拟数据是一个拥有唯一 id 的引用对象，其追查机制就是通过先生成虚拟数据 id 和响应数据之间的映射，再通过虚拟数据 id 查找并替换为实际值来实现的。

当原始值为引用类型时，表现和原始值相同，但基本类型的虚拟数据使用的是`Number, String, Boolean`封装类，以及自定义的`Undefined, Null`封装类，它们的表现形式与原始值有一些偏差，以下列出了虚拟数据的特性，以及虚拟数据的辅助函数的使用，辅助函数详情将在章节末尾介绍。

## 字符串拼接

当虚拟数据进行字符串拼接时，将被转换为虚拟数据 id 进行拼接。

```javascript
const virtualData = createVirtualData(1);
'a' + virtualData; // a[vd:xxxxxx]
1 + virtualData; // 1[vd:xxxxxx]
```

## 数据比较

虚拟数据无法直接用于比较，但实际场景中经常使用虚拟数据和实际数据混合比较，此时可使用`equals`比较。

```javascript
import { equals } from 'alova/client';

equals('a', 'a'); // true

const virtualData1 = createVirtualData(1);
const virtualData2 = virtualData1.clone(); // 克隆虚拟数据
equals(virtualData1, virtualData2); // virtualData1和virtualData2的id相同时为true
equals(virtualData1, '[vd:xxxxxx]'); // virtualData1的id也为[vd:xxxxxx]时为true
```

## 参与运算

参与运算如`+-*/%`，数值比较、以及位运算时，无法自动转换为原始值，可通过`dehydrateVData`转换为原始值再进行计算。

```javascript
import { dehydrateVData } from 'alova/client';

const virtualData = createVirtualData(1);
dehydrateVData(virtualData) + 1; // 2
dehydrateVData(virtualData) > 0; // true
```

## 类型操作符

因为虚拟数据在基本数据类型上使用封装类实现，使用`typeof`获取类型时将始终会返回`object`，也可通过`dehydrateVData`转换为原始值再获取类型

```javascript
const vNum = createVirtualResponse(1);
typeof vNum === 'object'; // true
const vUndef = createVirtualResponse(undefined);
typeof vUndef === 'object'; // true

typeof dehydrateVData(vNum) === 'number'; // true
typeof dehydrateVData(vUndef) === 'undefined'; // true
```

为了解决这个问题，你可以使用虚拟数据辅助函数**dehydrateVData**，它可以获取一个虚拟数据的原始值，当遇到非虚拟数据时将原样返回

```javascript
const vNum = createVirtualResponse(1);
typeof dehydrateVData(vNum) === 'number'; // true
dehydrateVData(vNum) === 1; // true
dehydrateVData('string') === 'string'; // true
```

## 视图展示

默认情况下，虚拟数据展示到视图中时将隐式调用`toString`，但有时候也会遇到显示错乱的问题，以及在**react**中渲染一个对象将会报以下错误：

```
Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.
```

因此建议在显示时使用`dehydrateVData`转换为原始数据进行展示。

## 虚拟数据辅助函数

### dehydrateVData

将虚拟数据脱水，返回它的原始值，如 target 为非虚拟数据则原样返回。

```typescript
// type
function dehydrateVData(target: any): any;

// example
dehydrateVData(1); // 1
const virtualData = createVirtualData(1);
dehydrateVData(virtualData); // 1
```

### stringifyVData

虚拟数据字符串化，返回虚拟数据 id，当 returnOriginalIfNotVData 设置为 false 时，非虚拟数据将原样返回。

```typescript
// type
function stringifyVData(target: any, returnOriginalIfNotVData?: boolean): any;

// example
stringifyVData(1); // 1
stringifyVData(1, false); // undefined

const virtualData = createVirtualData(1);
stringifyVData(virtualData); // [vd:xxxxxx]
```

### equals

以兼容虚拟数据的方式判断两个值是否相等，当没有虚拟数据参与比较时将严格对比，否则将对比虚拟数据 id 是否相同，如果比较数据可能存在虚拟数据参与，则建议使用此函数比较。

```typescript
// type
function equals(prevValue: any, nextValue: any): boolean;

// example
equals('a', 'a'); // true
const virtualData1 = createVirtualData(1);
const virtualData2 = virtualData1.clone(); // 克隆虚拟数据
equals(virtualData1, virtualData2); // virtualData1和virtualData2的id相同时为true
equals(virtualData1, '[vd:xxxxxx]'); // virtualData1的id也为[vd:xxxxxx]时为true
```

### isVData

判断目标数据是否为虚拟数据

```typescript
// type
function isVData(target: any): boolean;

// example
isVData(1); // false
const virtualData = createVirtualData(1);
isVData(virtualData); // true
isVData('[vd:xxxxxx]'); //true
```

## 虚拟数据的替换限制

虚拟数据的追查机制只能深度遍历相关数据，然后将具有虚拟数据标识的数据替换为实际，如果一些数据依赖虚拟数据生成的，在虚拟数据替换为实际数据后不会重新计算。

以下情况，即使 virtualId 替换为实际数据了，这个请求的 id 也不会重新再计算，因此如果需要替换，需要直接将 virtualId 作为请求参数，示例如下：

```javascript
const deleteTodo = virtualId => {
  return alova.Delete('/deleteTodo', {
    id: dehydrateVData(virtualId) === null ? 1 : 2
  });
};
```

但如果将虚拟数据作为字符串拼接时，它将自动转换为虚拟数据 id 参与字符串拼接，这种情况将会有效。以下情况，请求 id 在开始时的值为`id_[vd:xxxxxx]`，当 virtualId 被替换为响应值后（假设替换为 1），它将自动更新为`id_1`。

```javascript
const deleteTodo = virtualId => {
  return alova.Delete('/deleteTodo', {
    id: 'id'_virtualId
  });
};
```

## 接下来

虽然实现无感交互已经足够简单了，但相比保守请求还是有一些额外的处理，具体实现大致分为以下几个步骤。

1. 以保守请求方式实现功能；
2. 手动更新列表数据，实现本地化数据补偿；
3. 记录数据操作，以便在还有未提交修改时手动补充到最新记录；
4. 将未提交的数据手动补偿到列表，以便即使数据未提交也能展示最新状态；
5. 修改未提交数据时，拦截带虚拟数据的请求；

接下来，我们将以一个简单的示例进行演示。
