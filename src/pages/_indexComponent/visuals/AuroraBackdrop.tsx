import clsx from 'clsx';
import styles from '../page.module.css';

/**
 * S1 背景：抽象流体极光。
 * code.html 用的是一张 googleusercontent 临时链接的图片（现已失效），这里改用纯 CSS 渐变复刻，
 * 颜色取自 tokens.scss，避免再依赖外部资源。
 */
export default function AuroraBackdrop() {
  // 暗色画布下光带更容易冲淡正文，因此暗色下压低一档不透明度
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 dark:opacity-40 overflow-hidden">
      <div
        aria-hidden
        className={clsx(styles.aurora, styles.auroraArt)}
      />
    </div>
  );
}
