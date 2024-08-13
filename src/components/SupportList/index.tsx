import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
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

interface Props {
  showStatus?: boolean;
}
export default function Support({ showStatus = false }: Props): JSX.Element {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
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
      Image: isDarkTheme
        ? require('@site/static/img/next-dark.svg').default
        : require('@site/static/img/next.svg').default,
      link: '/tutorial/advanced/in-depth/ssr#nextjs'
    },
    {
      id: 'Nuxt',
      available: true,
      Image: isDarkTheme
        ? require('@site/static/img/nuxt-dark.svg').default
        : require('@site/static/img/nuxt.svg').default,
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
      Image: require('@site/static/img/uniapp.svg').default,
      link: '/resource/request-adapter/uniapp'
    },
    {
      id: 'Taro',
      available: true,
      Image: require('@site/static/img/taro.svg').default,
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
      Image: isDarkTheme
        ? require('@site/static/img/stencil-dark.svg').default
        : require('@site/static/img/stencil.svg').default,
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
      Image: isDarkTheme
        ? require('@site/static/img/superagent-dark.svg').default
        : require('@site/static/img/superagent.svg').default,
      link: 'https://github.com/ladjs/superagent'
    }
  ];

  const ListView = (list: SupportItem[], className: string) => (
    <div className={`grid grid-cols-3 ${className} gap-3`}>
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
    <div
      className={clsx(
        'grid grid-cols-1 md:grid-cols-[2fr_auto_1fr] justify-items-center md:items-center',
        styles.wrapper
      )}>
      {ListView(jsEnvList, 'md:grid-cols-4 xl:grid-cols-6')}
      <IconFont
        name="plus"
        className="my-6 md:mx-6"
        size={32}></IconFont>
      {ListView(requestTools, 'md:grid-cols-2 xl:grid-cols-3')}
    </div>
  );
}
