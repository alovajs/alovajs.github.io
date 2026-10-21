import { useEffect, useRef } from 'react';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

/**
 * 把光标位置写进容器的 --mx / --my（百分比），并切换 --halo-opacity。
 * 仅精确指针设备启用；reduced-motion 下不启用（高光本身是静态的，保留亦可，
 * 但为统一降级策略一并不开）。
 */
export default function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let nextX = 50;
    let nextY = 50;

    const apply = () => {
      raf = 0;
      el.style.setProperty('--mx', `${nextX}%`);
      el.style.setProperty('--my', `${nextY}%`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      nextX = ((event.clientX - rect.left) / rect.width) * 100;
      nextY = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--halo-opacity', '1');
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onPointerLeave = () => el.style.setProperty('--halo-opacity', '0');

    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerleave', onPointerLeave);
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
