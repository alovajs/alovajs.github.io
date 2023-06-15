import Translate from '@docusaurus/Translate';
import IconFont from '@site/src/components/IconFont';
import clsx from 'clsx';
import React from 'react';
import styles from './style.module.css';

const strategyList = [
  {
    title: <Translate id="homepage.strategy.Pagination request strategy">Pagination request strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Pagination request strategy.desc">
        Automatically manage paging data, data preloading, reduce unnecessary data refresh, improve fluency by 300%, and
        reduce coding difficulty by 50%
      </Translate>
    ),
    link: 'strategy/usePagination'
  },
  {
    title: (
      <Translate id="homepage.strategy.Sensorless interact strategy">Sensorless data interaction strategy</Translate>
    ),
    describe: (
      <Translate id="homepage.strategy.Sensorless interact strategy.desc">
        A new interactive experience, submitting and responding, greatly reducing the impact of network fluctuations,
        allowing your application to remain available even when the network is unstable or even disconnected
      </Translate>
    ),
    link: 'strategy/sensorless-data-interaction/overview'
  },
  {
    title: <Translate id="homepage.strategy.Cross-component request">Cross-component request strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Cross-component request.desc">
        Eliminate the limitation of component hierarchy, and quickly trigger the operation function of any request in
        any component
      </Translate>
    ),
    link: 'strategy/actionDelegationMiddleware'
  },
  {
    title: <Translate id="homepage.strategy.Form submit">Form Submit strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Form submit.desc">
        Form draft, multi-page (multi-step) form, in addition to providing common functions such as form reset
      </Translate>
    ),
    link: 'strategy/useForm'
  },
  {
    title: <Translate id="homepage.strategy.Send captcha">Send captcha</Translate>,
    describe: (
      <Translate id="homepage.strategy.Send captcha.desc">
        Reduce your tediousness when developing the verification code sending function
      </Translate>
    ),
    link: 'strategy/useCaptcha'
  },
  {
    title: <Translate id="homepage.strategy.Request retry strategy">Request retry strategy</Translate>,
    describe: (
      <Translate id="homepage.strategy.Request retry strategy.desc">
        Request failure automatic retry, it plays an important role on important requests and polling requests
      </Translate>
    ),
    link: 'strategy/useRetriableRequest'
  }
];

export default function Strategy() {
  return (
    <div className={clsx('container', styles.wrapper)}>
      <div className="row margin-bottom--lg">
        <div className="col col--8">
          <h2 className="hero__subtitle">
            <Translate id="homepage.request strategy">CORE Request strategies</Translate>
          </h2>
          <p className={styles.describe}>
            <Translate id="homepage.request strategy.desc">
              In addition to allowing you to leave work early, these request strategies can also make your application
              smoother
            </Translate>
          </p>
        </div>
        <div className={clsx('col col--4', styles.custom)}>
          <div className={styles.customHeader}>
            <h4>
              <Translate id="homepage.Custom strategy">Costom strategy</Translate>
            </h4>
            <IconFont
              name="youjiantou"
              className={styles.iconArrow}></IconFont>
          </div>
          <p className={styles.describe}>
            <Translate id="homepage.Custom strategy.desc">
              Super extensibility can quickly build custom request strategies
            </Translate>
          </p>
        </div>
      </div>
      <div className="row">
        {strategyList.map(({ title, describe, link }) => (
          <a
            className={clsx('col col--4', styles.itemWrapper)}
            href={link}>
            <div className={styles.item}>
              <div className="flex-row justify-between">
                <h4>{title}</h4>
                <IconFont
                  name="youjiantou"
                  className={styles.iconArrow}></IconFont>
              </div>
              <p className={styles.describe}>{describe}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
