import Link from '@docusaurus/Link';
import { Strategy, type FeatureBlockProps } from '@site/src/common/constants';
import { useColorMode } from '@docusaurus/theme-common';
import { Highlight, themes } from 'prism-react-renderer';
import { MaterialIcon, SectionTagline } from './ui';
import { translate } from '@docusaurus/Translate';

const clientStrategies = Strategy.filter(item => item.type === 'Client');
const serverStrategies = Strategy.filter(item => item.type === 'Server');
const crossStrategies = Strategy.filter(item => item.type === 'Cross');

/** 策略类型标签配色：客户端 / 服务端 / 跨组件各用一种语义色（暗色下提亮文字、底色改为低透明度） */
const typeBadgeClass: Record<string, string> = {
  Client:
    'bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-400/30',
  Server:
    'bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-400/30',
  Cross:
    'bg-violet-50 text-violet-700 border-violet-200/70 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-400/30'
};

/** 代码高亮：与站点其他代码块一致的 prism 着色，底色沿用页面浅灰（暗色切换成 oneDark） */
function CodeSnippet({ code }: { code: string }) {
  const { colorMode } = useColorMode();

  return (
    <Highlight
      theme={colorMode === 'dark' ? themes.oneDark : themes.oneLight}
      code={code}
      language="tsx">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, backgroundColor: 'transparent' }}
          className="mt-5 p-4 rounded-xl bg-sunken border border-hairline font-mono text-[11px] leading-relaxed overflow-x-auto">
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({ token })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function StrategyCard({ item }: { item: FeatureBlockProps }) {
  return (
    <div className="p-7 rounded-2xl bg-surface border border-hairline hover:border-brand-blue transition-all flex flex-col shadow-sm hover:shadow-soft">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="text-lg font-bold text-ink-1 leading-snug">{item.title}</h4>
        {item.type ? (
          <span
            className={`shrink-0 mt-0.5 px-2 py-0.5 rounded border text-[11px] font-mono font-semibold ${
              typeBadgeClass[item.type] ?? 'bg-sunken text-ink-2 border-hairline'
            }`}>
            {item.type}
          </span>
        ) : null}
      </div>

      {item.description ? (
        <p className="text-ink-3 text-xs leading-relaxed font-normal">{item.description}</p>
      ) : null}

      {item.snippet ? <CodeSnippet code={item.snippet} /> : null}

      <Link
        className="mt-auto pt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-1 hover:text-brand-blue transition-colors"
        to={item.to ?? '#'}>
        <span>{translate({ id: 'homepage.requestStrategy.learnMore', message: 'Learn more' })}</span>
        <MaterialIcon
          name="arrow_forward"
          className="text-[14px]"
        />
      </Link>
    </div>
  );
}

function StrategyLayer(props: {
  eyebrow: string;
  note: string;
  items: FeatureBlockProps[];
  gridClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-2xl">
        <h3 className="text-xl md:text-2xl font-bold text-ink-1 tracking-tight">
          {props.eyebrow}
        </h3>
        <p className="text-ink-3 text-sm mt-2 font-normal">{props.note}</p>
      </div>
      <div
        className={
          props.gridClassName ?? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }>
        {props.items.map(item => (
          <StrategyCard
            key={item.title}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

/** S4 · 场景策略库：客户端 / 服务端 / 跨组件三组策略 */
export default function StrategyLibrary() {
  return (
    <section
      id="strategies"
      className="py-32 md:py-40 bg-sunken dark:bg-white/[0.02] border-t border-hairline scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-blue mb-6">
          {translate({ id: 'homepage.requestStrategy.sectionTitle', message: '04 · STRATEGY LIBRARY' })}
        </SectionTagline>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-1 tracking-[-0.035em]">
            {translate({
              id: 'homepage.requestStrategy.title',
              message: 'Every strategy is a complete scenario.'
            })}
          </h2>
          <p className="text-ink-3 text-base md:text-lg mt-4 font-normal">
            {translate({
              id: 'homepage.requestStrategy.description',
              message:
                'One declaration pre-orchestrates the trigger, the decision, the execution and the data application.'
            })}
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <StrategyLayer
            eyebrow={translate({
              id: 'homepage.requestStrategy.layer.client',
              message: 'Client strategies'
            })}
            note={translate({
              id: 'homepage.requestStrategy.layer.clientNote',
              message:
                'Built-in hooks that declare a complete scenario, trigger, decision, execution and application in one call. No need to stitch those stages together by hand.'
            })}
            items={clientStrategies}
          />

          <StrategyLayer
            eyebrow={translate({
              id: 'homepage.requestStrategy.layer.server',
              message: 'Server strategies'
            })}
            note={translate({
              id: 'homepage.requestStrategy.layer.serverNote',
              message:
                'Server-side control covers retry, rate limiting and atomic requests, with no extra middleware.'
            })}
            items={serverStrategies}
          />

          <StrategyLayer
            eyebrow={translate({
              id: 'homepage.requestStrategy.layer.cross',
              message: 'Cross-component, zero wiring'
            })}
            note={translate({
              id: 'homepage.requestStrategy.layer.crossNote',
              message:
                'Trigger and sync requests across any component. No prop drilling, no global store.'
            })}
            items={crossStrategies}
            gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
          />

          {/* 更多策略入口 */}
          <div className="p-8 md:p-10 rounded-2xl bg-black text-white border border-transparent dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                {translate({
                  id: 'homepage.requestStrategy.More Strategy.title',
                  message: 'Explore all 20+ strategies'
                })}
              </h3>
              <p className="text-zinc-400 text-xs mt-2 font-normal">
                {translate({
                  id: 'homepage.requestStrategy.More Strategy.desc',
                  message: 'Every strategy ships as a documented, ready-to-use module.'
                })}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-xs font-bold uppercase tracking-wider">
              <Link
                className="inline-flex items-center gap-2 text-brand-cyan hover:underline"
                to="/tutorial/client/strategy/">
                <span>
                  {translate({
                    id: 'homepage.requestStrategy.More Strategy.Client',
                    message: 'Client strategies'
                  })}
                </span>
                <MaterialIcon
                  name="arrow_forward"
                  className="text-[14px]"
                />
              </Link>
              <Link
                className="inline-flex items-center gap-2 text-brand-cyan hover:underline"
                to="/tutorial/server/strategy/">
                <span>
                  {translate({
                    id: 'homepage.requestStrategy.More Strategy.Server',
                    message: 'Server strategies'
                  })}
                </span>
                <MaterialIcon
                  name="arrow_forward"
                  className="text-[14px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
