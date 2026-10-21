import clsx from 'clsx';
import type { CSSProperties } from 'react';

/** 全站噪点颗粒层：给扁平渐变加材质，纯 CSS 零 JS 开销 */
export function GrainLayer() {
  return (
    <div
      className="rsm-grain"
      aria-hidden
    />
  );
}

/** 蓝图网格：需父级 position: relative */
export function GridLayer({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={clsx('rsm-grid', className)}
      style={style}
      aria-hidden
    />
  );
}

/** 跟随光标的径向高光容器，配合 useSpotlight 写入的 --mx/--my */
export function HaloLayer({ className }: { className?: string }) {
  return (
    <div
      className={clsx('rsm-halo', className)}
      aria-hidden
    />
  );
}
