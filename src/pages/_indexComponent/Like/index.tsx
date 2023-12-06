import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import IconFont from '@site/src/components/IconFont';
import PageModule from '@site/src/components/PageModule';
import styles from './index.module.css';

const buttons = [
  {
    icon: (
      <IconFont
        name="youjiantou"
        size={24}></IconFont>
    ),
    text: <Translate>Get Started</Translate>,
    link: '/tutorial/get-started/overview'
  },
  {
    icon: <span className="header-github-link"></span>,
    text: <Translate id="homepage.like.btnGithub">Star alova on Github</Translate>,
    link: 'https://github.com/alovajs/alova'
  },
  {
    icon: (
      <IconFont
        name="discord"
        style={{ color: '#5865f2' }}
        size={30}></IconFont>
    ),
    text: <Translate id="homepage.like.btnDiscord">Say "Hi" on Discord</Translate>,
    link: 'https://discord.gg/S47QGJgkVb'
  },
  {
    icon: (
      <IconFont
        name="weixin"
        size={30}></IconFont>
    ),
    text: <Translate id="homepage.like.btnWechat">Join Wechat group</Translate>,
    link: '/img/wechat_qrcode.jpg'
  }
];

export default function Like(): JSX.Element {
  return (
    <PageModule
      text="If you like alova"
      textTransId="homepage.like.title"
      align="center">
      <div className={styles.btnWrapper}>
        {buttons.map(({ icon, text, link }) => (
          <Link
            key={link}
            className="button button--outline button--secondary button--lg flex-row align-center justify-center"
            to={link}>
            {icon}
            <span className="margin-left--sm">{text}</span>
          </Link>
        ))}
      </div>
    </PageModule>
  );
}
