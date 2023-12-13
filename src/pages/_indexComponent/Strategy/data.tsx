import Translate from '@docusaurus/Translate';

export const strategyList = [
  {
    title: <Translate id="homepage.strategy.useRequest">Basic request</Translate>,
    describe: (
      <Translate id="homepage.strategy.useRequest.desc">
        Send request with useRequest, it will automatically maintain the states related to this request.
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.useRequest.feature1">Similar to axios.</Translate>,
      <Translate id="homepage.strategy.useRequest.feature2">Maintains the states automatically.</Translate>,
      <Translate id="homepage.strategy.useRequest.feature3">Response cache.</Translate>,
      <Translate id="homepage.strategy.useRequest.feature4">Share the same request sent at the same time.</Translate>
    ],
    code: `const todoDetail = alova.Get('/todo', {
  params: {
    id: 1
  }
});
const {
  loading, data, error, 
  onSuccess, onError, onComplete,
  send, abort, update
} = useRequest(todoDetail);`,
    link: 'tutorial/getting-started/first-request'
  },
  {
    title: <Translate id="homepage.strategy.useWatcher">Request via states changed</Translate>,
    describe: (
      <Translate id="homepage.strategy.useWatcher.desc">
        When developing functions such as paging, data filtering, and fuzzy search, send requests immediately by
        watching states changes.
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.useWatcher.feature1">Request debounce.</Translate>,
      <Translate id="homepage.strategy.useWatcher.feature2">Ensure request timing.</Translate>,
      <Translate id="homepage.strategy.useWatcher.feature3">
        Filter whether to send a request when states changes.
      </Translate>
    ],
    code: `useWatcher(
  () => filterTodoList(page, keyword),
  [keyword, page],
  {
    debounce: [500, 0],
    sendable: () => keyword !== ''
  }
);`,
    link: 'tutorial/learning/use-watcher'
  },
  {
    title: <Translate id="homepage.strategy.useFetcher">Prefetch data</Translate>,
    describe: (
      <Translate id="homepage.strategy.useFetcher.desc">
        Preload data to display view faster, or re-pull data across components.
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.useFetcher.feature1">Update view cross modules/components.</Translate>,
      <Translate id="homepage.strategy.useFetcher.feature2">Preload data.</Translate>
    ],
    code: `const {
  fetching, error,
  fetch
} = useFetcher();
fetch(todoDetail);`,
    link: 'tutorial/learning/use-fetcher'
  },
  {
    title: <Translate id="homepage.strategy.Pagination">Pagination request</Translate>,
    describe: (
      <Translate id="homepage.strategy.Pagination.desc">
        Automatically manage paging data, data preloading, reduce unnecessary data refresh, improve fluency by 300%, and
        reduce coding difficulty by 50%
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Pagination.feature1">Rich pagination states and events.</Translate>,
      <Translate id="homepage.strategy.Pagination.feature2">
        Automatically fetch specified page data when watching state changes.
      </Translate>,
      <Translate id="homepage.strategy.Pagination.feature3">Preload next page data.</Translate>,
      <Translate id="homepage.strategy.Pagination.feature4">High-performance list manipulation functions.</Translate>
    ],
    code: `usePagination((page, size) => todoList(page, size), {
  initialData: {
    total: 0,
    data: []
  },
  initialPage: 1,
  initialPageSize: 10
});`,
    link: 'tutorial/strategy/usePagination'
  },
  {
    title: (
      <Translate id="homepage.strategy.Sensorless interact strategy">Sensorless data interaction strategy</Translate>
    ),
    describe: (
      <Translate id="homepage.strategy.Sensorless interact strategy.desc">
        A new interactive experience, submitting and responding, greatly reducing the impact of network fluctuations,
        allowing your application to remain available even when the network is unstable or even disconnected
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Sensorless interact strategy.feature1">
        "Just like operating local data, there is no need to wait for the network response." .
      </Translate>,
      <Translate id="homepage.strategy.Sensorless interact strategy.feature2">
        Available even in weak or offline network.
      </Translate>,
      <Translate id="homepage.strategy.Sensorless interact strategy.feature3">
        More stable data synchronization, without any perception from the user end.
      </Translate>,
      <Translate id="homepage.strategy.Sensorless interact strategy.feature4">
        Switch freely between seamless request and normal network request
      </Translate>
    ],
    code: `const {
  loading, 
  data,
  error,
  onBeforePushQueue,
  onPushedQueue,
  onFallback
} = useSQRequest(() => todoDetail(id), {
  behavior: 'queue',
  backoff: {
    delay: 2000
  }
});`,
    link: 'tutorial/strategy/sensorless-data-interaction/overview'
  },
  {
    title: <Translate id="homepage.strategy.Form submit">Form Submit strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Form submit.desc">
        Automatically manage form data, it allow you implement quickly various of forms.
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Form submit.feature1">Saving Form draft</Translate>,
      <Translate id="homepage.strategy.Form submit.feature2">Manage multi-step form</Translate>,
      <Translate id="homepage.strategy.Form submit.feature3">Automatically reset form data after submiting</Translate>
    ],
    code: `const {
  form,
  send: submitForm,
  updateForm
} = useForm(formData => submitData(formData), {
  initialForm: {
    title: '',
    content: '',
    time: '',
  },
  resetAfterSubmiting: true
});`,
    link: 'tutorial/strategy/useForm'
  },
  {
    title: <Translate id="homepage.strategy.Upload">File upload strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Upload.desc">
        Simplified file upload strategy that supports automatic recognition and conversion of base64, Blob, ArrayBuffer,
        and Canvas.
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Upload.feature1">
        Automatically recognize and convert file data to File instance
      </Translate>,
      <Translate id="homepage.strategy.Upload.feature2">Upload multiple files simultaneously</Translate>,
      <Translate id="homepage.strategy.Upload.feature3">Image preview generation</Translate>
    ],
    code: `const {
  fileList
  loading,
  progress
} = useUploader(({ file, name }) => uploadFile(file, name), {
  limit: 3,
  accept: ['png', 'jpg', 'gif'],
  imageTempLink: true
});`,
    link: 'tutorial/strategy/useUploader'
  },
  {
    title: <Translate id="homepage.strategy.Send captcha">Send captcha</Translate>,
    describe: (
      <Translate id="homepage.strategy.Send captcha.desc">
        Reduce your tediousness when developing the verification code sending function
      </Translate>
    ),
    features: [<Translate id="homepage.strategy.Send captcha.feature1">Automatically countdown.</Translate>],
    code: `const {
  loading: sending,
  send: sendCaptcha
} = useCaptcha(() => sendCaptcha(mobile), {
  initialCountdown: 60
});`,
    link: 'tutorial/strategy/useCaptcha'
  },
  {
    title: <Translate id="homepage.strategy.Auto refetch">Auto refetch data</Translate>,
    describe: (
      <Translate id="homepage.strategy.Auto refetch.desc">
        Automatically refetch data in certain conditions to ensure that the newest data is always displayed.
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Auto refetch.feature1">Freely select in 4 refetch rules.</Translate>,
      <Translate id="homepage.strategy.Auto refetch.feature2">Custom your refetch triggering rule.</Translate>
    ],
    code: `useAutoRequest(todoDetail, {
  enablePolling: 2000,
  enableVisibility: true,
  enableFocus: true,
  enableNetwork: true,
  throttle: 1000
}`,
    link: 'tutorial/strategy/useAutoRequest'
  },
  {
    title: <Translate id="homepage.strategy.Cross-component request">Cross-component request strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Cross-component request.desc">
        Eliminate the limitation of component hierarchy, and quickly trigger the operation function of any request in
        any component
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Cross-component request.feature1">
        Trigger a re-request across any component
      </Translate>
    ],
    code: `useRequest(todoDetail, {
  middleware: actionDelegationMiddleware('actionName')
});`,
    link: 'tutorial/strategy/actionDelegationMiddleware'
  },
  {
    title: <Translate id="homepage.strategy.Request retry strategy">Request retry strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Request retry strategy.desc">
        Request failure automatic retry, it plays an important role on important requests and polling requests
      </Translate>
    ),
    features: [
      <Translate id="homepage.strategy.Request retry strategy.feature1">
        Custom the retry or not, and the retry delay time.
      </Translate>,
      <Translate id="homepage.strategy.Request retry strategy.feature2">Manually stop retry.</Translate>
    ],
    code: `const {
  onRetry,
  onFail,
  stop,
} = useRetriableRequest(pay, {
  retry(error) {
    return /network timeout/i.test(error.message);
  },
  backoff: {
    delay: 2000
  }
});`,
    link: 'tutorial/strategy/useRetriableRequest'
  },
  {
    title: <Translate id="homepage.strategy.SSE">SSE</Translate>,
    describe: <Translate id="homepage.strategy.SSE.desc">Request with Server-sent Events.</Translate>,
    features: [
      <Translate id="homepage.strategy.SSE.feature1">
        Automatically transform data via global responded and function transformData of method instance.
      </Translate>,
      <Translate id="homepage.strategy.SSE.feature2">All control of EventSource.</Translate>
    ],
    code: `const {
  readyState, data, eventSource,
  onMessage, onError, onOpen,
  on
} = useSSE(() => chatGPT(), {
  withCredentials: true,
  interceptByGlobalResponded: true
});`,
    link: 'tutorial/strategy/useSSE'
  }
];
