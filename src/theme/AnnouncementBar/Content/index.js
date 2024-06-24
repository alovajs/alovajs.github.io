import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.scss';

export default function AnnouncementBarContent(props) {
  const { i18n } = useDocusaurusContext();
  i18n.currentLocale;
  return (
    // Developer provided the HTML, so assume it's safe.
    // eslint-disable-next-line react/no-danger
    <div
      {...props}
      className={clsx(styles.content, props.className, 'flex-col align-center')}>
      <strong className={styles.announceTitle}>
        <Translate id="announcement.title">alova v3.0.0-beta is HERE!</Translate>
      </strong>
      <span>
        <Translate id="announcement.desc">
          More simple, more powerful, support both client & server
        </Translate>
      </span>
      <div className="flex-row">
        <Link
          className={styles.announceButton}
          to="/next/release-notes-v3">
          <Translate id="announcement.btn1">What's New</Translate>
        </Link>
        <Link
          className={styles.announceButton}
          to="/next/tutorial/getting-started/introduce">
          <Translate id="announcement.btn2">v3.0 Tutorial</Translate>
        </Link>
      </div>
    </div>
  );
}
