/**
 * S1 Hero 右栏代码面板的数据源。
 * 代码字符串不参与 i18n，注释统一使用英文，避免破坏高亮与缩进。
 */

export type StageKey = 'trigger' | 'decision' | 'execution' | 'apply';

/** 请求四阶段主题色，与 custom.scss 中的 CSS 变量一一对应 */
export const stageColor: Record<StageKey, string> = {
  trigger: 'var(--stage-trigger)',
  decision: 'var(--stage-decision)',
  execution: 'var(--stage-execution)',
  apply: 'var(--stage-apply)'
};

/** 底部四色图例，labelId 对应 i18n key */
export const stageLegend: { key: StageKey; labelId: string; fallback: string; where: string }[] = [
  {
    key: 'trigger',
    labelId: 'homepage.hero.stageTrigger',
    fallback: 'Trigger',
    where: 'SearchInput.tsx'
  },
  {
    key: 'decision',
    labelId: 'homepage.hero.stageDecision',
    fallback: 'Decision',
    where: 'useSearch.js'
  },
  {
    key: 'execution',
    labelId: 'homepage.hero.stageExecution',
    fallback: 'Execution',
    where: 'axios.get()'
  },
  {
    key: 'apply',
    labelId: 'homepage.hero.stageDataApplication',
    fallback: 'Data application',
    where: 'ResultList.tsx'
  }
];

export interface HandwrittenFragment {
  /** 文件名，展示在碎片头部 */
  file: string;
  /** 该碎片对应的阶段 */
  stage: StageKey;
  /** 头部右侧的一句提示 */
  hint: string;
  code: string;
}

/** 手写实现：同一个搜索分页场景，被切碎在三个文件里 */
export const handwrittenFragments: HandwrittenFragment[] = [
  {
    file: 'SearchInput.tsx',
    stage: 'trigger',
    hint: 'when?',
    code: `function SearchInput({ onSearchChange }) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  // state change, user input, paging... all trigger here
  useEffect(() => {
    onSearchChange(keyword, page);
  }, [keyword, page]);

  return <input value={keyword} onChange={e => setKeyword(e.target.value)} />;
}`
  },
  {
    file: 'useSearch.js',
    stage: 'decision',
    hint: 'should it even be sent?',
    code: `export function useSearch(keyword, page) {
  const cache = useRef(new Map());
  const inflight = useRef(new Map());
  const key = \`\${keyword}-\${page}\`;

  // hit cache? share an identical request? which response is stale?
  if (cache.current.has(key)) return cache.current.get(key);
  if (inflight.current.has(key)) return inflight.current.get(key);
  if (page < latestPage.current) return ignore; // race, resolved by hand
}`
  },
  {
    file: 'ResultList.tsx',
    stage: 'apply',
    hint: 'how does the response land?',
    code: `function ResultList({ response, onLoaded }) {
  const [list, setList] = useState([]);

  // transform, update state, sync other components, persist
  useEffect(() => {
    if (!response) return;
    const rows = response.data.map(normalize);
    setList(rows);
    onLoaded(rows);
    sessionStorage.setItem('search', JSON.stringify(rows));
  }, [response]);

  return <ul>{list.map(row => <li key={row.id}>{row.title}</li>)}</ul>;
}`
  }
];

/** alova 场景声明：同一个场景，一次声明 */
export const alovaCode = `const searchList = keyword => (page, pageSize) =>
  alova.Get('/api/search', {
    params: { keyword, page, pageSize }
  });

const {
  loading, data, page, pageSize, pageCount, total,
  onNextPage, onPrevPage
} = usePagination(searchList(keyword), {
  // trigger: re-run whenever the keyword changes
  watchingStates: [keyword],
  // decision: debounce, cache, stale-response guard
  debounce: 300,
  cacheFor: 60 * 1000,
  preloadNextPage: true
});`;

/** alova 态下方的能力标签 */
export const alovaTags: { id: string; fallback: string }[] = [
  { id: 'homepage.hero.tagPagination', fallback: 'Pagination' },
  { id: 'homepage.hero.tagDebounce', fallback: 'Debounce' },
  { id: 'homepage.hero.tagCache', fallback: 'Cache' },
  { id: 'homepage.hero.tagDataPreloading', fallback: 'Data preloading' },
  { id: 'homepage.hero.tagStaleResponse', fallback: 'Stale-response handling' }
];
