import clsx from 'clsx';
import styles from '../page.module.css';

/**
 * S2 背景：右上角的模糊氛围云。
 * 与 S1 极光（auroraArt）同一套画法：多层径向渐变 + 高斯模糊，冷色系在纯黑画布上做光晕。
 */
export default function CloudGraphic() {
  return (
    <div
      aria-hidden
      className={clsx(
        styles.cloud,
        'absolute -top-36 -right-56 lg:-right-24 pointer-events-none select-none opacity-60 z-0'
      )}>
      <div className={styles.cloudArt} />
    </div>
  );
}
