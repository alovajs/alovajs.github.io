import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Arrow from '@site/static/img/arrow.svg';
import Copy from '@site/static/img/copy.svg';
import Github from '@site/static/img/github.svg';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import { useState } from 'react';
import SupportList from '../components/SupportList';
import CodeBlock from './_indexComponent/CodeBlock';
import FeatureBlock from './_indexComponent/FeatureBlock';
import styles from './_indexComponent/index.module.css';
import Intro from './_indexComponent/Intro';
import UserDescription from './_indexComponent/UserDescription';
import { CoreDevs, DeveloperComments, Project, Snippet, Strategy } from './constants';

const buttons = [
  {
    text: <Translate id="homepage.Get Started">Get Started</Translate>,
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
    'group/button text-left px-6 py-4 text-white rounded-lg flex items-center border-[1.5px] transition cursor-pointer',
    /* normal state */
    'dark:border-slate-800',
    /* hover state */
    'hover:border-primary-500 data-[select=true]:border-primary-500'
  ].join(' ');

  const textStyles = [
    'text-slate-700 dark:text-slate-200',
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

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();

  return (
    <header className="container mx-auto antialiased text-slate-500 dark:text-slate-400">
      <div className="flex flex-col mx-auto w-full">
        <div className="flex justify-between mt-32 ">
          <div className="">
            <div className="font-sans text-6xl font-bold leading-tight t">
              <p className={styles.titleGradient}>
                <Translate id="homepage.title.Creative">Creative</Translate>
              </p>
              <p className="text-slate-900 tracking-normal dark:text-slate-50">
                <Translate id="homepage.title.Next Generation Request Tool">
                  Next Generation Request Tool
                </Translate>
              </p>
            </div>
            <p className="mt-4 max-w-3xl text-lg space-y-6">
              <Translate id="homepage.tagline">
                Extremely improve your API using efficiency and save brainpower Just one step
              </Translate>
            </p>
            <div className="mt-8 flex gap-x-4">
              {buttons.map(({ text, style, link }, i) => (
                <Link
                  key={link}
                  className={style}
                  to={link}>
                  {text}
                </Link>
              ))}
            </div>

            <div className="ctw-card flex items-center justify-between mt-4 border border-gray-800 max-w-sm font-mono text-sm py-2 px-4 w-[200px] rounded-md">
              <div className="flex gap-2 items-center text-gray-800 dark:text-gray-400">
                <span className="select-none">$</span>
                <span>npm i alova</span>
              </div>
              <button
                className="ctw-link w-[16px] h-[16px]"
                onClick={() => copy('npm i alova')}>
                <Copy />
              </button>
            </div>
          </div>
          <img
            style={{
              transform: 'rotate(12deg) skew(-24deg, 0deg)'
            }}
            className="max-w-[700px]"
            src="/img/header-image.svg"
            alt=""
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  // useEffect(() => {
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = '/css/reset.css';
  //   console.log(link);
  //   document.head.append(link);

  //   console.log('appended');

  //   return () => {
  //     console.log('removed');
  //     try {
  //       document.head.removeChild(link);
  //     } catch {}
  //   };
  // }, []);

  const changableSnippet = {
    locateApiByUrl: Snippet.locateApiByUrl,
    ApiParamsAndResponseAtGlance: Snippet.ApiParametersAndResponseAtAGlance
  } as const;

  const { siteConfig } = useDocusaurusContext();
  const [showing, setShowing] = useState<keyof typeof changableSnippet>('locateApiByUrl');

  return (
    <Layout
      wrapperClassName="use-tailwind"
      title={
        siteConfig.title +
        ' - ' +
        translate({
          message: 'Lightweight request strategy library',
          id: 'homepage.title'
        })
      }
      description="alova.js a lightweight request strategy library">
      <div className="dark:bg-[#040f26]">
        <HomepageHeader></HomepageHeader>
        <main className="mx-auto mt-40">
          {/* Automatic Generate */}
          <section className="container mx-auto py-10 flex gap-16 justify-between">
            <div className="flex flex-col items-start max-w-[500px]">
              <Intro
                section={translate({
                  message: 'Automatic Generate',
                  id: 'homepage.automaticGenerate.sectionTitle'
                })}
                title={translate({
                  message: 'Use APIs while searching',
                  id: 'homepage.automaticGenerate.title'
                })}
                description={translate({
                  message: `Quickly find APIs in editor, and enjoy full type hints even in js projects with the API code automatically generated by alova's extension.`,
                  id: 'homepage.automaticGenerate.description'
                })}
              />
              <div className="flex flex-col gap-5 mt-10">
                <FeatureButton
                  icon="🔍"
                  text={translate({
                    message: 'Locate API by its url or description',
                    id: 'homepage.automaticGenerate.Locate API by its url or description'
                  })}
                  className="w-[400px]"
                  onClick={() => setShowing('locateApiByUrl')}
                  data-select={showing === 'locateApiByUrl'}
                />
                <FeatureButton
                  icon="📦"
                  text={translate({
                    message: 'API Parameters and Response at a glance',
                    id: 'homepage.automaticGenerate.API Parameters and Response at a glance'
                  })}
                  className="w-[400px]"
                  onClick={() => setShowing('ApiParamsAndResponseAtGlance')}
                  data-select={showing === 'ApiParamsAndResponseAtGlance'}
                />
              </div>
            </div>
            <div className="flex-1 max-w-[600px]">
              <div
                style={{
                  background:
                    'linear-gradient( 135deg, #2C92FF 0%, #711EFF 41%, #FF41C6 71%, #FF772E 100%)'
                }}
                className="relative pt-8 pl-12 pr-8 rounded-3xl">
                <CodeBlock
                  className="h-[330px]"
                  fontSize={20}
                  code={changableSnippet[showing]}
                />
              </div>
            </div>
          </section>

          {/* Request Strategy */}
          <div className="bg-gray-100 dark:bg-gray-500/10">
            <section className="container mx-auto py-10 flex flex-col gap-16 justify-between ">
              <Intro
                section={translate({
                  message: 'Request Strategy',
                  id: 'homepage.requestStrategy.sectionTitle'
                })}
                title={translate({
                  message: 'Complex request scenes killer',
                  id: 'homepage.requestStrategy.title'
                })}
                description={translate({
                  message: `Request in various complex scenes by one line of code`,
                  id: 'homepage.requestStrategy.description'
                })}
              />

              <div className="w-full grid grid-cols-12 grid-rows-3 gap-10">
                {Strategy.map(({ title, type, description, className, snippet, to }, index) => (
                  <FeatureBlock
                    title={title}
                    to={to}
                    type={type}
                    className={className + ' dark:bg-[#040f26]'}
                    description={description}
                    snippet={snippet}
                    key={index}
                    showLearnMore
                  />
                ))}
                <div className="relative col-span-4 row-span-1">
                  <div className={styles.borderGradient}></div>
                  <FeatureBlock
                    title={translate({
                      message: 'Learn total 20+ strategies',
                      id: 'homepage.requestStrategy.More Strategy.title'
                    })}
                    className="dark:bg-[#040f26] items-center h-full w-full rounded-2xl">
                    <div className="flex flex-1 mt-5 leading-[16px] w-full justify-around text-sm">
                      <a
                        href="/tutorial/client/strategy/"
                        className="flex items-center cursor-pointer"
                        target="_blank">
                        <span className="font-semibold">
                          <Translate id="homepage.requestStrategy.More Strategy.Client">
                            Client strategies
                          </Translate>
                        </span>
                        <span className="inline-block ml-2 dark:text-white w-[14px] h-[14px]">
                          <Arrow />
                        </span>
                      </a>
                      <a
                        href="/tutorial/server/strategy/"
                        className="flex items-center cursor-pointer"
                        target="_blank">
                        <span className="font-semibold">
                          <Translate id="homepage.requestStrategy.More Strategy.Server">
                            Server strategies
                          </Translate>
                        </span>
                        <span className="inline-block ml-2 dark:text-white w-[14px] h-[14px]">
                          <Arrow />
                        </span>
                      </a>
                    </div>
                  </FeatureBlock>
                </div>
              </div>
            </section>
          </div>

          {/* Flexible */}
          <section className="container mx-auto py-10 flex flex-col gap-16 justify-between">
            <Intro
              section={translate({
                message: 'Flexible',
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
            <div className="flex gap-10 justify-between h-[400px]">
              <SupportList></SupportList>
            </div>
          </section>

          {/* Join the community */}
          <section className="container mx-auto py-10 flex flex-col mt-32 gap-24 justify-between">
            <Intro
              section={translate({
                message: 'Join the community',
                id: 'homepage.Join the community.sectionTitle'
              })}
              title={translate({
                message: 'Trusted by developers around the world',
                id: 'homepage.Join the community.title'
              })}
              description={translate({
                message: `Open source projects dependent on alova`,
                id: 'homepage.Join the community.description'
              })}
              className="items-center"
            />

            {/* Projects */}
            <div className="self-center flex gap-20 justify-between">
              {Project.map((item, index) => (
                <UserDescription
                  avatar={item.avatar}
                  avatarSize={54}
                  name={item.name}
                  key={index}
                  vertical
                />
              ))}
            </div>

            {/* Developers */}
            <div className="grid grid-cols-2 gap-14 self-center justify-between">
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
          <section className="container mx-auto py-10 flex flex-col mt-32 gap-16 items-center">
            <Intro
              section={translate({
                message: 'Alova team',
                id: 'homepage.Alova team.sectionTitle'
              })}
              title={translate({
                message: 'Meet the core members',
                id: 'homepage.Alova team.title'
              })}
              className="items-center"
            />
            <div className="grid grid-cols-3 gap-12 w-full grid-cols-3">
              {CoreDevs.map((item, index) => (
                <div
                  className="ctw-card flex flex-col items-center p-12 col-span-1 rounded-lg border border-gray-300 dark:border-transparent"
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
            <div
              className={clsx(
                'flex flex-col pt-10 pb-16 mt-32 mb-20 items-center rounded-lg',
                styles.bgCard
              )}>
              <Intro
                section={translate({
                  message: 'Try it NOW',
                  id: 'homepage.Try It Now.sectionTitle'
                })}
                title={translate({
                  message: 'Take your development efficiency to the next level',
                  id: 'homepage.Try It Now.title'
                })}
                className="items-center text-white"
              />
              <div className="mt-8 flex gap-x-4">
                {buttons.map(({ text, style, link, type }, i) => (
                  <Link
                    key={link}
                    className={
                      style +
                      (type === 'secondary'
                        ? ' text-white hover:text-white hover:border-white'
                        : '')
                    }
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
