import { useEffect, useState } from 'react';

let cached: number | null = null;
let inflight: Promise<number | null> | null = null;

/** 拉取 alova 仓库 star 数，模块级缓存，多个组件共用时只请求一次 */
function load(): Promise<number | null> {
  if (!inflight) {
    inflight = fetch('https://api.github.com/repos/alovajs/alova')
      .then(res => res.json())
      .then(data => {
        const count = (data as { stargazers_count?: number })?.stargazers_count;
        return typeof count === 'number' ? count : null;
      })
      .catch(() => null);
  }
  return inflight;
}

/** 展示用折算：1000 以上显示为 k（不带 +） */
export function formatStars(stars: number): string {
  return stars >= 1000 ? `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(stars);
}

/** 展示用折算：1000 以上显示为 k+（指标卡用） */
export function formatStarsPlus(stars: number): string {
  return stars >= 1000
    ? `${(stars / 1000).toFixed(1).replace(/\.0$/, '')}k+`
    : `${stars}+`;
}

export function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(cached);

  useEffect(() => {
    let canceled = false;
    load().then(value => {
      cached = value;
      if (!canceled) setStars(value);
    });
    return () => {
      canceled = true;
    };
  }, []);

  return stars;
}
