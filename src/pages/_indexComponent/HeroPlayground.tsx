import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './page.module.css';

type StageTone = 'amber' | 'blue' | 'violet' | 'emerald';

/** 每一步停留时长；推进到末步后冻结、不再重播 */
const STEP_INTERVAL = 2400;
const STEPS = 5;

/** 四阶段配色：左侧色条 / 高亮底 / 阶段标签 */
const toneColor: Record<StageTone, { bar: string; bg: string; label: string }> = {
  amber: {
    bar: 'bg-amber-400',
    bg: 'bg-amber-400/15',
    label: 'text-amber-700 dark:text-amber-300 bg-amber-400/15'
  },
  blue: {
    bar: 'bg-blue-400',
    bg: 'bg-blue-400/15',
    label: 'text-blue-700 dark:text-blue-300 bg-blue-400/15'
  },
  violet: {
    bar: 'bg-violet-400',
    bg: 'bg-violet-400/15',
    label: 'text-violet-700 dark:text-violet-300 bg-violet-400/15'
  },
  emerald: {
    bar: 'bg-emerald-400',
    bg: 'bg-emerald-400/15',
    label: 'text-emerald-700 dark:text-emerald-300 bg-emerald-400/15'
  }
};

function stageShort(tone: StageTone): string {
  switch (tone) {
    case 'amber':
      return translate({ id: 'homepage.hero.stageTriggerShort', message: 'Trigger' });
    case 'blue':
      return translate({ id: 'homepage.hero.stageDecisionShort', message: 'Decision' });
    case 'violet':
      return translate({ id: 'homepage.hero.stageExecutionShort', message: 'Execution' });
    case 'emerald':
      return translate({
        id: 'homepage.hero.stageDataApplicationShort',
        message: 'Application'
      });
    default:
      return '';
  }
}

/** 极简 JS 语法高亮：推进后的代码着色，未推进时保持灰色（见调用处） */
function highlight(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  const re =
    /(\/\/.*$)|('[^']*')|(\b(?:let|const|async|function|await|return|if|new)\b)|(\b\d+\b)|([A-Za-z_$][\w$]*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="text-ink-4 italic">
          {m[1]}
        </span>
      );
    } else if (m[2] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="text-emerald-600 dark:text-emerald-400">
          {m[2]}
        </span>
      );
    } else if (m[3] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="text-violet-600 dark:text-violet-300">
          {m[3]}
        </span>
      );
    } else if (m[4] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="text-amber-600 dark:text-amber-300">
          {m[4]}
        </span>
      );
    } else if (m[5] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="text-brand-blue dark:text-brand-cyan">
          {m[5]}
        </span>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** 左侧手写伪 JS 代码（框架无关），逐行绑定阶段与显现步 */
interface LeftLine {
  text: string;
  stage?: StageTone;
  step: number;
}

const leftLines: LeftLine[] = [
  { text: "let keyword = '';", stage: 'amber', step: 1 },
  { text: 'let page = 1;', stage: 'amber', step: 1 },
  { text: 'let data = [], total = 0;', stage: 'emerald', step: 5 },
  { text: 'let loading = false;', stage: 'emerald', step: 5 },
  { text: 'const cache = new Map();', stage: 'blue', step: 3 },
  { text: '', step: 1 },
  { text: "on(keywordInput, 'input', () => {", stage: 'amber', step: 1 },
  { text: '  debounce(() => {', stage: 'amber', step: 2 },
  { text: '    keyword = getValue();', stage: 'amber', step: 2 },
  { text: '    page = 1;', stage: 'amber', step: 2 },
  { text: '    fetchPage();', stage: 'amber', step: 1 },
  { text: '  }, 300);', stage: 'amber', step: 2 },
  { text: '});', stage: 'amber', step: 1 },
  { text: '', step: 4 },
  { text: 'async function fetchPage() {', step: 4 },
  { text: "  const key = keyword + ':' + page;", stage: 'blue', step: 3 },
  { text: "  const nextKey = keyword + ':' + (page + 1);", stage: 'blue', step: 3 },
  { text: '  afterLoaded(() => {', stage: 'blue', step: 3 },
  { text: '    cache.set(nextKey, load(nextKey));', stage: 'blue', step: 3 },
  { text: '  });', stage: 'blue', step: 3 },
  { text: '', step: 4 },
  { text: '  loading = true;', stage: 'violet', step: 4 },
  { text: '  const res = await axios.post(', stage: 'violet', step: 4 },
  { text: "    '/api/search', { keyword, page });", stage: 'violet', step: 4 },
  { text: '', step: 5 },
  { text: '  data = normalize(res.list);', stage: 'emerald', step: 5 },
  { text: '  total = res.total;', stage: 'emerald', step: 5 },
  { text: '  cache.set(key, data);', stage: 'emerald', step: 5 },
  { text: '  render(data);', stage: 'emerald', step: 5 },
  { text: '}', stage: 'emerald', step: 5 }
];

/** 右侧 alova 声明：与左侧同款代码框（行号 + 色条），骨架行常显，参数行随步骤显现 */
interface RightLine {
  text: string;
  stage?: StageTone;
  step?: number;
}

const rightLines: RightLine[] = [
  { text: 'const {' },
  { text: '  data, page, pageSize,', stage: 'emerald', step: 5 },
  { text: '  loading, isLastPage', stage: 'emerald', step: 5 },
  { text: '} = usePagination(' },
  { text: '  (page, size) =>', stage: 'violet', step: 4 },
  { text: '    api.searchList(keyword, page, size),', stage: 'violet', step: 4 },
  { text: '  {' },
  { text: '    watchingStates: [keyword],', stage: 'amber', step: 1 },
  { text: '    debounce: 300,', stage: 'amber', step: 2 },
  { text: '    preloadNextPage: true', stage: 'blue', step: 3 },
  { text: '  }' },
  { text: ');' }
];

function renderCodeRow(props: {
  index: number;
  text: string;
  stage?: StageTone;
  step?: number;
  currentStep: number;
  highlightStep: number;
  interactive: boolean;
  lineRefs?: { current: (HTMLDivElement | null)[] };
  setHoveredStep: (v: number | null) => void;
}) {
  const isSeg = props.stage !== undefined;
  const revealed = isSeg ? props.currentStep >= (props.step ?? 0) : true;
  const highlighted = isSeg ? (props.step ?? 0) === props.highlightStep : false;
  const tone = props.stage ? toneColor[props.stage] : null;
  return (
    <div
      key={props.index}
      ref={el => {
        if (props.lineRefs) props.lineRefs.current[props.index] = el;
      }}
      onMouseEnter={
        props.interactive && isSeg ? () => props.setHoveredStep(props.step ?? null) : undefined
      }
      onMouseLeave={props.interactive ? () => props.setHoveredStep(null) : undefined}
      className={clsx(
        'flex items-stretch rounded transition-all duration-300',
        highlighted && tone ? tone.bg : ''
      )}>
      <span className="w-6 shrink-0 text-right pr-2 text-ink-4 select-none">
        {props.index + 1}
      </span>
      <span
        className={clsx(
          'w-1 shrink-0 rounded-full mr-2 my-[2px]',
          tone ? (revealed ? tone.bar : 'bg-[#c8d0db] dark:bg-[#37425a]') : 'bg-transparent'
        )}
      />
      <span
        className={clsx(
          'flex-1 whitespace-pre',
          revealed ? 'text-ink-1' : 'text-[#c8d0db] dark:text-[#37425a]'
        )}>
        {revealed ? highlight(props.text) : props.text}
        {props.stage && (
          <span
            className={clsx(
              'ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold align-middle transition-opacity duration-300',
              tone!.label,
              revealed ? '' : 'opacity-0'
            )}>
            {stageShort(props.stage)}
          </span>
        )}
      </span>
    </div>
  );
}

function LeftCode(props: {
  highlightStep: number;
  currentStep: number;
  interactive: boolean;
  setHoveredStep: (v: number | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  /** 每步推进后，平滑滚动到当前步的最后一行（已揭示内容底部） */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeIndex = leftLines.reduce((acc, l, i) => (l.step <= props.currentStep ? i : acc), 0);
    const el = lineRefs.current[activeIndex];
    if (!el) return;
    const elTop =
      el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    const target = elTop - container.clientHeight / 2 + el.clientHeight / 2;
    const max = container.scrollHeight - container.clientHeight;
    container.scrollTo({ top: Math.max(0, Math.min(target, max)), behavior: 'smooth' });
  }, [props.currentStep]);

  return (
    <div
      ref={containerRef}
      className="font-mono text-[11px] leading-5 overflow-auto max-h-[22rem]">
      {leftLines.map((line, i) =>
        renderCodeRow({ index: i, ...line, ...props, lineRefs })
      )}
    </div>
  );
}

function RightCode(props: {
  highlightStep: number;
  currentStep: number;
  interactive: boolean;
  setHoveredStep: (v: number | null) => void;
}) {
  return (
    <div className="font-mono text-[11px] leading-5 overflow-x-auto">
      {rightLines.map((line, i) => renderCodeRow({ index: i, ...line, ...props }))}
    </div>
  );
}

/** 四阶段图例 */
function Legend() {
  const items: { tone: StageTone; shortKey: string; msg: string }[] = [
    { tone: 'amber', shortKey: 'stageTriggerShort', msg: 'Trigger' },
    { tone: 'blue', shortKey: 'stageDecisionShort', msg: 'Decision' },
    { tone: 'violet', shortKey: 'stageExecutionShort', msg: 'Execution' },
    { tone: 'emerald', shortKey: 'stageDataApplicationShort', msg: 'Application' }
  ];
  return (
    <div className="flex items-center gap-3 text-[11px]">
      {items.map(it => (
        <span
          key={it.tone}
          className="flex items-center gap-1.5">
          <span className={clsx('w-2 h-2 rounded-full', toneColor[it.tone].bar)} />
          <span className="text-ink-3">
            {translate({ id: `homepage.hero.${it.shortKey}`, message: it.msg })}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * S1 代码面板（Tailwind 官网式逐行点亮）：
 * 左 2/3 手写伪 JS（框架无关），右 1/3 alova 声明，均为同款带行号代码框，中间竖线分隔。
 * 配置参数与对应手写代码初始为灰色，每 2.4s 推进一段并语法高亮 + 点亮对应行，
 * 推进到末步后冻结不再重播；任意时刻只有一个阶段组高亮，
 * 冻结后鼠标移入其他代码块会把高亮转移过去，移出后回到冻结步。
 */
export default function HeroPlayground() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const frozen = currentStep >= STEPS;
  /** 推进完成前禁用 hover；完成后才允许悬停联动，且任意时刻只有一个阶段组高亮 */
  const paused = hoveredStep !== null;
  const highlightStep = frozen ? (hoveredStep ?? currentStep) : currentStep;

  useEffect(() => {
    if (frozen || paused) return undefined;
    const id = window.setTimeout(() => {
      setCurrentStep(s => (s >= STEPS ? s : s + 1));
    }, STEP_INTERVAL);
    return () => window.clearTimeout(id);
  }, [currentStep, paused, frozen]);

  return (
    <div className="max-w-7xl mx-auto bg-sunken backdrop-blur-xl border border-hairline rounded-2xl shadow-soft overflow-hidden text-left relative">
      {/* 标题栏：文件名 + 四阶段图例 */}
      <div className="px-4 sm:px-6 py-3 border-b border-hairline flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-ink-4 font-medium">Pagination.ts</span>
        </div>
        <div className="hidden md:block">
          <Legend />
        </div>
      </div>

      {/* 代码区：与窗口边框留一点距离，内部为圆角面板，左右竖线分隔 */}
      <div className="p-2 sm:p-3">
        <div className="rounded-xl border border-hairline overflow-hidden grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-hairline bg-surface">
          {/* 左栏：手写伪 JS */}
          <div className="lg:col-span-2 p-4">
            <div
              className={clsx(
                'text-xs font-semibold mb-3 flex items-center gap-2',
                styles.sans
              )}>
              <span className="text-ink-1">
                {translate({ id: 'homepage.hero.tabHandwritten', message: 'Handwritten' })}
              </span>
              <span className="text-ink-4 font-normal">· 伪 JS · 框架无关</span>
            </div>
            <LeftCode
              currentStep={currentStep}
              highlightStep={highlightStep}
              interactive={frozen}
              setHoveredStep={setHoveredStep}
            />
          </div>

          {/* 右栏：alova 声明（同款代码框 + 行号） */}
          <div className="lg:col-span-1 p-4">
            <div
              className={clsx(
                'text-xs font-semibold mb-3 flex items-center gap-2',
                styles.sans
              )}>
              <span className="text-ink-1">
                {translate({ id: 'homepage.hero.tabAlova', message: 'alova declaration' })}
              </span>
            </div>
            <RightCode
              currentStep={currentStep}
              highlightStep={highlightStep}
              interactive={frozen}
              setHoveredStep={setHoveredStep}
            />
          </div>
        </div>
      </div>

      {/* 底部：结论 + 状态指示 */}
      <div className="px-4 sm:px-6 py-3 border-t border-hairline flex items-center justify-between gap-4">
        <div className="text-[11px] font-mono text-ink-3">
          <span className="text-ink-4">4 段手写</span>
          <span className="text-brand-blue mx-1">→</span>
          <span className="text-brand-blue font-semibold">1 次声明</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-4">
          <span
            className={clsx(
              'w-1.5 h-1.5 rounded-full',
              frozen ? 'bg-emerald-500' : paused ? 'bg-ink-4' : 'bg-emerald-500 animate-pulse'
            )}
          />
          <span>
            {frozen
              ? translate({ id: 'homepage.hero.toggleDone', message: 'completed' })
              : paused
                ? translate({ id: 'homepage.hero.toggleManual', message: 'manual inspect' })
                : translate({ id: 'homepage.hero.toggleAuto', message: 'auto cycling' })}
          </span>
        </div>
      </div>
    </div>
  );
}
