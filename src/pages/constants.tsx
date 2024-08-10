import Translate, { translate } from '@docusaurus/Translate';
import { FeatureBlockProps } from './_indexComponent/FeatureBlock';
import { UserDescProps } from './_indexComponent/UserDescription';

export const Snippet: Record<string, string> = {
  locateApiByUrl: '// to be done',
  ApiParametersAndResponseAtAGlance: `// search API with url
Apis.pet.updatePetWithForm({
  pathParams: { petId: 0 },
  data: {}
})

// search API with description
Apis.pet.getPetById({
  pathParams: { petId: 0 }
})`
};

export const Strategy: FeatureBlockProps[] = [
  {
    type: translate({ message: 'Client', id: 'theme.featureBlock.client' }),
    title: translate({
      message: 'Pagination Request',
      id: 'homepage.requestStrategy.Pagination Request.title'
    }),
    to: '/tutorial/client/strategy/use-pagination',
    description: translate({
      message:
        'Automatically manage paging data, data preloading, reduce unnecessary data refresh, improve fluency by 300%, and reduce coding difficulty by 50%',
      id: 'homepage.requestStrategy.Pagination Request.description'
    }),
    className: 'col-span-8 row-span-3',
    snippet: `usePagination((page, size) => totoList(page, size), {
  initialData: {
    total: 0,
    data: []
  },
  initialPage: 1,
  initialPageSize: 10
})`
  },
  {
    type: translate({ message: 'Client', id: 'theme.featureBlock.client' }),
    title: translate({
      message: 'Watch Request',
      id: 'homepage.requestStrategy.Watching Request.title'
    }),
    to: '/tutorial/client/strategy/use-watcher',
    description: translate({
      message:
        'send requests immediately by watching states changes, useful in tab switching and condition quering.',
      id: 'homepage.requestStrategy.Watching Request.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `useWatcher(
  () => filterTodoList(page, keyword),
  [keyword, page],
  {
    debounce: [500, 0]
  }
)`
  },
  {
    type: translate({ message: 'Server', id: 'theme.featureBlock.server' }),
    title: translate({
      message: 'Retry Request',
      id: 'homepage.requestStrategy.Retry Request.title'
    }),
    to: '/tutorial/server/strategy/retry',
    description: translate({
      message: 'Using it on important requests can improve their stability.',
      id: 'homepage.requestStrategy.Retry Request.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `const res = await retry(alova.Post('/api/order'), {
  retry: 3,
  backoff: {
    delay: 1000,
    multiplier: 2
  }
})`
  },
  {
    type: translate({ message: 'Server', id: 'theme.featureBlock.server' }),
    title: translate({
      message: 'Rate Limit',
      id: 'homepage.requestStrategy.Rate Limit.title'
    }),
    to: '/tutorial/server/strategy/rate-limit-middleware',
    description: translate({
      message: 'Limit the request rate within a certain period of time.',
      id: 'homepage.requestStrategy.Rate Limit.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `const limit = createRateLimiter({
  points: 4,
  duration: 60 * 1000
})
const orderRes = await limit(
  alova.Get('/api/order')
)`
  },
  {
    type: translate({ message: 'Client', id: 'theme.featureBlock.client' }),
    title: translate({
      message: 'Fetch Data',
      id: 'homepage.requestStrategy.Fetch Data.title'
    }),
    to: '/tutorial/client/strategy/use-fetcher',
    description: translate({
      message: 'Preload data to display view faster, or re-fetch data across components.',
      id: 'homepage.requestStrategy.Fetch Data.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `const { fetching, error, fetch } = useFetcher()

fetch(getTodoDetail)`
  },
  {
    type: translate({ message: 'Client', id: 'theme.featureBlock.client' }),
    title: translate({
      message: 'Token authentication',
      id: 'homepage.requestStrategy.Token authentication.title'
    }),
    to: '/tutorial/client/strategy/token-authentication',
    description: translate({
      message:
        'Global interceptor that supports silent token refresh, as well as providing unified management of token-based login, logout, token assignment and token refresh.',
      id: 'homepage.requestStrategy.Token authentication.description'
    }),
    className: 'col-span-8 row-span-3',
    snippet: `const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
  refreshTokenOnError: {
    isExpired: res => res.status === 401,
    refrshTokenOnError: async () => {
      const { token, refresh_token } = await refreshToken()
      localStorage.setItem('token', token)
      localStorage.setItem('refresh_token', refresh_token)
    }
  }
})

const alovaInstance = createAlova({
  beforeRequest: onAuthRequired(),
  responded: onResponseRefreshToken()
})`
  },
  {
    type: translate({ message: 'Client', id: 'theme.featureBlock.client' }),
    title: translate({
      message: 'Form Submission',
      id: 'homepage.requestStrategy.Form Submission.title'
    }),
    to: '/tutorial/client/strategy/use-form',
    description: translate({
      message:
        'Automatically manage form data, it allow you implement quickly various of forms.',
      id: 'homepage.requestStrategy.Form Submission.description'
    }),
    className: 'col-span-4 row-span-1'
  },
  {
    type: translate({ message: 'Client', id: 'theme.featureBlock.client' }),
    title: translate({
      message: 'Auto refresh data',
      id: 'homepage.requestStrategy.Auto refresh data.title'
    }),
    to: '/tutorial/client/strategy/use-auto-request',
    description: translate({
      message:
        'Automatically refresh data through the events of browser, always display the newest data.',
      id: 'homepage.requestStrategy.Auto refresh data.description'
    }),
    className: 'col-span-4 row-span-1'
  }
];

export const Project: UserDescProps[] = [
  {
    avatar: '/img/project/nova-admin.png',
    name: 'Nova-admin'
  },
  {
    avatar: '/img/project/ems-esp.png',
    name: 'EMS-ESP'
  },
  {
    avatar: '/img/project/mall-chat.png',
    name: 'MallChat'
  }
];

export const DeveloperComments: UserDescProps[] = [
  {
    avatar: '/img/avatar/scott-hu.png',
    name: 'Scott Hu',
    description: translate({
      message: 'The creator of alova',
      id: 'homepage.projects.Scott Hu.desc'
    }),
    children: (
      <p>
        <Translate id="homepage.projects.Scott Hu.comment">
          Request libs like fetch and axios make requests very simple, react-query and swr
          further reduce the template code of requests. But what alova aims to do is to provide
          extreme API consumption efficiency, eliminating almost all of your request work and
          achieving more efficient Client-Server data interaction.
        </Translate>
      </p>
    )
  },
  {
    avatar: '/img/avatar/proddy.png',
    name: 'Proddy',
    description: 'The author of EMS-ESP',
    children: <p>I'm loving this library and slowly migrating my code from Axios to Alova.</p>
  },
  {
    avatar: '/img/avatar/0x1ec10d.png',
    name: '0x1EC10D',
    description: 'Developer',
    children: (
      <p>
        <Translate id="homepage.projects.0x1EC10D.comment">
          Alova is really meticulous. When I read the documents, every point was a pain point
          and solved many problems.
        </Translate>
      </p>
    )
  },
  {
    avatar: '/img/avatar/ah-jung.png',
    name: 'Scott Hu',
    description: 'Developer',
    children: (
      <p>
        <Translate id="homepage.projects.Ah jung.comment">
          The alovajs is nice. I plan to switch our products to alovajs uniformly
        </Translate>
      </p>
    )
  }
];

export const CoreDevs: (UserDescProps & { url: string })[] = [
  {
    avatar: '/img/avatar/scott-hu.png',
    name: 'Scott Hu',
    url: 'https://github.com/JOU-amjs'
  },
  {
    avatar: '/img/avatar/meetinaxd.png',
    name: 'MeetinaXD',
    url: 'https://github.com/MeetinaXD'
  },
  {
    avatar: '/img/avatar/czhlin.png',
    name: 'czhlin',
    url: 'https://github.com/czhlin'
  }
];
