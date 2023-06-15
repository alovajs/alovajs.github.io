import Translate from '@docusaurus/Translate';
import IconFont from '@site/src/components/IconFont';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: JSX.Element;
  icon: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.Simple and familiar">Simple and familiar</Translate>,
    icon: 'check',
    description: (
      <Translate id="homepage.features.Simple and familiar.desc">
        API design similar to axios, making it easier and more familiar for you to get started
      </Translate>
    )
  },
  {
    title: (
      <Translate id="homepage.features.High performance request strategy">High performance request strategy</Translate>
    ),
    icon: 'shandian',
    description: (
      <Translate id="homepage.features.High performance request strategy.desc">
        Different request strategies are provided for different request scenarios to reduce performance problems caused
        by requests
      </Translate>
    )
  },
  {
    title: <Translate id="homepage.features.Request-level cache">Request-level cache</Translate>,
    icon: 'shujuku',
    description: (
      <Translate id="homepage.features.Request-level cache.desc">
        Provides various server-side data cache modes such as memory mode and persistence mode to improve user
        experience and reduce server pressure
      </Translate>
    )
  },
  {
    title: <Translate id="homepage.features.Lightweight">Lightweight</Translate>,
    icon: 'box',
    description: (
      <Translate id="homepage.features.Lightweight.desc">compressed version is only 4kb, only 40% of axios</Translate>
    )
  }
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('container col col--3', styles.cardWrapper)}>
      <div className="card__header">
        <IconFont
          name={icon}
          size={28}
          className={clsx(styles.featureSvg)}></IconFont>
      </div>
      <div className="card__body">
        <h3>{title}</h3>
        <p className={styles.featureDesc}>{description}</p>
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
            <Feature
              key={idx}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
