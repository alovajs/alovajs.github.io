import Github from '@site/static/img/github.svg';
import { CoreDevs, DeveloperComments, Project } from '@site/src/common/constants';
import { metrics } from './content';
import { MaterialIcon, SectionTagline } from './ui';

/** S6 · 信任与数字：指标 / 社区项目与评价 / 团队 */
export default function Trust() {
  return (
    <section className="py-32 md:py-40 bg-zinc-50/60 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-blue mb-6">
          06 · TRUSTED &amp; HONEST
        </SectionTagline>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-[-0.035em]">
            Built for real apps — and honest about when not to use it.
          </h2>
          <p className="text-zinc-500 text-base md:text-lg mt-4 font-normal">
            Adopted in production environments handling millions of critical data events daily.
          </p>
        </div>

        {/* 指标卡 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {metrics.map(metric => (
            <div
              key={metric.label}
              className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-sm">
              <span className="text-4xl md:text-5xl font-extrabold text-zinc-950 block mb-2 tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs font-bold text-zinc-800 tracking-wide block">
                {metric.label}
              </span>
              {metric.href ? (
                <a
                  className="text-[11px] font-mono text-zinc-400 hover:text-black transition-colors inline-flex items-center gap-1 mt-1 font-medium"
                  href={metric.href}
                  target="_blank"
                  rel="noreferrer">
                  <span>{metric.secondary}</span>
                  <MaterialIcon
                    name="north_east"
                    className="text-[12px]"
                  />
                </a>
              ) : (
                <span className="text-[11px] font-mono text-zinc-400 block mt-1">
                  {metric.secondary}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Join the community */}
        <div className="mb-24">
          <div className="flex flex-col items-center text-center">
            <SectionTagline className="justify-center text-brand-blue mb-5">
              Join the community
            </SectionTagline>
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-[-0.03em]">
              Used in production by real teams
            </h3>
            <p className="text-zinc-500 text-sm md:text-base mt-3 font-normal">
              Open source projects dependent on alova
            </p>
          </div>

          {/* 依赖 alova 的开源项目 */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-10 md:gap-20">
            {Project.map(item => (
              <a
                key={item.name}
                className="group flex flex-col items-center gap-3"
                href={item.to}
                target="_blank"
                rel="noreferrer">
                <img
                  className="h-[54px] w-auto object-contain"
                  src={item.avatar as string}
                  alt={item.name}
                />
                <span className="text-sm font-semibold text-zinc-700 group-hover:text-brand-blue transition-colors">
                  {item.name}
                </span>
              </a>
            ))}
          </div>

          {/* 开发者评价 */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {DeveloperComments.map(item => (
              <div
                key={item.name}
                className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-sm flex gap-5">
                <img
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                  src={item.avatar as string}
                  alt={item.name}
                />
                <div>
                  <span className="block text-sm font-bold text-zinc-900">{item.name}</span>
                  <span className="block text-[11px] font-mono text-zinc-400 mt-1 mb-4">
                    {item.description}
                  </span>
                  <div className="text-zinc-600 text-sm leading-relaxed font-normal">
                    {item.children}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alova team */}
        <div>
          <div className="flex flex-col items-center text-center">
            <SectionTagline className="justify-center text-brand-blue mb-5">
              Alova team
            </SectionTagline>
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-[-0.03em]">
              Meet the core members
            </h3>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {CoreDevs.map(item => (
              <div
                key={item.name}
                className="p-10 rounded-2xl bg-white border border-zinc-200/80 shadow-sm flex flex-col items-center gap-4">
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={item.avatar as string}
                  alt={item.name}
                />
                <span className="text-base font-bold text-zinc-900">{item.name}</span>
                <a
                  className="text-zinc-400 hover:text-black transition-colors"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.name} on GitHub`}>
                  <Github className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
