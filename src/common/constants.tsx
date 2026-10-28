import Translate, { translate } from '@docusaurus/Translate';
import type { ReactNode } from 'react';

export interface FeatureBlockProps {
  type?: string;
  title: string;
  description?: string;
  snippet?: string;
  className?: string;
  children?: ReactNode;
  showLearnMore?: boolean;
  to?: string;
}

export interface UserDescProps {
  avatar: string | ReactNode;
  avatarSize?: number;
  avatarRadius?: number;
  name: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  vertical?: boolean;
  to?: string;
}

export const VideoPath = {
  browseDocs: '/video/browse-docs.mp4',
  locateApiByUrl: '/video/locate-api.mp4',
  useAndFindApi: '/video/use-and-find-api.mp4'
} as const;

export const Strategy: FeatureBlockProps[] = [
  {
    type: 'Client',
    title: translate({
      message: 'Pagination Request',
      id: 'homepage.requestStrategy.Pagination Request.title'
    }),
    to: '/tutorial/client/strategy/use-pagination',
    description: translate({
      message:
        'Manage paging, preload the next page, and skip needless refreshes. Pagination becomes one declared scenario.',
      id: 'homepage.requestStrategy.Pagination Request.description'
    }),
    className: 'col-span-8 row-span-3',
    snippet: `const todoList = (page, size) =>
  alova.Get('/todos', { params: { page, size } });
const { loading, data, page, pageSize, pageCount, total } =
  usePagination(todoList);`
  },
  {
    type: 'Client',
    title: translate({
      message: 'Watch Request',
      id: 'homepage.requestStrategy.Watching Request.title'
    }),
    to: '/tutorial/client/strategy/use-watcher',
    description: translate({
      message:
        'Fire requests the moment watched state changes. Ideal for tab switching and filtered searches.',
      id: 'homepage.requestStrategy.Watching Request.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `useWatcher(
  () => alova.Get(\`/rewards/\${activeKey}\`),
  [activeKey],
  {
    debounce: [500, 0]
  }
)`
  },
  {
    type: 'Server',
    title: translate({
      message: 'Retry Request',
      id: 'homepage.requestStrategy.Retry Request.title'
    }),
    to: '/tutorial/server/strategy/retry',
    description: translate({
      message: 'Stabilize critical requests by retrying them automatically.',
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
    type: 'Server',
    title: translate({
      message: 'Rate Limit',
      id: 'homepage.requestStrategy.Rate Limit.title'
    }),
    to: '/tutorial/server/strategy/rate-limit',
    description: translate({
      message: 'Cap how many requests fire within a given window.',
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
    type: 'Client',
    title: translate({
      message: 'Fetch Data',
      id: 'homepage.requestStrategy.Fetch Data.title'
    }),
    to: '/tutorial/client/strategy/use-fetcher',
    description: translate({
      message: 'Preload data to render views faster, or re-fetch it across components.',
      id: 'homepage.requestStrategy.Fetch Data.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `const { fetching, error, fetch } = useFetcher()
fetch(alova.Get('/todo/1'))`
  },
  {
    type: 'Client',
    title: translate({
      message: 'Token authentication',
      id: 'homepage.requestStrategy.Token authentication.title'
    }),
    to: '/tutorial/client/strategy/token-authentication',
    description: translate({
      message:
        'A global interceptor with silent token refresh. Unified handling of login, logout, assignment and renewal.',
      id: 'homepage.requestStrategy.Token authentication.description'
    }),
    className: 'col-span-8 row-span-3',
    snippet: `const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
  refreshTokenOnError: {
    isExpired: res => res.status === 401,
    handler: async () => {
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
    type: 'Client',
    title: translate({
      message: 'Form Submission',
      id: 'homepage.requestStrategy.Form Submission.title'
    }),
    to: '/tutorial/client/strategy/use-form',
    description: translate({
      message:
        'Manage form state for you. Any kind of form comes together quickly.',
      id: 'homepage.requestStrategy.Form Submission.description'
    }),
    className: 'col-span-4 row-span-1'
  },
  {
    type: 'Client',
    title: translate({
      message: 'Auto refresh data',
      id: 'homepage.requestStrategy.Auto refresh data.title'
    }),
    to: '/tutorial/client/strategy/use-auto-request',
    description: translate({
      message:
        'Refresh data automatically on browser events. The UI always shows the latest.',
      id: 'homepage.requestStrategy.Auto refresh data.description'
    }),
    className: 'col-span-4 row-span-1'
  },
  {
    type: 'Server',
    title: translate({
      message: 'Atomize Requests',
      id: 'homepage.requestStrategy.Atomize Requests.title'
    }),
    to: '/tutorial/server/strategy/atomize',
    description: translate({
      message:
        'Guarantee request atomicity in multi-process environments with a distributed lock. No hand-written locking code.',
      id: 'homepage.requestStrategy.Atomize Requests.description'
    }),
    className: 'col-span-4 row-span-3',
    snippet: `import { atomize } from 'alova/server';

// a distributed lock keeps the request atomic
const res = await atomize(
  alova.Get('/api/user'),
  {
    channel: 'user_lock',
    timeout: 5000
  }
)`
  },
  {
    type: 'Cross',
    title: translate({
      message: 'Action Delegation',
      id: 'homepage.requestStrategy.Action Delegation.title'
    }),
    to: '/tutorial/client/strategy/action-delegation-middleware',
    description: translate({
      message:
        'Trigger, abort and share requests across components and modules. No extra state plumbing.',
      id: 'homepage.requestStrategy.Action Delegation.description'
    })
  },
  {
    type: 'Cross',
    title: translate({
      message: 'Seamless Data Interaction',
      id: 'homepage.requestStrategy.Seamless Data Interaction.title'
    }),
    to: '/tutorial/client/strategy/seamless-data-interaction',
    description: translate({
      message:
        'Keep shared data consistent across components with automatic state synchronization.',
      id: 'homepage.requestStrategy.Seamless Data Interaction.description'
    })
  }
];

export const Project: UserDescProps[] = [
  {
    avatar: '/img/project/naive-ui-admin.png',
    name: 'Naive Admin',
    to: 'https://www.naiveadmin.com/'
  },
  {
    avatar: '/img/project/nova-admin.png',
    name: 'Nova admin',
    to: 'https://github.com/chansee97/nova-admin'
  },
  {
    avatar: '/img/project/ems-esp.png',
    name: 'EMS-ESP',
    to: 'https://github.com/emsesp/EMS-ESP32'
  },
  {
    avatar: '/img/project/mall-chat.png',
    name: 'MallChat',
    to: 'https://github.com/Evansy/MallChatWeb'
  }
];

export const DeveloperComments: UserDescProps[] = [
  {
    avatar: '/img/avatar/scott-hu.png',
    name: 'Scott Hu',
    description: translate({
      message: 'Creator of alova',
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
    children: (
      <p>
        <Translate id="homepage.projects.Proddy.comment">
          I'm loving this library and slowly migrating my code from Axios to Alova.
        </Translate>
      </p>
    )
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
    name: 'Ah jung',
    description: 'Author of Naive Admin',
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
