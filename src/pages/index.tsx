import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageModule from '@site/src/components/PageModule';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import AvailableScope from './_indexComponent/AvailableScope';
import Features from './_indexComponent/Features';
import Like from './_indexComponent/Like';
import Strategy from './_indexComponent/Strategy';
import Support from './_indexComponent/Support';
import styles from './_indexComponent/index.module.css';

function HomepageHeader() {
  const buttons = [
    {
      text: <Translate id="homepage.Get Started">Get Started</Translate>,
      type: 'primary',
      link: '/tutorial/getting-started'
    },
    {
      text: <Translate id="homepage.Examples">Examples</Translate>,
      type: 'secondary',
      link: '/category/examples'
    }
  ];
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.left}>
            <h1>
              <Translate id="homepage.title">A lightweight request strategy library</Translate>
            </h1>
            <p>
              <Translate id="homepage.tagline">
                Choose the request strategy you want, the declarative implementation of complex network requests with
                minimal code can greatly enhance the fluidity and availability of your application, making it appear as
                if it has exceptional strategic thinking, much like a wise man.
              </Translate>
            </p>
            <div className={clsx(styles.buttons, 'margin-bottom--md')}>
              {buttons.map(({ text, type, link }, i) => (
                <Link
                  key={link}
                  className={clsx(
                    'button button--lg',
                    i === buttons.length - 1 ? '' : 'margin-right--md',
                    `button--${type}`
                  )}
                  to={link}>
                  {text}
                </Link>
              ))}
            </div>
            <CodeBlock language="bash">$ npm install alova</CodeBlock>
          </div>
          <CodeBlock
            language="javascript"
            className={styles.codeExample}>{`const todo = alova.Get('/todo', {
  params: {
    id: 1
  }
});
const { loading, data, error } = useRequest(todo);`}</CodeBlock>
          {/* <img
            src={require('@site/static/img/logo.svg').default}
            className={styles.logo}
            alt="logo"
          /> */}
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={
        siteConfig.title +
        ' - ' +
        translate({
          message: 'Lightweight request strategy library',
          id: 'homepage.title'
        })
      }
      description="alova.js a lightweight request strategy library">
      <HomepageHeader></HomepageHeader>
      <main>
        <Features></Features>
        <AvailableScope></AvailableScope>
        <PageModule
          text="Relationship between alova and request library"
          textTransId="homepage.relationTitle"
          desc="Traditional promised request library solves the problem of request sending very well, but They are simply
          request sending tools"
          descTransId="homepage.relationDesc">
          <div className={styles.relationContent}>
            <span className={styles.quota}>“</span>
            <Translate id="homepage.relationAuxi">
              Just like their weapon arsenal, alova grants them enhanced capabilities. Whether you prefer using axios,
              superagent, or the browser's fetch API, alova seamlessly integrates with all of them.
            </Translate>
            <span className={styles.quota}>”</span>
          </div>
        </PageModule>
        <Strategy></Strategy>
        <Support></Support>
        <Like></Like>
      </main>
    </Layout>
  );
}
