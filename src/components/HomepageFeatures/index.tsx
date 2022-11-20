import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.Multi-framework support">Multi-framework support</Translate>,
    Svg: require('@site/static/img/1.svg').default,
    description: <Translate id="homepage.features.Multi-framework support.desc">Framework dependencies through the design of states hook, a set of code supports React/React Native/Vue/Svelte, or more...</Translate>
  },
  {
    title: <Translate id="homepage.features.Real-time automatic status management">Real-time automatic status management</Translate>,
    Svg: require('@site/static/img/2.svg').default,
    description: <Translate id="homepage.features.Real-time automatic status management.desc">All your request data and status will be managed by alova, you just need to use it directly</Translate>,
  },
  {
    title: <Translate id="homepage.features.Simple and familiar">Simple and familiar</Translate>,
    Svg: require('@site/static/img/3.svg').default,
    description: <Translate id="homepage.features.Simple and familiar.desc">API design similar to axios, making it easier and more familiar for you to get started</Translate>,
  },
  {
    title: <Translate id="homepage.features.Lightweight">Lightweight</Translate>,
    Svg: require('@site/static/img/4.svg').default,
    description: <Translate id="homepage.features.Lightweight.desc">compressed version is only 4kb, only 40% of axios</Translate>
  },
  {
    title: <Translate id="homepage.features.Simplify request logic">Simplify request logic</Translate>,
    Svg: require('@site/static/img/5.svg').default,
    description: <Translate id="homepage.features.Simplify request logic.desc">Declarative request implementation, no need for you to write request data and status, as well as request code in specific scenarios</Translate>
  },
  {
    title: <Translate id="homepage.features.Collaborate with any request library">Collaborate with any request library</Translate>,
    Svg: require('@site/static/img/6.svg').default,
    description: <Translate id="homepage.features.Collaborate with any request library.desc">Whether you like to use axios, superagent, or the browser's fetch-api, alova can be perfectly compatible without losing features</Translate>
  },
  {
    title: <Translate id="homepage.features.Multi-mode cache server data">Multi-mode cache server data</Translate>,
    Svg: require('@site/static/img/7.svg').default,
    description: <Translate id="homepage.features.Multi-mode cache server data.desc">Provides a variety of server data cache modes such as memory mode, persistence mode, etc., to improve user experience and reduce server pressure at the same time</Translate>
  },
  {
    title: <Translate id="homepage.features.Safer optimistic update">Safer optimistic update</Translate>,
    Svg: require('@site/static/img/8.svg').default,
    description: <Translate id="homepage.features.Safer optimistic update.desc">alova implements a background polling mechanism, which is still valid even if re-entry is successful until the request is successful, and with the unique delayed data update mechanism, the security of optimistic update is guaranteed</Translate>
  },
  {
    title: <Translate id="homepage.features.Data prefetch">Data prefetch</Translate>,
    Svg: require('@site/static/img/9.svg').default,
    description: <Translate id="homepage.features.Data prefetch.desc">Customize the interface data to be pulled in advance in any case, which means that users can see the information faster without waiting</Translate>
  },
  {
    title: <Translate id="homepage.features.Typescript support">Typescript support</Translate>,
    Svg: require('@site/static/img/10.svg').default,
    description: <Translate id="homepage.features.Typescript support.desc">If you like to use typescript, everything in alova will be typed</Translate>
  },
  {
    title: <Translate id="homepage.features.Offline Submission">Offline Submission</Translate>,
    Svg: require('@site/static/img/11.svg').default,
    description: <Translate id="homepage.features.Offline Submission.desc">Unique request cache, which makes requests available even offline without interrupting users in use</Translate>
  },
  {
    title: <Translate id="homepage.features.TreeShaking support">TreeShaking support</Translate>,
    Svg: require('@site/static/img/12.svg').default,
    description: <Translate id="homepage.features.TreeShaking support.desc">APIs not used by alova will not be packaged into the production package, which means that the production volume of alova is often less than 4kb</Translate>
  }
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
