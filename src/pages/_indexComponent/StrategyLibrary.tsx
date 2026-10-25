import Link from '@docusaurus/Link';
import { Strategy, type FeatureBlockProps } from '@site/src/common/constants';
import { Highlight, themes } from 'prism-react-renderer';
import { MaterialIcon, SectionTagline } from './ui';

const clientStrategies = Strategy.filter(item => item.type === 'Client');
const serverStrategies = Strategy.filter(item => item.type === 'Server');
const crossStrategies = Strategy.filter(item => item.type === 'Cross');

/** 策略类型标签配色：客户端 / 服务端 / 跨组件各用一种语义色 */
const typeBadgeClass: Record<string, string> = {
  Client: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
  Server: 'bg-amber-50 text-amber-700 border-amber-200/70',
  Cross: 'bg-violet-50 text-violet-700 border-violet-200/70'
};

/** 代码高亮：与站点其他代码块一致的 prism 着色，底色沿用页面浅灰 */
function CodeSnippet({ code }: { code: string }) {
  return (
    <Highlight
      theme={themes.oneLight}
      code={code}
      language="tsx">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, backgroundColor: 'transparent' }}
          className="mt-5 p-4 rounded-xl bg-zinc-50 border border-zinc-100 font-mono text-[11px] leading-relaxed overflow-x-auto">
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
    <div className="p-7 rounded-2xl bg-white border border-zinc-200/80 hover:border-brand-blue transition-all flex flex-col shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="text-lg font-bold text-zinc-900 leading-snug">{item.title}</h4>
        {item.type ? (
          <span
            className={`shrink-0 mt-0.5 px-2 py-0.5 rounded border text-[11px] font-mono font-semibold ${
              typeBadgeClass[item.type] ?? 'bg-zinc-100 text-zinc-700 border-zinc-200'
            }`}>
            {item.type}
          </span>
        ) : null}
      </div>

      {item.description ? (
        <p className="text-zinc-500 text-xs leading-relaxed font-normal">{item.description}</p>
      ) : null}

      {item.snippet ? <CodeSnippet code={item.snippet} /> : null}

      <Link
        className="mt-auto pt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black hover:text-brand-blue transition-colors"
        to={item.to ?? '#'}>
        <span>Learn more</span>
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
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">
          {props.eyebrow}
        </h3>
        <p className="text-zinc-500 text-sm mt-2 font-normal">{props.note}</p>
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
      className="py-32 md:py-40 bg-zinc-50/60 border-t border-zinc-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-blue mb-6">04 · STRATEGY LIBRARY</SectionTagline>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-[-0.035em]">
            Every strategy is a complete scenario.
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-4 font-normal">
            One declaration pre-orchestrates the trigger, the decision, the execution and the
            data application.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <StrategyLayer
            eyebrow="Client strategies"
            note="Built-in hooks that replace the boilerplate you would otherwise hand-write with React Query or axios."
            items={clientStrategies}
          />

          <StrategyLayer
            eyebrow="Server strategies"
            note="Server-side control — retry, rate limiting, atomic requests and more — without adding middleware."
            items={serverStrategies}
          />

          <StrategyLayer
            eyebrow="Cross-component, zero wiring"
            note="Trigger and sync requests across any component — no prop drilling, no global store."
            items={crossStrategies}
            gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
          />

          {/* 更多策略入口 */}
          <div className="p-8 md:p-10 rounded-2xl bg-black text-white flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Learn total 20+ strategies
              </h3>
              <p className="text-zinc-400 text-xs mt-2 font-normal">
                Every strategy ships as a documented, ready-to-use module.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-xs font-bold uppercase tracking-wider">
              <Link
                className="inline-flex items-center gap-2 text-brand-cyan hover:underline"
                to="/tutorial/client/strategy/">
                <span>Client strategies</span>
                <MaterialIcon
                  name="arrow_forward"
                  className="text-[14px]"
                />
              </Link>
              <Link
                className="inline-flex items-center gap-2 text-brand-cyan hover:underline"
                to="/tutorial/server/strategy/">
                <span>Server strategies</span>
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
