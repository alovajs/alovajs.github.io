/**
 * 落地页文案与结构化数据。
 * 所有「可枚举的内容」集中在此，组件只负责渲染，便于后续增删条目。
 */

export const installCommand = 'npm i alova';
export const repoUrl = 'https://github.com/alovajs/alova';

/* ---------------- Hero 双态面板：alova 声明式代码的能力标签 ---------------- */

export const scenarioTags = [
  { label: 'Pagination', className: 'bg-blue-50 text-brand-blue border-blue-200/60' },
  { label: 'Debounce', className: 'bg-indigo-50 text-indigo-700 border-indigo-200/60' },
  {
    label: 'Multi-level Cache',
    className: 'bg-violet-50 text-violet-700 border-violet-200/60'
  },
  { label: 'Data Preloading', className: 'bg-cyan-50 text-cyan-800 border-cyan-200/60' },
  {
    label: 'Stale-response handling',
    className: 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
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
    title: 'Debounce',
    tag: '01 / SURGE',
    description:
      'Eliminates redundant rapid triggers automatically. Throttles high-frequency keystrokes to prevent backend thrashing.',
    foot: 'Built-in Guard',
    tone: 'blue'
  },
  {
    id: '02',
    icon: 'sync_saved_locally',
    title: 'Retry',
    tag: '02 / RESILIENCE',
    description:
      'Exponential backoff resilience against unstable mobile and edge networks with automated backoff algorithms.',
    foot: 'Fault Tolerance',
    tone: 'indigo'
  },
  {
    id: '03',
    icon: 'database',
    title: 'Multi-level Cache',
    tag: '03 / CACHE',
    description:
      'L1 memory combined with persistent storage for instant zero-latency page restores and seamless offline capability.',
    foot: 'Sub-millisecond',
    tone: 'cyan'
  },
  {
    id: '04',
    icon: 'compare_arrows',
    title: 'Request Sequencing',
    tag: '04 / RACE GUARD',
    description:
      'Guaranteed out-of-order execution race protection. Newest requests supersede older payloads deterministically.',
    foot: 'Race-Proof',
    tone: 'violet'
  },
  {
    id: '05',
    icon: 'update',
    title: 'Auto Refresh',
    tag: '05 / REVALIDATE',
    description:
      'Intelligently revalidates queries on window focus, network reconnection, and visibility tab returns.',
    foot: 'Event-Driven',
    tone: 'emerald'
  },
  {
    id: '06',
    icon: 'sync',
    title: 'Polling',
    tag: '06 / INTERVAL',
    description:
      'Flexible continuous or stepped polling with automatic background pauses when the user changes application tabs.',
    foot: 'Smart Frequency',
    tone: 'rose'
  },
  {
    id: '07',
    icon: 'share',
    title: 'Request Sharing',
    tag: '07 / DEDUPE',
    description:
      'Fuses duplicate concurrent calls into a single in-flight Promise across decoupled child and sibling components.',
    foot: 'Promise Fusion',
    tone: 'sky'
  },
  {
    id: '08',
    icon: 'bolt',
    title: 'Data Preloading',
    tag: '08 / PREFETCH',
    description:
      'Preload upcoming page rows or detail drawer payloads on hover, making route and pagination transitions instant.',
    foot: 'Zero Latency',
    tone: 'amber'
  },
  {
    id: '09',
    icon: 'draft',
    title: 'Form Draft',
    tag: '09 / STORAGE',
    description:
      'Local snapshot retention keeps multi-step form progress safe from accidental browser tab closes or refresh events.',
    foot: 'Auto Persist',
    tone: 'teal'
  },
  {
    id: '10',
    icon: 'grain',
    title: 'Atomic Request',
    tag: '10 / ATOMIC',
    description:
      'Groups simultaneous read operations and mutation guarantees so cascading actions succeed or roll back together.',
    foot: 'State Integrity',
    tone: 'purple'
  },
  {
    id: '11',
    icon: 'cloud_sync',
    title: 'Upload & Download',
    tag: '11 / STREAMS',
    description:
      'Accurate byte-level transfer progress hooks with pause, abort, and resume capabilities across heavy binary assets.',
    foot: 'Chunk Control',
    tone: 'blue'
  },
  {
    id: '12',
    icon: 'dynamic_feed',
    title: 'State-driven Request',
    tag: '12 / REACTIVE',
    description:
      'Eliminates imperative dispatching. Treat backend synchronization as a pure reactive consequence of UI state changes.',
    foot: 'Reactive Sync',
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
    label: 'GitHub Stars',
    secondary: '1000+ dependent repos',
    href: repoUrl
  },
  { value: '15+', label: 'Frameworks', secondary: 'Universal modern JS runtime' },
  { value: '20+', label: 'Request Strategies', secondary: 'Battle-tested scenarios' },
  { value: 'MIT', label: 'Open License', secondary: '100% Free & Open Source' }
];
