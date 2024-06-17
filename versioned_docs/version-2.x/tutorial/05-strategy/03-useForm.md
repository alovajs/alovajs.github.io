---
title: Form submit strategy
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

A hook designed for form submission. Through this hook, you can easily implement form drafts and multi-page (multi-step) forms. In addition, it also provides common functions such as form reset.

## Example

[Form Submission Demo](/tutorial/example/form-hook)

## Features

- draft form;
- Multi-page (multi-step) forms;
- Form submission automatically resets data;
- Reset form data manually;

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```bash
# npm
npm install @alova/scene-vue --save
#yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
#yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
#yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## Usage

### Basic usage

Demonstrates basic use of form hooks.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <input v-model="form.name" />
  <select v-model="form.cls">
    <option value="1">class 1</option>
    <option value="2">class 2</option>
    <option value="3">class 3</option>
  </select>
  <button
    @click="handleSubmit"
    :loading="submitting">
    submit
  </button>
</template>

<script setup>
  import { formSubmit } from './api.js';
  import { useForm } from '@alova/scene-vue';

  const {
    // submit status
    loading: submitting,

    // Responsive form data, the content is determined by initialForm
    form,

    // submit data function
    send: submit,

    // Submit successful callback binding
    onSuccess,

    // Submit failure callback binding
    onError,

    // Submit completed callback binding
    onComplete
  } = useForm(
    formData => {
      // Form data can be converted and submitted here
      return formSubmit(formData);
    },
    {
      // Initialize form data
      initialForm: {
        name: '',
        cls: '1'
      }
    }
  );

  // submit form data
  const handleSubmit = () => {
    // Validate form data...
    submit();
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { formSubmit } from './api.js';
import { useForm } from '@alova/scene-react';

const App = () => {
  const {
    // submit status
    loading: submitting,

    // Responsive form data, the content is determined by initialForm
    form,

    // submit data function
    send: submit,

    // update form item
    updateForm,

    // Submit successful callback binding
    onSuccess,

    // Submit failure callback binding
    onError,

    // Submit completed callback binding
    onComplete
  } = useForm(
    formData => {
      // Form data can be converted and submitted here
      return formSubmit(formData);
    },
    {
      // Initialize form data
      initialForm: {
        name: '',
        cls: '1'
      }
    }
  );

  // submit form data
  const handleSubmit = () => {
    // Validate form data...
    submit();
  };

  return (
    <div>
      <input
        value={form.name}
        onChange={({ target }) => updateForm({ name: target.value })}
      />
      <select
        value={form.cls}
        onChange={({ target }) => updateForm({ cls: target.value })}>
        <option value="1">class 1</option>
        <option value="2">class 2</option>
        <option value="3">class 3</option>
      </select>
      <button
        onClick={handleSubmit}
        loading={submitting}>
        submit
      </button>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { formSubmit } from './api.js';
  import { useForm } from '@alova/scene-svelte';

  const {
    // submit status
    loading: submitting,

    // Responsive form data, the content is determined by initialForm
    form,

    // submit data function
    send: submit,

    // Submit successful callback binding
    onSuccess,

    // Submit failure callback binding
    onError,

    // Submit completed callback binding
    onComplete
  } = useForm(
    formData => {
      // Form data can be converted and submitted here
      return formSubmit(formData);
    },
    {
      // Initialize form data
      initialForm: {
        name: '',
        cls: '1'
      }
    }
  );

  // submit form data
  const handleSubmit = () => {
    // Validate form data...
    submit();
  };
</script>

<input bind:value="{$form.name}" />
<select bind:value="{$form.cls}">
  <option value="1">class 1</option>
  <option value="2">class 2</option>
  <option value="3">class 3</option>
</select>
<button
  on:click="{handleSubmit}"
  loading="{$submitting}">
  submit
</button>
```

</TabItem>
</Tabs>

`useForm` will not request by default, and the request will be sent after calling `send`. At the same time, the callback function of `useForm` will pass in the latest form data. If you need to convert the data before submitting, you can convert it here, or Can be converted in the `formSubmit` function.

:::warning Caution

1. `initialForm` is to set the initial form data, `initialData` is to set the initial response data, pay attention to the distinction;
2. `updateForm` is to update the form data, and `update` is to update the response data, pay attention to the distinction;

:::

The above example only shows a simple form submission function, there is no difference between ordinary form submissions, but `useForm` also implements more practical functions, let us continue to look down.

### Submit auto reset form

Many times, we need to reset the form data after the form is submitted. We always need to manually reassign values one by one when implementing it ourselves, and `useForm` can help us do it automatically.

```javascript
useForm(submitData, {
  //...
  // highlight-start
  // Set this parameter to true to automatically reset the form data after submission
  resetAfterSubmitting: true
  // highlight-end
});
```

If you need to manually reset the form data, you can also do it by calling the `reset` function.

```javascript
const {
  // highlight-start
  // form reset function
  reset
  // highlight-end
} = useForm(submitData, {
  //...
});

// highlight-start
const handleReset = () => {
  reset();
};
// highlight-end
```

### Update form data

When editing a form, we need to display the data of the original form. At this time, we can use `updateForm` to asynchronously update the form data.

```javascript
const {
   // ...
   updateForm
} = useForm(submitData, {
   // ...
   {
     //Initialize form data
     initialForm: {
       name: '',
       cls: '1'
     }
   }
});

// Request form data and update it to the form
const { onSuccess } = useRequest(getData);
onSuccess(({ data }) => {
   updateForm({
     name: data.name,
     cls: data.cls
   });
});
```

### Form draft

`useForm` also provides a form draft function, even if the page is refreshed before the data is reset, the form data can be restored. The principle is to use the storage adapter on the alova instance to persist the form data. You only need to set `store` to true when using it.

```javascript
useForm(submitData, {
  //...
  // highlight-start
  // Turn on persistence to save data. After setting to true, uncommitted data will be persisted in real time
  store: true
  // highlight-end
});
```

Before the data is persisted, `JSON.stringify` will be called to convert it into a JSON string. By default, the form data will be serialized when it is persisted. `useForm` has built-in `Date` and `RegExp` instances , which will be useful when using timepickers.

In the form data only involves `Date` and `RegEYou don’t need to do more for xp` instances, but if there are other non-JSON data, such as `moment` instances, we need to customize the serializer, but don’t worry, the custom serializer is very simple, the following will show the settings A `moment` serializer.

```javascript
import moment from 'moment';
const momentSerializer = {
   // forward is called when serializing
   // Need to judge whether it is a moment instance, if it is not the target value, return undefined, indicating that it will not be processed
   forward: data => moment.isMoment(data) ? data.valueOf() : undefined,

   // backward is called during deserialization, data is the value returned in forward
   backward: timestamp => moment(timestamp);
};

useForm(
   submitData,
   {
     store: {
       enable: true,
       serializers: {
         moment: momentSerializer
       }
     }
   }
);
```

### Multi-page/multi-step forms

Many times we encounter situations where form items are divided into multiple pages, or filled in multiple steps, and submitted in a unified manner at the end, such as multi-step user registration, questionnaire filling, etc., and forms with multiple steps may have interdependence Relationship, if realized by itself will bring some trouble. And `useForm` realizes form data sharing, you can get the same form data in different pages or components, which solves the problem of multi-step form data dependence, and does not need to summarize form data when submitting, and can submit directly.

When using, you need to set the id through `useForm`, and you can share the same form data between different pages with the same id. For example, we have a form that needs to go through 3 steps to fill out the form, and they will go through component A, component B, and component C respectively.

```
Component A -> Component B -> Component C
```

At this point, we can initialize the form data inside component A:

```javascript title=Component A
const returnStates = useForm(submitData, {
  initialForm: {
    step1Input: '',
    step2Input: '',
    step3Input: ''
  },
  // highlight-start
  id: 'testForm'
  // highlight-end
});
const { form, send } = returnStates;
```

In component B and component C, you can directly pass in the id in the first parameter to get the shared data in component A.

```javascript title=Component B, Component C
const returnStates = useForm('testForm');
const { form, send } = returnStates;
```

The `returnStates` returned by id in components B and C are the same reference as the `returnStates` in component A. You can use the same `form`, or you can call `send` in any component to submit the form data uniformly.

**additional**

When obtaining shared data by directly specifying the id in components B and C, the id must first initialize the form data, just like in component A, otherwise `the form data of id {1} is not initial` will be thrown mistake. If your multi-step form is not in a certain order, but in random order according to certain conditions, for example:

```bash
# possible order 1
Component B -> Component A -> Component C

# possible order 2
Component A -> Component C -> Component B

# possible order 3
Component C -> Component A -> Component B

#...
```

In this case, you can use `useForm` in component B, C like component A.

```javascript title=Component B, Component C
const returnStates = useForm(submitData, {
  initialForm: {
    step1Input: '',
    step2Input: '',
    step3Input: ''
  },
  id: 'testForm'
});
```

In this way, no matter which component is rendered first, the form with the id of testForm can be initialized, and the subsequent components will first use the initialized form data when encountering the id of testForm, and will not initialize again. This way you can initialize form data inside any component.

> More detailed multi-step forms can also be experienced and viewed in [Form Submission Demo](/tutorial/example/form-hook).

### Conditional filter

`useForm` can also be used in the filtering form used in data filtering scenarios, for example, if you want to search city information by city name, you can set `immediate=true`, it will start querying data at initialization, and then In the operation, call `send` to repeatedly query the data.

```javascript
const { send: searchData } = useForm(queryCity, {
  initialForm: {
    cityName: ''
  },
  immediate: true
});
```

:::warning Conditional Restrictions

In conditional filtering scenarios, `useForm` is more suitable for non-paginated list conditional queries. If you need to perform conditional queries in paginated lists, it is recommended to use [Pagination Request Strategy (usePagination)](/tutorial/strategy/usePagination).

:::

## API

### Hook configuration

Inherit all configurations from [**useRequest**](/api/core-hooks#userequest).

| Name                | Description                                                                                                                                                                  | Type                                                        | Default | Version |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- | ------- |
| initialForm         | initial form data                                                                                                                                                            | any                                                         | -       | -       |
| id                  | form id, the data data of the same id is the same reference, which can be used to share the same form data in multi-page forms. Single page form does not need to specify id | string \| number                                            | -       | -       |
| store               | Whether to save data persistently, after setting to true, uncommitted data will be persisted in real time                                                                    | boolean \| [StoreDetailConfig](#storedetailconfig) \| false | -       |
| resetAfterSubmiting | reset data after submission                                                                                                                                                  | boolean                                                     | false   | -       |

### Responsive data

Inherit all responsive data from [**useRequest**](/api/core-hooks#userequest).

| Name | Description                         | Type | Version |
| ---- | ----------------------------------- | ---- | ------- |
| form | form data,determined by initialForm | any  | -       |

#### StoreDetailConfig

| Name        | Description                                                                                                                                                                                                                                                             | Type                                                          | Default  | Version |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------- | ------- |
| enable      | Whether to enable persistent data                                                                                                                                                                                                                                       | boolean                                                       | required | -       |
| serializers | A collection of custom serializers, built-in serializers:<br/>1. The date serializer is used to convert dates<br/>2. The regexp serializer is used to convert regular expressions<br/>Yes Override the built-in serializer by setting the serializer with the same name | Record\<string \| number, [DataSerializer](#dataserializer)\> | -        | -       |

#### DataSerializer

| Name     | Description                                                                                                                                                                      | Type                                    | Default  | Versionthis |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- | ----------- |
| forward  | Serialization function, when serializing in forward, it needs to judge whether it is the specified data, and return the converted data, otherwise return undefined or not return | (data: any) => any \| undefined \| void | required | -           |
| backward | deserialization function, deserialization data directly                                                                                                                          | (data: any) => any \| undefined \| void | required | -           |

### Action function

Inherit all action functions of [**useRequest**](/api/core-hooks#userequest).

| name       | description                                                                     | function parameters                                                      | return value | version |
| ---------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------ | ------- |
| updateForm | Update one or more form data                                                    | newForm: Partial\<F\> \| (oldForm: F) => F)<br/> F is `initialForm` type | -            | -       |
| reset      | Reset to initialized data, if there is persistent data, it will also be cleared | -                                                                        | -            | -       |

### Event

Inherit all events from [**useRequest**](/api/core-hooks#userequest).

| Name      | Description                                     | Callback Parameters | Version |
| --------- | ----------------------------------------------- | ------------------- | ------- |
| onRestore | Triggered after the persistent data is restored | -                   | -       |
