import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './sectionIndexRail.module.css';

export interface RailItem {
  /** 对应 section 的 id */
  id: string;
  /** 序号，例如 '01' */
  index: string;
  /** 悬浮/激活时显示的标签（英文走 i18n，这里只放展示文案） */
  label: string;
  /** 阶段色 CSS 变量 */
  color: string;
}

/**
 * 左侧固定章节轨：用 IntersectionObserver 取视口中部最近的一个 section 高亮。
 * 仅桌面端渲染；reduced-motion 下保留功能但去掉位移过渡。
 */
export default function SectionIndexRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => ratios.set(entry.target.id, entry.intersectionRatio));
        let best = '';
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85], rootMargin: '-20% 0px -20% 0px' }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className={styles.rail}
      aria-label="Section index">
      <span
        className={styles.railLine}
        aria-hidden
      />
      <ul className={styles.list}>
        {items.map(item => {
          const isActive = item.id === active;
          return (
            <li
              key={item.id}
              className={clsx(styles.item, isActive && styles.itemActive)}
              style={{ color: item.color }}>
              <a
                href={`#${item.id}`}
                className={styles.link}
                aria-current={isActive ? 'true' : undefined}>
                <span
                  className={styles.dot}
                  aria-hidden
                />
                <span className={styles.index}>{item.index}</span>
                <span className={styles.label}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
