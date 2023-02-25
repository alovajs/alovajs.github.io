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
                  className={clsx('button button--lg', styles.btn, `button--${type}`)}
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
          message: 'lightweight request strategy library',
          id: 'homepage.title'
        })
      }
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
