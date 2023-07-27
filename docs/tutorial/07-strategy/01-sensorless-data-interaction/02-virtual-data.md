---
title: Virtual data
sidebar_position: 20
---

In fact, virtual data is a reference object with a unique id, and its tracking mechanism is realized by first generating a mapping between virtual data id and response data, and then finding and replacing it with the actual value through virtual data id.

When the original value is a reference type, the performance is the same as the original value, but the virtual data of the basic type uses `Number, String, Boolean` encapsulation classes, as well as custom `Undefined, Null` encapsulation classes, and their expressions are the same as There are some deviations from the original value. The characteristics of the virtual data and the use of auxiliary functions for the virtual data are listed below. The details of the auxiliary functions will be introduced at the end of the chapter.

## string concatenation

When virtual data is concatenated, it will be converted to virtual data id for splicing.

```javascript
const virtualData = createVirtualData(1);
'a' + virtualData; // a[vd:xxxxxx]
1 + virtualData; // 1[vd:xxxxxx]
```

## Data Comparison

Virtual data cannot be directly used for comparison, but virtual data and actual data are often mixed and compared in actual scenarios. In this case, `equals` can be used for comparison.

```javascript
import { equals } from '@alova/scene-*';

equals('a', 'a'); // true

const virtualData1 = createVirtualData(1);
const virtualData2 = virtualData1.clone(); // clone virtual data
equals(virtualData1, virtualData2); // true when the ids of virtualData1 and virtualData2 are the same
equals(virtualData1, '[vd:xxxxxx]'); // true when the id of virtualData1 is also [vd:xxxxxx]
```

## Participate in operations

When participating in operations such as `+-*/%`, numerical comparison, and bit operations, it cannot be automatically converted to the original value. It can be converted to the original value through `dehydrateVData` and then calculated.

```javascript
import { dehydrateVData } from '@alova/scene-*';

const virtualData = createVirtualData(1);
dehydrateVData(virtualData) + 1; // 2
dehydrateVData(virtualData) > 0; // true
```

## type operator

Because the virtual data is implemented using the encapsulation class on the basic data type, `object` will always be returned when using `typeof` to get the type, and it can also be converted to the original value by `dehydrateVData` to get the type

```javascript
const vNum = createVirtualResponse(1);
typeof vNum === 'object'; // true
const vUndef = createVirtualResponse(undefined);
typeof vUndef === 'object'; // true

typeof dehydrateVData(vNum) === 'number'; // true
typeof dehydrateVData(vUndef) === 'undefined'; // true
```

To solve this problem, you can use the virtual data helper function **dehydrateVData**, which can get the original value of a virtual data, and return it unchanged when encountering non-virtual data

```javascript
const vNum = createVirtualResponse(1);
typeof dehydrateVData(vNum) === 'number'; // true
dehydrateVData(vNum) === 1; // true
dehydrateVData('string') === 'string'; // true
```

## View display

By default, `toString` will be called implicitly when the virtual data is displayed in the view, but sometimes you will encounter problems with display confusion, and rendering an object in **react** will report the following error:

```
Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.
```

Therefore, it is recommended to use `dehydrateVData` to convert to raw data for display.

## virtual data helper functions

### dehydrateVData

Dehydrate virtual data and return its original value, if target is non-virtual data, return it as it is.

```typescript
// type
function dehydrateVData(target: any): any;

// example
dehydrateVData(1); // 1
const virtualData = createVirtualData(1);
dehydrateVData(virtualData); // 1
```

### stringifyVData

Stringify virtual data, return virtual data id, when returnOriginalIfNotVData is set to false, non-virtual data will be returned as-is.

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

Judge whether two values are equal in a way that is compatible with virtual data. When there is no virtual data to participate in the comparison, it will be strictly compared. Otherwise, it will be compared whether the virtual data id is the same. If there may be virtual data involved in the comparison data, it is recommended to use this function for comparison.

```typescript
// type
function equals(prevValue: any, nextValue: any): boolean;

// example
equals('a', 'a'); // true
const virtualData1 = createVirtualData(1);
const virtualData2 = virtualData1.clone(); // clone virtual data
equals(virtualData1, virtualData2); // true when the ids of virtualData1 and virtualData2 are the same
equals(virtualData1, '[vd:xxxxxx]'); // true when the id of virtualData1 is also [vd:xxxxxx]
```

###isVData

Determine whether the target data is virtual data

```typescript
// type
function isVData(target: any): boolean;

// example
isVData(1); // false
const virtualData = createVirtualData(1);
isVData(virtualData); // true
isVData('[vd:xxxxxx]'); //true
```

## Replacement restrictions for virtual data

The tracing mechanism of virtual data can only deeply traverse relevant data, and then replace the data with virtual data identifiers with actual data. If some data is generated by virtual data, it will not be recalculated after virtual data is replaced with actual data.

In the following cases, even if the virtualId is replaced with actual data, the id of the request will not be recalculated. Therefore, if replacement is required, the virtualId must be directly used as a request parameter. The example is as follows:

```javascript
const deleteTodo = virtualId => {
  return alova.Delete('/deleteTodo', {
    id: dehydrateVData(virtualId) === null ? 1 : 2
  });
};
```

But if virtual data is concatenated as string, it will be automatically converted to virtual data id to participate in string concatenation, which will work. In the following cases, the value of the request id at the beginning is `id_[vd:xxxxxx]`, and when virtualId is replaced with the response value (assuming it is replaced with 1), it will be automatically updated to `id_1`.

```javascript
const deleteTodo = virtualId => {
   return alova. Delete('/deleteTodo', {
     id: 'id'_virtualId
   });
};
```

## Next

Although it is simple enough to realize non-inductive interaction, there are still some additional processing compared with conservative requests. The specific implementation is roughly divided into the following steps.

1. Implement functions in a conservative request manner;
2. Manually update the list data to realize localized data compensation;
3. Record data operations so that you can manually add to the latest records when there are unsubmitted modifications;
4. Manually compensate the unsubmitted data to the list, so that the latest status can be displayed even if the data is not submitted;
5. When modifying unsubmitted data, intercept requests with virtual data;

Next, we will demonstrate with a simple example.
