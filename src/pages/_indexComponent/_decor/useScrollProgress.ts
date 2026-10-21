import { useEffect, useRef, useState } from 'react';

/**
 * 元素相对视口的滚动进度 0 → 1，rAF 节流。
 * startRatio：元素顶部到达视口该比例高度时进度为 0
 * endRatio：元素底部到达视口该比例高度时进度为 1
 */
export default function useScrollProgress<T extends HTMLElement = HTMLDivElement>(
  startRatio = 0.85,
  endRatio = 0.35
) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * startRatio;
      const end = viewport * endRatio;
      const span = rect.height + (start - end);
      const value = span > 0 ? (start - rect.top) / span : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [startRatio, endRatio]);

  return { ref, progress };
}
