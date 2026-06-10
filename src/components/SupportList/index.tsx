'use client';
import { DLink as Link, useColorMode } from '@/lib/docusaurus-compat';
import IconFont from '@/components/IconFont';
import clsx from 'clsx';
import React from 'react';
import styles from './style.module.css';

type SupportItem = {
  id: string;
  available: boolean;
  imgSrc: string;
  darkImgSrc?: string;
  link: string;
};

interface Props {
  showStatus?: boolean;
}
export default function Support({ showStatus = false }: Props): JSX.Element {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const jsEnvList: SupportItem[] = [
    { id: 'Vue3', imgSrc: '/img/vue.svg', available: true, link: 'https://vuejs.org' },
    { id: 'React', imgSrc: '/img/react.svg', available: true, link: 'https://react.dev/' },
    { id: 'Svelte', imgSrc: '/img/svelte.svg', available: true, link: 'https://svelte.dev' },
    { id: 'Vue options', imgSrc: '/img/vue.svg', available: true, link: '/resource/framework/vue-options' },
    { id: 'Next', imgSrc: '/img/next.svg', darkImgSrc: '/img/next-dark.svg', available: true, link: '/tutorial/advanced/in-depth/ssr#nextjs' },
    { id: 'Nuxt', imgSrc: '/img/nuxt.svg', darkImgSrc: '/img/nuxt-dark.svg', available: true, link: '/tutorial/advanced/in-depth/ssr#nuxt3' },
    { id: 'nodejs', imgSrc: '/img/nodejs.svg', available: true, link: 'https://nodejs.org' },
    { id: 'bun', imgSrc: '/img/bun.svg', available: true, link: 'https://bun.sh' },
    { id: 'deno', imgSrc: '/img/deno.svg', available: true, link: 'https://deno.com' },
    { id: 'Sveltekit', imgSrc: '/img/svelte.svg', available: true, link: '/tutorial/advanced/in-depth/ssr#sveltekit' },
    { id: 'Solid', imgSrc: '/img/solid.svg', available: true, link: '/resource/framework/solid' },
    { id: 'Mini program🇨🇳', imgSrc: '/img/miniprogram.svg', available: false, link: '/resource/framework/native-mp' },
    { id: 'uniapp', imgSrc: '/img/uniapp.svg', available: true, link: '/resource/request-adapter/uniapp' },
    { id: 'Taro', imgSrc: '/img/taro.svg', available: true, link: '/resource/request-adapter/taro' },
    { id: 'Angular', imgSrc: '/img/angular.svg', available: false, link: '/resource/framework/angular' },
    { id: 'Preact', imgSrc: '/img/preact.svg', available: false, link: '/resource/framework/preact' },
    { id: 'Qwik', imgSrc: '/img/qwik.svg', available: false, link: '/resource/framework/qwik' },
    { id: 'Lit', imgSrc: '/img/lit.svg', available: false, link: '/resource/framework/lit' },
    { id: 'Stencil', imgSrc: '/img/stencil.svg', darkImgSrc: '/img/stencil-dark.svg', available: false, link: '/resource/framework/stencil' }
  ];

  const requestTools: SupportItem[] = [
    { id: 'Fetch Api', imgSrc: '/img/fetchapi.svg', available: true, link: '/resource/request-adapter/fetch' },
    { id: 'Axios', imgSrc: '/img/axios.svg', available: true, link: '/resource/request-adapter/axios' },
    { id: 'XMLHttpRequest', imgSrc: '/img/xhr.svg', available: true, link: '/resource/request-adapter/xhr' },
    { id: 'GraphQL', imgSrc: '/img/graphql.svg', available: false, link: 'https://graphql.org/' },
    { id: 'SuperAgent', imgSrc: '/img/superagent.svg', darkImgSrc: '/img/superagent-dark.svg', available: false, link: 'https://github.com/ladjs/superagent' }
  ];

  const getImageSrc = (item: SupportItem) => {
    if (isDarkTheme && item.darkImgSrc) return item.darkImgSrc;
    return item.imgSrc;
  };

  const ListView = (list: SupportItem[], className: string) => (
    <div className={`grid grid-cols-3 ${className} gap-3`}>
      {list.map((item) => (
        <Link
          to={item.link}
          key={item.id || item.link}
          className={clsx(
            'flex-col align-center',
            styles.framework,
            !item.available && showStatus ? styles.unavailableWrapper : ''
          )}>
          <img
            src={getImageSrc(item)}
            alt={item.id}
            className={clsx(
              styles.icon,
              !item.available && showStatus ? styles.iconUnavailable : ''
            )}
          />
          <span>{item.id}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div
      className={clsx(
        'grid grid-cols-1 md:grid-cols-[2fr_auto_1fr] justify-items-center md:items-center use-tailwind',
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
