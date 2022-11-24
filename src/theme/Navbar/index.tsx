import Navbar from '@theme-original/Navbar';
import React from 'react';
import styles from './index.module.css';

export default function NavbarWrapper(props) {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.navTips}>
        <span>⭐️ If you like alova, <a href="https://github.com/alovajs/alova" target="_blank">give it a star on GitHub!</a> ⭐️</span>
      </div>
      <Navbar {...props} />
    </div>
  );
}
