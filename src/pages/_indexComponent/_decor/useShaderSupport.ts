import { useEffect, useState } from 'react';

export interface ShaderSupport {
  /** 能力探测是否已完成（首帧必须为 false，避免 SSG/hydration 不一致） */
  ready: boolean;
  /** 是否允许运行动态 shader */
  enabled: boolean;
  /** 当前是否暗色主题 */
  dark: boolean;
}

function isDark(): boolean {
  return typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') === 'dark'
    : false;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * shader 能力探测：
 * prefers-reduced-motion / 低端设备 / 无 WebGL 一律降级为 CSS 静态海报。
 * 主题变化用 MutationObserver 监听（不使用 useColorMode，见代码内既有 issue 注释）。
 */
export default function useShaderSupport(): ShaderSupport {
  const [state, setState] = useState<ShaderSupport>({ ready: false, enabled: false, dark: false });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory;
    const lowEnd = cores < 4 || (memory !== undefined && memory < 4);

    setState({
      ready: true,
      enabled: !reduced && !lowEnd && detectWebGL(),
      dark: isDark()
    });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    const sync = () => setState(prev => (prev.dark === isDark() ? prev : { ...prev, dark: isDark() }));
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [state.ready]);

  return state;
}
