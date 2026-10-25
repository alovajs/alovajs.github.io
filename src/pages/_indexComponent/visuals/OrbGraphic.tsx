import clsx from 'clsx';
import styles from '../page.module.css';

/**
 * S2 背景：悬浮的 3D 虹彩球体（原远程图已失效）。
 * 位置、尺寸、透明度、漂浮动画与 code.html 保持一致，球体本体由 CSS 渐变绘制。
 */
export default function OrbGraphic() {
  return (
    <div
      className={clsx(
        styles.orb,
        'absolute -top-12 -right-16 lg:right-12 w-[340px] md:w-[480px] pointer-events-none select-none opacity-85 z-0'
      )}>
      <div
        aria-hidden
        className={styles.orbArt}
      />
    </div>
  );
}
