import clsx from 'clsx';
import { useEffect, useState, type ReactNode } from 'react';
import { scenarioTags } from './content';
import styles from './page.module.css';

type StageMode = 'handwritten' | 'alova';

/** 与进度条动画时长保持一致 */
const cyclingInterval = 4800;

type FragmentTone = 'amber' | 'blue' | 'violet' | 'emerald';

const fragmentTones: Record<FragmentTone, { card: string; head: string; strong: string }> = {
  amber: {
    card: 'bg-amber-50/60 border-amber-200/70',
    head: 'text-amber-700',
    strong: 'text-amber-800'
  },
  blue: {
    card: 'bg-blue-50/60 border-blue-200/70',
    head: 'text-blue-700',
    strong: 'text-blue-800'
  },
  violet: {
    card: 'bg-violet-50/60 border-violet-200/70',
    head: 'text-violet-700',
    strong: 'text-violet-800'
  },
  emerald: {
    card: 'bg-emerald-50/60 border-emerald-200/70',
    head: 'text-emerald-700',
    strong: 'text-emerald-800'
  }
};

function FragmentCard(props: {
  stage: string;
  file: string;
  tone: FragmentTone;
  children: ReactNode;
}) {
  const tone = fragmentTones[props.tone];

  return (
    <div className={clsx('p-4 rounded-xl border text-zinc-800', tone.card)}>
      <div
        className={clsx(
          'flex items-center justify-between text-[11px] mb-1.5 font-bold uppercase tracking-wider',
          tone.head,
          styles.sans
        )}>
        <span>{props.stage}</span>
        <span className="text-zinc-500 text-[10px] font-mono">{props.file}</span>
      </div>
      <div className="text-zinc-800 font-mono text-xs leading-relaxed">{props.children}</div>
    </div>
  );
}

/** 状态一：手写的四段碎片化实现 */
function HandwrittenPanel() {
  return (
    <div className="w-full flex flex-col gap-3 font-mono text-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <FragmentCard
          stage="Stage 1 · Trigger"
          file="SearchInput.tsx"
          tone="amber">
          keyword, page ← user input / paging;
          <br />
          <span className={clsx(fragmentTones.amber.strong, 'font-semibold')}>when change:</span>{' '}
          emit(keyword, page)
        </FragmentCard>

        <FragmentCard
          stage="Stage 2 · Decision"
          file="useSearch.js"
          tone="blue">
          <span className={clsx(fragmentTones.blue.strong, 'font-semibold')}>if cached</span>
          (key): return cache;
          <br />
          <span className={clsx(fragmentTones.blue.strong, 'font-semibold')}>if inFlight</span>
          (key): cancelOld();
          <br />
          <span className="text-zinc-500">{'// manual race condition guard'}</span>
        </FragmentCard>

        <FragmentCard
          stage="Stage 3 · Execution"
          file="api.js"
          tone="violet">
          <span className={clsx(fragmentTones.violet.strong, 'font-semibold')}>axios.post</span>
          {"('/api/search', { keyword, page })"}
          <br />
          <span className="text-zinc-500">{'// the only 5% of code HTTP clients handle'}</span>
        </FragmentCard>

        <FragmentCard
          stage="Stage 4 · Data Application"
          file="ResultList.tsx"
          tone="emerald">
          rows ← normalize(res); setState(rows);
          <br />
          notify(rows); persistCache(rows);
        </FragmentCard>
      </div>

      <div className={clsx('mt-2 text-center text-[11px] text-zinc-400', styles.sans)}>
        ⚠️ 4 separate files, redundant synchronization, and manual edge-case handling.
      </div>
    </div>
  );
}

/** 状态二：alova 一次声明收敛整个场景 */
function AlovaPanel() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
        <span className="text-brand-blue font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-blue" />
          usePagination.ts
        </span>
        <span
          className={clsx(
            'bg-blue-50 text-brand-blue border border-blue-200/60 px-3 py-1 rounded-full font-bold text-[11px]',
            styles.sans
          )}>
          1 Unified Scenario Strategy
        </span>
      </div>

      <pre className="font-mono text-xs md:text-sm text-zinc-800 leading-relaxed overflow-x-auto bg-zinc-50/80 p-5 rounded-xl border border-zinc-100">
        <span className="text-brand-blue font-bold">const</span>
        {' {\n  data, page, pageSize, loading, isLastPage\n} = '}
        <span className="text-zinc-950 font-bold">usePagination</span>
        {'(\n  (page, size) => '}
        <span className="text-brand-electric font-semibold">api.getArticles</span>
        {'(page, size),\n  {\n    '}
        <span className="text-zinc-500">debounce</span>
        {': '}
        <span className="text-brand-blue font-semibold">300</span>
        {',\n    '}
        <span className="text-zinc-500">preloadPreviousPage</span>
        {': '}
        <span className="text-brand-blue font-semibold">true</span>
        {',\n    '}
        <span className="text-zinc-500">preloadNextPage</span>
        {': '}
        <span className="text-brand-blue font-semibold">true</span>
        {',\n    '}
        <span className="text-zinc-500">watchingStates</span>
        {': [keyword]\n  }\n);'}
      </pre>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {scenarioTags.map(tag => (
          <span
            key={tag.label}
            className={clsx(
              'px-3 py-1 rounded-full border text-[11px] font-semibold',
              styles.sans,
              tag.className
            )}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Hero 双态代码面板：自动轮播 + 手动接管 */
export default function HeroPlayground() {
  const [mode, setMode] = useState<StageMode>('alova');
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return undefined;

    const timer = window.setInterval(() => {
      setMode(current => (current === 'alova' ? 'handwritten' : 'alova'));
    }, cyclingInterval);

    return () => window.clearInterval(timer);
  }, [manual]);

  const select = (next: StageMode) => {
    setManual(true);
    setMode(next);
  };

  const tabClassName = (active: boolean) =>
    clsx(
      'relative px-4 py-1.5 rounded-full transition-all overflow-hidden',
      active ? 'bg-white text-black shadow-sm font-semibold' : 'text-zinc-600 hover:text-black font-medium'
    );

  return (
    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] overflow-hidden text-left relative">
      {/* 面板标题栏：文件名 + 轮播状态 + 舞台切换 */}
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-zinc-400 font-medium">scenario.spec.ts</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <span
              className={clsx(
                'w-1.5 h-1.5 rounded-full',
                manual ? 'bg-zinc-400' : 'bg-emerald-500 animate-pulse'
              )}
            />
            <span>{manual ? 'manual inspect' : 'auto cycling'}</span>
          </div>

          <div className="flex items-center bg-zinc-200/60 p-1 rounded-full text-xs relative overflow-hidden">
            <button
              type="button"
              className={tabClassName(mode === 'handwritten')}
              onClick={() => select('handwritten')}>
              <span className="relative z-10">Handwritten</span>
              {mode === 'handwritten' && !manual ? (
                <span
                  key={mode}
                  className={clsx('absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue', styles.tabProgress)}
                />
              ) : null}
            </button>
            <button
              type="button"
              className={tabClassName(mode === 'alova')}
              onClick={() => select('alova')}>
              <span className="relative z-10">alova declaration</span>
              {mode === 'alova' && !manual ? (
                <span
                  key={mode}
                  className={clsx('absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue', styles.tabProgress)}
                />
              ) : null}
            </button>
          </div>
        </div>
      </div>

      {/* 舞台：两种实现轮流呈现 */}
      <div className="p-6 md:p-8 min-h-[360px] flex items-center">
        {mode === 'handwritten' ? <HandwrittenPanel /> : <AlovaPanel />}
      </div>
    </div>
  );
}
