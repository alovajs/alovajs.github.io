import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Arrow from '@site/static/img/arrow.svg';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { stageColor, type StageKey } from '../Hero/codeData';
import Intro from '../Intro';
import useInView from '../useInView';
import useScrollProgress from '../_decor/useScrollProgress';
import useTilt from '../_decor/useTilt';
import styles from './index.module.css';

interface Stage {
  key: StageKey;
  index: string;
  span: string;
  muted?: boolean;
  nameId: string;
  name: string;
  questionId: string;
  question: string;
  descId: string;
  desc: string;
  noteId?: string;
  note?: string;
}

const stages: Stage[] = [
  {
    key: 'trigger',
    index: '01',
    span: 'lg:col-span-4',
    nameId: 'homepage.rsm.trigger.name',
    name: 'Trigger',
    questionId: 'homepage.rsm.trigger.question',
    question: 'When is a request needed?',
    descId: 'homepage.rsm.trigger.desc',
    desc: 'State changes, user actions and timers all create the need for data exchange.'
  },
  {
    key: 'decision',
    index: '02',
    span: 'lg:col-span-3',
    nameId: 'homepage.rsm.decision.name',
    name: 'Decision',
    questionId: 'homepage.rsm.decision.question',
    question: 'How should this request be handled?',
    descId: 'homepage.rsm.decision.desc',
    desc: 'Decide whether to hit the network at all, and how to deal with cache and request sharing.'
  },
  {
    key: 'execution',
    index: '03',
    span: 'lg:col-span-2',
    muted: true,
    nameId: 'homepage.rsm.execution.name',
    name: 'Execution',
    questionId: 'homepage.rsm.execution.question',
    question: 'How to talk to the server?',
    descId: 'homepage.rsm.execution.desc',
    desc: 'Send the request through axios, fetch, XHR — and take the response back.',
    noteId: 'homepage.rsm.execNote',
    note: 'Just this one segment — handed to your request tool.'
  },
  {
    key: 'apply',
    index: '04',
    span: 'lg:col-span-3',
    nameId: 'homepage.rsm.apply.name',
    name: 'Data application',
    questionId: 'homepage.rsm.apply.question',
    question: 'How does the response enter the business?',
    descId: 'homepage.rsm.apply.desc',
    desc: 'Transform data, update state, manage cache and exchange data across components.'
  }
];

function StageModule({
  stage,
  lit,
  delay,
  revealed
}: {
  stage: Stage;
  lit: boolean;
  delay: number;
  revealed: boolean;
}) {
  const tiltRef = useTilt<HTMLDivElement>(5);

  return (
    <article
      className={clsx(styles.module, stage.span, 'reveal', revealed && 'in')}
      style={{ transitionDelay: `${delay}ms` }}>
      <span
        className={styles.node}
        style={{ color: lit ? stageColor[stage.key] : 'var(--ifm-color-emphasis-300)' }}
        aria-hidden>
        <i className={clsx(styles.nodeRing, lit && styles.nodeRingOn)} />
      </span>

      <div
        ref={tiltRef}
        className={clsx(styles.card, stage.muted && styles.cardMuted)}
        style={{ '--stage-color': stageColor[stage.key] } as CSSProperties}>
        <span className={clsx(styles.watermark, lit && styles.watermarkOn)}>{stage.index}</span>
        <span
          className={styles.glare}
          aria-hidden
        />
        <h3 className={styles.name}>
          <Translate id={stage.nameId}>{stage.name}</Translate>
        </h3>
        <p className={styles.question}>
          <Translate id={stage.questionId}>{stage.question}</Translate>
        </p>
        <p className={styles.desc}>
          <Translate id={stage.descId}>{stage.desc}</Translate>
        </p>
        {stage.noteId ? (
          <span className={styles.execNote}>
            <Translate id={stage.noteId}>{stage.note}</Translate>
          </span>
        ) : null}
      </div>
    </article>
  );
}

export default function RequestSceneModel() {
  const { ref: revealRef, inView } = useInView<HTMLDivElement>();
  const { ref: trackRef, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section
      id="rsm"
      className={clsx(styles.section, 'container mx-auto py-28 md:py-40')}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Intro
          index="02"
          section={translate({
            message: 'Request Scene Model',
            id: 'homepage.rsm.section'
          })}
          title={translate({
            message: 'alova is a request strategy library.',
            id: 'homepage.rsm.title'
          })}
          description={translate({
            message:
              'It treats the scenario as the basic unit of a request, with reusable strategies organizing the complete journey from trigger to data application.',
            id: 'homepage.rsm.description'
          })}
          className="max-w-[720px]"
        />
        <Link
          to="/about/RSM"
          className={styles.headerLink}>
          <Translate id="homepage.rsm.link">Learn the Request Scene Model</Translate>
          <Arrow className="ml-2 w-3 h-3" />
        </Link>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        style={{ '--p': progress.toFixed(3) } as CSSProperties}>
        <span className={styles.railTrack}>
          <span className={styles.railFill} />
        </span>
        <div
          ref={revealRef}
          className="grid grid-cols-1 lg:grid-cols-12">
          {stages.map((stage, i) => (
            <StageModule
              key={stage.key}
              stage={stage}
              lit={progress * stages.length >= i + 0.35}
              delay={i * 70}
              revealed={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
