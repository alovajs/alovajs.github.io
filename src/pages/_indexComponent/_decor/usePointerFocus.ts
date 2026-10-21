import { useEffect, useRef } from 'react';

/**
 * 只写 --mx / --my / --glare 的轻量光标跟踪（不做 3D 倾斜）。
 * 仅精确指针设备启用。
 */
export default function usePointerFocus<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
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
      el.style.setProperty('--glare', '1');
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onPointerLeave = () => el.style.setProperty('--glare', '0');

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
