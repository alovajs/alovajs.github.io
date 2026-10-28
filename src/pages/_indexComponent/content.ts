/**
 * 落地页文案与结构化数据。
 * 所有「可枚举的内容」集中在此，组件只负责渲染，便于后续增删条目。
 * 文案通过 Docusaurus 自带的 translate() 接入 i18n（翻译存于 i18n/zh-CN/code.json）。
 */

import { translate } from '@docusaurus/Translate';

export const installCommand = 'npm i alova';
export const repoUrl = 'https://github.com/alovajs/alova';

/* ---------------- Hero 双态面板：alova 声明式代码的能力标签 ---------------- */

export const scenarioTags = [
  {
    label: translate({ id: 'homepage.hero.tag.Pagination', message: 'Pagination' }),
    className:
      'bg-blue-50 text-brand-blue border-blue-200/60 dark:bg-brand-blue/10 dark:border-brand-blue/30'
  },
  {
    label: translate({ id: 'homepage.hero.tag.Debounce', message: 'Debounce' }),
    className:
      'bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-400/30'
  },
  {
    label: translate({ id: 'homepage.hero.tag.Multi-level Cache', message: 'Multi-level Cache' }),
    className:
      'bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/30'
  },
  {
    label: translate({ id: 'homepage.hero.tag.Data Preloading', message: 'Data Preloading' }),
    className:
      'bg-cyan-50 text-cyan-800 border-cyan-200/60 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-400/30'
  },
  {
    label: translate({
      id: 'homepage.hero.tag.Stale-response handling',
      message: 'Stale response handling'
    }),
    className:
      'bg-emerald-50 text-emerald-800 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30'
  }
] as const;

/* ---------------- 03 · 12 项请求能力 ---------------- */

export type CapabilityTone =
  | 'blue'
  | 'indigo'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'rose'
  | 'sky'
  | 'amber'
  | 'teal'
  | 'purple';

export interface Capability {
  id: string;
  icon: string;
  title: string;
  tag: string;
  description: string;
  foot: string;
  tone: CapabilityTone;
}

export const capabilities: Capability[] = [
  {
    id: '01',
    icon: 'timer',
    title: translate({ id: 'homepage.capability.chip.01.title', message: 'Debounce' }),
    tag: translate({ id: 'homepage.capability.chip.01.tag', message: '01 / SURGE' }),
    description: translate({
      id: 'homepage.capability.chip.01.description',
      message:
        'Collapses rapid, redundant triggers automatically. A burst of keystrokes never floods your backend.'
    }),
    foot: translate({ id: 'homepage.capability.chip.01.foot', message: 'Built-in Guard' }),
    tone: 'blue'
  },
  {
    id: '02',
    icon: 'sync_saved_locally',
    title: translate({ id: 'homepage.capability.chip.02.title', message: 'Retry' }),
    tag: translate({ id: 'homepage.capability.chip.02.tag', message: '02 / RESILIENCE' }),
    description: translate({
      id: 'homepage.capability.chip.02.description',
      message:
        'Automatic retries with exponential backoff. Flaky mobile and edge networks won’t break the flow.'
    }),
    foot: translate({ id: 'homepage.capability.chip.02.foot', message: 'Fault Tolerance' }),
    tone: 'indigo'
  },
  {
    id: '03',
    icon: 'database',
    title: translate({ id: 'homepage.capability.chip.03.title', message: 'Multi-level Cache' }),
    tag: translate({ id: 'homepage.capability.chip.03.tag', message: '03 / CACHE' }),
    description: translate({
      id: 'homepage.capability.chip.03.description',
      message:
        'L1 memory plus persistent storage. Pages restore instantly and work offline.'
    }),
    foot: translate({ id: 'homepage.capability.chip.03.foot', message: 'Sub-millisecond' }),
    tone: 'cyan'
  },
  {
    id: '04',
    icon: 'compare_arrows',
    title: translate({ id: 'homepage.capability.chip.04.title', message: 'Race handling' }),
    tag: translate({ id: 'homepage.capability.chip.04.tag', message: '04 / RACE GUARD' }),
    description: translate({
      id: 'homepage.capability.chip.04.description',
      message:
        'Race-condition safe. The latest request always wins, and stale responses are discarded.'
    }),
    foot: translate({ id: 'homepage.capability.chip.04.foot', message: 'Race-Proof' }),
    tone: 'violet'
  },
  {
    id: '05',
    icon: 'update',
    title: translate({ id: 'homepage.capability.chip.05.title', message: 'Auto Refresh' }),
    tag: translate({ id: 'homepage.capability.chip.05.tag', message: '05 / REVALIDATE' }),
    description: translate({
      id: 'homepage.capability.chip.05.description',
      message:
        'Revalidates data when the window regains focus, the network reconnects, or the tab becomes visible again.'
    }),
    foot: translate({ id: 'homepage.capability.chip.05.foot', message: 'Event-Driven' }),
    tone: 'emerald'
  },
  {
    id: '06',
    icon: 'sync',
    title: translate({ id: 'homepage.capability.chip.06.title', message: 'Polling' }),
    tag: translate({ id: 'homepage.capability.chip.06.tag', message: '06 / INTERVAL' }),
    description: translate({
      id: 'homepage.capability.chip.06.description',
      message:
        'Flexible continuous or stepped polling. It pauses automatically when you switch tabs.'
    }),
    foot: translate({ id: 'homepage.capability.chip.06.foot', message: 'Smart Frequency' }),
    tone: 'rose'
  },
  {
    id: '07',
    icon: 'share',
    title: translate({ id: 'homepage.capability.chip.07.title', message: 'Request Sharing' }),
    tag: translate({ id: 'homepage.capability.chip.07.tag', message: '07 / DEDUPE' }),
    description: translate({
      id: 'homepage.capability.chip.07.description',
      message:
        'Deduplicates identical concurrent requests anywhere in the component tree into a single in-flight call.'
    }),
    foot: translate({ id: 'homepage.capability.chip.07.foot', message: 'Single flight' }),
    tone: 'sky'
  },
  {
    id: '08',
    icon: 'bolt',
    title: translate({ id: 'homepage.capability.chip.08.title', message: 'Data Preloading' }),
    tag: translate({ id: 'homepage.capability.chip.08.tag', message: '08 / PREFETCH' }),
    description: translate({
      id: 'homepage.capability.chip.08.description',
      message:
        'Preload the next page or a detail view on hover. Navigation and pagination feel instant.'
    }),
    foot: translate({ id: 'homepage.capability.chip.08.foot', message: 'Zero Latency' }),
    tone: 'amber'
  },
  {
    id: '09',
    icon: 'draft',
    title: translate({ id: 'homepage.capability.chip.09.title', message: 'Form Draft' }),
    tag: translate({ id: 'homepage.capability.chip.09.tag', message: '09 / STORAGE' }),
    description: translate({
      id: 'homepage.capability.chip.09.description',
      message:
        'Keeps a local snapshot of multi-step forms. Safe from accidental tab closes or refreshes.'
    }),
    foot: translate({ id: 'homepage.capability.chip.09.foot', message: 'Auto Persist' }),
    tone: 'teal'
  },
  {
    id: '10',
    icon: 'grain',
    title: translate({ id: 'homepage.capability.chip.10.title', message: 'Atomic Request' }),
    tag: translate({ id: 'homepage.capability.chip.10.tag', message: '10 / ATOMIC' }),
    description: translate({
      id: 'homepage.capability.chip.10.description',
      message:
        'Bundles related reads and writes. A cascade of operations either fully succeeds or rolls back together.'
    }),
    foot: translate({ id: 'homepage.capability.chip.10.foot', message: 'State Integrity' }),
    tone: 'purple'
  },
  {
    id: '11',
    icon: 'cloud_sync',
    title: translate({ id: 'homepage.capability.chip.11.title', message: 'Upload & Download' }),
    tag: translate({ id: 'homepage.capability.chip.11.tag', message: '11 / STREAMS' }),
    description: translate({
      id: 'homepage.capability.chip.11.description',
      message:
        'Byte-accurate progress hooks with pause, abort and resume for large binary transfers.'
    }),
    foot: translate({ id: 'homepage.capability.chip.11.foot', message: 'Chunk Control' }),
    tone: 'blue'
  },
  {
    id: '12',
    icon: 'dynamic_feed',
    title: translate({ id: 'homepage.capability.chip.12.title', message: 'State-driven Request' }),
    tag: translate({ id: 'homepage.capability.chip.12.tag', message: '12 / REACTIVE' }),
    description: translate({
      id: 'homepage.capability.chip.12.description',
      message:
        'Drops imperative dispatching. Data sync becomes a direct, reactive consequence of your UI state.'
    }),
    foot: translate({ id: 'homepage.capability.chip.12.foot', message: 'Reactive Sync' }),
    tone: 'cyan'
  }
];

/* ---------------- 06 · 信任与数字 ---------------- */

export interface Metric {
  value: string;
  label: string;
  secondary: string;
  href?: string;
}

export const metrics: Metric[] = [
  {
    value: '6.2k+',
    label: translate({ id: 'homepage.trust.metric.githubStars', message: 'GitHub Stars' }),
    secondary: translate({
      id: 'homepage.trust.metric.githubStarsSecondary',
      message: '1000+ dependent repositories'
    }),
    href: repoUrl
  },
  {
    value: '15+',
    label: translate({ id: 'homepage.trust.metric.frameworks', message: 'Frameworks' }),
    secondary: translate({
      id: 'homepage.trust.metric.frameworksSecondary',
      message: 'Universal modern JS runtimes'
    })
  },
  {
    value: '20+',
    label: translate({ id: 'homepage.trust.metric.strategies', message: 'Request Strategies' }),
    secondary: translate({
      id: 'homepage.trust.metric.strategiesSecondary',
      message: 'Battle-tested scenarios'
    })
  },
  {
    value: 'MIT',
    label: translate({ id: 'homepage.trust.metric.license', message: 'Open License' }),
    secondary: translate({
      id: 'homepage.trust.metric.licenseSecondary',
      message: '100% free and open source'
    })
  }
];
