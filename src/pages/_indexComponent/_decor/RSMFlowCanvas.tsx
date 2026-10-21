import { useEffect, useRef } from 'react';
import { fragmentSource, vertexSource } from './flowShader';
import styles from './rsmFlow.module.css';
import useShaderSupport from './useShaderSupport';

const MAX_DPR = 1.5;
const MIN_DPR = 1;
/** 低于该帧率自动降 DPR */
const FPS_FLOOR = 45;

interface CanvasProps {
  dark: boolean;
  speed?: number;
}

function RSMFlowCanvas({ dark, speed = 1 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const attrs: WebGLContextAttributes = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power'
    };
    const context = canvas.getContext('webgl2', attrs) ?? canvas.getContext('webgl', attrs);
    if (!context) return;
    const gl = context as unknown as WebGLRenderingContext;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // 单个覆盖裁剪空间的大三角形
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uDark = gl.getUniformLocation(program, 'u_dark');
    const uPointer = gl.getUniformLocation(program, 'u_pointer');

    let dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener('resize', resize);
    }

    // 光标（初始置于画布外，避免出现无意义的中置光斑）
    const pointer = { x: 0.5, y: -0.5, tx: 0.5, ty: -0.5 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.tx = (event.clientX - rect.left) / rect.width;
      pointer.ty = 1 - (event.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // 离屏 / 页面隐藏时暂停
    let inViewport = true;
    let pageVisible = document.visibilityState === 'visible';
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            entries => {
              inViewport = entries.some(entry => entry.isIntersecting);
            },
            { threshold: 0 }
          )
        : null;
    io?.observe(canvas);

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    let frames = 0;
    let fpsWindow = last;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!inViewport || !pageVisible) return;
      elapsed += delta * speed;

      const ease = Math.min(1, delta * 6);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;

      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDark, darkRef.current ? 1 : 0);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // 帧率看门狗
      frames += 1;
      if (now - fpsWindow > 1000) {
        const fps = (frames * 1000) / (now - fpsWindow);
        frames = 0;
        fpsWindow = now;
        if (fps < FPS_FLOOR && dpr > MIN_DPR) {
          dpr = MIN_DPR;
          width = 0;
          resize();
        }
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden
    />
  );
}

/**
 * Hero 背景层：自动探测能力，能跑 shader 就跑，否则退化为静态 CSS 海报。
 * 无论哪条分支，首帧都有同色底，不产生 CLS。
 */
export default function RSMFlowBackdrop() {
  const { enabled, dark } = useShaderSupport();

  return (
    <div
      className={styles.backdrop}
      aria-hidden>
      {enabled ? (
        <RSMFlowCanvas dark={dark} />
      ) : (
        <div className={styles.fallback} />
      )}
    </div>
  );
}
