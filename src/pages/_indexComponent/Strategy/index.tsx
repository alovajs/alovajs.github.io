import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import IconFont from '@site/src/components/IconFont';
import PageModule from '@site/src/components/PageModule';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { strategyList } from './data';
import styles from './style.module.css';

const StrategySelect = ({ active, setActive }) => {
  const ulRef = useRef(null);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const handleItemClick = (i: number) => {
    setActive(i);
    if (ulRef.current) {
      const ulWidth = ulRef.current.offsetWidth;
      const liWidth = ulRef.current.children[i].offsetWidth;
      const scrollPosition = liWidth * i - ulWidth / 2 + liWidth / 2;
      ulRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <ul
      ref={ulRef}
      className={clsx(styles.tabs, isMouseEnter ? styles.tabsHover : null)}
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {strategyList.map(({ title, link }, i) => (
        <li
          key={link}
          className={i === active ? styles.activeTabs : ''}
          onClick={() => handleItemClick(i)}
          style={{ display: 'inline-block', cursor: 'pointer' }}>
          {title}
        </li>
      ))}
    </ul>
  );
};

export default function Strategy() {
  const [active, setActive] = useState(0);
  const activeStrategy = strategyList[active];
  return (
    <PageModule
      text="Accomplish your requests in a declarative manner"
      textTransId="homepage.strategy.title"
      desc="Just choose the request strategy you want to use, saving your amount of time, and make your application more fluency"
      descTransId="homepage.strategy.subtitle">
      <div>
        <div>
          <StrategySelect
            active={active}
            setActive={setActive}
          />
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
