import AudioPlayer from '@/components/AudioPlayer';
import EmbedCodesandbox from '@/components/EmbedCodesandbox';
import EmbedSandpack from '@/components/EmbedSandpack';
import EmbedSandpackV2 from '@/components/EmbedSandpackV2';
import Examples from '@/components/Examples';
import IconFont from '@/components/IconFont';
import NavCard from '@/components/NavCard';
import Showcase from '@/components/Showcase';
import SupportList from '@/components/SupportList';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    EmbedSandpack,
    EmbedSandpackV2,
    EmbedCodesandbox,
    Examples,
    Showcase,
    SupportList,
    NavCard,
    AudioPlayer,
    IconFont,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
