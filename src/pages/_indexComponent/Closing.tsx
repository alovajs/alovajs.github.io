import Link from '@docusaurus/Link';
import { repoUrl } from './content';
import { MaterialIcon } from './ui';

/** S7 · 收尾行动召唤 */
export default function Closing() {
  return (
    <section className="py-32 md:py-44 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-mono uppercase tracking-widest inline-block mb-8 font-semibold">
          07 · TRY IT NOW
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-950 max-w-3xl mx-auto leading-[1.12] tracking-[-0.035em] mb-6">
          Open your latest list page and{' '}
          <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
            mark the code in four passes.
          </span>
        </h2>

        <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto font-normal mb-12">
          See how many lines the execution takes, and where the rest of the logic scattered.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            className="px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center gap-2"
            to="/tutorial/getting-started/introduce">
            <span>Getting Started</span>
            <MaterialIcon
              name="arrow_forward"
              className="text-[16px]"
            />
          </Link>

          <Link
            className="px-7 py-3.5 rounded-full bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-900 text-sm font-semibold tracking-wide transition-all"
            to="/examples">
            <span>Examples</span>
          </Link>

          <a
            className="px-7 py-3.5 rounded-full bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-900 text-sm font-semibold tracking-wide transition-all flex items-center gap-2"
            href={repoUrl}
            target="_blank"
            rel="noreferrer">
            <MaterialIcon
              name="star"
              filled
              className="text-[16px] text-amber-500"
            />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
