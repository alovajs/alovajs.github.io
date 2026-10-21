/**
 * RSM Flow —— alova 首页 Hero 背景着色器。
 *
 * 视觉语义：四阶段色带沿 X 轴（时间）流动，在中段收束成一根细线
 * —— 请求有完整生命周期，但真正属于「发送请求」的只有中间那一小段。
 *
 * 用 GLSL ES 1.00 编写：WebGL1 / WebGL2 上下文均可编译，只需维护一份源码。
 */

export const vertexSource = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

export const fragmentSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_dark;
uniform vec2  u_pointer;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * vnoise(p);
    p = p * 2.03 + 17.13;
    amp *= 0.5;
  }
  return v;
}

vec3 stageColor(float idx) {
  if (idx < 0.5) return vec3(1.000, 0.467, 0.180);
  if (idx < 1.5) return vec3(0.443, 0.118, 1.000);
  if (idx < 2.5) return vec3(0.173, 0.573, 1.000);
  return vec3(1.000, 0.255, 0.776);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  float t = u_time;

  vec3 bg = mix(vec3(0.973, 0.984, 1.000), vec3(0.016, 0.059, 0.149), u_dark);

  // 请求执行窗口：四股在此收束为一股
  float episode = smoothstep(0.24, 0.38, uv.x) - smoothstep(0.62, 0.76, uv.x);
  float spread = mix(1.0, 0.09, episode);

  vec3 accum = vec3(0.0);
  float mask = 0.0;

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float flow = fbm(vec2(uv.x * 2.3 - t * 0.075, fi * 4.7));
    float band = 0.5 + ((fi - 1.5) * 0.155) * spread + (flow - 0.5) * 0.24 * spread;
    float thick = mix(0.062, 0.015, episode) * (0.72 + 0.56 * flow);
    float d = abs(uv.y - band) / thick;
    float glow = exp(-d * d * 1.55);
    float pulse = 0.62 + 0.38 * sin(uv.x * 8.0 - t * 0.65 + fi * 2.1);
    accum += stageColor(fi) * glow * pulse;
    mask = max(mask, glow);
  }
  mask = clamp(mask, 0.0, 1.0);

  vec3 col = bg;
  if (u_dark > 0.5) {
    // 暗色语法：光。加色混合 + 白芯 + 暗角
    col += accum * 0.88;
    col += vec3(1.0) * pow(mask, 7.0) * 0.12;
    float vig = 1.0 - smoothstep(0.28, 1.25, length((uv - 0.5) * vec2(aspect, 1.0) * 2.0));
    col *= mix(1.0, vig, 0.5);
  } else {
    // 亮色语法：墨。正常混合 + 网点
    col = mix(bg, clamp(accum * 0.55, 0.0, 1.0), mask * 0.72);
    float dots = 1.0 - smoothstep(0.06, 0.46, length(fract(uv * u_resolution.y / 6.0) - 0.5));
    col *= 1.0 - 0.16 * dots * mask;
  }

  // 光标能量
  float halo = exp(-length((uv - u_pointer) * vec2(aspect, 1.0)) * 3.2);
  col += accum * halo * 0.22 * u_dark;
  col = mix(col, min(col * 1.06, vec3(1.0)), halo * (1.0 - u_dark));

  // 颗粒
  float g = hash21(gl_FragCoord.xy + fract(t) * 137.0);
  col += (g - 0.5) * mix(0.018, 0.032, u_dark);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
