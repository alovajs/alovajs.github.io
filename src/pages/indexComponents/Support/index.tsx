import clsx from 'clsx';
import React from 'react';
import styles from './style.module.css';

type SupportItem = {
  Image: React.ComponentType<React.ComponentProps<'svg'>>;
  link: string;
};

const supportList: SupportItem[] = [
  {
    Image: require('@site/static/img/vue.svg').default,
    link: 'https://vuejs.org'
  },
  {
    Image: require('@site/static/img/react.svg').default,
    link: 'https://react.dev/'
  },
  {
    Image: require('@site/static/img/svelte.svg').default,
    link: 'https://svelte.dev'
  },
  {
    Image: ({ className }) => (
      <img
        src={require('@site/static/img/uniapp.png').default}
        className={className}
      />
    ),
    link: 'https://uniapp.dcloud.net.cn/'
  },
  {
    Image: ({ className }) => (
      <img
        src={require('@site/static/img/taro.png').default}
        className={className}
      />
    ),
    link: 'https://taro.jd.com/'
  }
];

export default function Support(): JSX.Element {
  return (
    <div className={clsx(styles.wrapper)}>
      {supportList.map(({ Image, link }) => (
        <a
          href={link}
          target="_blank"
          key={link}
          className={styles.iconWrapper}>
          <Image
            role="img"
            className={styles.icon}
          />
        </a>
      ))}
    </div>
  );
}
