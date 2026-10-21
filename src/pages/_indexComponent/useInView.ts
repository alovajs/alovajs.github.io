import { useEffect, useRef, useState } from 'react';

/**
 * 元素进入视口后触发一次渐显。
 * - 只触发一次（IntersectionObserver 命中后立即 disconnect）
 * - 不支持 IntersectionObserver 时直接返回 true，保证内容始终可见
 * - 动效降级由 custom.scss 的 prefers-reduced-motion 统一接管
 */
export default function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
        ...optionsRef.current
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
