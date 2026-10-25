import SupportList from '@site/src/components/SupportList';
import { SectionTagline } from './ui';

/** S5 · 弹性生态：用任何 JS 环境 + 任何请求工具 */
export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="py-32 md:py-40 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-blue mb-6">05 · FLEXIBLE RUNTIME</SectionTagline>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-[-0.035em]">
            Runs in any JS environment with any request tool.
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-4 font-normal">
            Use hooks originated from functional components, but alova innovatively made it
            compatible with options and class-style UI frameworks.
          </p>
        </div>

        <div className="flex gap-10 justify-between w-full">
          <SupportList />
        </div>
      </div>
    </section>
  );
}
