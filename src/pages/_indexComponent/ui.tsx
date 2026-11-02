import clsx from 'clsx';
import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
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

/** 落地页统一按钮：渐变描边由 .heroGradientBorder 提供，hover 时描边加粗到 4px */
export type ButtonVariant = 'primary' | 'default';

export function Button(props: {
  variant?: ButtonVariant;
  /** 内部路由（渲染为 Docusaurus Link） */
  to?: string;
  /** 外链（渲染为 a，默认新标签打开） */
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}) {
  const {
    variant = 'default',
    to,
    href,
    onClick,
    type = 'button',
    className,
    children,
    ...rest
  } = props;

  const base =
    'heroGradientBorder inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-all shadow-sm';
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-ink-1 hover:bg-ink-2 text-canvas px-8 py-3.5',
    default: 'bg-surface text-ink-1 px-7 py-3.5'
  };
  const cls = clsx(base, variants[variant], className);

  if (to) {
    return (
      <Link className={cls} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
