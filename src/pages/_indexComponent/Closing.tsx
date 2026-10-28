import Link from '@docusaurus/Link';
import { repoUrl } from './content';
import { MaterialIcon } from './ui';
import { translate } from '@docusaurus/Translate';

/** S7 · 收尾行动召唤 */
export default function Closing() {
  return (
    <section className="py-32 md:py-44 bg-canvas relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-sunken text-ink-2 text-[11px] font-mono uppercase tracking-widest inline-block mb-8 font-semibold">
          {translate({ id: 'homepage.closing.section', message: '07 · TRY IT NOW' })}
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink-1 max-w-3xl mx-auto leading-[1.12] tracking-[-0.035em] mb-6">
          {translate({ id: 'homepage.closing.lead', message: 'Open the last list page you wrote, and ' })}
          <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            {translate({ id: 'homepage.closing.strong', message: 'label its code in four stages.' })}
          </span>
        </h2>

        <p className="text-ink-3 text-base md:text-lg max-w-xl mx-auto font-normal mb-12">
          {translate({
            id: 'homepage.closing.tail',
            message: 'See how many lines the execution takes, and where the rest of the logic ended up.'
          })}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            className="px-8 py-3.5 rounded-full bg-ink-1 hover:bg-ink-2 text-canvas text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2"
            to="/tutorial/getting-started/introduce">
            <span>{translate({ id: 'homepage.Getting Started', message: 'Getting Started' })}</span>
            <MaterialIcon
              name="arrow_forward"
              className="text-[16px]"
            />
          </Link>

          <Link
            className="px-7 py-3.5 rounded-full bg-surface border border-hairline hover:border-hairline-strong text-ink-1 text-sm font-semibold tracking-wide transition-all"
            to="/examples">
            <span>{translate({ id: 'homepage.Examples', message: 'Examples' })}</span>
          </Link>

          <a
            className="px-7 py-3.5 rounded-full bg-surface border border-hairline hover:border-hairline-strong text-ink-1 text-sm font-semibold tracking-wide transition-all flex items-center gap-2"
            href={repoUrl}
            target="_blank"
            rel="noreferrer">
            <MaterialIcon
              name="star"
              filled
              className="text-[16px] text-amber-500"
            />
            <span>{translate({ id: 'homepage.hero.github', message: 'GitHub' })}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
