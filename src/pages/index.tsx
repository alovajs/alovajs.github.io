import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

function HomepageHeader() {
  const buttons = [
    {
      text: <Translate id="homepage.Examples">Examples</Translate>,
      type: 'secondary',
      link: '/example/init-page'
    },
    {
      text: <Translate id="homepage.Get Started">Get Started</Translate>,
      type: 'primary',
      link: '/overview/index'
    }
  ];
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <img
          src={require('@site/static/img/logo-text.png').default}
          className={styles.logo}
          alt="logo"
        />
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">
            A lightweight MVVM request scene management library to make application management CS data interaction more
            efficient and experience better
          </Translate>
        </p>
        <div className={styles.buttons}>
          {buttons.map(({ text, type, link }) => (
            <Link
              className={clsx('button button--lg', styles.btn, `button--${type}`)}
              to={link}>
              {text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={translate(
        {
          message: '{libName} - lightweight MVVM request scene management library',
          id: 'homepage.title'
        },
        { libName: siteConfig.title }
      )}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
