import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const buttons = [
    {
      text: '示例',
      type: 'secondary',
      link: '/example/init-page'
    },
    {
      text: '开始',
      type: 'primary',
      link: '/overview/index'
    }
  ];
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        <img
          src={require('@site/static/img/logo-text.png').default}
          className={styles.logo}
          alt="logo"
        />
        <Translate>
          {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
          siteConfig.tagline
        </Translate>
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
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
