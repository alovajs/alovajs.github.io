import PageModule from '@site/src/components/PageModule';
import ImgReward from '@site/static/img/reward.svg';
import styles from './index.module.css';

export default function Like(): JSX.Element {
  return (
    <PageModule
      text="Grateful to have you"
      textTransId="homepage.contributors.title"
      desc="The contributors of alova, their wisdom and strength are making alova more and more perfect"
      descTransId="homepage.contributors.subtitle"
      align="center">
      <div className={styles.contributorsWrapper}>
        <ImgReward className={styles.rewards}></ImgReward>
        <a
          href="https://github.com/alovajs/alova/graphs/contributors"
          target="_blank">
          <img src="https://contrib.rocks/image?repo=alovajs/alova" />
        </a>
      </div>
    </PageModule>
  );
}
