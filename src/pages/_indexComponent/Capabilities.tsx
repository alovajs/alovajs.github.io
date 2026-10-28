import clsx from 'clsx';
import { capabilities, type CapabilityTone } from './content';
import { MaterialIcon, SectionTagline } from './ui';
import { translate } from '@docusaurus/Translate';

interface ToneStyle {
  card: string;
  tile: string;
  pill: string;
  accent: string;
}

/**
 * 每种能力的色彩语义：浅色是「淡彩底 + 深色字」，暗色是「同色低透明度发光底 + 提亮字」。
 * 暗色变体统一加 -300/-400 一级，保证在 #0a1224 面板上对比度足够。
 */
const toneStyles: Record<CapabilityTone, ToneStyle> = {
  blue: {
    card: 'hover:border-blue-500/50 hover:shadow-blue-500/5',
    tile: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/15 dark:text-blue-300 dark:group-hover:bg-blue-500 dark:group-hover:text-white',
    pill: 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-500/15',
    accent: 'text-blue-600 dark:text-blue-400'
  },
  indigo: {
    card: 'hover:border-indigo-500/50 hover:shadow-indigo-500/5',
    tile: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/15 dark:text-indigo-300 dark:group-hover:bg-indigo-500 dark:group-hover:text-white',
    pill: 'text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-500/15',
    accent: 'text-indigo-600 dark:text-indigo-400'
  },
  cyan: {
    card: 'hover:border-cyan-500/50 hover:shadow-cyan-500/5',
    tile: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-500/15 dark:text-cyan-300 dark:group-hover:bg-cyan-500 dark:group-hover:text-white',
    pill: 'text-cyan-700 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-500/15',
    accent: 'text-cyan-600 dark:text-cyan-400'
  },
  violet: {
    card: 'hover:border-violet-500/50 hover:shadow-violet-500/5',
    tile: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/15 dark:text-violet-300 dark:group-hover:bg-violet-500 dark:group-hover:text-white',
    pill: 'text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-500/15',
    accent: 'text-violet-600 dark:text-violet-400'
  },
  emerald: {
    card: 'hover:border-emerald-500/50 hover:shadow-emerald-500/5',
    tile: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/15 dark:text-emerald-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-white',
    pill: 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/15',
    accent: 'text-emerald-600 dark:text-emerald-400'
  },
  rose: {
    card: 'hover:border-rose-500/50 hover:shadow-rose-500/5',
    tile: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white dark:bg-rose-500/15 dark:text-rose-300 dark:group-hover:bg-rose-500 dark:group-hover:text-white',
    pill: 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-500/15',
    accent: 'text-rose-600 dark:text-rose-400'
  },
  sky: {
    card: 'hover:border-sky-500/50 hover:shadow-sky-500/5',
    tile: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-500/15 dark:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-white',
    pill: 'text-sky-700 bg-sky-50 dark:text-sky-300 dark:bg-sky-500/15',
    accent: 'text-sky-600 dark:text-sky-400'
  },
  amber: {
    card: 'hover:border-amber-500/50 hover:shadow-amber-500/5',
    tile: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white dark:bg-amber-500/15 dark:text-amber-300 dark:group-hover:bg-amber-500 dark:group-hover:text-white',
    pill: 'text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-500/15',
    accent: 'text-amber-600 dark:text-amber-400'
  },
  teal: {
    card: 'hover:border-teal-500/50 hover:shadow-teal-500/5',
    tile: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white dark:bg-teal-500/15 dark:text-teal-300 dark:group-hover:bg-teal-500 dark:group-hover:text-white',
    pill: 'text-teal-700 bg-teal-50 dark:text-teal-300 dark:bg-teal-500/15',
    accent: 'text-teal-600 dark:text-teal-400'
  },
  purple: {
    card: 'hover:border-purple-500/50 hover:shadow-purple-500/5',
    tile: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-500/15 dark:text-purple-300 dark:group-hover:bg-purple-500 dark:group-hover:text-white',
    pill: 'text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/15',
    accent: 'text-purple-600 dark:text-purple-400'
  }
};

/** S3 · 默认即超越预期的 12 项能力 */
export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-32 md:py-40 bg-canvas relative overflow-hidden scroll-mt-24">
      {/* 能力网格背后的柔和环境光：暗色下换成低透明度品牌光，避免整块泛白 */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-blue-100/60 dark:bg-brand-blue/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-cyan-100/60 dark:bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-blue mb-6">
          {translate({ id: 'homepage.capability.section', message: 'DEFAULT-ON CAPABILITIES · 12' })}
        </SectionTagline>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-1 tracking-[-0.035em]">
              {translate({ id: 'homepage.capability.title', message: 'On by default, and then some.' })}
            </h2>
            <p className="text-ink-3 text-base md:text-lg mt-4 max-w-2xl font-normal leading-relaxed">
              {translate({
                id: 'homepage.capability.description',
                message:
                  'Every capability ships enabled by default. No plugins to wire up, no heavy config, just unified primitives for modern frontends.'
              })}
            </p>
          </div>

          <a
            className="text-xs font-bold uppercase tracking-wider text-ink-1 border-b border-ink-1 pb-1 hover:text-brand-blue hover:border-brand-blue transition-colors self-start md:self-auto inline-flex items-center gap-1.5"
            href="#strategies">
            <span>{translate({ id: 'homepage.capability.explore', message: 'Explore scenario hooks' })}</span>
            <MaterialIcon
              name="arrow_forward"
              className="text-[15px]"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {capabilities.map(item => {
            const tone = toneStyles[item.tone];

            return (
              <div
                key={item.id}
                className={clsx(
                  'p-6 rounded-2xl bg-surface border border-hairline hover:shadow-soft hover:-translate-y-1 transition-all flex flex-col justify-between group',
                  tone.card
                )}>
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={clsx(
                        'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                        tone.tile
                      )}>
                      <MaterialIcon
                        name={item.icon}
                        className="text-[20px]"
                      />
                    </div>
                    <span
                      className={clsx(
                        'font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full',
                        tone.pill
                      )}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink-1 mb-2">{item.title}</h3>
                  <p className="text-ink-3 text-xs leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-hairline flex items-center justify-between text-[11px] font-mono text-ink-4">
                  <span>{item.foot}</span>
                  <span className={clsx('font-semibold', tone.accent)}>
                    {translate({ id: 'homepage.capability.active', message: 'Active' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
