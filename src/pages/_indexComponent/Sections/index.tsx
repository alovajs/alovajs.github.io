import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Arrow from '@site/static/img/arrow.svg';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { CoreDevs, DeveloperComments, Project, Strategy } from '../../../common/constants';
import { jsEnvList, requestTools } from '../../../components/SupportList';
import Intro from '../Intro';
import UserDescription from '../UserDescription';
import { stageColor, type StageKey } from '../Hero/codeData';
import useCountUp from '../_decor/useCountUp';
import useInView from '../useInView';
import CodeBlock from '../CodeBlock';
import styles from './style.module.css';

const stageCycle: StageKey[] = ['trigger', 'decision', 'execution', 'apply'];

/* ============================ S4 · 场景策略库 ============================ */

const layers = [
  {
    type: 'Client',
    eyebrowId: 'homepage.requestStrategy.layer.client',
    eyebrow: 'Client strategies',
    noteId: 'homepage.requestStrategy.layer.client.note',
    note: 'Built-in hooks that replace the boilerplate you would otherwise hand-write with React Query or axios.'
  },
  {
    type: 'Server',
    eyebrowId: 'homepage.requestStrategy.layer.server',
    eyebrow: 'Server strategies',
    noteId: 'homepage.requestStrategy.layer.server.note',
    note: 'Server-side control — retry, rate limiting, atomic requests and more — without adding middleware.'
  },
  {
    type: 'Cross',
    eyebrowId: 'homepage.requestStrategy.layer.cross',
    eyebrow: 'Cross-component, zero wiring',
    noteId: 'homepage.requestStrategy.layer.cross.note',
    note: 'Trigger and sync requests across any component — no prop drilling, no global store.'
  }
] as const;

function StrategyCard({ item, index }: { item: (typeof Strategy)[number]; index: number }) {
  return (
    <Link
      to={item.to}
      className={clsx(styles.strategyCard, 'reveal')}
      style={
        {
          '--card-color': stageColor[stageCycle[index % stageCycle.length]]
        } as CSSProperties
      }>
      <span
        className={styles.cardGlow}
        aria-hidden
      />
      <span className={styles.cardTop}>
        <span className={styles.microPill}>
          <i className={styles.microDot} />
          {item.type}
        </span>
        <span className={styles.arrowGlyph} aria-hidden>
          ↗
        </span>
      </span>
      <span className={styles.cardTitle}>{item.title}</span>
      <span className={styles.cardDesc}>{item.description}</span>
      {item.snippet ? (
        <span className={styles.cardCode}>
          <CodeBlock
            fontSize={12}
            code={item.snippet}
          />
        </span>
      ) : null}
      <span className={styles.cardFoot}>
        <span className={styles.stageDots} aria-hidden>
          {stageCycle.map(key => (
            <i
              key={key}
              style={{ background: stageColor[key] }}
            />
          ))}
        </span>
        <Translate id="theme.featureBlock.learnMore">Learn more</Translate>
      </span>
    </Link>
  );
}

export function StrategyLibrary() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="strategy"
      className={clsx(styles.section, 'container mx-auto py-28 md:py-40')}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Intro
          index="03"
          section={translate({
            message: 'Strategy Library',
            id: 'homepage.requestStrategy.sectionTitle'
          })}
          title={translate({
            message: 'Every strategy is a complete scenario.',
            id: 'homepage.requestStrategy.title'
          })}
          description={translate({
            message:
              'One declaration pre-orchestrates the trigger, the decision, the execution and the data application.',
            id: 'homepage.requestStrategy.description'
          })}
          className="max-w-[720px]"
        />
        <Link
          to="/tutorial/client/strategy/"
          className={styles.headerLink}>
          <Translate id="homepage.requestStrategy.More Strategy.Client">Client strategies</Translate>
          <Arrow className="ml-2 w-3 h-3" />
        </Link>
      </div>

      <div
        ref={ref}
        className="flex flex-col gap-16">
        {layers.map(layer => (
          <div
            key={layer.type}
            className="flex flex-col gap-6">
            <div className={clsx(styles.layerHead, 'reveal', inView && 'in')}>
              <h3 className={styles.layerTitle}>
                <Translate id={layer.eyebrowId}>{layer.eyebrow}</Translate>
              </h3>
              <p className={styles.layerNote}>
                <Translate id={layer.noteId}>{layer.note}</Translate>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Strategy.filter(item => item.type === layer.type).map((item, i) => (
                <div
                  key={item.title}
                  className={clsx('reveal', inView && 'in')}
                  style={{ transitionDelay: `${i * 70}ms` }}>
                  <StrategyCard
                    item={item}
                    index={i}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={clsx(styles.moreBar, 'reveal', inView && 'in')}>
        <span className={styles.moreText}>
          <Translate id="homepage.requestStrategy.More Strategy.title">
            Learn total 20+ strategies
          </Translate>
        </span>
        <span className={styles.moreLinks}>
          <Link
            to="/tutorial/client/strategy/"
            className={styles.moreLink}>
            <Translate id="homepage.requestStrategy.More Strategy.Client">
              Client strategies
            </Translate>
            <Arrow className="ml-2 w-3 h-3" />
          </Link>
          <Link
            to="/tutorial/server/strategy/"
            className={styles.moreLink}>
            <Translate id="homepage.requestStrategy.More Strategy.Server">
              Server strategies
            </Translate>
            <Arrow className="ml-2 w-3 h-3" />
          </Link>
        </span>
      </div>
    </section>
  );
}

/* ============================ S5 · 兼容技术栈 ============================ */

function MarqueeTrack({ items, reverse }: { items: typeof jsEnvList; reverse?: boolean }) {
  return (
    <div className={styles.marqueeViewport}>
      <div className={clsx(styles.marqueeTrack, reverse && styles.marqueeReverse)}>
        {[0, 1].map(copy => (
          <div
            key={copy}
            className={styles.marqueeGroup}
            aria-hidden={copy === 1}>
            {items.map(item => {
              const Image = item.Image;
              return (
                <Link
                  key={`${copy}-${item.id}`}
                  to={item.link}
                  className={clsx(styles.logoChip, !item.available && styles.logoMuted)}>
                  <Image className={styles.logoImg} />
                  <span>{item.id}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section
      id="stack"
      className={clsx(styles.section, styles.stackSection, 'container mx-auto py-28 md:py-40')}>
      <Intro
        index="05"
        section={translate({
          message: 'Flexible',
          id: 'homepage.Flexible.sectionTitle'
        })}
        title={translate({
          message: 'Runs in any JS environment with any request tool',
          id: 'homepage.Flexible.title'
        })}
        description={translate({
          message: `Use hooks originated from functional components, but alova innovatively made it compatible with options and class-style UI frameworks, which means that alova's use hooks are almost not restricted by JS environments and UI frameworks, and can be used together with your familiar request tools.`,
          id: 'homepage.Flexible.description'
        })}
        className="max-w-[720px]"
      />

      <div className={styles.marqueeWrap}>
        <MarqueeTrack items={jsEnvList} />
        <MarqueeTrack
          items={requestTools}
          reverse
        />
      </div>

      <div className={styles.worma}>
        <span className={styles.microPill}>
          <i className={styles.microDot} />
          OpenAPI
        </span>
        <Translate id="homepage.stack.wormaHint">Need code generated from an API spec?</Translate>
        <Link
          to="https://worma.js.org"
          className={styles.wormaLink}>
          <Translate id="homepage.stack.worma">worma</Translate>
          <Arrow className="ml-2 w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}

/* ============================ S6 · 信任与数字 ============================ */

function StatCard({
  value,
  numeric,
  suffix,
  label,
  secondary,
  delay
}: {
  value: string;
  numeric?: number;
  suffix?: string;
  label: string;
  secondary?: { value: string; label: string; href: string };
  delay: number;
}) {
  const { ref, value: counted } = useCountUp(numeric ?? 0);
  const shown = numeric ? `${counted}${suffix ?? ''}` : value;

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={clsx(styles.statCard, 'reveal')}
      style={{ transitionDelay: `${delay}ms` }}>
      <span className={styles.statGrid} aria-hidden />
      <span className={styles.statValue}>{shown}</span>
      <span className={styles.statLabel}>{label}</span>
      {secondary ? (
        <Link
          to={secondary.href}
          className={styles.statSecondary}>
          <span className={styles.statSecondaryValue}>{secondary.value}</span>
          <span className={styles.statSecondaryLabel}>
            {secondary.label} ↗
          </span>
        </Link>
      ) : null}
    </div>
  );
}

export function Trust({ stars }: { stars: number | null }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const formatStars = (value: number | null) => {
    if (!value) return '—';
    return value >= 1000
      ? `★ ${(value / 1000).toFixed(1).replace(/\.0$/, '')}k+`
      : `★ ${value}+`;
  };

  const stats = [
    {
      value: formatStars(stars),
      label: translate({ message: 'GitHub stars', id: 'homepage.trust.stars' }),
      secondary: {
        value: '1000+',
        label: translate({
          message: 'dependent repos on GitHub',
          id: 'homepage.trust.dependents'
        }),
        href: 'https://github.com/alovajs/alova/network/dependents'
      }
    },
    {
      value: '15+',
      numeric: 15,
      suffix: '+',
      label: translate({ message: 'frameworks supported', id: 'homepage.trust.frameworks' })
    },
    {
      value: '20+',
      numeric: 20,
      suffix: '+',
      label: translate({ message: 'request strategies', id: 'homepage.trust.strategies' })
    },
    {
      value: 'MIT',
      label: translate({ message: 'free & open source', id: 'homepage.trust.license' })
    }
  ];

  return (
    <section
      id="trust"
      className={clsx(styles.section, 'container mx-auto py-28 md:py-40')}>
      <Intro
        index="06"
        section={translate({
          message: 'Trusted & honest',
          id: 'homepage.trust.sectionTitle'
        })}
        title={translate({
          message: 'Built for real apps — and honest about when not to use it.',
          id: 'homepage.trust.title'
        })}
        className="max-w-[760px]"
      />

      <div
        ref={ref}
        className={clsx('grid grid-cols-2 gap-4 md:grid-cols-4', inView && 'in')}>
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={i * 80}
          />
        ))}
      </div>

      <div className={styles.community}>
        <div className={styles.communityHead}>
          <h3 className={styles.layerTitle}>
            <Translate id="homepage.Join the community.title">Used in production by real teams</Translate>
          </h3>
          <p className={styles.layerNote}>
            <Translate id="homepage.Join the community.description">
              Open source projects dependent on alova
            </Translate>
          </p>
        </div>
        <div className={styles.projectRow}>
          {Project.map(item => (
            <UserDescription
              key={item.name}
              avatar={item.avatar}
              avatarSize={54}
              name={item.name}
              to={item.to}
              vertical
            />
          ))}
        </div>
      </div>

      <div className={styles.quoteGrid}>
        {DeveloperComments.map((item, index) => (
          <div
            key={index}
            className={clsx(styles.quoteCard, 'reveal', inView && 'in')}
            style={{ transitionDelay: `${index * 70}ms` }}>
            <span className={styles.quoteMark} aria-hidden>
              “
            </span>
            <UserDescription
              avatar={item.avatar}
              avatarRadius={9999}
              name={item.name}
              description={item.description}
            />
            <div className={styles.quoteMeta}>{item.children}</div>
          </div>
        ))}
      </div>

      <div className={styles.teamGrid}>
        {CoreDevs.map((item, index) => (
          <div
            key={index}
            className={clsx(styles.teamCard, 'reveal', inView && 'in')}
            style={{ transitionDelay: `${index * 70}ms` }}>
            <span className={styles.teamRing} aria-hidden />
            <UserDescription
              avatar={item.avatar}
              avatarRadius={9999}
              name={item.name}
              description={item.description}
              vertical
            />
            <a
              className={styles.teamGithub}
              href={item.url}
              target="_blank"
              rel="noreferrer">
              <Translate id="homepage.team.github">GitHub</Translate> ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================ S7 · 收尾与行动召唤 ============================ */

export function Closing() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="closing"
      className={clsx(styles.section, styles.closingSection, 'container mx-auto py-28 md:py-40')}>
      <span className={styles.closingOrbit} aria-hidden />
      <div
        ref={ref}
        className={clsx(styles.closingInner, 'reveal', inView && 'in')}>
        <span className={styles.microPill}>
          <i className={styles.microDot} />
          <Translate id="homepage.Try It Now.sectionTitle">Try it NOW</Translate>
        </span>

        <p className={styles.closingLead}>
          <Translate id="homepage.closing.lead">Open your latest list page and</Translate>{' '}
          <strong className={styles.closingStrong}>
            <Translate id="homepage.closing.strong">mark the code in four passes.</Translate>
          </strong>
        </p>
        <p className={styles.closingTail}>
          <Translate id="homepage.closing.tail">
            See how many lines the execution takes, and where the rest of the logic scattered.
          </Translate>
        </p>

        <div className={styles.closingActions}>
          <Link
            className="ctw-button-primary inline-flex items-center"
            to="/tutorial/getting-started/introduce">
            <Translate id="homepage.Getting Started">Getting Started</Translate>
          </Link>
          <Link
            className="ctw-button-secondary inline-flex items-center gap-2"
            to="/about/RSM">
            <Translate id="homepage.rsm.link">Learn the Request Scene Model</Translate>
            <Arrow className="ml-1 w-3 h-3" />
          </Link>
          <a
            className="ctw-button-secondary inline-flex items-center gap-2"
            href="https://github.com/alovajs/alova"
            target="_blank"
            rel="noreferrer">
            <Translate id="homepage.hero.github">GitHub</Translate>
          </a>
        </div>
      </div>
    </section>
  );
}
