import Head from '@docusaurus/Head';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { useEffect } from 'react';
import Capabilities from './_indexComponent/Capabilities';
import Closing from './_indexComponent/Closing';
import Ecosystem from './_indexComponent/Ecosystem';
import Hero from './_indexComponent/Hero';
import RequestSceneModel from './_indexComponent/RequestSceneModel';
import StrategyLibrary from './_indexComponent/StrategyLibrary';
import Trust from './_indexComponent/Trust';
import { translate } from '@docusaurus/Translate';
import styles from './_indexComponent/page.module.css';

const bodyFontsHref =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';

/**
 * Next-Generation Request Strategy Library 落地页。
 * 导航栏 / 公告条 / 页脚全部使用站点统一实现（页脚内容由 docusaurus.config.ts 的
 * themeConfig.footer 配置），页面只负责正文的 7 个区块。
 *
 * 注：Material Symbols 图标字体已在 docusaurus.config.ts 的 stylesheets 中全站注入，
 * 这里只需补充页面用到的正文字体。
 */

/** 页面内锚点：自定义页面不会被自动收集，注册后站内锚点链接才能通过构建校验 */
const sectionAnchors = ['rsm-model', 'capabilities', 'strategies', 'ecosystem'] as const;

export default function LandingPage() {
  const brokenLinks = useBrokenLinks();
  sectionAnchors.forEach(anchor => brokenLinks.collectAnchor(anchor));

  // 锚点平滑滚动（对应 mock 的 html.scroll-smooth），离开页面时还原
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'smooth';

    return () => {
      root.style.scrollBehavior = previous;
    };
  }, []);

  return (
    <Layout
      title={translate({
        id: 'homepage.meta.title',
        message: 'alova.js, a request strategy library'
      })}
      description={translate({
        id: 'homepage.meta.description',
        message:
          'alova treats a request as a scenario. Trigger, decision, execution and data application, declared once. axios and fetch handle the network.'
      })}
      wrapperClassName={clsx(
        styles.page,
        // 底色与墨色走 tokens.scss 的语义变量（--c-canvas / --c-ink-*），
        // 暗色由 [data-theme='dark'] 自动接管，页面内不再写死浅色
        'landing-page use-tailwind bg-canvas text-ink-1 selection:bg-brand-blue selection:text-white'
      )}>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href={bodyFontsHref}
        />
      </Head>

      <main>
        {/* S1 · 请求的单元，是一个场景 */}
        <Hero />
        {/* S2 · 请求场景模型 */}
        <RequestSceneModel />
        {/* S3 · 12 项请求能力 */}
        <Capabilities />
        {/* S4 · 场景策略库 */}
        <StrategyLibrary />
        {/* S5 · 弹性运行时 */}
        <Ecosystem />
        {/* S6 · 信任与数字 */}
        <Trust />
        {/* S7 · 收尾行动召唤 */}
        <Closing />
      </main>
    </Layout>
  );
}
