import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import IconFont from '@site/src/components/IconFont';
import PageModule from '@site/src/components/PageModule';
import styles from './index.module.css';

const buttons = [
  {
    icon: (
      <IconFont
        name="kaishi"
        style={{ color: 'var(--ifm-color-primary)' }}
        size={24}></IconFont>
    ),
    text: <Translate>Get Started</Translate>,
    link: '/tutorial/getting-started',
    target: '_self'
  },
  {
    icon: <span className="header-x-link"></span>,
    text: <Translate id="homepage.like.btnX">Follow on X</Translate>,
    link: 'https://x.com/alovajs'
  },
  {
    icon: <span className="header-github-link"></span>,
    text: <Translate id="homepage.like.btnGithub">Star on Github</Translate>,
    link: 'https://github.com/alovajs/alova'
  },
  {
    icon: <span className="header-discord-link"></span>,
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
    link: '/img/wechat_qrcode.jpg',
    target: '_blank'
  }
];

export default function Like(): JSX.Element {
  return (
    <PageModule
      text="If you like alova"
      textTransId="homepage.like.title"
      align="center">
      <div className={styles.btnWrapper}>
        {buttons.map(({ icon, text, link, target }) => (
          <Link
            key={link}
            className="button button--outline button--secondary button--lg flex-row align-center justify-center"
            to={link}
            target={target || '_blank'}>
            {icon}
            <span className="margin-left--sm">{text}</span>
          </Link>
        ))}
      </div>
    </PageModule>
  );
}
