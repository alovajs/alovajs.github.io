import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Copy from '@site/static/img/copy.svg';
import Github from '@site/static/img/github.svg';
import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { GridLayer, HaloLayer } from '../_decor/atoms';
import RSMFlowBackdrop from '../_decor/RSMFlowCanvas';
import CodeBlock from '../CodeBlock';
import sharedStyles from '../index.module.css';
import useInView from '../useInView';
import styles from './index.module.css';
import { alovaCode, alovaTags, handwrittenFragments, stageColor, stageLegend } from './codeData';
import useSpotlight from './useSpotlight';

const installCmd = 'npm i alova';
const repoLink = 'https://github.com/alovajs/alova';

type PanelMode = 'handwritten' | 'alova';

/** 聚合动效的四个光谱火花：从手写碎片的左缘飞向中央 */
const sparks = [
  { sx: '6%', sy: '22%', ex: '44%', ey: '46%', color: 'var(--stage-trigger)' },
  { sx: '6%', sy: '49%', ex: '46%', ey: '50%', color: 'var(--stage-decision)' },
  { sx: '6%', sy: '76%', ex: '48%', ey: '54%', color: 'var(--stage-apply)' }
];

function HandwrittenPanel() {
  return (
    <div className="p-4 md:p-6">
      <div className={styles.fragments}>
        {handwrittenFragments.map(fragment => (
          <div
            key={fragment.file}
            className={styles.fragment}
            style={{ '--frag-color': stageColor[fragment.stage] } as CSSProperties}>
            <div className={styles.fragmentHead}>
              <span className={styles.fragmentFile}>{fragment.file}</span>
              <span className={styles.fragmentHint}>{fragment.hint}</span>
            </div>
            <CodeBlock
              fontSize={12.5}
              code={fragment.code}
            />
          </div>
        ))}
      </div>

      <div className={styles.legend}>
        {stageLegend.map(item => (
          <span
            key={item.key}
            className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ '--frag-color': stageColor[item.key] } as CSSProperties}
            />
            <Translate id={item.labelId}>{item.fallback}</Translate>
            <span className={styles.legendWhere}>{item.where}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function AlovaPanel() {
  return (
    <div className="p-4 md:p-6">
      <CodeBlock
        fontSize={12.5}
        code={alovaCode}
      />
      <div className={styles.tags}>
        {alovaTags.map(tag => (
          <span
            key={tag.id}
            className={styles.tag}>
            <Translate id={tag.id}>{tag.fallback}</Translate>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<PanelMode>('handwritten');
  const spotlightRef = useSpotlight<HTMLElement>();
  const { ref: codeRef, inView: codeIn } = useInView<HTMLDivElement>();

  // 移动端默认展示 alova 场景声明，桌面端默认展示手写实现
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
      setMode('alova');
    }
  }, []);

  const collapsed = mode === 'alova';

  return (
    <header
      id="hero"
      ref={spotlightRef}
      className={clsx(styles.hero, 'antialiased')}>
      {/* 品牌动态背景：四阶段流带 */}
      <RSMFlowBackdrop />
      <GridLayer className={styles.grid} />
      <div
        className={styles.scrim}
        aria-hidden
      />
      <HaloLayer />

      <div className={clsx(styles.content, 'container mx-auto')}>
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-14 lg:gap-16 xl:gap-20 items-center py-28 md:py-36">
          {/* 左栏：主张 / CTA / 安装命令 */}
          <div className="flex flex-col">
            <div className={styles.titleMask}>
              <h1
                className={clsx(
                  sharedStyles.titleGradient,
                  'font-display text-3xl font-bold tracking-tight md:text-5xl'
                )}
                style={{ lineHeight: 1.3 }}>
                <Translate id="homepage.hero.title">
                  The unit of a request isn't a call — it's a scenario.
                </Translate>
              </h1>
            </div>

            <p
              className={clsx(
                styles.tagline,
                'mt-7 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg dark:text-slate-400'
              )}>
              <Translate id="homepage.hero.tagline">
                A request has a lifecycle, yet your code scatters it across components — and AI just
                copies it.
              </Translate>
            </p>

            <div className={clsx(styles.actions, 'mt-10 flex flex-wrap items-center gap-4')}>
              <Link
                className="ctw-button-primary inline-flex items-center"
                to="/tutorial/getting-started/introduce">
                <Translate id="homepage.Getting Started">Getting Started</Translate>
              </Link>
              <a
                className="ctw-button-secondary inline-flex items-center gap-2"
                href={repoLink}
                target="_blank"
                rel="noreferrer">
                <Github className="w-4 h-4" />
                <Translate id="homepage.hero.github">GitHub</Translate>
              </a>
            </div>

            <div
              className={clsx(
                styles.install,
                'mt-8 flex w-fit items-center justify-between gap-6 rounded-xl border border-primary-100 bg-primary-100/20 px-4 py-2.5 font-mono text-sm text-slate-500 dark:border-primary-900 dark:bg-white/5'
              )}>
              <span className="flex items-center gap-2 text-gray-800 dark:text-gray-400">
                <span className="select-none">$</span>
                <span>{installCmd}</span>
              </span>
              <button
                type="button"
                aria-label={translate({
                  message: 'Copy install command',
                  id: 'homepage.hero.copyInstall'
                })}
                className="ctw-link h-[16px] w-[16px]"
                onClick={() => copy(installCmd)}>
                <Copy />
              </button>
            </div>
          </div>

          {/* 右栏：双态代码面板（conic 描边光束） */}
          <div className={clsx(styles.panel, styles.beam)}>
            <div className={clsx(styles.beamInner, 'flex flex-col')}>
              <div className={styles.tabs}>
                <span
                  className={styles.tabIndicator}
                  style={{ transform: collapsed ? 'translateX(100%)' : 'translateX(0)' }}
                />
                <button
                  type="button"
                  className={clsx(styles.tab, !collapsed && styles.tabActive)}
                  onClick={() => setMode('handwritten')}>
                  <Translate id="homepage.hero.tabHandwritten">Handwritten</Translate>
                </button>
                <button
                  type="button"
                  className={clsx(styles.tab, collapsed && styles.tabActive)}
                  onClick={() => setMode('alova')}>
                  <Translate id="homepage.hero.tabAlova">alova declaration</Translate>
                </button>
              </div>

              {/* 舞台：两层同格堆叠，切换时执行「聚合」过渡 */}
              <div
                ref={codeRef}
                className={clsx(styles.stage, collapsed ? styles.collapsed : styles.expanded)}>
                <span
                  className={styles.sparkField}
                  aria-hidden>
                  {sparks.map((spark, i) => (
                    <i
                      key={i}
                      className={styles.spark}
                      style={
                        {
                          '--sx': spark.sx,
                          '--sy': spark.sy,
                          '--ex': spark.ex,
                          '--ey': spark.ey,
                          background: spark.color
                        } as CSSProperties
                      }
                    />
                  ))}
                  <span className={styles.sparkRing} />
                </span>

                <div
                  className={clsx(
                    styles.layer,
                    styles.layerHandwritten,
                    codeIn && styles.codeIn
                  )}
                  aria-hidden={collapsed}>
                  <HandwrittenPanel />
                </div>
                <div
                  className={clsx(styles.layer, styles.layerAlova)}
                  aria-hidden={!collapsed}>
                  <AlovaPanel />
                </div>
              </div>
            </div>
          </div>

          {/* 移动端双态切换 */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMode(collapsed ? 'handwritten' : 'alova')}>
            {collapsed ? (
              <Translate id="homepage.hero.compareToggle">Compare with handwritten</Translate>
            ) : (
              <Translate id="homepage.hero.tabAlova">alova declaration</Translate>
            )}
          </button>
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span className={styles.scrollLabel}>scroll</span>
        <span className={styles.scrollTrack}>
          <i />
        </span>
      </div>
    </header>
  );
}
