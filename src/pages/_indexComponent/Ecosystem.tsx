import SupportList from '@site/src/components/SupportList';
import { SectionTagline } from './ui';
import { translate } from '@docusaurus/Translate';

/** S5 · 弹性生态：用任何 JS 环境 + 任何请求工具 */
export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="py-32 md:py-40 bg-canvas scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-blue mb-6">
          {translate({ id: 'homepage.Flexible.section', message: '05 · FLEXIBLE RUNTIME' })}
        </SectionTagline>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-1 tracking-[-0.035em]">
            {translate({
              id: 'homepage.Flexible.title',
              message: 'Runs in any JS environment with any request tool.'
            })}
          </h2>
          <p className="text-ink-3 text-base md:text-lg mt-4 font-normal">
            {translate({
              id: 'homepage.Flexible.description',
              message:
                'alova hands the network call to the request library you already use, axios, fetch or XHR. It works with React, Vue, Svelte and every major framework, including options and class-based ones.'
            })}
          </p>
        </div>

        <div className="flex gap-10 justify-between w-full">
          <SupportList />
        </div>
      </div>
    </section>
  );
}
