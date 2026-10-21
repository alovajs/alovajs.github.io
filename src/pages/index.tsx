import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { GrainLayer } from './_indexComponent/_decor/atoms';
import SectionIndexRail, { type RailItem } from './_indexComponent/_decor/SectionIndexRail';
import ScrollProgress from './_indexComponent/_decor/ScrollProgress';
import CapabilityMatrix from './_indexComponent/CapabilityMatrix';
import Hero from './_indexComponent/Hero';
import RequestSceneModel from './_indexComponent/RequestSceneModel';
import { Closing, StrategyLibrary, TechStack, Trust } from './_indexComponent/Sections';
import styles from './_indexComponent/index.module.css';

/** 左侧章节轨：序号与各区 Intro 的 index 保持一致 */
const railItems: RailItem[] = [
  { id: 'hero', index: '01', label: 'Scenario', color: 'var(--stage-trigger)' },
  { id: 'rsm', index: '02', label: 'Request Scene Model', color: 'var(--stage-decision)' },
  { id: 'capability', index: '03', label: 'Capabilities', color: 'var(--stage-execution)' },
  { id: 'strategy', index: '04', label: 'Strategy library', color: 'var(--stage-apply)' },
  { id: 'stack', index: '05', label: 'Tech stack', color: 'var(--stage-trigger)' },
  { id: 'trust', index: '06', label: 'Trust', color: 'var(--stage-decision)' },
  { id: 'closing', index: '07', label: 'Get started', color: 'var(--stage-execution)' }
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [gitHubStars, setGitHubStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/alovajs/alova')
      .then(r => r.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          setGitHubStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <Layout
      wrapperClassName={clsx('use-tailwind', styles.decoratedPurple)}
      title={
        siteConfig.title +
        ' - ' +
        translate({
          message: "The unit of a request isn't a call — it's a scenario.",
          id: 'homepage.hero.title'
        })
      }
      description="alova is a request strategy library. It treats the scenario as the basic unit of a request, with reusable strategies organizing the complete journey from trigger to data application.">
      <div className="bg-canvas overflow-hidden">
        {/* 全局装饰：光谱滚动进度 + 噪点颗粒 + 章节轨 */}
        <ScrollProgress />
        <GrainLayer />
        <SectionIndexRail items={railItems} />

        {/* S1 · 请求的单元，是一个场景 */}
        <Hero />
        <main className="mx-auto">
          {/* S2 · 请求场景模型 */}
          <RequestSceneModel />

          {/* S3 · 请求能力矩阵 */}
          <CapabilityMatrix />

          {/* S4 · 场景策略库 */}
          <StrategyLibrary />

          {/* S5 · 兼容现有技术栈 */}
          <TechStack />

          {/* S6 · 信任与数字 */}
          <Trust stars={gitHubStars} />

          {/* S7 · 收尾与行动召唤 */}
          <Closing />
        </main>
      </div>
    </Layout>
  );
}
