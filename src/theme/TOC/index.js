import TOCStyles from '@docusaurus/theme-classic/lib/theme/TOC/styles.module.css';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AdCard from '@site/src/components/AdCard';
import TOC from '@theme-original/TOC';
import React from 'react';

export default function TOCWrapper(props) {
  const { i18n } = useDocusaurusContext();
  return (
    <div className={TOCStyles.tableOfContents}>
      {i18n.currentLocale === 'zh-CN' ? (
        <AdCard
          img={require('@site/static/img/survey.jpg').default}
          className="margin-bottom--sm"
          href="https://wj.qq.com/s2/12960333/5eab/">
          alova使用调查，花3分钟填下，求你了！
        </AdCard>
      ) : null}
      <AdCard
        img={require('@site/static/img/collect.jpg').default}
        className="margin-bottom--sm"
        href="https://github.com/alovajs/alova/issues/165">
        <Translate id="ad.project collection">Is using alova in your project? please tell me!</Translate>
      </AdCard>
      <TOC {...props} />
    </div>
  );
}
