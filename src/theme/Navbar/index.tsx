import Translate from '@docusaurus/Translate';
import Navbar from '@theme-original/Navbar';
import React from 'react';
import styles from './index.module.css';

export default function NavbarWrapper(props) {
  return (
    <>
      <div className={styles.navWrapper}>
        <div className={styles.navTips}>
          <span>⭐️ 
            <Translate id="theme.tips.supportMe.prefix">If you like alova, </Translate>
            <a href="https://github.com/alovajs/alova" target="_blank">
              <Translate id="theme.tips.supportMe.linkText">give it a star on GitHub!</Translate>  
            </a> ⭐️
          </span>
        </div>
        <Navbar {...props} />
      </div>
      <div className={styles.navPlaceholer}></div>
    </>
  );
}
