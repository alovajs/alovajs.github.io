import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import pngLive from '@site/static/img/live.jpg';
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
        href={pngLive}
        target="_blank">
        <Translate id="announcement.content">If you also like alova, star it on GitHub!</Translate>
      </a>
      ⭐️
    </div>
  );
}
