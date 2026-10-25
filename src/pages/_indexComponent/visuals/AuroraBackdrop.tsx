import clsx from 'clsx';
import styles from '../page.module.css';

/**
 * S1 背景：抽象流体极光。
 * code.html 用的是一张 googleusercontent 临时链接的图片（现已失效），这里改用纯 CSS 渐变复刻，
 * 颜色取自 tokens.scss，避免再依赖外部资源。
 */
export default function AuroraBackdrop() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 overflow-hidden">
      <div
        aria-hidden
        className={clsx(styles.aurora, styles.auroraArt)}
      />
    </div>
  );
}
