import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/pages/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

function HomepageHeader() {
  const buttons = [
    {
      text: <Translate id="homepage.Get Started">Get Started</Translate>,
      type: 'primary',
      link: '/overview/index'
    },
    {
      text: <Translate id="homepage.Examples">Examples</Translate>,
      type: 'secondary',
      link: '/example/init-page'
    }
  ];
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.left}>
            <h2 className="hero__title">
              <Translate id="homepage.title">Lightweight request strategy library</Translate>
            </h2>
            <p>
              <Translate id="homepage.tagline">
                According to different request scenarios, we provide targeted request strategies to improve application
                fluency and availability, reduce server pressure, and enable applications to have excellent strategic
                thinking like a wise man
              </Translate>
            </p>
            <div className={styles.buttons}>
              {buttons.map(({ text, type, link }) => (
                <Link
                  key={link}
                  className={clsx('button button--lg margin-right--md', `button--${type}`)}
                  to={link}>
                  {text}
                </Link>
              ))}
            </div>
          </div>
          <img
            src={require('@site/static/img/logo.png').default}
            className={styles.logo}
            alt="logo"
          />
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
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className={styles.relation}>
          <strong className={clsx(styles.relationTitle, 'margin-bottom--md')}>
            <Translate id="homepage.relationTitle">Relationship between alova and request library</Translate>
          </strong>
          <h3 className="hero__subtitle">
            <Translate id="homepage.relationDesc">
              Traditional promised request library solves the problem of request sending very well, but They are simply
              request sending tools
            </Translate>
          </h3>
          <p>
            <Translate id="homepage.relationAuxi">
              Alova is like their armed forces. Through alova, you can obtain more powerful capabilities. Whether you
              like to use axios, super agent, or browser's fetch-api, alova can be perfectly compatible
            </Translate>
          </p>
        </div>
      </main>
    </Layout>
  );
}
