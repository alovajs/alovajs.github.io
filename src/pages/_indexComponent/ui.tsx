import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './page.module.css';

/** Material Symbols 图标：字体在页面 Head 中注入，这里只负责排版 */
export function MaterialIcon(props: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={clsx(styles.icon, props.filled && styles.iconFilled, props.className)}>
      {props.name}
    </span>
  );
}

/** 章节眉题：短横线 + mono 大写编号 */
export function SectionTagline(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest',
        props.className
      )}>
      <span className="w-4 h-[2px] bg-current" />
      <span>{props.children}</span>
    </div>
  );
}
