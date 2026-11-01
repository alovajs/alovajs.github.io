import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './page.module.css';
import { MaterialIcon, SectionTagline } from './ui';
import CloudGraphic from './visuals/CloudGraphic';
import CubeGraphic from './visuals/CubeGraphic';

type StageTone = 'cyan' | 'blue' | 'violet' | 'emerald';

interface Stage {
  stage: string;
  icon: string;
  title: string;
  description: string;
  action: string;
  footnote: string;
  tone: StageTone;
}

/** 请求场景模型的四个阶段（文案接入 Docusaurus i18n） */
const stages: Stage[] = [
  {
    stage: translate({ id: 'homepage.rsm.trigger.stage', message: 'Stage 01' }),
    icon: 'play_circle',
    title: translate({ id: 'homepage.rsm.trigger.name', message: 'Request Trigger' }),
    description: translate({
      id: 'homepage.rsm.trigger.desc',
      message:
        'Requests are triggered at the right moment — such as manual actions, state changes, pagination, or network reconnection — cutting down unnecessary calls.'
    }),
    action: translate({ id: 'homepage.rsm.trigger.action', message: 'Initiate' }),
    footnote: translate({ id: 'homepage.rsm.trigger.footnote', message: '01 / TRIGGER' }),
    tone: 'cyan'
  },
  {
    stage: translate({ id: 'homepage.rsm.decision.stage', message: 'Stage 02' }),
    icon: 'schema',
    title: translate({
      id: 'homepage.rsm.decision.name',
      message: 'Request Decision'
    }),
    description: translate({
      id: 'homepage.rsm.decision.desc',
      message: 'Determines how the request should be handled before it is sent.'
    }),
    action: translate({ id: 'homepage.rsm.decision.action', message: 'Evaluate' }),
    footnote: translate({ id: 'homepage.rsm.decision.footnote', message: '02 / DECISION' }),
    tone: 'blue'
  },
  {
    stage: translate({ id: 'homepage.rsm.execution.stage', message: 'Stage 03' }),
    icon: 'swap_horiz',
    title: translate({
      id: 'homepage.rsm.execution.name',
      message: 'Request Execution'
    }),
    description: translate({
      id: 'homepage.rsm.execution.desc',
      message:
        'The network communication happens here, typically handled by fetch, axios, or XHR.'
    }),
    action: translate({ id: 'homepage.rsm.execution.action', message: 'Delegate' }),
    footnote: translate({ id: 'homepage.rsm.execution.footnote', message: '03 / EXECUTE' }),
    tone: 'violet'
  },
  {
    stage: translate({ id: 'homepage.rsm.apply.stage', message: 'Stage 04' }),
    icon: 'auto_awesome',
    title: translate({ id: 'homepage.rsm.apply.name', message: 'Data Application' }),
    description: translate({
      id: 'homepage.rsm.apply.desc',
      message:
        'The actions after the response is obtained — such as UI updates, automatic transformation, cache refresh, multi-end sync, and use by subsequent steps.'
    }),
    action: translate({ id: 'homepage.rsm.apply.action', message: 'Integrate' }),
    footnote: translate({ id: 'homepage.rsm.apply.footnote', message: '04 / APPLICATION' }),
    tone: 'emerald'
  }
];

interface StageToneStyle {
  card: string;
  glow: string;
  blob: string;
  badge: string;
  icon: string;
  title: string;
  action: string;
  footnote: string;
  divider: string;
}

const stageToneStyles: Record<StageTone, StageToneStyle> = {
  cyan: {
    card: 'bg-zinc-950/80 border-zinc-800/90 hover:border-brand-cyan/50',
    glow: styles.glowCyan,
    blob: 'bg-cyan-500/5 group-hover:bg-cyan-500/10',
    badge: 'bg-zinc-900 border-zinc-800 text-brand-cyan',
    icon: 'text-zinc-600 group-hover:text-brand-cyan',
    title: 'text-white',
    action: 'text-zinc-500',
    footnote: 'text-brand-cyan/80',
    divider: 'border-zinc-900'
  },
  blue: {
    card: 'bg-zinc-950/80 border-zinc-800/90 hover:border-brand-blue/50',
    glow: styles.glowBlue,
    blob: 'bg-blue-500/5 group-hover:bg-blue-500/10',
    badge: 'bg-zinc-900 border-zinc-800 text-brand-cyan',
    icon: 'text-zinc-600 group-hover:text-brand-cyan',
    title: 'text-white',
    action: 'text-zinc-500',
    footnote: 'text-brand-cyan/80',
    divider: 'border-zinc-900'
  },
  violet: {
    card: 'bg-zinc-950/80 border-zinc-800/90 hover:border-violet-500/50',
    glow: styles.glowViolet,
    blob: 'bg-violet-500/5 group-hover:bg-violet-500/10',
    badge: 'bg-zinc-900 border-zinc-800 text-zinc-400',
    icon: 'text-zinc-600 group-hover:text-violet-400',
    title: 'text-zinc-200',
    action: 'text-zinc-500',
    footnote: 'text-zinc-400',
    divider: 'border-zinc-900'
  },
  emerald: {
    card: 'bg-gradient-to-b from-zinc-950 to-zinc-900/90 border-zinc-800 hover:border-brand-blue/60',
    glow: '',
    blob: 'bg-emerald-500/5 group-hover:bg-emerald-500/10',
    badge: 'bg-brand-blue/20 border-brand-blue/40 text-brand-cyan',
    icon: 'text-brand-cyan',
    title: 'text-white',
    action: 'text-brand-cyan',
    footnote: 'text-zinc-500',
    divider: 'border-zinc-800/80'
  }
};

type StageCardProps = Stage;

/** 请求场景模型的四个阶段卡片 */
function StageCard(props: StageCardProps) {
  const tone = stageToneStyles[props.tone];

  return (
    <div
      className={clsx(
        'relative p-8 rounded-2xl border transition-all flex flex-col justify-between group overflow-hidden',
        tone.card,
        tone.glow
      )}>
      {/* 微光几何底纹 */}
      <div
        className={clsx(
          'absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all pointer-events-none',
          tone.blob
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span
            className={clsx(
              'px-2.5 py-1 rounded-md border text-[11px] font-mono tracking-wider uppercase font-semibold',
              tone.badge
            )}>
            {props.stage}
          </span>
          <MaterialIcon
            name={props.icon}
            className={clsx('transition-colors text-[20px]', tone.icon)}
          />
        </div>
        <h3 className={clsx('text-xl md:text-2xl font-bold tracking-tight mb-3', tone.title)}>
          {props.title}
        </h3>
        <p className="text-zinc-400 text-xs leading-relaxed font-normal">{props.description}</p>
      </div>

      <div
        className={clsx(
          'relative z-10 pt-8 mt-6 border-t flex items-center justify-between font-mono text-xs',
          tone.divider
        )}>
        <span className={tone.action}>{props.action}</span>
        <span className={tone.footnote}>{props.footnote}</span>
      </div>
    </div>
  );
}

/** S2 · 问题与架构：请求场景模型 */
export default function RequestSceneModel() {
  return (
    /* chapter-dark：暗色画布下用发丝线把这一章从画布里托起来（见 custom.scss） */
    <section
      id="rsm-model"
      className="relative chapter-dark bg-black text-white py-32 md:py-40 overflow-hidden border-y border-zinc-900 dark:border-transparent scroll-mt-24">
      {/* 右上角模糊氛围云 */}
      <CloudGraphic />

      {/* 球体背后的环境光 */}
      <div className="absolute top-1/4 right-[16%] w-96 h-96 bg-brand-cyan/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <SectionTagline className="text-brand-cyan mb-8">
          {translate({ id: 'homepage.rsm.section', message: 'THE REQUEST SCENARIO MODEL' })}
        </SectionTagline>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white max-w-3xl tracking-[-0.035em] mb-6">
          {translate({
            id: 'homepage.rsm.title',
            message: 'The four lifecycle stages of a request scenario'
          })}
        </h2>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <p className="text-zinc-400 max-w-2xl text-base md:text-lg leading-relaxed font-normal">
            {translate({
              id: 'homepage.rsm.description',
              message:
                'Guided by these four lifecycle stages, every request scenario is organized completely, it knows exactly when to trigger, when to reuse, and when to actually send a request, instead of relying on scattered manual glue code.'
            })}
          </p>

          <Link
            to="/about/RSM"
            className="text-xs font-bold uppercase tracking-wider text-white border-b border-white pb-1 hover:text-brand-cyan hover:border-brand-cyan transition-colors self-start md:self-auto inline-flex items-center gap-1.5 shrink-0">
            <span>
              {translate({
                id: 'homepage.rsm.viewConcept',
                message: 'View the request scenario model'
              })}
            </span>
            <MaterialIcon
              name="arrow_forward"
              className="text-[15px]"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map(stage => (
            <StageCard
              key={stage.stage}
              {...stage}
            />
          ))}
        </div>

        {/* 3D 核心展示行 */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 shrink-0 bg-black">
              <CubeGraphic />
            </div>
            <div>
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider mb-1 font-semibold">
                {translate({ id: 'homepage.rsm.envelope', message: 'RSM Envelope Principle' })}
              </div>
              <h4 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                {translate({
                  id: 'homepage.rsm.envelopeTitle',
                  message:
                    'Encapsulate trigger, decision, execution and data application in one cohesive scenario.'
                })}
              </h4>
              <p className="text-zinc-400 text-xs mt-1 max-w-xl font-normal">
                {translate({
                  id: 'homepage.rsm.envelopeDesc',
                  message:
                    'alova sits above your transport layer. axios and fetch handle the network, while alova owns the rest of the lifecycle.'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-900/90 px-5 py-3 rounded-full border border-zinc-800 shrink-0">
            <span className="text-white font-semibold">
              {translate({ id: 'homepage.rsm.core', message: 'RSM Core' })}
            </span>
            <span className="text-zinc-600">→</span>
            <span className="text-zinc-400">axios / fetch</span>
            <span className="text-zinc-600">→</span>
            <span className="text-brand-cyan font-semibold">
              {translate({ id: 'homepage.rsm.zeroBoilerplate', message: 'Zero Boilerplate' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
