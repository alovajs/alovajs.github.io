import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Copy from '@site/static/img/copy.svg';
import Github from '@site/static/img/github.svg';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import { useEffect, useState } from 'react';
import { CoreDevs, DeveloperComments, Project, Strategy, VideoPath } from '../common/constants';
import SupportList from '../components/SupportList';
import SponsorStrip from '../components/SponsorStrip';
import FeatureBlock, { ArrowTextLink, FeatureBlockProps } from './_indexComponent/FeatureBlock';
import CodeBlock from './_indexComponent/CodeBlock';
import Intro from './_indexComponent/Intro';
import UserDescription from './_indexComponent/UserDescription';
import styles from './_indexComponent/index.module.css';

const buttons = [
  {
    text: <Translate id="homepage.Getting Started">Getting Started</Translate>,
    type: 'primary',
    style: 'ctw-button-primary',
    link: '/tutorial/getting-started/introduce'
  },
  {
    text: <Translate id="homepage.Examples">Examples</Translate>,
    type: 'secondary',
    style: 'ctw-button-secondary',
    link: '/examples'
  }
];
const heroButtons = [
  {
    id: 'get-started',
    text: <Translate id="homepage.hero.getStarted">Get Started</Translate>,
    style: 'ctw-button-primary',
    link: '/tutorial/getting-started/introduce'
  },
  {
    id: 'see-less-code',
    text: <Translate id="homepage.hero.seeLessCode">How to reduce code</Translate>,
    style: 'ctw-button-secondary',
    onClick: () =>
      document
        .getElementById('no-bs-comparison')
        ?.scrollIntoView({ behavior: 'smooth' })
  }
];
const installCmd = 'npm i alova';

function formatStars(stars: number | null): string {
  if (!stars) return '';
  if (stars >= 1000) {
    return '★ ' + (stars / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
  }
  return '★ ' + stars + '+';
}

function FeatureButton({
  icon,
  text,
  className,
  onClick,
  ...otherProps
}: {
  icon?: string;
  text: string;
  className?: string;
  onClick?: React.DOMAttributes<any>['onClick'];
}) {
  const buttonStyles = [
    className ?? '',
    'group/button text-left px-6 py-4 text-white rounded-lg border-primary-100 flex items-center border-[2px] bg-primary-100/20 transition cursor-pointer',
    /* dark state */
    'dark:border-slate-800 dark:bg-transparent',
    /* hover state */
    'hover:border-primary-900 dark:hover:border-white data-[select=true]:border-primary-500'
  ].join(' ');

  const textStyles = [
    'text-slate-700 dark:text-slate-200 md:text-base text-sm',
    /* hover state */
    'group-hover/button:text-black dark:group-hover/button:text-white'
  ].join(' ');

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      {...otherProps}>
      {icon ? <span className="mr-2">{icon}</span> : null}
      <span className={textStyles}>{text}</span>
    </button>
  );
}

function StrategyLayer({
  eyebrow,
  note,
  items
}: {
  eyebrow: string;
  note: string;
  items: FeatureBlockProps[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">{eyebrow}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{note}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ title, type, description, snippet, to }) => (
          <FeatureBlock
            key={title}
            title={title}
            type={type}
            to={to}
            description={description}
            snippet={snippet}
            showLearnMore
          />
        ))}
      </div>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className="container mx-auto antialiased text-slate-500 dark:text-slate-400">
      <div className="flex flex-col mx-auto w-full">
        <div className="flex flex-col md:flex-row items-stretch gap-20 md:gap-10 justify-between md:mt-32 mt-16 mx-5 md:mx-0">
          <div className="relative">
            <div>
              <p
                className={clsx(
                  styles.titleGradient,
                  'font-sans md:text-5xl text-3xl font-bold tracking-normal'
                )}
                ref={el => {
                  if (el) {
                    el.style.setProperty('line-height', '1.3', 'important');
                  }
                }}>
                <Translate id="homepage.title.position">
                  Stop building request logic. Start shipping features.
                </Translate>
              </p>
            </div>
<p className="mt-4 max-w-4xl text-lg space-y-6">
  <Translate id="homepage.tagline">
    The request strategy layer for JavaScript. Stop hand-writing pagination,
    retry, and form boilerplate — alova ships them as ready-made strategies.
  </Translate>
</p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-100 dark:border-primary-900 bg-primary-100/20 dark:bg-white/5 px-4 py-1.5 text-sm font-semibold text-primary-500">
              <span className="inline-block h-3.5 w-1 rounded-full bg-primary-500"></span>
              <Translate id="homepage.hero.badge">up to 70% less request code</Translate>
            </div>

            <div className="flex flex-col md:items-stretch items-center">
              <div className="mt-8 flex md:justify-stretch justify-center gap-x-2 md:gap-x-4 flex-nowrap">
                {heroButtons.map(({ id, text, style, link, onClick }) =>
                  onClick ? (
                    <button
                      key={id}
                      type="button"
                      className={clsx('inline-flex items-center', style)}
                      onClick={onClick}>
                      {text}
                    </button>
                  ) : (
                    <Link
                      key={id}
                      className={clsx('inline-flex items-center', style)}
                      to={link}>
                      {text}
                    </Link>
                  )
                )}
              </div>

              <div className="ctw-card flex items-center justify-between mt-4 border border-primary-100 dark:border-primary-900 bg-primary-100/20 dark:bg-white/5 text-slate-500 max-w-sm font-mono text-sm py-2 px-4 w-[200px] rounded-md">
                <div className="flex gap-2 items-center text-gray-800 dark:text-gray-400">
                  <span className="select-none">$</span>
                  <span>{installCmd}</span>
                </div>
                <button
                  className="ctw-link w-[16px] h-[16px]"
                  onClick={() => copy(installCmd)}>
                  <Copy />
                </button>
              </div>
            </div>

          </div>
          <div className="relative w-full md:max-w-[800px] scale-125 sm:scale-100">
            <div className="relative overflow-hidden min-h-[300px] h-full w-full transform translate-x-[-5%] lg:translate-x-0">
              {/* do NOT use useColorMode hook: https://github.com/facebook/docusaurus/issues/7986#issuecomment-1921320703 */}
              <ThemedImage
                style={{
                  transform: 'rotate(12deg) skew(-24deg, 0deg)'
                }}
                className="absolute top-0 left-0 w-full h-full"
                alt="Docusaurus themed image"
                sources={{
                  light: '/img/header-image.svg',
                  dark: '/img/header-image-dark.svg'
                }}
              />
            </div>
            <div className={styles.bgImage}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const changableVideo = {
    browseDocs: VideoPath.browseDocs,
    locateApiByUrl: VideoPath.locateApiByUrl,
    useAndFindApi: VideoPath.useAndFindApi
  } as const;

  const { siteConfig } = useDocusaurusContext();
  const [showingVideo, setShowingVideo] = useState<keyof typeof changableVideo>('browseDocs');
  const [gitHubStars, setGitHubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/alovajs/alova')
      .then(r => r.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          setGitHubStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Layout
      wrapperClassName={clsx('use-tailwind', styles.decoratedPurple)}
      title={
        siteConfig.title +
        ' - ' +
        translate({
          message: 'Stop building request logic. Start shipping features.',
          id: 'homepage.title'
        })
      }
      description="alova is the request strategy layer for JavaScript — 20+ ready-made strategies that cut request code by up to 70%. Compatible with any HTTP client and any UI framework, for both client and server.">
      <div className="dark:bg-[#040f26] overflow-hidden">
        <HomepageHeader></HomepageHeader>
        <SponsorStrip />
        <main className="mx-auto mt-20 md:mt-40">
          {/* No-BS comparison */}
          <section id="no-bs-comparison" className="container mx-auto py-16 flex flex-col gap-10 justify-between">
            <Intro
              section={translate({
                message: '# No-BS comparison',
                id: 'homepage.noBs.sectionTitle'
              })}
              title={translate({
                message: 'React Query gives you primitives. alova gives you the finished strategy.',
                id: 'homepage.noBs.title'
              })}
              description={translate({
                message: 'The same paginated list — side by side. No framework war, just less code.',
                id: 'homepage.noBs.description'
              })}
              className="max-w-[760px]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="ctw-card flex flex-col border border-solid border-primary-100 dark:border-primary-900 rounded-2xl md:p-8 p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center px-3 font-bold bg-primary-100/20 border dark:bg-white/5 border-primary-100 dark:border-primary-900 rounded-full text-nowrap text-xs md:text-sm">
                    React Query / hand-written
                  </span>
                  <span className="text-sm font-semibold text-slate-400">~25 lines</span>
                </div>
                <CodeBlock
                  fontSize={14}
                  className="mt-8"
                  code={`const [page, setPage] = useState(1);
const queryClient = useQueryClient();

const { data, isPreviousData } = useQuery({
  queryKey: ['todos', page],
  queryFn: () => fetch(\`/api/todos?page=\${page}\`)
    .then(r => r.json()),
  keepPreviousData: true
});

// manual pre-fetch of next page
useEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['todos', page + 1],
    queryFn: () => fetch(\`/api/todos?page=\${page + 1}\`)
      .then(r => r.json())
  });
}, [page, data]);

// manual delete + cache sync
const del = useMutation({
  mutationFn: id => fetch(\`/api/todos/\${id}\`, { method: 'DELETE' }),
  onSuccess: () => queryClient.invalidateQueries(['todos'])
});

// manual add + cache sync
const add = useMutation({
  mutationFn: body => fetch('/api/todos', {
    method: 'POST', body: JSON.stringify(body)
  }),
  onSuccess: () => queryClient.invalidateQueries(['todos'])
});`}
                />
              </div>
              {/* After */}
              <div className="ctw-card flex flex-col border border-solid border-primary-100 dark:border-primary-900 rounded-2xl md:p-8 p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center px-3 font-bold bg-primary-100/20 border dark:bg-white/5 border-primary-100 dark:border-primary-900 rounded-full text-nowrap text-xs md:text-sm">
                    alova · usePagination
                  </span>
                  <span className="text-sm font-semibold text-primary-500">~5 lines</span>
                </div>
                <CodeBlock
                  fontSize={14}
                  className="mt-8"
                  code={`const todoList = (page, size) =>
  alova.Get('/api/todos', { params: { page, size } });
const { loading, data, page, pageSize, pageCount, total } =
  usePagination(todoList);
// auto paging · preload · add/remove sync`}
                />
              </div>
            </div>
          </section>

          {/* Request Strategy */}
          <div className="bg-gray-100/30 dark:bg-gray-500/10">
            <section className="container mx-auto py-16 flex flex-col gap-16 justify-between">
              <Intro
                section={translate({
                  message: '# Request Strategy',
                  id: 'homepage.requestStrategy.sectionTitle'
                })}
                title={translate({
                  message: 'Stop writing request logic. Use a strategy.',
                  id: 'homepage.requestStrategy.title'
                })}
                description={translate({
                  message: `alova provides 20+ request strategies — finished business modules for client, server, and cross-component scenarios. Pick one, ship faster.`,
                  id: 'homepage.requestStrategy.description'
                })}
                className="max-w-[760px]"
              />

              <StrategyLayer
                eyebrow={translate({
                  message: 'Client strategies',
                  id: 'homepage.requestStrategy.layer.client'
                })}
                note={translate({
                  message:
                    'Built-in hooks that replace the boilerplate you would otherwise hand-write with React Query or axios.',
                  id: 'homepage.requestStrategy.layer.client.note'
                })}
                items={Strategy.filter(item => item.type === 'Client')}
              />
              <StrategyLayer
                eyebrow={translate({
                  message: 'Server strategies',
                  id: 'homepage.requestStrategy.layer.server'
                })}
                note={translate({
                  message:
                    'Server-side control — retry, rate limiting, atomic requests and more — without adding middleware.',
                  id: 'homepage.requestStrategy.layer.server.note'
                })}
                items={Strategy.filter(item => item.type === 'Server')}
              />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
                    <Translate id="homepage.requestStrategy.layer.cross">
                      Cross-component, zero wiring
                    </Translate>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <Translate id="homepage.requestStrategy.layer.cross.note">
                      Trigger and sync requests across any component — no prop drilling, no global store.
                    </Translate>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Strategy.filter(item => item.type === 'Cross').map(
                    ({ title, to, description }) => (
                      <Link
                        key={title}
                        to={to}
                        className="ctw-card flex flex-col gap-1 rounded-2xl border border-primary-100 dark:border-primary-900 px-6 py-5 transition hover:border-primary-500">
                        <span className="text-base font-semibold text-slate-800 dark:text-slate-100">
                          {title}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {description}
                        </span>
                      </Link>
                    )
                  )}
                </div>
              </div>

              <div className={clsx('relative col-span-12', styles.borderGradient)}>
                <FeatureBlock
                  title={translate({
                    message: 'Learn total 20+ strategies',
                    id: 'homepage.requestStrategy.More Strategy.title'
                  })}
                  className="dark:bg-[#040f26] items-center h-full w-full rounded-2xl">
                  <div className="flex flex-1 flex-wrap gap-y-4 mt-5 leading-[16px] w-full justify-around text-sm">
                    <ArrowTextLink
                      to="/tutorial/client/strategy/"
                      keepText>
                      <Translate id="homepage.requestStrategy.More Strategy.Client">
                        Client strategies
                      </Translate>
                    </ArrowTextLink>
                    <ArrowTextLink
                      to="/tutorial/server/strategy/"
                      keepText>
                      <Translate id="homepage.requestStrategy.More Strategy.Server">
                        Server strategies
                      </Translate>
                    </ArrowTextLink>
                  </div>
                </FeatureBlock>
              </div>
            </section>
          </div>

          {/* Automatic Generate */}
          <section className="container mx-auto py-20 flex flex-col lg:flex-row gap-16 justify-between">
            <div className="flex flex-col items-start md:max-w-[500px]">
              <Intro
                section={translate({
                  message: '# OpenAPI → Code · powered by worma',
                  id: 'homepage.automaticGenerate.sectionTitle'
                })}
                title={translate({
                  message: 'One API spec. From human to AI.',
                  id: 'homepage.automaticGenerate.title'
                })}
                description={translate({
                  message:
                    'worma is an independent OpenAPI code-generation tool that works out-of-the-box with alova. Turn one API spec into type-safe runtime code, TS types, docs, and AI knowledge — get API hints, hover-docs, and one-click code insertion right in your editor. (Also supports axios, ky, and fetch.)',
                  id: 'homepage.automaticGenerate.description'
                })}
              />
              <div className="flex flex-col gap-5 mt-10 w-full md:w-[400px]">
                <FeatureButton
                  icon="📚"
                  text={translate({
                    message: 'Browse API docs in your editor',
                    id: 'homepage.automaticGenerate.Browse API docs in your editor'
                  })}
                  onClick={() => setShowingVideo('browseDocs')}
                  data-select={showingVideo === 'browseDocs'}
                />
                <FeatureButton
                  icon="🔍"
                  text={translate({
                    message: 'Locate API by its url or description',
                    id: 'homepage.automaticGenerate.Locate API by its url or description'
                  })}
                  onClick={() => setShowingVideo('locateApiByUrl')}
                  data-select={showingVideo === 'locateApiByUrl'}
                />
                <FeatureButton
                  icon="📦"
                  text={translate({
                    message: 'API Parameters and Response at a glance',
                    id: 'homepage.automaticGenerate.API Parameters and Response at a glance'
                  })}
                  onClick={() => setShowingVideo('useAndFindApi')}
                  data-select={showingVideo === 'useAndFindApi'}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="https://worma.js.org"
                  className="ctw-button-secondary inline-flex items-center text-sm">
                  <Translate id="homepage.automaticGenerate.wormaSite">worma website →</Translate>
                </Link>
              </div>
            </div>
            <div className="flex-1 max-w-full lg:max-w-[800px] self-end">
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #2C92FF 0%, #711EFF 41%, #FF41C6 71%, #FF772E 100%)'
                }}
                className="relative pt-8 px-4 md:px-12 rounded-3xl flex flex-col items-center">
                <div className="border-gray-200/40 border border-b-0 bg-[rgba(228,228,228,0.3)] h-6 rounded-t-xl w-11/12"></div>
                <video
                  src={changableVideo[showingVideo]}
                  className="w-full rounded-t-lg opacity-80 block"
                  autoPlay
                  muted
                  controls={false}></video>
              </div>
            </div>
          </section>

          {/* Flexible */}
          <section className="container mx-auto py-16 flex flex-col gap-16 justify-between">
            <Intro
              section={translate({
                message: '# Flexible',
                id: 'homepage.Flexible.sectionTitle'
              })}
              title={translate({
                message: 'Runs in any JS environment with any request tool',
                id: 'homepage.Flexible.title'
              })}
              description={translate({
                message: `Use hooks originated from functional components, but alova innovatively made it compatible with options and class-style UI frameworks, which means that alova's use hooks are almost not restricted by JS environments and UI frameworks, and can be used together with your familiar request tools.`,
                id: 'homepage.Flexible.description'
              })}
              className="max-w-[600px]"
            />
            <div className="flex gap-10 justify-between">
              <SupportList></SupportList>
            </div>
          </section>

          {/* Social proof + honest boundary */}
          <section className="container mx-auto py-16 flex flex-col gap-12 justify-between">
            <Intro
              section={translate({
                message: '# Trusted & honest',
                id: 'homepage.trust.sectionTitle'
              })}
              title={translate({
                message: 'Built for real apps — and honest about when not to use it.',
                id: 'homepage.trust.title'
              })}
              className="max-w-[760px]"
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  value: formatStars(gitHubStars),
                  label: translate({
                    message: 'GitHub stars',
                    id: 'homepage.trust.stars'
                  }),
                  secondary: {
                    value: '1000+',
                    label: translate({
                      message: 'dependent repos on GitHub',
                      id: 'homepage.trust.dependents'
                    }),
                    href: 'https://github.com/alovajs/alova/network/dependents'
                  }
                },
                {
                  value: '15+',
                  label: translate({
                    message: 'frameworks supported',
                    id: 'homepage.trust.frameworks'
                  })
                },
                {
                  value: 'client + server',
                  label: translate({
                    message: 'one library, both sides',
                    id: 'homepage.trust.sides'
                  })
                },
                {
                  value: 'MIT',
                  label: translate({
                    message: 'free & open source',
                    id: 'homepage.trust.license'
                  })
                }
              ].map(stat => (
                <div
                  key={stat.label}
                  className="ctw-card flex flex-col gap-1 rounded-2xl border border-primary-100 dark:border-primary-900 px-6 py-5">
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                  {stat.secondary ? (
                    <Link
                      to={stat.secondary.href}
                      className="group mt-3 block border-t border-primary-100 pt-3 transition-colors hover:border-primary-300 dark:border-primary-900 dark:hover:border-primary-700">
                      <span className="block text-xl font-bold text-slate-800 transition-colors group-hover:text-primary-500 dark:text-slate-100">
                        {stat.secondary.value}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500 transition-colors group-hover:text-primary-500 dark:text-slate-400">
                        {stat.secondary.label} ↗
                      </span>
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="ctw-card flex flex-col gap-6 rounded-2xl border border-primary-100 dark:border-primary-900 p-8 md:p-10">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                <Translate id="homepage.trust.boundary.title">
                  When should you NOT use alova?
                </Translate>
              </h3>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    <Translate id="homepage.trust.boundary.useOthers">
                      Stick with React Query / axios when
                    </Translate>
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>
                      <Translate id="homepage.trust.boundary.useOthers.1">
                        You only need simple CRUD + basic caching
                      </Translate>
                    </li>
                    <li>
                      <Translate id="homepage.trust.boundary.useOthers.2">
                        Your team already standardised on one of them
                      </Translate>
                    </li>
                    <li>
                      <Translate id="homepage.trust.boundary.useOthers.3">
                        The app is small and request logic is minimal
                      </Translate>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold text-primary-500">
                    <Translate id="homepage.trust.boundary.useAlova">alova wins when</Translate>
                  </p>
                  <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <li>
                      <Translate id="homepage.trust.boundary.useAlova.1">
                        You want 70% less request code out of the box
                      </Translate>
                    </li>
                    <li>
                      <Translate id="homepage.trust.boundary.useAlova.2">
                        Complex admin / BFF / cross-platform / server-side control
                      </Translate>
                    </li>
                    <li>
                      <Translate id="homepage.trust.boundary.useAlova.3">
                        You need built-in strategies (pagination, auth, retry, SSE…)
                      </Translate>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Join the community */}
          <section className="container mx-auto py-16 flex flex-col mt-10 md:mt-32 gap-24 justify-between">
            <Intro
              section={translate({
                message: 'Join the community',
                id: 'homepage.Join the community.sectionTitle'
              })}
              title={translate({
                message: 'Used in production by real teams',
                id: 'homepage.Join the community.title'
              })}
              description={translate({
                message: `Open source projects dependent on alova`,
                id: 'homepage.Join the community.description'
              })}
              className="items-center text-center"
            />

            {/* Projects */}
            <div className="self-center flex gap-10 md:gap-20 justify-between">
              {Project.map(item => (
                <UserDescription
                  avatar={item.avatar}
                  avatarSize={54}
                  name={item.name}
                  key={item.name}
                  to={item.to}
                  vertical
                />
              ))}
            </div>

            {/* Developers */}
            <div className="flex flex-col md:!grid grid-cols-2 gap-14 self-center justify-between">
              {DeveloperComments.map((item, index) => (
                <div
                  className="col-span-1 max-w-[500px]"
                  key={index}>
                  <UserDescription
                    avatar={item.avatar}
                    avatarRadius={9999}
                    name={item.name}
                    description={item.description}
                  />
                  <div className="text-gray-400 mt-4">{item.children}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Alova team */}
          <section className="container mx-auto py-14 flex flex-col mt-10 md:mt-32 gap-16 items-center">
            <Intro
              section={translate({
                message: 'Alova team',
                id: 'homepage.Alova team.sectionTitle'
              })}
              title={translate({
                message: 'Meet the core members',
                id: 'homepage.Alova team.title'
              })}
              className="items-center text-center"
            />
            <div className="flex flex-col sm:!grid grid-cols-3 gap-4 md:gap-12 w-full">
              {CoreDevs.map((item, index) => (
                <div
                  className="ctw-card flex flex-col items-center p-12 col-span-1 rounded-lg border border-primary-100 dark:border-transparent"
                  key={index}>
                  <UserDescription
                    avatar={item.avatar}
                    avatarRadius={9999}
                    name={item.name}
                    description={item.description}
                    key={item.name}
                    vertical
                  />
                  <a
                    className="ctw-link dark:ctw-link-dark mt-4 h-[20px] w-[20px]"
                    href={item.url}
                    target="_blank">
                    <Github />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Try it NOW */}
          <section className="container mx-auto">
            <div className="flex flex-col py-10 mt-0 md:mt-20 mb-20 px-5 items-center rounded-lg bg-[url(/img/bg-card.svg)] dark:bg-[url(/img/bg-card-dark.svg)]">
              <Intro
                section={translate({
                  message: 'Try it NOW',
                  id: 'homepage.Try It Now.sectionTitle'
                })}
                sectionClassName="text-white dark:text-primary-500"
                title={translate({
                  message: 'Take your development efficiency to the next level',
                  id: 'homepage.Try It Now.title'
                })}
                className="items-center text-white text-center"
              />
              <div className="mt-8 flex gap-x-4">
                {buttons.map(({ text, style, link, type }) => (
                  <Link
                    key={link}
                    className={clsx(
                      style,
                      type === 'secondary'
                        ? 'text-white hover:text-white hover:border-white border-white/20'
                        : 'bg-white text-primary-500 hover:text-primary-600 hover:!bg-white/80 dark:bg-primary-500 dark:text-white dark:hover:!bg-primary-600 dark:hover:text-white'
                    )}
                    to={link}>
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
