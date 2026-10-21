import { useEffect, useRef } from 'react';

/**
 * 卡片 3D 倾斜 + 光标镜面高光。
 * 只写 --rx / --ry / --gx / --gy / --glare，位移与阴影仍由 CSS 负责，避免互相覆盖。
 * 仅精确指针设备启用。
 */
export default function useTilt<T extends HTMLElement = HTMLDivElement>(max = 5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let rotateX = 0;
    let rotateY = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      rotateY = (px - 0.5) * max * 2;
      rotateX = (0.5 - py) * max * 2;
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
      el.style.setProperty('--glare', '1');
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onPointerLeave = () => {
      rotateX = 0;
      rotateY = 0;
      el.style.setProperty('--glare', '0');
      apply();
    };

    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerleave', onPointerLeave);
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return ref;
}
