import Link from '@docusaurus/Link';
import PageModule from '@site/src/components/PageModule';
import clsx from 'clsx';
import React from 'react';
import styles from '../Support/style.module.css';

type AvailableItem = {
  id: string;
  Image: React.ComponentType<React.ComponentProps<'svg'>>;
  link: string;
};

const jsEnvList: AvailableItem[] = [
  {
    id: 'Vue options',
    Image: require('@site/static/img/vue.svg').default,
    link: 'tutorial/framework/vue-options'
  }
];

export default function AvailableScope(): JSX.Element {
  return (
    <PageModule
      text="Breaking the boundary of the usage of useHook"
      textTransId="homepage.availableScope.title"
      desc="🎉NOW alova is perfectly compatible with vue options, enjoy it!"
      descTransId="homepage.availableScope.subtitle"
      align="center">
      <div className="flex-row justify-center">
        {jsEnvList.map(({ id, Image, link }) => (
          <Link
            to={link}
            key={id || link}
            className={clsx('flex-col align-center', styles.framework)}>
            <Image className={styles.icon} />
            <strong>{id}</strong>
          </Link>
        ))}
      </div>
    </PageModule>
  );
}
