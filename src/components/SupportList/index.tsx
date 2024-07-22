import Link from '@docusaurus/Link';
import IconFont from '@site/src/components/IconFont';
import clsx from 'clsx';
import React from 'react';
import styles from './style.module.css';

type SupportItem = {
  id: string;
  available: boolean;
  Image: React.ComponentType<React.ComponentProps<'svg'>>;
  link: string;
};

const jsEnvList: SupportItem[] = [
  {
    id: 'Vue3',
    Image: require('@site/static/img/vue.svg').default,
    available: true,
    link: 'https://vuejs.org'
  },
  {
    id: 'React',
    available: true,
    Image: require('@site/static/img/react.svg').default,
    link: 'https://react.dev/'
  },
  {
    id: 'Svelte',
    available: true,
    Image: require('@site/static/img/svelte.svg').default,
    link: 'https://svelte.dev'
  },
  {
    id: 'Vue options',
    available: true,
    Image: require('@site/static/img/vue.svg').default,
    link: '/resource/framework/vue-options'
  },
  {
    id: 'Next',
    available: true,
    Image: require('@site/static/img/next.svg').default,
    link: '/tutorial/advanced/in-depth/ssr#nextjs'
  },
  {
    id: 'Nuxt',
    available: true,
    Image: require('@site/static/img/nuxt.svg').default,
    link: '/tutorial/advanced/in-depth/ssr#nuxt3x'
  },
  {
    id: 'nodejs',
    available: true,
    Image: require('@site/static/img/nodejs.svg').default,
    link: 'https://nodejs.org'
  },
  {
    id: 'bun',
    available: true,
    Image: require('@site/static/img/bun.svg').default,
    link: 'https://bun.sh'
  },
  {
    id: 'deno',
    available: true,
    Image: require('@site/static/img/deno.svg').default,
    link: 'https://deno.com'
  },
  {
    id: 'Sveltekit',
    available: true,
    Image: require('@site/static/img/svelte.svg').default,
    link: '/tutorial/advanced/in-depth/ssr#sveltekit'
  },
  {
    id: 'Solid',
    available: false,
    Image: require('@site/static/img/solid.svg').default,
    link: '/resource/framework/solid'
  },
  {
    id: 'Mini program🇨🇳',
    available: false,
    Image: require('@site/static/img/miniprogram.svg').default,
    link: '/resource/framework/native-mp'
  },
  {
    id: 'uniapp',
    available: true,
    Image: ({ className }) => (
      <img
        src={require('@site/static/img/uniapp.png').default}
        className={className}
      />
    ),
    link: '/resource/request-adapter/uniapp'
  },
  {
    id: 'Taro',
    available: true,
    Image: ({ className }) => (
      <img
        src={require('@site/static/img/taro.png').default}
        className={className}
      />
    ),
    link: '/resource/request-adapter/taro'
  },
  {
    id: 'Angular',
    available: false,
    Image: require('@site/static/img/angular.svg').default,
    link: '/resource/framework/angular'
  },
  {
    id: 'Preact',
    available: false,
    Image: require('@site/static/img/preact.svg').default,
    link: '/resource/framework/preact'
  },
  {
    id: 'Qwik',
    available: false,
    Image: require('@site/static/img/qwik.svg').default,
    link: '/resource/framework/qwik'
  },
  {
    id: 'Lit',
    available: false,
    Image: require('@site/static/img/lit.svg').default,
    link: '/resource/framework/lit'
  },
  {
    id: 'Stencil',
    available: false,
    Image: require('@site/static/img/stencil.svg').default,
    link: '/resource/framework/stencil'
  }
];

const requestTools: SupportItem[] = [
  {
    id: 'Fetch Api',
    available: true,
    Image: require('@site/static/img/fetchapi.svg').default,
    link: '/resource/request-adapter/fetch'
  },
  {
    id: 'Axios',
    available: true,
    Image: require('@site/static/img/axios.svg').default,
    link: '/resource/request-adapter/axios'
  },
  {
    id: 'XMLHttpRequest',
    available: true,
    Image: require('@site/static/img/xhr.svg').default,
    link: '/resource/request-adapter/xhr'
  },
  {
    id: 'GraphQL',
    available: false,
    Image: require('@site/static/img/graphql.svg').default,
    link: 'https://graphql.org/'
  },
  {
    id: 'SuperAgent',
    available: false,
    Image: require('@site/static/img/superagent.svg').default,
    link: 'https://github.com/ladjs/superagent'
  }
];

interface Props {
  showStatus?: boolean;
}
export default function Support({ showStatus = false }: Props): JSX.Element {
  const ListView = (list: SupportItem[], colSpan = 7) => (
    <div className={`col col--${colSpan} flex-row justify-center flex-wrap`}>
      {list.map(({ id, Image, link, available }) => (
        <Link
          to={link}
          key={id || link}
          className={clsx(
            'flex-col align-center',
            styles.framework,
            !available && showStatus ? styles.unavailableWrapper : ''
          )}>
          <Image
            className={clsx(
              styles.icon,
              !available && showStatus ? styles.iconUnavailable : ''
            )}
          />
          <span>{id}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={clsx('row align-center', styles.wrapper)}>
      {ListView(jsEnvList)}
      <div className={clsx('col col--1 flex-col align-center', styles.iconPlus)}>
        <IconFont
          name="plus"
          size={32}></IconFont>
      </div>
      {ListView(requestTools, 4)}
    </div>
  );
}
