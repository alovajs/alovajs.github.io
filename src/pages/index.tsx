import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Arrow from '@site/static/img/arrow.svg';
import Copy from '@site/static/img/copy.svg';
import Github from '@site/static/img/github.svg';
import Layout from '@theme/Layout';
import clsx from 'clsx';
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
  className
}: {
  icon?: string;
  text: string;
  className?: string;
}) {
  const buttonStyles = [
    className ?? '',
    'group/button text-left px-6 py-4 text-white rounded-lg flex items-center border-[1.5px] transition cursor-pointer',
    /* normal state */
    'dark:border-slate-800',
    /* hover state */
    'hover:border-primary-500'
  ].join(' ');

  const textStyles = [
    'text-slate-700 dark:text-slate-200',
    /* hover state */
    'group-hover/button:text-black dark:group-hover/button:text-white'
  ].join(' ');

  return (
    <button className={buttonStyles}>
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
                <Translate id="homepage.title">Creative</Translate>
              </p>
              <p className="text-slate-900 tracking-normal dark:text-slate-50">
                <Translate id="homepage.title">Next Generation Request Tool</Translate>
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
              <span className="ctw-link w-[16px] h-[16px]">
                <Copy />
              </span>
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

  const { siteConfig } = useDocusaurusContext();
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
                section="Automatic Generate"
                title="Use APIs while searching"
                description={`Quickly find APIs in editor, and enjoy full type hints even in js projects with the API code automatically generated by alova's extension.`}
              />
              <div className="flex flex-col gap-5 mt-10">
                <FeatureButton
                  icon="🔍"
                  text="Locate API by its url or description"
                  className="w-[400px]"
                />
                <FeatureButton
                  icon="📦"
                  text="API Parameters and Response at a glance"
                  className="w-[400px]"
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
                  fontSize={20}
                  code={Snippet.ApiParametersAndResponseAtAGlance}
                />
              </div>
            </div>
          </section>

          {/* Request Strategy */}
          <div className="bg-gray-100 dark:bg-gray-500/10">
            <section className="container mx-auto py-10 flex flex-col gap-16 justify-between ">
              <Intro
                section="Request Strategy"
                title="Complex request scenes killer"
                description={`One line of code to implement requests in various complex scenes`}
              />

              <div className="w-full grid grid-cols-12 grid-rows-3 gap-10">
                {Strategy.map(({ title, type, description, className, snippet }, index) => (
                  <FeatureBlock
                    title={title}
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
                    title="Learn total 20+ strategies"
                    className="dark:bg-[#040f26] items-center h-full w-full rounded-2xl">
                    <div className="flex flex-1 mt-5 leading-[16px] w-full justify-around text-sm">
                      <div className="flex items-center cursor-pointer">
                        <span className="font-semibold">Client strategies</span>
                        <span className="inline-block ml-2 text-white w-[14px] h-[14px]">
                          <Arrow />
                        </span>
                      </div>
                      <div className="flex items-center cursor-pointer">
                        <span className="font-semibold">Server strategies</span>
                        <span className="inline-block ml-2 text-white w-[14px] h-[14px]">
                          <Arrow />
                        </span>
                      </div>
                    </div>
                  </FeatureBlock>
                </div>
              </div>
            </section>
          </div>

          {/* Flexible */}
          <section className="container mx-auto py-10 flex flex-col gap-16 justify-between">
            <Intro
              section="Flexible"
              title="Runs in any JS environment with any request tool"
              description={`Use hooks originated from functional components, but alova innovatively made it compatible with options and class-style UI frameworks, which means that alova's use hooks are almost not restricted by JS environments and UI frameworks, and can be used together with your familiar request tools.`}
              className="max-w-[600px]"
            />
            <div className="flex gap-10 justify-between h-[400px]">
              <SupportList></SupportList>
            </div>
          </section>

          {/* Join the community */}
          <section className="container mx-auto py-10 flex flex-col mt-32 gap-24 justify-between">
            <Intro
              section="Join the community"
              title="Trusted by developers around the world"
              description={`Open source projects dependent on alova`}
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
              section="Alova team"
              title="Meet the core members"
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
                section="Try it NOW"
                title="Take your development efficiency to the next level"
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
