/**
 * S2 展示行里的极简 3D 轴测立方体（原远程图已失效，这里用内联 SVG 绘制）。
 * 三个面用 tokens.scss 的品牌色做渐变，深色端仅作为体积暗部。
 */
export default function CubeGraphic() {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 100 100"
      className="w-full h-full">
      <defs>
        <linearGradient
          id="landing-cube-top"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%">
          <stop
            offset="0%"
            stopColor="var(--stage-execution)"
          />
          <stop
            offset="100%"
            stopColor="var(--brand-blue)"
          />
        </linearGradient>
        <linearGradient
          id="landing-cube-left"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%">
          <stop
            offset="0%"
            stopColor="var(--brand-blue)"
          />
          <stop
            offset="100%"
            stopColor="#030816"
          />
        </linearGradient>
        <linearGradient
          id="landing-cube-right"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%">
          <stop
            offset="0%"
            stopColor="var(--brand-violet)"
          />
          <stop
            offset="100%"
            stopColor="#12062b"
          />
        </linearGradient>
      </defs>

      <polygon
        points="50,6 92,30 50,54 8,30"
        fill="url(#landing-cube-top)"
      />
      <polygon
        points="8,30 50,54 50,96 8,72"
        fill="url(#landing-cube-left)"
      />
      <polygon
        points="92,30 92,72 50,96 50,54"
        fill="url(#landing-cube-right)"
      />

      <g
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1">
        <polygon points="50,6 92,30 50,54 8,30" />
        <path d="M8 30v42l42 24V54L8 30Z" />
        <path d="M92 30v42L50 96V54l42-24Z" />
      </g>
    </svg>
  );
}
