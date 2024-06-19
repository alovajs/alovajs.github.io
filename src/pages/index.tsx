import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageModule from '@site/src/components/PageModule';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import IconFont from '../components/IconFont';
import Contributors from './_indexComponent/Contributors';
import Features from './_indexComponent/Features';
import Like from './_indexComponent/Like';
import Strategy from './_indexComponent/Strategy';
import Support from './_indexComponent/Support';
import styles from './_indexComponent/index.module.css';

function HomepageHeader() {
  const buttons = [
    {
      text: (
        <div className="flex-row align-center">
          <IconFont
            name="kaishi"
            style={{ color: '#fff', marginRight: '0.6rem' }}
            size={24}></IconFont>
          <Translate id="homepage.Get Started">Get Started</Translate>
        </div>
      ),
      type: 'primary',
      link: '/tutorial/getting-started'
    },
    {
      text: <Translate id="homepage.Examples">Examples</Translate>,
      type: 'secondary',
      link: '/category/examples'
    }
  ];
  const { i18n } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className="title">
            <Translate id="homepage.title">Lightweight request strategy library</Translate>
          </h1>
          <p className="tagline">
            <Translate id="homepage.tagline">
              One line of code completes network requests in various complex scenarios. Don’t
              spend time on the small matter of requesting. Leave it to us.
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
          <CodeBlock language="bash">npm install alova</CodeBlock>

          <Link
            className={styles.announcement}
            to="next/tutorial/getting-started/introduce">
            🎉
            <Translate id="homepage.release.announce">alvoa v3.0.b-beta is here</Translate> →
          </Link>
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
        <PageModule
          text="Relationship between alova and request library"
          textTransId="homepage.relationTitle"
          desc="Traditional promised request library solves the problem of request sending very well, but They are simply
          request sending tools"
          align="center"
          descTransId="homepage.relationDesc">
          <div className={styles.relationContent}>
            <span className={styles.quota}>“</span>
            <Translate id="homepage.relationAuxi">
              Just like their weapon arsenal, alova grants them enhanced capabilities. Whether
              you prefer using axios, superagent, or the browser's fetch API, alova seamlessly
              integrates with all of them.
            </Translate>
            <span className={styles.quota}>”</span>
          </div>
        </PageModule>
        <Strategy></Strategy>
        <Support></Support>
        <Contributors></Contributors>
        <Like></Like>
      </main>
    </Layout>
  );
}
