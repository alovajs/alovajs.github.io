import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './styles.module.css';
export default function AnnouncementBarContent(props) {
  const { i18n } = useDocusaurusContext();
  i18n.currentLocale;
  return (
    <div
      {...props}
      className={clsx(styles.content, props.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
    >
      ⭐️
      <a
        href="https://github.com/alovajs/alova"
        target="_blank">
        <Translate id="announcement.content">If you also like alova, star it on GitHub!</Translate>
      </a>
      ⭐️
    </div>
  );
}
