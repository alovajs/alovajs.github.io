:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

A hook designed for form submission. Through this hook, you can easily implement form drafts and multi-page (multi-step) forms. In addition, it also provides common functions such as form reset.

<!-- ## Example

[Form Submission Demo](/tutorial/example/react/form-hook) -->

## Features

- Form drafts;
- Multi-page (multi-step) forms;
- Form submission automatically resets data;
- Reset form data manually;

## Usage

### Basic usage

Demonstrates basic use of form hooks.

**vue:**

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
  import { useForm } from 'alova/client';

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


---

**react:**

```jsx
import { formSubmit } from './api.js';
import { useForm } from 'alova/client';

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


---

**svelte:**

```html
<script>
  import { formSubmit } from './api.js';
  import { useForm } from 'alova/client';

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


---

**solid:**

```jsx
import { formSubmit } from './api.js';
import { useForm } from 'alova/client';

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
        value={form().name}
        onChange={({ target }) => updateForm({ name: target.value })}
      />
      <select
        value={form().cls}
        onChange={({ target }) => updateForm({ cls: target.value })}>
        <option value="1">class 1</option>
        <option value="2">class 2</option>
        <option value="3">class 3</option>
      </select>
      <button
        onClick={handleSubmit}
        loading={submitting()}>
        submit
      </button>
    </div>
  );
};
```


`useForm` does not send a request by default; the request is sent after you call `send`. The callback also receives the latest form data, so you can transform it here, or transform it inside the `formSubmit` function.

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
useRequest(getData).onSuccess(({ data }) => {
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

Before the data is persisted, `JSON.stringify` converts it into a JSON string, so the form data is serialized by default. `useForm` has built-in serializers for `Date` and `RegExp` instances, which are handy when using time pickers.

When your form data only involves `Date` and `RegExp` instances, you don't need to do anything more. But if you have other non-JSON data, such as `moment` instances, you need a custom serializer. Don't worry — it is very simple, as the following `moment` serializer shows.

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

Often you split a form across multiple pages or steps and submit it all at the end — for example, multi-step registration or a questionnaire. Multi-step forms may depend on each other, which is troublesome to implement by hand. `useForm` shares form data, so the same data is available in different pages or components. This solves the multi-step dependency and lets you submit directly without gathering the data yourself.

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

In component B and component C, you can get the shared data by specifying the same id as component A.

```javascript title=Component B, Component C
const returnStates = useForm(submitData, {
  id: 'testForm'
});
const { form, send } = returnStates;
```

The `returnStates` returned by id in components B and C are the same reference as the `returnStates` in component A. You can use the same `form`, or you can call `send` in any component to submit the form data uniformly.

**additional**

If your multi-step form is not in a certain order, but in random order according to certain conditions, for example:

```bash
# possible order 1
Component B -> Component A -> Component C

# possible order 2
Component A -> Component C -> Component B

# possible order 3
Component C -> Component A -> Component B

#...
```

In this case, you can set the same `useForm` config as component A in component B and C.

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

<!-- > More detailed multi-step forms can also be experienced and viewed in [Form Submission Demo](/tutorial/example/react/form-hook). -->

### Conditional filter

`useForm` also works as a filter form for data filtering. For example, to search city information by name, set `immediate=true` so it queries at initialization; then call `send` again to re-query as needed.

```javascript
const { send: searchData } = useForm(queryCity, {
  initialForm: {
    cityName: ''
  },
  immediate: true
});
```

:::warning Conditional Restrictions

In conditional filtering scenarios, `useForm` is more suitable for non-paginated list conditional queries. If you need to perform conditional queries in paginated lists, it is recommended to use [Pagination Request Strategy (usePagination)](/tutorial/client/strategy/use-pagination).

:::

## API

### Hook configuration

Inherit all configurations from [**useRequest**](/api/core-hooks#userequest).

| Name                | Description                                                                                                                                                                  | Type                                                        | Default | Version |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- | ------- |
| initialForm         | initial form data                                                                                                                                                            | any                                                         | -       | -       |
| id                  | form id, the data data of the same id is the same reference, which can be used to share the same form data in multi-page forms. Single page form does not need to specify id | string \| number                                            | -       | -       |
| store               | Whether to save data persistently, after setting to true, uncommitted data will be persisted in real time                                                                    | boolean \| [StoreDetailConfig](#storedetailconfig) \| false | -       |
| resetAfterSubmitting | reset data after submission                                                                                                                                                 | boolean                                                     | false   | -       |

### Responsive data

Inherit all responsive data from [**useRequest**](/api/core-hooks#userequest).

| Name | Description                         | Type | Version |
| ---- | ----------------------------------- | ---- | ------- |
| form | form data,determined by initialForm | any  | -       |

#### StoreDetailConfig

| Name        | Description                                                                                                                                                                                                                                                             | Type                                                          | Default  | Version |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------- | ------- |
| enable      | Whether to enable persistent data                                                                                                                                                                                                                                       | boolean                                                       | required | -       |
| serializers | A collection of custom serializers. Built-in serializers:<br/>1. The date serializer converts dates<br/>2. The regexp serializer converts regular expressions<br/>You can override a built-in serializer by using the same name | Record\<string \| number, [DataSerializer](#dataserializer)\> | -        | -       |

#### DataSerializer

| Name     | Description                                                                                                                                                                      | Type                                    | Default  | Version     |
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
