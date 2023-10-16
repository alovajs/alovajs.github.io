import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import IconFont from '@site/src/components/IconFont';
import PageModule from '@site/src/components/PageModule';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import React, { useState } from 'react';
import { strategyList } from './data';
import styles from './style.module.css';

export default function Strategy() {
  const [active, setActive] = useState(0);
  const activeStrategy = strategyList[active];
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  return (
    <PageModule
      text="Accomplish your requests in a declarative manner"
      textTransId="homepage.strategy.title"
      desc="Just choose the request strategy you want to use, saving your amount of time, and make your application more fluency"
      descTransId="homepage.strategy.subtitle">
      <div>
        <div>
          <ul
            className={clsx(styles.tabs, isMouseEnter ? styles.tabsHover : null)}
            onMouseEnter={() => setIsMouseEnter(true)}
            onMouseLeave={() => setIsMouseEnter(false)}>
            {strategyList.map(({ title, link }, i) => (
              <li
                key={link}
                className={i === active ? styles.activeTabs : ''}
                onClick={() => setActive(i)}>
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className={clsx('row align-start', styles.wrapper)}>
          <div className="col col--4">
            <h3>{activeStrategy.title}</h3>
            <p>{activeStrategy.describe}</p>
            <div className="margin-top--lg">
              {(activeStrategy.features || []).map((text, i) => (
                <div
                  className={clsx('margin-top--sm', styles.featureItem)}
                  key={i}>
                  <IconFont
                    name="check"
                    className={clsx(styles.iconCheck, 'margin-right--sm')}></IconFont>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <Link
              className={clsx('button button--primary margin-top--lg', styles.btnPC)}
              to={activeStrategy.link}>
              <Translate id="homepage.strategy.More details">More details</Translate>
            </Link>
          </div>
          <CodeBlock
            className={clsx('col col--7 col--offset-1', styles.codeBlock)}
            language="javascript">
            {activeStrategy.code}
          </CodeBlock>
          <Link
            className={clsx('button button--primary margin-top--md', styles.btnMobile)}
            to={activeStrategy.link}>
            <Translate id="homepage.strategy.More details">More details</Translate>
          </Link>
        </div>
      </div>
    </PageModule>
  );
}
