import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { stageColor, type StageKey } from '../Hero/codeData';
import Intro from '../Intro';
import useInView from '../useInView';
import usePointerFocus from '../_decor/usePointerFocus';
import styles from './index.module.css';

interface Chip {
  id: string;
  label: string;
}

/** 默认在场：防抖 / 重试 / 缓存 / 竞态 */
const highlights: Chip[] = [
  { id: 'homepage.capability.chip.debounce', label: 'Debounce' },
  { id: 'homepage.capability.chip.retry', label: 'Retry' },
  { id: 'homepage.capability.chip.multiLevelCache', label: 'Multi-level cache' },
  { id: 'homepage.capability.chip.requestSequencing', label: 'Request sequencing' }
];

const highlightColors: StageKey[] = ['trigger', 'decision', 'execution', 'apply'];

/** 其余能力作为滚动墙体，重复出现构成「规模感」 */
const wallChips: Chip[] = [
  { id: 'homepage.capability.chip.autoRefresh', label: 'Auto refresh' },
  { id: 'homepage.capability.chip.polling', label: 'Polling' },
  { id: 'homepage.capability.chip.requestSharing', label: 'Request sharing' },
  { id: 'homepage.capability.chip.dataPreloading', label: 'Data preloading' },
  { id: 'homepage.capability.chip.formDraft', label: 'Form draft' },
  { id: 'homepage.capability.chip.atomicRequest', label: 'Atomic request' },
  { id: 'homepage.capability.chip.transferProgress', label: 'Upload & download progress' },
  { id: 'homepage.capability.chip.stateDrivenRequest', label: 'State-driven request' }
];

const chipColors: StageKey[] = ['trigger', 'decision', 'execution', 'apply'];

function rotate<T>(list: T[], offset: number): T[] {
  return list.slice(offset).concat(list.slice(0, offset));
}

const rows = [wallChips, rotate(wallChips, 3), rotate(wallChips, 6)];

function MarqueeRow({ items, reverse }: { items: Chip[]; reverse?: boolean }) {
  return (
    <div className={styles.row}>
      <div className={clsx(styles.track, reverse && styles.trackReverse)}>
        {/* 复制两份实现无缝循环，第二份对读屏隐藏 */}
        {[0, 1].map(copyIndex => (
          <div
            key={copyIndex}
            className={styles.group}
            aria-hidden={copyIndex === 1}>
            {items.map((chip, index) => (
              <span
                key={`${copyIndex}-${chip.id}`}
                className={styles.chip}
                style={
                  { '--chip-color': stageColor[chipColors[index % chipColors.length]] } as CSSProperties
                }>
                <span className={styles.chipDot} />
                <Translate id={chip.id}>{chip.label}</Translate>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CapabilityMatrix() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const matrixRef = usePointerFocus<HTMLDivElement>();

  return (
    <section
      id="capability"
      className={clsx(styles.section, 'container mx-auto py-28 md:py-40')}>
      <Intro
        index="03"
        section={translate({
          message: 'Request Capabilities',
          id: 'homepage.capability.section'
        })}
        title={translate({
          message: 'By default, beyond expectations.',
          id: 'homepage.capability.title'
        })}
        description={translate({
          message:
            "alova's request strategies deliver complete request functionality beyond expectations by default — debounce, caching, race handling and retry, nothing extra to spell out in your prompts.",
          id: 'homepage.capability.description'
        })}
        className="mx-auto max-w-[760px] items-center text-center"
      />

      <div
        ref={ref}
        className={clsx(styles.wrap, 'reveal', inView && 'in')}>
        <span
          className={styles.glow}
          aria-hidden
        />

        <div
          ref={matrixRef}
          className={styles.matrix}>
          <span
            className={clsx(styles.corner, styles.cornerTL)}
            aria-hidden
          />
          <span
            className={clsx(styles.corner, styles.cornerTR)}
            aria-hidden
          />
          <span
            className={clsx(styles.corner, styles.cornerBL)}
            aria-hidden
          />
          <span
            className={clsx(styles.corner, styles.cornerBR)}
            aria-hidden
          />
          <span
            className={styles.halftone}
            aria-hidden
          />
          <span
            className={styles.scan}
            aria-hidden
          />

          <div className={styles.wall}>
            {rows.map((items, index) => (
              <MarqueeRow
                key={index}
                items={items}
                reverse={index === 1}
              />
            ))}
          </div>

          <div className={styles.defaults}>
            {highlights.map((chip, index) => (
              <div
                key={chip.id}
                className={styles.defaultCard}
                style={
                  { '--chip-color': stageColor[highlightColors[index]] } as CSSProperties
                }>
                <span className={styles.defaultCardTitle}>
                  <Translate id={chip.id}>{chip.label}</Translate>
                </span>
                <span className={styles.badge}>
                  <Translate id="homepage.capability.defaultBadge">On by default</Translate>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
