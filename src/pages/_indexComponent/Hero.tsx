import clsx from 'clsx';
import { installCommand, repoUrl } from './content';
import HeroPlayground from './HeroPlayground';
import Sponsors from './Sponsors';
import { Button, MaterialIcon } from './ui';
import useCopyInstall from './useCopyInstall';
import Translate, { translate } from '@docusaurus/Translate';
import AuroraBackdrop from './visuals/AuroraBackdrop';
import { useGitHubStars, formatStars } from './useGitHubStars';

/** S1 · 主张 + 双态代码面板 + 赞助商墙 */
export default function Hero() {
  const { copied, copy } = useCopyInstall();
  const gitHubStars = useGitHubStars();

  return (
    <section className="relative pt-24 pb-28 md:pt-32 md:pb-36 overflow-hidden bg-canvas">
      {/* 抽象流体极光背景层 */}
      <AuroraBackdrop />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Eyebrow 徽标 */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface backdrop-blur border border-hairline shadow-sm text-xs font-medium text-ink-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span>
            <Translate id="homepage.hero.eyebrow">
              Scenario-first architecture · 01
            </Translate>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-1 mb-8 max-w-4xl mx-auto">
          {translate({
            id: 'homepage.hero.titleLead',
            message: 'The unit of a request isn’t a call, '
          })}
          <span className="titleGradient">
            {translate({ id: 'homepage.hero.titleTail', message: 'it’s a scenario.' })}
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-ink-2 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          <Translate id="homepage.hero.tagline">
            alova distills every kind of request scenario into four stages and encapsulates them as
            request strategy functions. Request completeness no longer depends on the engineer or the
            AI prompt, but is pre-orchestrated by the strategy for that specific scenario.
          </Translate>
        </p>

        {/* CTA 行 */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-20">
          <Button
            variant="primary"
            to="/tutorial/getting-started/introduce">
            <span>{translate({ id: 'homepage.Getting Started', message: 'Getting Started' })}</span>
            <MaterialIcon
              name="arrow_forward"
              className="text-[16px]"
            />
          </Button>

          <Button
            variant="default"
            href={repoUrl}>
            <MaterialIcon
              name="star"
              filled
              className="text-[18px] text-amber-500"
            />
            <span>
              {translate({ id: 'homepage.hero.github', message: 'GitHub' })}
              {gitHubStars ? ` ${formatStars(gitHubStars)}` : ''}
            </span>
          </Button>

          <button
            type="button"
            aria-label={translate({
              id: 'homepage.hero.copy',
              message: `Copy "${installCommand}"`
            })}
            className={clsx(
              'heroGradientBorder flex items-center gap-2 px-5 py-3.5 rounded-full border border-hairline text-ink-2 font-mono text-xs cursor-pointer transition-all shadow-sm',
              copied ? 'bg-lavender' : 'bg-sunken hover:bg-lavender'
            )}
            onClick={copy}>
            <span className="text-ink-4">$</span>
            <span className="font-medium">{installCommand}</span>
            <MaterialIcon
              name={copied ? 'check' : 'content_copy'}
              className={
                copied ? 'text-[16px] text-brand-blue ml-1' : 'text-[16px] text-ink-4 ml-1'
              }
            />
          </button>
        </div>

        <HeroPlayground />
      </div>

      <Sponsors />
    </section>
  );
}
